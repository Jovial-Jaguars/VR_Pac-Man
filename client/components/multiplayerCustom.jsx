import React from 'react';

export default class MultiplayerCustom extends React.Component {
  constructor(props){
    super(props);
    this.count = 0;
    this.maze = [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
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
  }

   componentWillMount() {
    this.props.router.setRouteLeaveHook(
        this.props.route,
        this.routerWillLeave
      )
   }



  componentDidMount() {

    var pacmanIntro = new Audio('../assets/pacman_beginning.wav');
    pacmanIntro.loop = false;
    pacmanIntro.play();

  // Get the canvas element from our HTML above
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
  var posx = 13;
  var posz = 187;
  var ghost, ghostBody;
  var wall, pellet;
  var newInstanceWall, newInstanceSphere;
  var ghostxvelocity = 0;
  var ghostzvelocity = 25;
  var ghostdirections = [];
  var velocity;
  var gravityFlag = 0;
  var upsidedown = 0;
  var hl;
  var currPacmani, currPacmanj;
  for (var i = 0; i < that.maze.length; i++) {
    for (var j = 0; j < that.maze[i].length; j++) {
      if(that.maze[i][j] === 3) {
        currPacmani = i;
        currPacmanj = j;
        posx = (j * 25) + 13;
        posz = 187 - (i * 25);
      }
    }
  }
    // Load the BABYLON 3D engine
    var engine = new BABYLON.Engine(canvas, true,{ stencil: true });
     // This begizs the creation of a function that we will 'call' just after it's built
     class Queue {
      constructor() {
        this._storage = {};
        this._start = 0;
        this._end = 0;
      }

      enQueue(value) {
        this._storage[this._end++] = value;
      }
      size() {
       return this._end - this._start;
     }
     deQueue() {
      var result = this._storage[this._start];
      delete this._storage[this._start];
      this.size() && this._start++;
      return result;
    }
  }
  var getSuccessors = function(coordz, coordx, arr) {
    var suc = [];
    if(arr[coordz + 1] !== undefined) {
      if (arr[coordz + 1][coordx] !== 1 && arr[coordz + 1][coordx] !== undefined) {
        suc.push([[coordz + 1,coordx], 'S']);
      }
    }
    if (arr[coordz][coordx - 1] !== 1 && arr[coordz][coordx - 1] !== undefined) {
      suc.push([[coordz,coordx - 1], 'W']);
      ;}
      if(arr[coordz - 1] !== undefined) {
        if (arr[coordz - 1][coordx] !== 1 && arr[coordz - 1][coordx] !== undefined) {
          suc.push([[coordz - 1,coordx], 'N']);
        }
      }
      if (arr[coordz][coordx + 1] !== 1 && arr[coordz][coordx + 1] !== undefined) {
        suc.push([[coordz, coordx + 1], 'E']);
      }
      return suc;
    }
    var path = function (start, arr) {
      var q = new Queue();
      var recur = {};
      var suc = [];
      var Successors;
      var curr = [start, []];
      while(arr[curr[0][0]][curr[0][1]] !== 3) {
        if(!((curr[0][0] * 16) + curr[0][1] in recur)) {
          recur[(curr[0][0] * 16) + curr[0][1]] = curr[0];
        }
        Successors = getSuccessors(curr[0][0], curr[0][1], arr);
        for(var suc in Successors) {
          var calc = (Successors[suc][0][0] * 16) + Successors[suc][0][1]
          if (!(calc in recur)) {
            //console.log(curr[1]);
            //curr[1].push(Successors[suc][1]);
            //console.log(curr[1]);
            q.enQueue([[Successors[suc][0][0], Successors[suc][0][1]], curr[1] + Successors[suc][1]]);
            //curr[1].pop();
            //console.log(curr[1]);
            if (arr[Successors[suc][0][0]][Successors[suc][0][1]] !== 3) {
              recur[calc] = Successors[suc];
            }
          }
        }
        curr = q.deQueue();
        //console.log(q.size());
      }
      return curr[1];
    }
    // console.log(path([0,0], that.maze));
    setInterval(function() {
      var curr = path([Math.abs(Math.floor((ghostBody.position.z - 175) / 25)),Math.abs(Math.floor((ghostBody.position.x) / 25))], that.maze);
      if(typeof curr === 'string') {
        ghostdirections = curr.split('');
      }
    }, 1000)
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
    var mazemaker = function(arr, wall, pellet, hl, flipMaze) {
      var x = 13;
      var z = 187;
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
          if (arr[i][j] === 1) {
            if(flipMaze === 1) {
              newInstanceWall = wall.createInstance("j" + (i *16) + j);
              newInstanceWall.position.z = z;
              newInstanceWall.position.x = x;
              newInstanceWall.position.y = 900;
              createWallBody(newInstanceWall.getBoundingInfo().boundingBox.center, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0);
            } else {
              newInstanceWall = wall.createInstance("i" + (i *16) + j);
              newInstanceWall.position.z = z;
              newInstanceWall.position.x = x;
              createWallBody(newInstanceWall.getBoundingInfo().boundingBox.center, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0);
            }
          } else if (arr[i][j] === 2) {
            if(flipMaze === 1) {
              newInstanceSphere = pellet.createInstance("j" + (i *16) + j);
              newInstanceSphere.position.z = z;
              newInstanceSphere.position.x = x;
              newInstanceSphere.position.y = 986;
              var sphereBody = createSphereBody(newInstanceSphere.getBoundingInfo().boundingBox.center, 4, newInstanceSphere.uniqueId);
              pelletMeshes[newInstanceSphere.uniqueId] = newInstanceSphere;
            } else {
              newInstanceSphere = pellet.createInstance("i" + (i *16) + j);
              newInstanceSphere.position.z = z;
              newInstanceSphere.position.x = x;
              newInstanceSphere.position.y = 5;
              var sphereBody = createSphereBody(newInstanceSphere.getBoundingInfo().boundingBox.center, 4, newInstanceSphere.uniqueId);
              pelletMeshes[newInstanceSphere.uniqueId] = newInstanceSphere;
            }
          }
          x += 25;
        }
        x = 13;
        z -= 25;
      }
    };
    var createScene = function () {
    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    var hl = new BABYLON.HighlightLayer("hl1", scene);
    //VRDeviceOrientationFreeCamera
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.inputs.addGamepad();
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    ball = BABYLON.Mesh.CreateSphere("sphere", 20.0, 4.0, scene);
    ball.checkCollisions = true;
    ball.material = new BABYLON.StandardMaterial("wow", scene);
    ball.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    ball.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    scene.activeCameras.push(camera);
    //scene.fog = new t.FogExp2(0xD6F1FF, 0.0005);
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
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
    // scene.fogMode = BABYLON.Scene.LINEAR;
    // scene.fogDensity = 0.01;
    // scene.fogStart = -400.0;
    // scene.fogEnd = 400.0;
    // scene.fogColor = new BABYLON.Color3(0.3, 0.9, 0.85);
    BABYLON.SceneLoader.ImportMesh("", "../assets/", "ghostparent.babylon", scene, function (newMeshes, particleSystems, skeletons) {
      for (var i = 0; i < newMeshes.length; i++) {
        var ghosty = newMeshes[i];
        this.ghost = newMeshes[0];
        var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
        light0.parent = ghosty;
        if (ghosty.name === 'Plane') {
          ghosty.position.y = 10;
          ghosty.position.x = -200;
          ghosty.position.z = -10;
          ghosty.scaling.x = 10;
          ghosty.scaling.y = 5;
          ghosty.scaling.z = 10;

          hl.addMesh(ghosty, BABYLON.Color3.Green());
          var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

          //Texture of each particle
          particleSystem.particleTexture = new BABYLON.Texture("../assets/flare.png", scene);

          // Where the particles come from
          particleSystem.emitter = ghosty; // the starting object, the emitter

          // Colors of all particles
          particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
          particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
          particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

          // Size of each particle (random between...
          particleSystem.minSize = 0.1;
          particleSystem.maxSize = 0.5;

          // Life time of each particle (random between...
          particleSystem.minLifeTime = 0.3;
          particleSystem.maxLifeTime = 1.5;

          // Emission rate
          particleSystem.emitRate = 300;

          // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
          particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

          // Set the gravity of all particles
          particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

          // Direction of each particle after it has been emitted
          particleSystem.direction1 = new BABYLON.Vector3(-7, -8, 3);
          particleSystem.direction2 = new BABYLON.Vector3(7, -8, -3);

          // Angular speed, in radians
          particleSystem.minAngularSpeed = 0;
          particleSystem.maxAngularSpeed = Math.PI;

          // Speed
          particleSystem.minEmitPower = 1;
          particleSystem.maxEmitPower = 3;
          particleSystem.updateSpeed = 0.005;

          // Start the particle system
          particleSystem.start();

          ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
          ghosty.material.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0.8);
        } else if (ghosty.name === 'Sphere' || ghosty.name === 'Sphere.001') {
          ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
          ghosty.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
          ghosty.material.specularColor = new BABYLON.Color3(1, 1, 1);
          ghosty.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        } else if (ghosty.name === 'Sphere.002' || ghosty.name === 'Sphere.003') {
          ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
          ghosty.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
          ghosty.material.specularColor = new BABYLON.Color3(1, 1, 1);
          ghosty.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        }

      }
    }.bind(obj));
    wall = BABYLON.Mesh.CreateBox("plane", 2, scene);
    wall.scaling.x = 12.5;
    wall.scaling.y = 100;
    wall.scaling.z = 12.5;
    wall.material = new BABYLON.StandardMaterial("texture1", scene);
    wall.material.emissiveTexture = new BABYLON.Texture('../assets/tron1.jpg', scene);
    pellet = BABYLON.Mesh.CreateSphere("sphere", 20.0, 4.0, scene);
    pellet.material = new BABYLON.StandardMaterial("wow", scene);
    //pellet.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    pellet.material.emissiveColor = new BABYLON.Color3.Yellow();

