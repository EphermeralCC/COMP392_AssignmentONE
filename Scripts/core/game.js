/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var sphere;
var structure;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var cubeGeometry;
var cubeMaterial;
var cubeHead;
var cubeBody;
var cubeLArm;
var cubeRArm;
var cubeLLeg;
var cubeRLeg;
var cubeColour;
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
    plane = new gameObject(new PlaneGeometry(16, 16, 1, 1), new LambertMaterial({ color: 0x6FE74A }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.z = -0.0095 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //Add a Cube Head to the Scene
    cubeMaterial = new LambertMaterial({ color: 0xE7D3B6 });
    cubeGeometry = new CubeGeometry(1, 1, 1);
    cubeHead = new Mesh(cubeGeometry, cubeMaterial);
    cubeHead.castShadow = true;
    cubeHead.receiveShadow = true;
    cubeHead.position.y = 5.75;
    cubeHead.rotation.y = -0.010 * Math.PI;
    scene.add(cubeHead);
    console.log("Added Cube Head to scene...");
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
    structure.add(cubeHead);
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
    control = new Control(0, 0, 0, '#ffffff', '#ffffff', '#ffffff'); //pass rotation speed
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationX', -0.1, 0.1);
    gui.add(controlObject, 'rotationY', -0.1, 0.1);
    gui.add(controlObject, 'rotationZ', -0.1, 0.1);
    //Control for changing the colour of the cube parts
    gui.addColor(controlObject, 'skinColour').onChange(function changeTorsoColour(color) {
        cubeColour = new LambertMaterial({ color: color });
        cubeHead.material = cubeColour;
        cubeLArm.material = cubeColour;
        cubeRArm.material = cubeColour;
    });
    gui.addColor(controlObject, 'shirtColour').onChange(function changeTorsoColour(color) {
        cubeColour = new LambertMaterial({ color: color });
        cubeBody.material = cubeColour;
    });
    gui.addColor(controlObject, 'pantColour').onChange(function changeLegLColour(color) {
        cubeColour = new LambertMaterial({ color: color });
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
function gameLoop() {
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
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map