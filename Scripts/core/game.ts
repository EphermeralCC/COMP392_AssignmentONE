//The Source file name: game.ts 
//Author’s name: Christine Cho
//Last Modified by: Christine Cho
//Date last Modified: 02/05/2016
//Program description: The main controller for the cubeman 
//Revision History: Complete

/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var structure: THREE.Group;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry: CubeGeometry;
var sphereGeometry: SphereGeometry;
var cubeMaterial: LambertMaterial;

var sphereHead: Mesh;
var cubeBody: Mesh;
var cubeLArm: Mesh;
var cubeRArm: Mesh;
var cubeLLeg: Mesh;
var cubeRLeg: Mesh;
var cubeColour: LambertMaterial;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(16, 16, 1, 1),
        new LambertMaterial({ color: 0x6FE74A }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.z = -0.0095 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
    //Add a Sphere Head to the Scene
    cubeMaterial = new LambertMaterial({ color: 0xE7D3B6 });
    sphereGeometry = new SphereGeometry(.75, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    sphereHead = new Mesh(sphereGeometry, cubeMaterial);
    sphereHead.castShadow = true;
    sphereHead.receiveShadow = true;
    sphereHead.position.y = 5.75;

    sphereHead.rotation.y = -0.010 * Math.PI;
    scene.add(sphereHead);
    console.log("Added Sphere Head to scene...");
    
    //Add a Cube Torso to the Scene
    cubeMaterial = new LambertMaterial({ color: 0xff3333 });
    cubeGeometry = new CubeGeometry(2, 2.5, 1.75);
    cubeBody = new Mesh(cubeGeometry, cubeMaterial);
    cubeBody.castShadow = true;
    cubeBody.receiveShadow = true;
    cubeBody.position.y = 4;

    cubeBody.rotation.y = -0.010 * Math.PI;
    scene.add(cubeBody);
    console.log("Added Cube Torso to scene...");
    
    //Add Left Cube Arm to the scene
    cubeMaterial = new LambertMaterial({ color: 0xE7D3B6 });
    cubeGeometry = new CubeGeometry(0.5, 0.5, 2);
    cubeLArm = new Mesh(cubeGeometry, cubeMaterial);
    cubeLArm.castShadow = true;
    cubeLArm.receiveShadow = true;

    cubeLArm.rotation.y = 0.5 * Math.PI;
    cubeLArm.rotation.z = 0.5 * Math.PI;
    cubeLArm.position.x = 2;
    cubeLArm.position.y = 5;

    scene.add(cubeLArm);
    console.log("Added Left Cube Arm to scene...");
    
    //Add Right Cube Arm to the scene
    cubeMaterial = new LambertMaterial({ color: 0xE7D3B6 });
    cubeGeometry = new CubeGeometry(0.5, 0.5, 2);
    cubeRArm = new Mesh(cubeGeometry, cubeMaterial);
    cubeRArm.castShadow = true;
    cubeRArm.receiveShadow = true;

    cubeRArm.rotation.y = -0.5 * Math.PI;
    cubeRArm.rotation.z = 0.5 * Math.PI;
    cubeRArm.position.x = -2;
    cubeRArm.position.y = 5;

    scene.add(cubeRArm);
    console.log("Added Right Cube Arm to scene...");
    
    //Add Left Cube Leg to the scene
    cubeMaterial = new LambertMaterial({ color: 0x006080 });
    cubeGeometry = new CubeGeometry(0.75, 0.75, 2.750);
    cubeLLeg = new Mesh(cubeGeometry, cubeMaterial);
    cubeLLeg.castShadow = true;
    cubeLLeg.receiveShadow = true;

    cubeLLeg.rotation.x = 0.5 * Math.PI;
    cubeLLeg.position.x = 0.6;
    cubeLLeg.position.y = 1.4;

    scene.add(cubeLLeg);
    console.log("Added Left Cube Leg to scene...");
    
    //Add Right Cube Leg to the scene
    cubeMaterial = new LambertMaterial({ color: 0x006080 });
    cubeGeometry = new CubeGeometry(0.75, 0.75, 2.750);
    cubeRLeg = new Mesh(cubeGeometry, cubeMaterial);
    cubeRLeg.castShadow = true;
    cubeRLeg.receiveShadow = true;



    cubeRLeg.rotation.x = 0.5 * Math.PI;
    cubeRLeg.position.x = -0.6;
    cubeRLeg.position.y = 1.4;

    scene.add(cubeRLeg);
    console.log("Added Right Cube Leg to scene...");
    
    //Grouping all Cube parts under one Mesh
    structure = new THREE.Group();
    structure.add(sphereHead);
    structure.add(cubeBody);
    structure.add(cubeLArm);
    structure.add(cubeLLeg);
    structure.add(cubeRArm);
    structure.add(cubeRLeg);
    scene.add(structure);
    console.log("Group Cubes Together...");
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x020202);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-5.6, 23.1, -5.4);
    spotLight.rotation.set(0.8, 42.7, -19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(0, 0, 0, '#ffffff', '#ffffff', '#ffffff');//pass rotation speed
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationX', -0.1, 0.1);
    gui.add(controlObject, 'rotationY', -0.1, 0.1);
    gui.add(controlObject, 'rotationZ', -0.1, 0.1);
    
    //Control for changing the colour of the cube parts
    gui.addColor(controlObject, 'skinColour').onChange(function changeTorsoColour(color){
        cubeColour = new LambertMaterial({ color: color })
        sphereHead.material = cubeColour;
        cubeLArm.material = cubeColour;
        cubeRArm.material = cubeColour;
    });

    gui.addColor(controlObject, 'shirtColour').onChange(function changeTorsoColour(color) {
        cubeColour = new LambertMaterial({ color: color })
        cubeBody.material = cubeColour;
    });

    gui.addColor(controlObject, 'pantColour').onChange(function changeLegLColour(color){
        cubeColour = new LambertMaterial({color: color})
        cubeLLeg.material = cubeColour;
        cubeRLeg.material = cubeColour;
    });

}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    structure.rotation.y += control.rotationY;
    structure.rotation.x += control.rotationX;
    structure.rotation.z += control.rotationZ;


    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