    var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,1000,0), scene);
    mm.setTarget(new BABYLON.Vector3(0.1,0.1,0.1));
    mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    mm.orthoLeft = -canvas.size/2;
    mm.orthoRight = canvas.size/2;
    mm.orthoTop =  canvas.size/2;
    mm.orthoBottom = -canvas.size/2;
    mm.rotation.y = 0;//Camera Toggle
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
        var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
        light0.diffuse = new BABYLON.Color3(1, 0, 0);
        light0.specular = new BABYLON.Color3(1, 1, 1);
        light0.parent = camera;
        var plane = BABYLON.Mesh.CreateBox("plane", 2, scene);
        plane.scaling.z = 200;
        plane.scaling.y = 1000;
        plane.scaling.x = .2;
        plane.material = new BABYLON.StandardMaterial("texture1", scene);
        plane.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
        plane.material.alpha = 0.2;
        createWallBody(plane.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane.scaling.x, plane.scaling.y, plane.scaling.z), 0);
        var walls = [];
        mazemaker(that.maze, wall, pellet, hl, 0);
        var plane2 = plane.createInstance("i" + 201);
        plane2.scaling.z = 200;
        plane2.scaling.y = 1000;
        plane2.scaling.x = .2;
        plane2.position.x = 400;
        createWallBody(plane2.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane2.scaling.x, plane2.scaling.y, plane2.scaling.z), 0);
        var plane3 = plane.createInstance("i" + 302);
        plane3.scaling.z = 200;
        plane3.scaling.y = 1000;
        plane3.scaling.x = .2;
        plane3.rotation.y = Math.PI/2;
        plane3.position.x = 200;
        plane3.position.z = 200;
        createWallBody(plane3.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane3.scaling.x, plane3.scaling.y, plane3.scaling.z), 2);
        var plane4 = plane.createInstance("i" + 403);
        plane4.scaling.z = 200;
        plane4.scaling.y = 1000;
        plane4.scaling.x = 0.2;
        plane4.rotation.y = Math.PI/2;
        plane4.position.x = 200;
        plane4.position.z = -200;
        createWallBody(plane4.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane4.scaling.x, plane4.scaling.y, plane4.scaling.z), 2);
        wall.isVisible = false;
        wall.position.x = 5000;
        wall.position.y = 5000;
        wall.position.z = 5000;
        pellet.isVisible = false;
        pellet.position.x = 5200;
        pellet.position.y = 5200;
        pellet.position.z = 5200;
        // var plane6 = plane.createInstance("i" + 605);
        // plane6.scaling.z = 200;
        // plane6.scaling.y = 100;
        // plane6.scaling.x = .2;
        // plane6.position.y = 1000;
        // createWallBody(plane6.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane6.scaling.x, plane6.scaling.y, plane6.scaling.z), 0);
        // var plane7 = plane.createInstance("i" + 788);
        // plane7.scaling.z = 200;
        // plane7.scaling.y = 100;
        // plane7.scaling.x = .2;
        // plane7.position.y = 1000;
        // plane7.position.x = -400;
        // createWallBody(plane7.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane7.scaling.x, plane7.scaling.y, plane7.scaling.z), 0);
        // var plane8 = plane.createInstance("i" + 878);
        // plane8.scaling.z = 400;
        // plane8.scaling.y = 200;
        // plane8.scaling.x = .2;
        // plane8.position.y = 1000;
        // plane8.rotation.y = Math.PI/2;
        // plane8.position.x = -200;
        // plane8.position.z = 200;
        // createWallBody(plane8.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane8.scaling.x, plane8.scaling.y, plane8.scaling.z), 2);
        // var plane9 = plane.createInstance("i" + 906);
        // plane9.scaling.z = 400;
        // plane9.scaling.y = 200;
        // plane9.scaling.x = 0.2;
        // plane9.position.y = 1000;
        // plane9.rotation.y = Math.PI/2;
        // plane9.position.x = -200;
        // plane9.position.z = -200;
        // createWallBody(plane9.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane9.scaling.x, plane9.scaling.y, plane9.scaling.z), 2);

        // var hl = new BABYLON.HighlightLayer("hl1", scene);
        // hl.addMesh(pellet, BABYLON.Color3.Yellow());
        ball.position.y = 5;
        ball.position.z = posz;
        ball.position.x = posx;
        var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, scene);
        ground.material = new BABYLON.StandardMaterial("texture1", scene);
        ground.material.emissiveTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
        ground.material.emissiveTexture.uScale = 100.0;
        ground.material.emissiveTexture.vScale = 100.0;
        // var ground2 = BABYLON.Mesh.CreateGround("ground2", 1000, 1000, 2, scene);
        // ground2.position.y = 200;
        // ground.rotation.y = Math.PI;
        // ground2.material = new BABYLON.StandardMaterial("texture1", scene);
        // ground2.material.emissiveColor = new BABYLON.Color3.Blue();
        var ground2 = BABYLON.Mesh.CreateBox("ground2", 1, scene);
        ground2.scaling.z = 1500;
        ground2.scaling.y = 1500;
        ground2.scaling.x = 10;
        ground2.material = new BABYLON.StandardMaterial("texture1", scene);
        ground2.material.emissiveColor = new BABYLON.Color3.Blue();
        ground2.position.y = 1000;
        ground2.rotation.z = -Math.PI/2;
        var groundShape = new CANNON.Box(new CANNON.Vec3(ground2.scaling.x, ground2.scaling.y, ground2.scaling.z));
        var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
        groundBody.position.y = 1000;
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),-Math.PI/2);
        world.add(groundBody);
        //groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        // ground2.material.emissiveTexture.uScale = 100.0;
        // ground2.material.emissiveTexture.vScale = 100.0;
        // ground.material.diffuseTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
        // ground.material.diffuseTexture.uScale = 100.0;
        // ground.material.diffuseTexture.vScale = 100.0;

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
    world.add(sphereBody);
    var ghostShape = new CANNON.Sphere(10); // Step 1
    ghostBody = new CANNON.Body({mass: 5, shape: ghostShape}); // Step 2
    ghostBody.position.set(13,5,187);
    ghostBody.rotation = new CANNON.Vec3();
    ghostBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
   //  ghostBody.addEventListener('collide', function(e){Camera Toggle
   //   ghostxvelocity = Math.floor(Math.random() * 100) - 50;
   //   ghostzvelocity = Math.floor(Math.random() * 100) - 50;
   //   if(obj.ghost !== undefined) {
   //     obj.ghost.rotate(BABYLON.Axis.Y, 1.0, BABYLON.Space.WORLD);
   //   }
   // });
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
    } else if(flag === 3) {
      boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
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

  var player2 = BABYLON.Mesh.CreateSphere('player2', 16, 4, scene);
  player2.material = new BABYLON.StandardMaterial("player2material", scene);
  player2.material.emissiveColor = new BABYLON.Color3(1, 0, 0);

  var otherPlayerSpotlight = new BABYLON.SpotLight("otherPlayerSpotlight",  new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
  otherPlayerSpotlight.diffuse = new BABYLON.Color3(1, 0, 0);
  otherPlayerSpotlight.parent = player2;

  // var assignGameRoom = function() {
  //   var room = null;
  //   $.ajax({
  //     type: 'GET',
  //     url: '/assignGameRoomCustom',
  //     async: false, //necessary
  //     success: function(number) {
  //       room = 'room' + number;
  //       console.log('successfully joined room:', room);
  //       window.room = room;
  //     },
  //     error: function() {
  //       console.log('Erorr joining game room');
  //     }
  //   });
  //   return room;
  // };


  // socket.emit('join', assignGameRoom());
  // this.socketJoinRoom(room);
  this.socketReceiveOtherPlayerData(player2);
  // socket.on('otherPlayerCoords', function(data) {
  //   var decodeBuffer = new ArrayBuffer(data.length);
  //   var decodeView   = new Uint8Array( decodeBuffer );
  //   for (var i = 0; i < data.length; i++) {
  //     decodeView[i] = data.charCodeAt( i );
  //   }
  //   var decodedState = new Float64Array(decodeBuffer);
  //   player2.position = {x: decodedState[0], y: decodedState[1], z: decodedState[2]};
  //   player2.rotation = {x: decodedState[3], y: decodedState[4], z: decodedState[5]};
  // });

  // socket.on('otherPlayerPelletCollision', function(pelletId) {
  //   console.log('other player collision pellet id:', pelletMeshes[pelletId]);
  //   pelletMeshes[pelletId].dispose();
  //   pelletRemover = pelletId;
  // })
    // });
    engine.runRenderLoop(function () {
      BABYLON.SceneOptimizer.OptimizeAsync(scene);
      // console.log(engine.fps);
      socket.on('error', console.error.bind(console));
      // socket.on('otherPlayerCoords', function(data) {
      //   console.log(data);
      // })
    // socket.on('blah', function(data) {
    //   console.log('blahdata:', data);
    // })
      this.socketSendCoords(camera);
    // var myCoords = new Float64Array([myCamPosition.x, myCamPosition.y, myCamPosition.z, myCamRotation.x, myCamRotation.y, myCamRotation.z]);
    // var ucharView  = new Uint8Array(myCoords.buffer);
    // var slimData = String.fromCharCode.apply(
    //   String, [].slice.call( ucharView, 0 )
    // );
    // socket.emit('coordinates', slimData);
    if(pelletRemover !== 0) {
      world.remove(pellets[pelletRemover]);
      pelletRemover = 0;
    }
    scene.render();
    world.step(1.0/60.0);
    if(gravityFlag !== 1) {
      if (cameraFlag && camera.rotationQuaternion !==undefined) {
        if (cam1 !== parseFloat(Math.cos(camera.rotationQuaternion.y)) || cam2 !== parseFloat(Math.sin(camera.rotationQuaternion.y))) {
          cam1 = parseFloat(Math.cos(camera.rotationQuaternion.toEulerAngles().y));
          cam2 = parseFloat(Math.sin(camera.rotationQuaternion.toEulerAngles().y));
          sphereBody.velocity.z = cam1* 20;
          sphereBody.velocity.x = cam2* 20;
        }
      } else {
        cam1 = parseFloat(Math.cos(camera.rotation.y));
        cam2 = parseFloat(Math.sin(camera.rotation.y));
        sphereBody.velocity.z = cam1* 50;
        sphereBody.velocity.x = cam2* 50;
      }
    }

    ball.position.x = sphereBody.position.x;
    ball.position.y = sphereBody.position.y;
    ball.position.z = sphereBody.position.z;
    if(upsidedown === 1) {
      camera.position.x = sphereBody.position.x + .4;
      camera.position.y = sphereBody.position.y - 3;
      camera.position.z = sphereBody.position.z;
    } else {
      camera.position.x = sphereBody.position.x + .4;
      camera.position.y = sphereBody.position.y + 5;
      camera.position.z = sphereBody.position.z;
    }
    if(Math.abs(Math.floor((camera.position.x) / 25)) !== currPacmanj || Math.abs(Math.floor((camera.position.z - 175) / 25) !== currPacmani)) {
      that.maze[currPacmani][currPacmanj] = 0;
      currPacmanj = Math.abs(Math.floor((camera.position.x) / 25));
      currPacmani = Math.abs(Math.floor((camera.position.z - 175) / 25));
      that.maze[currPacmani][currPacmanj] = 3;
      if(currPacmani === 0 && currPacmanj === 0) {
          // ghostBody.velocity.z = 0;
          // ghostBody.velocity.x = 0;
          ghostBody.velocity.y = 20;
          // sphereBody.velocity.x = 0;
          // sphereBody.velocity.z = 0;
          //obj.ghost.rotation.x = Math.PI;
          sphereBody.velocity.y = 20;
          world.gravity.set(0, 40, 0);
          gravityFlag = 1;
          upsidedown = 1;
        }
      }
      if (obj.ghost !== undefined) {
        if (upsidedown == 1) {
          obj.ghost.position.x = ghostBody.position.x;
          obj.ghost.position.y = ghostBody.position.y - 10;
          obj.ghost.position.z = ghostBody.position.z;
        } else {
          obj.ghost.position.x = ghostBody.position.x;
          obj.ghost.position.y = ghostBody.position.y + 10;
          obj.ghost.position.z = ghostBody.position.z;
        }
        if(gravityFlag !== 1) {
          if(ghostdirections[0] === 'E') {
            ghostBody.velocity.z = 0;
            ghostBody.velocity.x = 30;
          }
          if(ghostdirections[0] === 'W') {
            ghostBody.velocity.z = 0;
            ghostBody.velocity.x = -30;
          }
          if(ghostdirections[0] === 'S') {
            ghostBody.velocity.z = -30;
            ghostBody.velocity.x = 0;
          }
          if(ghostdirections[0] === 'N') {
            ghostBody.velocity.z = 30;
            ghostBody.velocity.x = 0;
          }
        } else if(gravityFlag === 1 && sphereBody.position.y > 980) {
          gravityFlag = 0;
          //camera.rotation.y = Math.PI;
        }
        //ghostBody.angularVelocity = new CANNON.Vec3(Math.PI,Math.PI,Math.PI);
      }
    }.bind(this));
window.engine = engine;
window.addEventListener("resize", function () {
  engine.resize();
});
}

  // socketAssignGameRoom() {
  //   var room = null;
  //   $.ajax({
  //     type: 'GET',
  //     url: '/assignGameRoomCustom',
  //     async: false, //necessary
  //     success: function(number) {
  //       room = 'room' + number;
  //       console.log('successfully joined room:', room);
  //       window.room = room;
  //     },
  //     error: function() {
  //       console.log('Erorr joining game room');
  //     }
  //   });
  //   return room;
  // }

  // socketJoinRoom() {
  //   socket.emit('join', this.socketAssignGameRoom());
  // }

  socketSendCoords(camera) {
    var myCamPosition = camera.position, myCamRotation = camera.rotation;
    var myCoords = new Float64Array([myCamPosition.x, myCamPosition.y, myCamPosition.z, myCamRotation.x, myCamRotation.y, myCamRotation.z]);
    var ucharView  = new Uint8Array(myCoords.buffer);
    var slimData = String.fromCharCode.apply(
      String, [].slice.call( ucharView, 0 )
    );
    socket.emit('coordinates', slimData);
  }

  socketReceiveOtherPlayerData(player2) {
    socket.on('otherPlayerCoords', function(data) {
      var decodeBuffer = new ArrayBuffer(data.length);
      var decodeView   = new Uint8Array( decodeBuffer );
      for (var i = 0; i < data.length; i++) {
        decodeView[i] = data.charCodeAt( i );
      }
      var decodedState = new Float64Array(decodeBuffer);
      // console.log(decodedState);
      player2.position = {x: decodedState[0], y: decodedState[1], z: decodedState[2]};
      player2.rotation = {x: decodedState[3], y: decodedState[4], z: decodedState[5]};
    });

    socket.on('otherPlayerPelletCollision', function(pelletId) {
      // console.log('other player collision pellet id:', pelletMeshes[pelletId]);
      pelletMeshes[pelletId].dispose();
      pelletRemover = pelletId;
    })
  }

  socketLeaveRoom() {
    socket.emit('leave', window.room);
    $.ajax({
      type: 'POST',
      url: 'leaveGameRoomCustom',
      data: {room: room, username: localStorage.getitem('username')},
      success: function() {
        // console.log('left room');
        window.room = null;
      },
      error: function() {
        console.log('error leaving room');
      }
    })

  }

  routerWillLeave() {
    engine.stopRenderLoop();

    // leave socket room
    socket.emit('leave', window.room);
    $.ajax({
      type: 'POST',
      url: 'leaveGameRoomCustom',
      data: {room: room, username: localStorage.getItem('username')},
      success: function() {
        // console.log('left room');
        window.room = null;
      },
      error: function() {
        console.log('error leaving room');
      }
    })

    // reset unload
    window.myEvent = null;
    window.chkevent = null;

    // continue
    return true;
  }


  render() {
    return (<div className="container">
            <div className="camera-toggle">Camera Toggle</div>
            <canvas id="renderCanvas"></canvas>
            </div>);
  }
}



// handles leaving room for window unload event
window.myEvent = window.attachEvent || window.addEventListener;
window.chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable

myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
  if (window.room) {
    socket.emit('leave', window.room);
    $.ajax({
      type: 'POST',
      url: 'leaveGameRoomCustom',
      data: {room: window.room},
      success: function() {
        // console.log('left room');
        window.room = null;
      },
      error: function() {
        console.log('error leaving room');
      }
    })
  }
});