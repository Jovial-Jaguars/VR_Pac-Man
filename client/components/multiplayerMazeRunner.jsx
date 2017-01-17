import React from 'react';

export default class MultiplayerMazeRunner extends React.Component {
  constructor(props){
    super(props);
    this.count = 0;
  }

  componentDidMount() {

    var pacmanIntro = new Audio('../assets/pacman_beginning.wav');
    pacmanIntro.loop = false;
    pacmanIntro.play();

  // Get the canvas element from our HTML above
    var that = this;
    var canvas = document.getElementById("renderCanvas");
    var score = 0;
    var canvas2;
    var pelletSound;
    var angleX = 0;
    var angleY = 0;
    var ball;
    var pelletRemover = 0;
    var inputVelocity;
    var sphereBody;
    var camera;
    var pellets = [];
    var pelletMeshes = [];
    // Load the BABYLON 3D engine
    var engine = new BABYLON.Engine(canvas, true);
     // This begizs the creation of a function that we will 'call' just after it's built
    var create = function (scene, string) {
      var canvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
        id: "ScreenCanvas",
        size: new BABYLON.Size(300, 100),
        backgroundFill: "#4040408F",
        backgroundRoundRadius: 50,
        children: [
          new BABYLON.Text2D(score.toString(), {
            id: "text",
            marginAlignment: "h: center, v:center",
            fontName: "20pt Arial",
          })
        ]
      });
      return canvas;
    };
    // BABYLON.SceneLoader.ImportMesh("Plane", "", "ghost2.babylon", scene, function (newMeshes, particleSystems) {
    // });
  var mazemaker = function(arr, scene, plane, camera, ball, walls) {
    var boxes = [];
    var x = -387;
    var z = 187;
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 1) {
          var plane5 = BABYLON.Mesh.CreateBox("plane", 2, scene);
          // plane.position.x = 50;
          // plane.position.z = 50;
          //plane5.parent = plane;
          plane5.scaling.x = 12.5;
          plane5.scaling.y = 100;
          plane5.scaling.z = 12.5;
          plane5.position.z = z;
          plane5.position.x = x;
          //plane5.checkCollisions = true;
          plane5.material = new BABYLON.StandardMaterial("texture1", scene);
          // plane5.material.diffuseColor = new BABYLON.Color3(1, 0.9, 0);
          //plane5.material.emissiveTexture = new BABYLON.Texture('tron1.jpg', scene);
          plane5.material.emissiveTexture = new BABYLON.Texture('../assets/tron1.jpg', scene);
          //console.log(plane5.getBoundingInfo().boundingBox.center);
          //var box = plane5.getBoundingInfo().boundingBox.center
          //console.log(plane5.getBoundingInfo());
          createWallBody(plane5.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane5.scaling.x, plane5.scaling.y, plane5.scaling.z), 0);
          // var light1 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 210, 0), new BABYLON.Vector3(0, -1, 0), 0.2, 1, scene);
          //light1.intensity = 1;
          // light0.diffuse = new BABYLON.Color3(1, 1, 1);
          // light0.specular = new BABYLON.Color3(1, 1, 1);
          // light0.groundColor = new BABYLON.Color3(0, 0, 0);
          // light1.parent = plane5;
          //boxes.push(plane5);
          //boxes.push(plane5);
          walls.push(plane5);
        } else if (arr[i][j] === 2) {
          var sphere = BABYLON.Mesh.CreateSphere("sphere", 20.0, 4.0, scene);
          // plane.position.x = 50;
          // plane.position.z = 50;
          sphere.position.z = z;
          sphere.position.x = x;
          sphere.position.y = 2;
          //sphere.checkCollisions = true;
          sphere.material = new BABYLON.StandardMaterial("wow", scene);
          //sphere.material.diffuseTexture  = new BABYLON.Texture("grass.jpg", scene);
          sphere.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
          sphere.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
          //console.log(sphere.getBoundingInfo().boundingBox.center);
          var sphereBody = createSphereBody(sphere.getBoundingInfo().boundingBox.center, 4, sphere.uniqueId);
          //sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
          // sphere.physicsImpostor.addEventListener('collide', function(e) {
          //   if (e.uniqueId === ball.uniqueId) {
          //     sphere.dispose();
          //   }
          // });
          // sphere.physicsImpostor.registerOnPhysicsCollide(ball, function(main, collided) {
          //   console.log('hello');
          //   sphere.dispose();
          // });
          // var speedCharacter = 8;
          // var gravity = 0.15;
          // var character = sphere;

          // character.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
          // character.ellipsoidOffset = new BABYLON.Vector3(0, 1.0, 0);

          // var forwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
          // forwards.negate();
          // character.moveWithCollisions(forwards);
          // // or
          // var backwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, -gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
          // character.moveWithCollisions(backwards);
          // var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

          // //Texture of each particle
          // particleSystem.particleTexture = new BABYLON.Texture("./flare.png", scene);

          // // Where the particles come from
          // particleSystem.emitter = sphere; // the starting object, the emitter

          // // Colors of all particles
          // particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
          // particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
          // particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

          // // Size of each particle (random between...
          // particleSystem.minSize = 0.1;
          // particleSystem.maxSize = 0.5;

          // // Life time of each particle (random between...
          // particleSystem.minLifeTime = 0.3;
          // particleSystem.maxLifeTime = 1.5;

          // // Emission rate
          // particleSystem.emitRate = 1500;

          // // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

          // // Set the gravity of all particles
          // particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

          // // Direction of each particle after it has been emitted
          // particleSystem.direction1 = new BABYLON.Vector3(-7, -8, 3);
          // particleSystem.direction2 = new BABYLON.Vector3(7, -8, -3);

          // // Angular speed, in radians
          // particleSystem.minAngularSpeed = 0;
          // particleSystem.maxAngularSpeed = Math.PI;

          // // Speed
          // particleSystem.minEmitPower = 1;
          // particleSystem.maxEmitPower = 3;
          // particleSystem.updateSpeed = 0.005;

          // // Start the particle system
          // particleSystem.start();

          // Fountain's animation

          // sphere.onCollide = function() {
          //   sphere.dispose();
          // };
          // camera.onCollide = function(collidedMesh) {
          //   console.log(collidedMesh.uniqueId);
          //   if (sphere.uniqueId === collidedMesh.uniqueId) {
          //     sphere.dispose();
          //   }
          // };
          // var light1 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 10, 0), new BABYLON.Vector3(0, -1, 0), 0.5, 1, scene);
          // light1.intensity = 1;
          // // light0.diffuse = new BABYLON.Color3(1, 1, 1);
          // // light0.specular = new BABYLON.Color3(1, 1, 1);
          // // light0.groundColor = new BABYLON.Color3(0, 0, 0);
          // light1.parent = plane;
          // light1.position.z = z;
          // light1.position.x = x;
          // light1.position.y = 2;
          // sphere.actionManager = new BABYLON.ActionManager(scene);
          // var action = new BABYLON.SetValueAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: camera }, sphere, "visibility", 0, 500, false, false, function() {sphere.dispose()});
          // sphere.actionManager.registerAction(action);
          // mesh.actionManager.registerAction(

          // new BABYLON.SetValueAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: otherMesh },

          // mesh, "scaling", new BABYLON.Vector3(1.2, 1.2, 1.2)));
          // sphere.onCollide = function(collidedMesh) {
          //   console.log('hellooooo');
          //   sphere.dispose();
          // };
          //   console.log((collidedMesh.uniqueId));
          //   for (var i = 0; i < arr.length - 1; i++) {
          //     if (collidedMesh.uniqueId === arr[i].uniqueId) {
          //       arr[i].dispose();
          //     }
          //   }
          // };
          // light0.position.z = -20;
          // light0.position.y = 10;
          // light0.diffuse = new BABYLON.Color3(1, 0, 0);
          // light0.specular = new BABYLON.Color3(1, 1, 1);
          //console.log(sphere.getBoundingInfo());
          pelletMeshes[sphere.uniqueId] = sphere;
        } else if (arr[i][j] === 3) {
          camera.position.z = z;
          camera.position.x = x;
          //console.log('x:', camera.position.x, "z:", plane.position.z);
        }
        x += 25;
      }
      x = -387;
      z -= 25;
    }
    return boxes;
  };
  var createScene = function () {

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    //var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    //scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    //scene.collisionsEnabled = true;
    //var scene = new BABYLON.Scene(engine);
    // var gravityVector = new BABYLON.Vector3(0, 0, 0);
    // var physicsPlugin = new BABYLON.CannonJSPlugin();
    // scene.enablePhysics(gravityVector, physicsPlugin);
    // Change the scene background color to green.
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    //VRDeviceOrientationFreeCamera
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    //camera.inputs.addGamepad();
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    //camera.ellipsoid = new BABYLON.Vector3(3, 7, 3);
    //camera.position.y = 10;
    //camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);
    // Activate collisions
    //camera.checkCollisions = true;
    // }
    ball = BABYLON.Mesh.CreateSphere("sphere", 20.0, 4.0, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    ball.position.y = 5;
    ball.position.z = -250;
    ball.position.x = -125;
    ball.checkCollisions = true;
    //camera.parent = ball;
    //camera.position.y = 3;
    ball.material = new BABYLON.StandardMaterial("wow", scene);
    ball.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    ball.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    //ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0, restitution: 0.9 }, scene);
    // var mass = 5, radius = 4;
    // var sphereShape = new CANNON.Sphere(radius); // Step 1
    // sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
    // sphereBody.position.set(0,1,-9);
    // sphereBody.rotation = new CANNON.Vec3();
    //sphereBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    //world.add(sphereBody);
    // camera.angularSensibility = 1000;
    scene.activeCameras.push(camera);
    //scene.fog = new t.FogExp2(0xD6F1FF, 0.0005);
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/sky35/citysky', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skybox.renderingGroupId = 0;
    scene.fogMode = BABYLON.Scene.LINEAR;
    scene.fogDensity = 0.01;
    scene.fogStart = -400.0;
    scene.fogEnd = 400.0;
    scene.fogColor = new BABYLON.Color3(0.3, 0.9, 0.85);
    //console.log(camera.ellipsoid);
    // BABYLON.SceneLoader.ImportMesh("", "./", "ghostparent.babylon", scene, function (newMeshes, particleSystems) {
    //   for (var i = 0; i < newMeshes.length; i++) {
    //     var ghost = newMeshes[i];
    //     var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
    //     light0.parent = ghost;
    //     if (ghost.name === 'Plane') {
    //       ghost.position.y = 10;
    //       ghost.position.x = -200;
    //       ghost.position.z = -10;
    //       ghost.material = new BABYLON.StandardMaterial('ghost', scene);
    //       ghost.material.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0.8);
    //     } else if (ghost.name === 'Sphere' || ghost.name === 'Sphere.001') {
    //       ghost.material = new BABYLON.StandardMaterial('ghost', scene);
    //       ghost.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //       ghost.material.specularColor = new BABYLON.Color3(1, 1, 1);
    //       ghost.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    //     } else if (ghost.name === 'Sphere.002' || ghost.name === 'Sphere.003') {
    //       ghost.material = new BABYLON.StandardMaterial('ghost', scene);
    //       ghost.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    //       ghost.material.specularColor = new BABYLON.Color3(1, 1, 1);
    //       ghost.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    //     }

    //   }

    //   //ghost.material = new BABYLON.StandardMaterial("lol", scene);
    //   //x.material.emissiveColor = new BABYLON.Color3(0.1, 0.8, 0.8);
    // });
    var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,1000,0), scene);
    mm.setTarget(new BABYLON.Vector3(0.1,0.1,0.1));
    //mm.checkCollisions = true;
    // Activate the orthographic projection
    mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    //These values are required for using an orthographic mode,
    // and represents the coordinates of the square containing all the camera view.
    // this.size is the size of our arena
    mm.orthoLeft = -canvas.size/2;
    mm.orthoRight = canvas.size/2;
    mm.orthoTop =  canvas.size/2;
    mm.orthoBottom = -canvas.size/2;

    mm.rotation.x = Math.PI/2;

    var xstart = 0.8, // 80% from the left
        ystart = 0.75; // 75% from the bottom
    var width = 0.99-xstart, // Almost until the right edge of the screen
        height = 1-ystart;  // Until the top edge of the screen

    mm.viewport = new BABYLON.Viewport(
        xstart,
        ystart,
        width,
        height
        );
    scene.activeCameras.push(mm);
    mm.layerMask = 1;
    camera.layerMask = 2;
    //scene.activeCamera = camera;
    var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
    // light0.diffuse = new BABYLON.Color3(1, 0, 0);
    // light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.parent = camera;
    //light0.intensity = 0.3;
    //light0.range = 25;
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var plane = BABYLON.Mesh.CreateBox("plane", 2, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;
    //console.log('x:',plane.position.x, "y:", plane.position.y, "z:", plane.position.z)
    plane.scaling.z = 200;
    plane.scaling.y = 100;
    plane.scaling.x = .2;
    //plane.rotation.y = Math.PI/2;
    //plane.checkCollisions = true;
    plane.material = new BABYLON.StandardMaterial("texture1", scene);
    plane.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane.material.alpha = 0.2;
    //plane.physicsImpostor = new BABYLON.PhysicsImpostor(plane, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    createWallBody(plane.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane.scaling.x, plane.scaling.y, plane.scaling.z), 0);
    var walls = [];
    //plane.material.backFaceCulling = false;
    var defaultmaze = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                 [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1],
                 [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                 [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                 [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                 [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                 [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]];
    var arr = mazemaker(defaultmaze, scene, plane, scene.activeCamera, ball, walls);

    //console.log(arr);

    var plane2 = BABYLON.Mesh.CreateBox("plane", 2, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    //plane2.parent = plane;
    plane2.scaling.z = 200;
    plane2.scaling.y = 100;
    plane2.scaling.x = .2;
    plane2.position.x = -400;
    //plane2.rotation.y = Math.PI;
    //plane2.rotation.y = Math.PI/2;
    //plane2.checkCollisions = true;
    plane2.material = new BABYLON.StandardMaterial("grass.png", scene);
    plane2.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane2.material.alpha = 0.2;
    // plane2.physicsImpostor = new BABYLON.PhysicsImpostor(plane2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    createWallBody(plane2.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane2.scaling.x, plane2.scaling.y, plane2.scaling.z), 0);
    // var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(-200, 50, -15), scene);
    // light0.intensity = 0.9;
    //light0.diffuse = new BABYLON.Color3(1, 0, 0);
    //light0.specular = new BABYLON.Color3(1, 1, 1);
    //plane2.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    var plane3 = BABYLON.MeshBuilder.CreateBox("plane", 2, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    //plane3.parent = plane;
    plane3.scaling.z = 400;
    plane3.scaling.y = 200;
    plane3.scaling.x = .2;
    plane3.rotation.y = Math.PI/2;
    plane3.position.x = -200;
    plane3.position.z = 200;
    //plane3.rotation.y = Math.PI/2;
    //plane3.checkCollisions = true;
    plane3.material = new BABYLON.StandardMaterial("texture1", scene);
    plane3.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane3.material.alpha = 0.2;
    // plane3.physicsImpostor = new BABYLON.PhysicsImpostor(plane3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    createWallBody(plane3.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane3.scaling.x, plane3.scaling.y, plane3.scaling.z), 2);
    //plane3.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    var plane4 = BABYLON.MeshBuilder.CreateBox("plane", 2, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    //plane4.parent = plane;
    plane4.scaling.z = 400;
    plane4.scaling.y = 200;
    plane4.scaling.x = 0.2;
    plane4.rotation.y = Math.PI/2;
    plane4.position.x = -200;
    plane4.position.z = -200;
    //plane4.rotation.y = -Math.PI/2;
    //plane4.checkCollisions = true;
    plane4.material = new BABYLON.StandardMaterial("texture1", scene);
    plane4.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane4.material.alpha = 0.2;
    // plane4.physicsImpostor = new BABYLON.PhysicsImpostor(plane4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
    createWallBody(plane4.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane4.scaling.x, plane4.scaling.y, plane4.scaling.z), 2);

    var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, scene);
    //ground.checkCollisions = true;
    ground.material = new BABYLON.StandardMaterial("texture1", scene);
    //ground.material.emissiveColor = new BABYLON.Color3(1.0, 0.5, 0);
    ground.material.emissiveTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
    ground.material.emissiveTexture.uScale = 100.0;
    ground.material.emissiveTexture.vScale = 100.0;
    // var groundShape = new CANNON.Plane();
    // var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    // world.add(groundBody);
    // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    //console.log(ball.getAbsolutePosition)
    //ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(10, 10, 0), ball.getAbsolutePosition());
    //ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(1,0,0));
    //ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(-1,0, 0));

    pelletSound = new BABYLON.Sound("pellet", "../assets/pellet.wav", scene);
    canvas2 = create(scene, score);
    //var forwards = new BABYLON.Vector3(0, 0, 0);
    //var curr = arr[0];
    // var moveCamera = function() {
    //   var camSpeed = 0.5;
    //   var expression = (ball.position.x - plane.position.x > -4) && (parseFloat(Math.sin(camera.rotation.y)) > 0);
    //   var expression2 = (ball.position.x - plane2.position.x < 4) && (parseFloat(Math.sin(camera.rotation.y)) < 0);
    //   var expression3 = (ball.position.z - plane3.position.z > -4) && (parseFloat(Math.cos(camera.rotation.y)) > 0);
    //   var expression4 = (ball.position.z - plane4.position.z < 4) && (parseFloat(Math.cos(camera.rotation.y)) < 0);
    //   if (expression || expression2 || expression3 || expression4) {
    //     forwards = new BABYLON.Vector3(0, 0, 0);
    //   } else {
    //     forwards = new BABYLON.Vector3(parseFloat(Math.sin(camera.rotation.y)) * camSpeed, 0, parseFloat(Math.cos(camera.rotation.y)) * camSpeed);
    //   }
    //   var cur = -1;
    //   for (var i = 0; i < arr.length; i++) {
    //     var distance = arr[i].position.x - ball.position.x;
    //     var distance2 = arr[i].position.z - ball.position.z;
    //     var displacement = Math.sqrt((distance * distance) + (distance2 * distance2));
    //     if (displacement < 4 && arr[i] !== undefined) {
    //       arr[i].dispose();
    //       pellet.play();
    //       curr = i;
    //       score++;
    //       if (canvas2 === undefined) {
    //         canvas2 = create(scene, score);
    //       } else {
    //         canvas2.children[0].text = score.toString();
    //       }
    //     }
    //     if (cur > 1) {
    //       arr = arr.splice(curr, 1);
    //       cur = -1;
    //     }

    //   }
    //   for (var j = 0; j < walls.length; j++) {
    //     var express = ((walls[j].position.x - ball.position.x > 0) && (walls[j].position.x - ball.position.x < 14) && (parseFloat(Math.sin(camera.rotation.y)) > 0)) && (Math.abs(ball.position.z - walls[j].position.z) < 14);
    //     var express2 = ((ball.position.x - walls[j].position.x > 0) && (ball.position.x - walls[j].position.x < 14) && (parseFloat(Math.sin(camera.rotation.y)) < 0)) && (Math.abs(ball.position.z - walls[j].position.z) < 14);
    //     var express3 = ((ball.position.z - walls[j].position.z > 0) && (ball.position.z - walls[j].position.z < 14) && (parseFloat(Math.cos(camera.rotation.y)) < 0)) && (Math.abs(ball.position.x - walls[j].position.x) < 14);
    //     var express4 = ((walls[j].position.z - ball.position.z > 0) && (walls[j].position.z - ball.position.z < 14) && (parseFloat(Math.cos(camera.rotation.y)) > 0)) && (Math.abs(ball.position.x - walls[j].position.x) < 14);
    //     if (express || express2 || express3 || express4 || expression || expression2 || expression3 || expression4) {
    //       forwards = new BABYLON.Vector3(0, 0, 0);
    //     } else {
    //       forwards = new BABYLON.Vector3(parseFloat(Math.sin(camera.rotation.y)) * camSpeed, 0, parseFloat(Math.cos(camera.rotation.y)) * camSpeed);
    //     }

    //   }
    //   ball.position = ball.position.add(forwards);
    // };

    //scene.activeCamera.checkCollisions = true;
    // scene.registerBeforeRender(function() {
    //   moveCamera();
    // });
    return scene;

  };  // End of createScene function
  var createWorld = function(){
    var world = new CANNON.World();
    world.gravity.set(0,-50,0);
    var mass = 5, radius = 1.25;
    var sphereShape = new CANNON.Sphere(radius); // Step 1
    sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
    sphereBody.position.set(-250,5,-150);
    sphereBody.rotation = new CANNON.Vec3();
    sphereBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    sphereBody.addEventListener('collide', function(e){
       if(e.body.isPellet){
         for (var p in pellets){
           if (pellets[p] === pellets[e.body.pelletId]){
            console.log('hit pellet collision');
            socket.emit('pelletCollision', p);
             pelletMeshes[p].dispose();
             //world.remove(pellets[p]);
             pelletRemover = p;
             pelletSound.play();
             score++;
             canvas2.children[0].text = score.toString();
           }
         }
       }
     });
    world.add(sphereBody); // Step 3

    // sphereBody.addEventListener('collide', function(e){
    //   if(e.body.isCoin){
    //      //e.body.
    //     console.log("collided", e.body.coinID);
    //     for (c in coins){
    //       if (coins[c] === coins[e.body.coinID]){
    //         console.log("YEs please", coins[c]);
    //         coinMeshes[c].isVisible = false;

    //       }

    //     }
    //   }

    // });



      var groundShape = new CANNON.Plane();
      var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
      world.add(groundBody);
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);


     // boxShape = new CANNON.Box(new CANNON.Vec3(2, 2, 4));

  return world;
};

    var createWallBody = function(position, size, flag){
      var boxShape = new CANNON.Box(size);
      var boxBody = new CANNON.Body({shape: boxShape, mass:0});
      boxBody.position = position;
      if(flag === 1) {
        boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),-Math.PI/2);
      } else if(flag === 2) {
        boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),Math.PI/2);
      }
      world.add(boxBody);
     };

    var createSphereBody = function(position, radius, id){
      var pelletShape = new CANNON.Sphere(radius);
      var pelletBody = new CANNON.Body({mass: 0, shape: pelletShape});
      pelletBody.position = position;
      pelletBody.isPellet = true;
      pelletBody.collisionResponse = 0;
      pelletBody.pelletId = id;
      pellets[id] = pelletBody;
      world.add(pelletBody);
     };


    var world = createWorld();
    var scene = createScene();
    var cam1 = parseFloat(Math.cos(camera.rotation.y));
    var cam2 = parseFloat(Math.sin(camera.rotation.y));

    var player2 = BABYLON.Mesh.CreateSphere('player2', 16, 4, scene);
    player2.material = new BABYLON.StandardMaterial("player2material", scene);
    player2.material.emissiveColor = new BABYLON.Color3(1, 0, 0);

    var otherPlayerSpotlight = new BABYLON.SpotLight("otherPlayerSpotlight",  new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
    otherPlayerSpotlight.diffuse = new BABYLON.Color3(1, 0, 0);
    otherPlayerSpotlight.parent = player2;

    var assignGameRoom = function() {
      var room = null;
      $.ajax({
        type: 'GET',
        url: '/assignGameRoom',
        async: false,
        success: function(number) {
          room = 'room' + number;
          console.log('successfully joined room:', room);
        },
        error: function() {
          console.log('Erorr joining game room');
        }
      });
      return room;
    };


    socket.emit('join', assignGameRoom());

    socket.on('otherPlayerCoords', function(data) {
        var decodeBuffer = new ArrayBuffer(data.length);
        var decodeView   = new Uint8Array( decodeBuffer );
        for (var i = 0; i < data.length; i++) {
          decodeView[i] = data.charCodeAt( i );
        }
        var decodedState = new Float64Array(decodeBuffer);
        player2.position = {x: decodedState[0], y: decodedState[1], z: decodedState[2]};
        player2.rotation = {x: decodedState[3], y: decodedState[4], z: decodedState[5]};
      });

    socket.on('otherPlayerPelletCollision', function(pelletId) {
      console.log('other player collision pellet id:', pelletMeshes[pelletId]);
        pelletMeshes[pelletId].dispose();
    })
    // });
    engine.runRenderLoop(function () {
      socket.on('error', console.error.bind(console));
      // socket.on('otherPlayerCoords', function(data) {
      //   console.log(data);
      // })
    // socket.on('blah', function(data) {
    //   console.log('blahdata:', data);
    // })
      var myCamPosition = camera.position, myCamRotation = camera.rotation;
      var myCoords = new Float64Array([myCamPosition.x, myCamPosition.y, myCamPosition.z, myCamRotation.x, myCamRotation.y, myCamRotation.z]);
      var ucharView  = new Uint8Array(myCoords.buffer);
      var slimData = String.fromCharCode.apply(
        String, [].slice.call( ucharView, 0 )
      );
      socket.emit('coordinates', slimData);
      // socket.on('coordinates', )
      if(pelletRemover !== 0) {
        world.remove(pellets[pelletRemover]);
        pelletRemover = 0;
      }
      scene.render();
      world.step(1.0/60.0);
      if(cam1 !== parseFloat(Math.cos(camera.rotation.y)) || cam2 !== parseFloat(Math.sin(camera.rotation.y))) {
        cam1 = parseFloat(Math.cos(camera.rotation.y));
        cam2 = parseFloat(Math.sin(camera.rotation.y));
        sphereBody.velocity.z = cam1* 50;
        sphereBody.velocity.x = cam2* 50;
      }
      ball.position.x = sphereBody.position.x;
      ball.position.y = sphereBody.position.y;
      ball.position.z = sphereBody.position.z;

      camera.position.x = sphereBody.position.x + .4;
      camera.position.y = sphereBody.position.y
      camera.position.z = sphereBody.position.z;

      inputVelocity = sphereBody.velocity;
        var quatX = new CANNON.Quaternion();
        var quatY = new CANNON.Quaternion();
        quatX.setFromAxisAngle(new CANNON.Vec3(1,0,0), angleX);
        quatY.setFromAxisAngle(new CANNON.Vec3(0,1,0), angleY);
        var quaternion = quatY.mult(quatX);
        quaternion.normalize();



        var rotatedVelocity = quaternion.vmult(inputVelocity);
        sphereBody.velocity = rotatedVelocity;

    });
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }



  render() {
    return (<canvas id="renderCanvas"></canvas>);
  }
}
