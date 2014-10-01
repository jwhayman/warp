/*global $, window, THREE, document, requestAnimationFrame*/
'use strict';

var warp = {
    particleCount: 500,
    warpSpeed: 0.01,
    cameraPosition: 5,
    particleColor: 0xffffff,
    particleSize: 0.00125,

    init: function () {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(110, warp.getWidth() / warp.getHeight(), 0.01, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(warp.getWidth(), warp.getHeight());
        $('#warp-container').append(this.renderer.domElement);

        this.geometry = new THREE.Geometry();
        this.material = new THREE.PointCloudMaterial({
            color: this.particleColor,
            size: this.particleSize
        });

        this.createVertexes();
        this.pointCloud = new THREE.PointCloud(this.geometry, this.material);

        this.scene.add(this.pointCloud);
        this.camera.position.z = this.cameraPosition;

        requestAnimationFrame(this.renderWarp);
    },

    createVertexes: function () {
        var vertex, i;
        for (i = 0; i < this.particleCount; i = i + 1) {
            vertex = new THREE.Vector3();
            vertex.setX(Math.random() - 0.5);
            vertex.setY(Math.random() - 0.5);
            vertex.setZ(Math.random() * this.cameraPosition);
            this.geometry.vertices.push(vertex);
        }
    },

    renderWarp: function () {
        var vertex, i;
        for (i = 0; i < warp.particleCount; i = i + 1) {
            vertex = warp.geometry.vertices[i];
            vertex.z += warp.warpSpeed;
            if (vertex.z >= warp.camera.position.z) {
                vertex.setX(Math.random() - 0.5);
                vertex.setY(Math.random() - 0.5);
                vertex.setZ(Math.random() * warp.cameraPosition);
            }
        }
        warp.geometry.verticesNeedUpdate = true;
        warp.renderer.render(warp.scene, warp.camera);
        requestAnimationFrame(warp.renderWarp);
    },

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

$(document).ready(function () {
    warp.init();
});

$(window).on('resize', function () {
    warp.redraw();
});