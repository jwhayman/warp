"use strict";var warp={particleCount:500,warpSpeed:.01,cameraPosition:5,particleColor:16777215,particleSize:.00125,init:function(){this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(110,warp.getWidth()/warp.getHeight(),.01,1e3),this.renderer=new THREE.WebGLRenderer,this.renderer.setSize(warp.getWidth(),warp.getHeight()),$("#warp-container").append(this.renderer.domElement),this.geometry=new THREE.Geometry,this.material=new THREE.PointCloudMaterial({color:this.particleColor,size:this.particleSize}),this.createVertexes(),this.pointCloud=new THREE.PointCloud(this.geometry,this.material),this.scene.add(this.pointCloud),this.camera.position.z=this.cameraPosition,requestAnimationFrame(this.renderWarp)},createVertexes:function(){var a,b;for(b=0;b<this.particleCount;b+=1)a=this.setVector(),this.geometry.vertices.push(a)},setVector:function(){var a=new THREE.Vector3;return a.setX(Math.random()-.5),a.setY(Math.random()-.5),a.setZ(Math.random()*warp.cameraPosition),a},updateVector:function(a){a.setX(Math.random()-.5),a.setY(Math.random()-.5),a.setZ(Math.random()*warp.cameraPosition)},renderWarp:function(){var a,b;for(b=0;b<warp.particleCount;b+=1)a=warp.geometry.vertices[b],a.z+=warp.warpSpeed,a.z>=warp.camera.position.z&&warp.updateVector(a);warp.geometry.verticesNeedUpdate=!0,warp.renderer.render(warp.scene,warp.camera),requestAnimationFrame(warp.renderWarp)},redraw:function(){this.renderer.setSize(warp.getWidth(),warp.getHeight()),this.camera.aspect=warp.getWidth()/warp.getHeight(),this.camera.updateProjectionMatrix()},getHeight:function(){return $("#warp-container").height()},getWidth:function(){return $("#warp-container").width()}};$(document).ready(function(){warp.init()}),$(window).on("resize",function(){warp.redraw()});