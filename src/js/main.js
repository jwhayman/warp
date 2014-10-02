/*global $, window, THREE, document, requestAnimationFrame*/
'use strict';

var warp = {
    particleCount: 500,             // Number of stars
    warpSpeed: 0.01,                // Velocity of geometry moving towards camera
    cameraPosition: 5,              // Global camera position
    particleColor: 0xffffff,        // Colour of stars
    particleSize: 0.00125,          // Size of stars, affected by screen resolution

    init: function () {
        // Setup scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(110, warp.getWidth() / warp.getHeight(), 0.01, 1000);
        this.renderer = new THREE.WebGLRenderer();

        // setup renderer
        this.renderer.setSize(warp.getWidth(), warp.getHeight());
        $('#warp-container').append(this.renderer.domElement);

        // Generate geometry
        this.geometry = new THREE.Geometry();
        this.material = new THREE.PointCloudMaterial({
            color: this.particleColor,
            size: this.particleSize
        });

        this.createVertexes();
        this.pointCloud = new THREE.PointCloud(this.geometry, this.material);

        // Add geometry and camera to scene
        this.scene.add(this.pointCloud);
        this.camera.position.z = this.cameraPosition;

        // Start render loop
        requestAnimationFrame(this.renderWarp);
    },

    // Create new vertexes for the starfield geometry
    createVertexes: function () {
        var vector, i;
        for (i = 0; i < this.particleCount; i = i + 1) {
            vector = this.setVector();
            this.geometry.vertices.push(vector);
        }
    },

    // Create a new vector at a default z position
    setVector: function () {
        var vector = new THREE.Vector3();
        vector.setX(Math.random() - 0.5);
        vector.setY(Math.random() - 0.5);
        vector.setZ(Math.random() * warp.cameraPosition);
        return vector;
    },

    // Reset an existing vector to a default z position
    updateVector: function (vector) {
        vector.setX(Math.random() - 0.5);
        vector.setY(Math.random() - 0.5);
        vector.setZ(Math.random() * warp.cameraPosition);
    },

    // Render loop
    renderWarp: function () {
        var vector, i;
        for (i = 0; i < warp.particleCount; i = i + 1) { // Update the z position for each vector
            vector = warp.geometry.vertices[i];
            vector.z += warp.warpSpeed;
            if (vector.z >= warp.camera.position.z) { // If the z position is equal or greater than the camera position, then reset the z position to default
                warp.updateVector(vector);
            }
        }
        warp.geometry.verticesNeedUpdate = true;
        warp.renderer.render(warp.scene, warp.camera);
        requestAnimationFrame(warp.renderWarp);
    },

    // Redraw the scene and camera aspect if the window is resized
    redraw: function () {
        this.renderer.setSize(warp.getWidth(), warp.getHeight());
        this.camera.aspect = warp.getWidth() / warp.getHeight();
        this.camera.updateProjectionMatrix();
    },

    getHeight: function () {
        return $('#warp-container').height();
    },

    getWidth: function () {
        return $('#warp-container').width();
    }
};

// Initialise warp scene
$(document).ready(function () {
    warp.init();
});

// Reconfigure warp scene on window resize
$(window).on('resize', function () {
    warp.redraw();
});