import React from 'react';

export default class MazeRunner extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {

    var pacmanIntro = new Audio('../assets/pacman_beginning.wav');
    pacmanIntro.loop = false;
    pacmanIntro.play();

  // Get the canvas element from our HTML above
    // window.addEventListener("load",function() {
    //     setTimeout(function(){
    //         // This hides the address bar:
    //         window.scrollTo(0, 1);
    //     }, 0);
    // });
    var obj= {};
    var checkObj;
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
    var cameraFlag = false;
    var cam1, cam2;
    var posx = -250;
    var posz = -150;
    var ghost, ghostBody;
    var wall, pellet;
    var newInstanceWall, newInstanceSphere;
    var ghostxvelocity = 0;
    var ghostzvelocity = 25;
    var velocity;
    // Load the BABYLON 3D engine
    var engine = new BABYLON.Engine(canvas, true);
     // This begins the creation of a function that we will 'call' just after it's built
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
    var switchCamera = function (cam) {
        if (scene.activeCameras[0].rotation) {
            cam.rotation = scene.activeCameras[0].rotation.clone();
        }
        cam.fov = scene.activeCameras[0].fov;
        cam.minZ = scene.activeCameras[0].minZ;
        cam.maxZ = scene.activeCameras[0].maxZ;

        if (scene.activeCameras[0].ellipsoid) {
            cam.ellipsoid = scene.activeCameras[0].ellipsoid.clone();
        }
        cam.checkCollisions = scene.activeCameras[0].checkCollisions;
        cam.applyGravity = scene.activeCameras[0].applyGravity;

        cam.speed = scene.activeCameras[0].speed;

        cam.postProcesses = scene.activeCameras[0].postProcesses;
        scene.activeCameras[0].postProcesses = [];
        scene.activeCameras[0].detachControl(canvas);
        if (scene.activeCameras[0].dispose) {
          scene.activeCameras[0].dispose();
        }
        var cool = scene.activeCameras.pop();
        scene.activeCameras.pop();
        scene.activeCameras.push(camera);
        scene.activeCameras.push(cool);


        scene.activeCameras[0].attachControl(canvas);
        cameraFlag = !cameraFlag;

    };
    var c2 = document.getElementsByClassName("camera-toggle")[0];
    c2.addEventListener("click", function () {
      //console.log(scene.activeCameras[0] instanceof BABYLON.VRDeviceOrientationFreeCamera);
      window.scrollTo(0,1);
      if (scene.activeCameras[0] instanceof BABYLON.FreeCamera && !(scene.activeCameras[0] instanceof BABYLON.VRDeviceOrientationFreeCamera)) {
        camera = new BABYLON.VRDeviceOrientationFreeCamera("deviceOrientationCamera", scene.activeCameras[0].position, scene);
        switchCamera(camera);
        cam1 = parseFloat(Math.cos(camera.rotationQuaternion.toEulerAngles().y));
        cam2 = parseFloat(Math.sin(camera.rotationQuaternion.toEulerAngles().y));
      } else {
        //console.log('yes');
        camera = new BABYLON.FreeCamera("freeeCamera", scene.activeCameras[0].position, scene);
        switchCamera(camera);
      }
      return;
      });
  var mazemaker = function(arr, scene, plane, camera, ball, walls) {
    var boxes = [];

    var x = -387;
    var z = 187;
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 1) {
          if (wall === undefined) {
            wall = BABYLON.Mesh.CreateBox("plane", 2, scene);
            wall.scaling.x = 12.5;
            wall.scaling.y = 100;
            wall.scaling.z = 12.5;
            wall.material = new BABYLON.StandardMaterial("texture1", scene);
            wall.material.emissiveTexture = new BABYLON.Texture('../assets/tron1.jpg', scene);
            createWallBody(wall.getBoundingInfo().boundingBox.center, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0);
          } else {
            newInstanceWall = wall.createInstance("i" + (i *16) + j);
            newInstanceWall.position.z = z; 
            newInstanceWall.position.x = x; 
            createWallBody(newInstanceWall.getBoundingInfo().boundingBox.center, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0);
          }
          walls.push(wall);
        } else if (arr[i][j] === 2) {
          if(pellet === undefined) {
            pellet = BABYLON.Mesh.CreateSphere("sphere", 20.0, 4.0, scene);
            pellet.position.z = z;
            pellet.position.x = x; 
            pellet.position.y = 2; 
            pellet.material = new BABYLON.StandardMaterial("wow", scene);
            pellet.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
            pellet.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
            var sphereBody = createSphereBody(pellet.getBoundingInfo().boundingBox.center, 4, pellet.uniqueId);
            pelletMeshes[pellet.uniqueId] = pellet;
          } else {
            newInstanceSphere = pellet.createInstance("i" + (i *16) + j);
            newInstanceSphere.position.z = z; 
            newInstanceSphere.position.x = x; 
            var sphereBody = createSphereBody(newInstanceSphere.getBoundingInfo().boundingBox.center, 4, newInstanceSphere.uniqueId);
            pelletMeshes[newInstanceSphere.uniqueId] = newInstanceSphere;
          }
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
        } else if (arr[i][j] === 3) {
          posz = z; 
          posx = x; 
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
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    //VRDeviceOrientationFreeCamera
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    //camera.inputs.addGamepad();
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    ball = BABYLON.Mesh.CreateSphere("sphere", 20.0, 4.0, scene);
    ball.position.y = 5;
    ball.position.z = -250;
    ball.position.x = -125;
    ball.checkCollisions = true;
    ball.material = new BABYLON.StandardMaterial("wow", scene);
    ball.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    ball.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
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
    // BABYLON.SceneLoader.ImportMesh("", "../assets/", "ghostparent.babylon", scene, function (newMeshes, particleSystems, skeletons) {
    //   for (var i = 0; i < newMeshes.length; i++) {
    //     var ghosty = newMeshes[i];
    //     this.ghost = newMeshes[0];
    //     var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
    //     light0.parent = ghosty;
    //     if (ghosty.name === 'Plane') {
    //       ghosty.position.y = 50;
    //       ghosty.position.x = -200;
    //       ghosty.position.z = -10;
    //       ghosty.scaling.x = 20;
    //       ghosty.scaling.y = 10;
    //       ghosty.scaling.z = 20;

    //       ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
    //       ghosty.material.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0.8);
    //     } else if (ghosty.name === 'Sphere' || ghosty.name === 'Sphere.001') {
    //       ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
    //       ghosty.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //       ghosty.material.specularColor = new BABYLON.Color3(1, 1, 1);
    //       ghosty.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    //     } else if (ghosty.name === 'Sphere.002' || ghosty.name === 'Sphere.003') {
    //       ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
    //       ghosty.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
    //       ghosty.material.specularColor = new BABYLON.Color3(1, 1, 1);
    //       ghosty.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    //     }

    //   }
      
    //   ghosty.material = new BABYLON.StandardMaterial("lol", scene);
    //   x.material.emissiveColor = new BABYLON.Color3(0.1, 0.8, 0.8);
    // }.bind(obj));
    var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,1000,0), scene);
    mm.setTarget(new BABYLON.Vector3(0.1,0.1,0.1));
    // Activate the orthographic projection
    mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
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
    var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.1, 3, scene);
    light0.diffuse = new BABYLON.Color3(1, 0, 0);
    light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.parent = camera;
    var plane = BABYLON.Mesh.CreateBox("plane", 2, scene);
    plane.scaling.z = 200;
    plane.scaling.y = 100;
    plane.scaling.x = .2;
    plane.material = new BABYLON.StandardMaterial("texture1", scene);
    plane.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane.material.alpha = 0.2;
    createWallBody(plane.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane.scaling.x, plane.scaling.y, plane.scaling.z), 0);
    var walls = [];
    var arr = mazemaker(that.props.maze, scene, plane, scene.activeCamera, ball, walls);
    var plane2 = BABYLON.Mesh.CreateBox("plane", 2, scene);
    plane2.scaling.z = 200;
    plane2.scaling.y = 100;
    plane2.scaling.x = .2;
    plane2.position.x = -400; 
    plane2.material = new BABYLON.StandardMaterial("grass.png", scene);
    plane2.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane2.material.alpha = 0.2;
    createWallBody(plane2.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane2.scaling.x, plane2.scaling.y, plane2.scaling.z), 0);
    var plane3 = BABYLON.MeshBuilder.CreateBox("plane", 2, scene);
    plane3.scaling.z = 400;
    plane3.scaling.y = 200;
    plane3.scaling.x = .2;
    plane3.rotation.y = Math.PI/2;
    plane3.position.x = -200;
    plane3.position.z = 200;
    plane3.material = new BABYLON.StandardMaterial("texture1", scene);
    plane3.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane3.material.alpha = 0.2;
    createWallBody(plane3.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane3.scaling.x, plane3.scaling.y, plane3.scaling.z), 2);
    var plane4 = BABYLON.MeshBuilder.CreateBox("plane", 2, scene);
    plane4.scaling.z = 400;
    plane4.scaling.y = 200;
    plane4.scaling.x = 0.2;
    plane4.rotation.y = Math.PI/2;
    plane4.position.x = -200;
    plane4.position.z = -200;
    plane4.material = new BABYLON.StandardMaterial("texture1", scene);
    plane4.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane4.material.alpha = 0.2;
    createWallBody(plane4.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane4.scaling.x, plane4.scaling.y, plane4.scaling.z), 2);

    var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, scene);
    ground.material = new BABYLON.StandardMaterial("texture1", scene);
    ground.material.emissiveTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
    ground.material.emissiveTexture.uScale = 100.0;
    ground.material.emissiveTexture.vScale = 100.0;
    pelletSound = new BABYLON.Sound("pellet", "../assets/pellet.wav", scene);
    canvas2 = create(scene, score);
    return scene;

  };  // End of createScene function
  var createWorld = function(){
    var world = new CANNON.World();
    world.gravity.set(0,-50,0);
    var mass = 5, radius = 1.25;
    var sphereShape = new CANNON.Sphere(radius); // Step 1
    sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
    sphereBody.position.set(posx,5,posz);
    sphereBody.rotation = new CANNON.Vec3();
    sphereBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    sphereBody.addEventListener('collide', function(e){
       if(e.body.isPellet){
         for (var p in pellets){
           if (pellets[p] === pellets[e.body.pelletId]){
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
    world.add(sphereBody);
    var ghostShape = new CANNON.Sphere(10); // Step 1
    ghostBody = new CANNON.Body({mass: 5, shape: ghostShape}); // Step 2
    ghostBody.position.set(-250,5,-150);
    ghostBody.rotation = new CANNON.Vec3();
    ghostBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);  
    ghostBody.addEventListener('collide', function(e){
     ghostxvelocity = Math.floor(Math.random() * 50) - 25;
     ghostzvelocity = Math.floor(Math.random() * 50) - 25;
     });
    world.add(ghostBody);
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
    
    if(cameraFlag) {
      cam1 = parseFloat(Math.cos(camera.rotationQuaternion.toEulerAngles().y));
      cam2 = parseFloat(Math.sin(camera.rotationQuaternion.toEulerAngles().y));
    } else {
      cam1 = parseFloat(Math.cos(camera.rotation.y));
      cam2 = parseFloat(Math.sin(camera.rotation.y));
    }

    engine.runRenderLoop(function () {
      console.log('count', obj.ghost);
      if(pelletRemover !== 0) {
        world.remove(pellets[pelletRemover]);
        pelletRemover = 0;
      }
      scene.render();
      world.step(1.0/60.0);
      if (cameraFlag && camera.rotationQuaternion !==undefined) {
        if (cam1 !== parseFloat(Math.cos(camera.rotationQuaternion.y)) || cam2 !== parseFloat(Math.sin(camera.rotationQuaternion.y))) {
          cam1 = parseFloat(Math.cos(camera.rotationQuaternion.toEulerAngles().y));
          cam2 = parseFloat(Math.sin(camera.rotationQuaternion.toEulerAngles().y));   
          sphereBody.velocity.z = cam1* 40;
          sphereBody.velocity.x = cam2* 40;
        }
      } else {
          cam1 = parseFloat(Math.cos(camera.rotation.y));
          cam2 = parseFloat(Math.sin(camera.rotation.y));   
          sphereBody.velocity.z = cam1* 20;
          sphereBody.velocity.x = cam2* 20;
      }
      
      ball.position.x = sphereBody.position.x; 
      ball.position.y = sphereBody.position.y; 
      ball.position.z = sphereBody.position.z; 

      camera.position.x = sphereBody.position.x + .4;
      camera.position.y = sphereBody.position.y
      camera.position.z = sphereBody.position.z;
      // console.log(ghost);
      // console.log(ghostBody)
      if(obj.ghost !== undefined) {
        obj.ghost.position.x = ghostBody.position.x;
        obj.ghost.position.y = ghostBody.position.y + 40;
        obj.ghost.position.z = ghostBody.position.z;
        ghostBody.velocity.z = ghostxvelocity;
        ghostBody.velocity.x = ghostzvelocity;
      }  
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
    return (
            <div className="canvas-container">
            <meta name="mobile-web-app-capable" content="yes" />
            <canvas id="renderCanvas"></canvas>
            <div className="camera-toggle">Camera Toggle</div>
            </div>);
  }
}
