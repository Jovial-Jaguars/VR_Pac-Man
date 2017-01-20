import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';

export default class Unranked extends React.Component {
  constructor(props){
    super(props);
    console.log('lol');
    console.log(localStorage.maze);
    var maze = [];
    for(var i = 0; i  < browserHistory.maze.length; i++) {
      maze[i] = [];
      for(var j = 0; j < browserHistory.maze[i].length; j++) {
        maze[i].push(browserHistory.maze[i][j]);
      }
    }
    this.maze = maze;
    console.log(maze);
  }

  componentDidMount() {
    var pacmanIntro = new Audio('../assets/pacman_beginning.wav');
    pacmanIntro.loop = false;
    pacmanIntro.play();
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
    var ghostx;
    var ghostz;
    var gravityPositivej;
    var gravityPositivei;
    var gravityNegativej;
    var gravityNegativei;
    var ghostdirections = [];
    var velocity;
    var gravityFlag = 0;
    var upsidedown = 0;
    var hl;
    var gameOverCanvas
    var gameOverFlag = 0;
    var currPacmani, currPacmanj;
    for (var i = 0; i < that.maze.length; i++) {
      for (var j = 0; j < that.maze[i].length; j++) {
        if (that.maze[i][j] === 3) {
          currPacmani = i;
          currPacmanj = j;
          posx = (j * 25) + 13;
          posz = 187 - (i * 25);
        } else if (that.maze[i][j] === 4) {
          ghostx = (j * 25) + 13;
          ghostz = 187 - (i * 25);
        } else if (that.maze[i][j] === 5) {
          gravityPositivej = j;
          gravityPositivei = i;
        } else if (that.maze[i][j] === 6) {
          gravityNegativej = j;
          gravityNegativei = i;
        }
      }
    }

    // Load the BABYLON 3D engine

    this.engine = new BABYLON.Engine(canvas, true,{ stencil: true });
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
            q.enQueue([[Successors[suc][0][0], Successors[suc][0][1]], curr[1] + Successors[suc][1]]);
            if (arr[Successors[suc][0][0]][Successors[suc][0][1]] !== 3) {
              recur[calc] = Successors[suc];
            }
          }
        }
        curr = q.deQueue();
      }
      return curr[1];
    }
    //console.log(path([0,0], that.maze));
    if(ghostx !== undefined) {
      setInterval(function() {
      var curr = path([Math.abs(Math.floor((ghostBody.position.z - 175) / 25)),Math.abs(Math.floor((ghostBody.position.x) / 25))], that.maze);
      if(typeof curr === 'string') {
        ghostdirections = curr.split('');
      }
    }, 500);
    }
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
      //cam.checkCollisions = scene.activeCameras[0].checkCollisions;
      //cam.applyGravity = scene.activeCameras[0].applyGravity;

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
    var scene = new BABYLON.Scene(that.engine);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    var hl = new BABYLON.HighlightLayer("hl1", scene);
    //VRDeviceOrientationFreeCamera
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.inputs.addGamepad();
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    ball = BABYLON.Mesh.CreateSphere("sphere", 1.0, 1.0, scene);
    ball.material = new BABYLON.StandardMaterial("wow", scene);
    ball.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    ball.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    scene.activeCameras.push(camera);
    // var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    // var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/sky35/citysky', scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // skybox.infiniteDistance = true;
    // skybox.renderingGroupId = 0;
    console.log(ghostx);
    if(ghostx !== undefined) {
      BABYLON.SceneLoader.ImportMesh("", "../assets/", "ghostparent.babylon", scene, function (newMeshes, particleSystems, skeletons) {
        for (var i = 0; i < newMeshes.length; i++) {
          var ghosty = newMeshes[i];
          //this.ghost = newMeshes[0];
          // var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.7, 3, scene);
          // light0.parent = ghosty;
          if (ghosty.name === 'Plane') {
            ghosty.position.y = 10;
            ghosty.position.x = -200;
            ghosty.position.z = -10;
            ghosty.scaling.x = 10;
            ghosty.scaling.y = 5;
            ghosty.scaling.z = 10;
            hl.addMesh(ghosty, BABYLON.Color3.Green());
            ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
            ghosty.material.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0.8);
            this.ghost = ghosty;
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
    }
    wall = BABYLON.Mesh.CreateBox("plane", 1.8, scene);
    wall.scaling.x = 25 / 1.8;
    wall.scaling.y = 200 / 1.8;
    wall.scaling.z = 25 / 1.8;
    wall.material = new BABYLON.StandardMaterial("texture1", scene);
    wall.material.emissiveTexture = new BABYLON.Texture('../assets/tron1.jpg', scene);
    pellet = BABYLON.Mesh.CreateSphere("sphere", 16.0, 4.0, scene);
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
        if (gravityPositivei !== undefined) {
          mazemaker(that.maze, wall, pellet, hl, 1);
        }
        wall.position.x = -200
        wall.isVisible = false;
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
        ball.position.y = 5;
        ball.position.z = posz;
        ball.position.x = posx; 
        var ground = BABYLON.Mesh.CreateGround("ground1", 900, 900, 2, scene);
        ground.material = new BABYLON.StandardMaterial("texture1", scene);
        ground.material.emissiveTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
        ground.material.emissiveTexture.uScale = 100.0;
        ground.material.emissiveTexture.vScale = 100.0;
        pelletSound = new BABYLON.Sound("pellet", "../assets/pellet.wav", scene);
        canvas2 = create(scene, score);
        if (ghostx !== undefined) {
          var ground2 = ground.createInstance("hk2000");
          ground2.scaling.z = 900;
          ground2.scaling.y = 1500;
          ground2.scaling.x = 10;
          ground2.position.y = 1000;
          ground2.rotation.z = -Math.PI;
          var groundShape = new CANNON.Box(new CANNON.Vec3(ground2.scaling.x, ground2.scaling.y, ground2.scaling.z));
          var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
          groundBody.position.y = 1000;
          groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),-Math.PI/2); 
          world.add(groundBody);
        }
        // var getOptions = function() {
        //   var result = new BABYLON.SceneOptimizerOptions(60, 2000);
        //   var priority = 0;
        //   result.optimizations.push(new BABYLON.ShadowsOptimization(priority));
        //   result.optimizations.push(new BABYLON.LensFlaresOptimization(priority));
        //   priority++;
        //   result.optimizations.push(new BABYLON.PostProcessesOptimization(priority));
        //   result.optimizations.push(new BABYLON.ParticlesOptimization(priority));
        //   // Next priority
        //   priority++;
        //   result.optimizations.push(new BABYLON.TextureOptimization(priority, 1024));
        //   priority++;

        //   return result;
        // }
        // BABYLON.SceneOptimizer.OptimizeAsync(scene, getOptions(),
        // function() {
        //    // On success
        // }, function() {
        //    // FPS target not reached
        // })
        
        return scene;
  };  // End of createScene function
  var createWorld = function(){
    var world = new CANNON.World();
    world.gravity.set(0,-40,0);
    var mass = 5, radius = 1.25;
    var sphereShape = new CANNON.Sphere(radius); // Step 1
    sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
    sphereBody.position.set(posx,5,posz);
    sphereBody.rotation = new CANNON.Vec3();
    sphereBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    sphereBody.isPlayer = true;
    sphereBody.addEventListener('collide', function(e){
     if(e.body.isPellet){
       for (var p in pellets){
         if (pellets[p] === pellets[e.body.pelletId]){
           pelletMeshes[p].dispose();
             pelletRemover = p;
             pelletSound.play();
             score++;
             canvas2.children[0].text = score.toString();
           }
         }
       }
     });
    world.add(sphereBody);
    if(ghostx !== undefined) {
      var ghostShape = new CANNON.Sphere(2); // Step 1
    ghostBody = new CANNON.Body({mass: 1, shape: ghostShape}); // Step 2
    ghostBody.position.set(ghostx,1,ghostz);
    ghostBody.rotation = new CANNON.Vec3();
    ghostBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);  
    ghostBody.addEventListener('collide', function(e){
      console.log('collide');
      if (e.body.isPlayer) {
        console.log('lol');
        ghostBody.velocity.x = 0;
        ghostBody.velocity.z = 0;
        sphereBody.velocity.x = 0;
        sphereBody.velocity.z = 0;
        if(gameOverCanvas === undefined) {
          var data = scores;
          var scores = [];
          scores.push(new BABYLON.Text2D('Game Over', {
              id: "text5",
              y: 10,
              x: 325,
              marginAlignment: "h: left, v:center",
              fontName: "20pt Arial",
          }));
          scores.push(new BABYLON.Text2D('Your Score:', {
              id: "text3",
              y: -30,
              x: 325,
              marginAlignment: "h: left, v:center",
              fontName: "20pt Arial",
          }));
          scores.push(new BABYLON.Text2D(score.toString(), {
              id: "text4",
              y: -60,
              marginAlignment: "h: center, v:center",
              fontName: "20pt Arial",
          }));
          gameOverCanvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
                      id: "gameover2",
                      x: 400,
                      y: 0,
                      size: new BABYLON.Size(800, 1300),
                      backgroundFill: "#C0C0C040",
                      backgroundRoundRadius: 50,
                      children: scores
            });
        }
            $(".none").toggleClass("none");
            $(".play-again").click(function() {
              console.log('hello')
              that.setState({
                maze: [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                      [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                      [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                      [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                      [1, 1, 1, 1, 2, 1, 0, 1, 0, 4, 0, 1, 0, 1, 2, 1],
                      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]]
              });
            });
            gameOverFlag = 1;
      }
    });
    world.add(ghostBody);
    }

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

  that.engine.runRenderLoop(function () {
    scene.render();
    world.step(1.0/60.0);
      if(pelletRemover !== 0) {
        world.remove(pellets[pelletRemover]);
        pelletRemover = 0;
      }
      if (cameraFlag && camera.rotationQuaternion !==undefined) {
        cam1 = parseFloat(Math.cos(camera.rotationQuaternion.toEulerAngles().y));
        cam2 = parseFloat(Math.sin(camera.rotationQuaternion.toEulerAngles().y));   
        sphereBody.velocity.z = cam1* 20;
        sphereBody.velocity.x = cam2* 20;
      } else {
        cam1 = parseFloat(Math.cos(camera.rotation.y));
        cam2 = parseFloat(Math.sin(camera.rotation.y));   
        sphereBody.velocity.z = cam1* 50;
        sphereBody.velocity.x = cam2* 50;
      }
      
      ball.position.x = sphereBody.position.x; 
      ball.position.y = sphereBody.position.y; 
      ball.position.z = sphereBody.position.z; 
      camera.position.x = sphereBody.position.x + .4;
      camera.position.y = sphereBody.position.y + 5;
      camera.position.z = sphereBody.position.z;
      if(Math.abs(Math.floor((camera.position.x) / 25)) !== currPacmanj || Math.abs(Math.floor((camera.position.z - 175) / 25) !== currPacmani)) {
        that.maze[currPacmani][currPacmanj] = 0;
        currPacmanj = Math.abs(Math.floor((camera.position.x) / 25));
        currPacmani = Math.abs(Math.floor((camera.position.z - 175) / 25));
        that.maze[currPacmani][currPacmanj] = 3;
        if(currPacmani === gravityPositivei && currPacmanj === gravityPositivej && upsidedown === 0) {
          world.gravity.set(0, 40, 0);
          upsidedown = 1;
        } else if (currPacmani === gravityNegativei && currPacmanj === gravityNegativej && upsidedown === 1) {
          world.gravity.set(0, -40, 0);
          upsidedown = 0;
        }
      }
      if (obj.ghost !== undefined && gameOverFlag === 0) {
        if (upsidedown == 1) {
          obj.ghost.position.x = ghostBody.position.x;
          obj.ghost.position.y = ghostBody.position.y - 10;
          obj.ghost.position.z = ghostBody.position.z;
        } else {
          obj.ghost.position.x = ghostBody.position.x;
          obj.ghost.position.y = ghostBody.position.y + 10;
          obj.ghost.position.z = ghostBody.position.z;
        }
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
      } 
      canvas2.children[0].text = Math.round(that.engine.fps).toString();
      
  });
  var resize = function(){
    that.engine.resize();
  }
  window.addEventListener("resize", resize);
  $(".back-to-menu").click(function() {
    $(".play-again").addClass("none");
    $(".back-to-menu").addClass("none");
    that.engine.stopRenderLoop();
    that.engine.clear(BABYLON.Color3.Black(),false,false);
    window.removeEventListener('resize', resize);
     that.props.router.push({pathname: '/'});
  });
}
componentDidUpdate() {
    $(".play-again").addClass("none");
    $(".back-to-menu").addClass("none");
    this.engine.stopRenderLoop();
    this.engine.clear(BABYLON.Color3.Black(),false,false);
    var pacmanIntro = new Audio('../assets/pacman_beginning.wav');
    pacmanIntro.loop = false;
    pacmanIntro.play();
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
    var ghostx;
    var ghostz;
    var gravityPositivej;
    var gravityPositivei;
    var gravityNegativej;
    var gravityNegativei;
    var ghostdirections = [];
    var velocity;
    var gravityFlag = 0;
    var upsidedown = 0;
    var hl;
    var gameOverCanvas
    var gameOverFlag = 0;
    var currPacmani, currPacmanj;
    for (var i = 0; i < that.maze.length; i++) {
      for (var j = 0; j < that.maze[i].length; j++) {
        if (that.maze[i][j] === 3) {
          currPacmani = i;
          currPacmanj = j;
          posx = (j * 25) + 13;
          posz = 187 - (i * 25);
        } else if (that.maze[i][j] === 4) {
          ghostx = (j * 25) + 13;
          ghostz = 187 - (i * 25);
        } else if (that.maze[i][j] === 5) {
          gravityPositivej = j;
          gravityPositivei = i;
        } else if (that.maze[i][j] === 6) {
          gravityNegativej = j;
          gravityNegativei = i;
        }
      }
    }

    // Load the BABYLON 3D engine

    this.engine = new BABYLON.Engine(canvas, true,{ stencil: true });
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
            q.enQueue([[Successors[suc][0][0], Successors[suc][0][1]], curr[1] + Successors[suc][1]]);
            if (arr[Successors[suc][0][0]][Successors[suc][0][1]] !== 3) {
              recur[calc] = Successors[suc];
            }
          }
        }
        curr = q.deQueue();
      }
      return curr[1];
    }
    //console.log(path([0,0], that.maze));
    if(ghostx !== undefined) {
      setInterval(function() {
      var curr = path([Math.abs(Math.floor((ghostBody.position.z - 175) / 25)),Math.abs(Math.floor((ghostBody.position.x) / 25))], that.maze);
      if(typeof curr === 'string') {
        ghostdirections = curr.split('');
      }
    }, 500);
    }
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
      //cam.checkCollisions = scene.activeCameras[0].checkCollisions;
      //cam.applyGravity = scene.activeCameras[0].applyGravity;

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
    var scene = new BABYLON.Scene(that.engine);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    var hl = new BABYLON.HighlightLayer("hl1", scene);
    //VRDeviceOrientationFreeCamera
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.inputs.addGamepad();
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    ball = BABYLON.Mesh.CreateSphere("sphere", 1.0, 1.0, scene);
    ball.material = new BABYLON.StandardMaterial("wow", scene);
    ball.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    ball.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    scene.activeCameras.push(camera);
    // var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    // var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/sky35/citysky', scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // skybox.infiniteDistance = true;
    // skybox.renderingGroupId = 0;
    console.log(ghostx);
    if(ghostx !== undefined) {
      BABYLON.SceneLoader.ImportMesh("", "../assets/", "ghostparent.babylon", scene, function (newMeshes, particleSystems, skeletons) {
        for (var i = 0; i < newMeshes.length; i++) {
          var ghosty = newMeshes[i];
          //this.ghost = newMeshes[0];
          // var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.7, 3, scene);
          // light0.parent = ghosty;
          if (ghosty.name === 'Plane') {
            ghosty.position.y = 10;
            ghosty.position.x = -200;
            ghosty.position.z = -10;
            ghosty.scaling.x = 10;
            ghosty.scaling.y = 5;
            ghosty.scaling.z = 10;
            hl.addMesh(ghosty, BABYLON.Color3.Green());
            ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
            ghosty.material.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0.8);
            this.ghost = ghosty;
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
    }
    wall = BABYLON.Mesh.CreateBox("plane", 1.8, scene);
    wall.scaling.x = 25 / 1.8;
    wall.scaling.y = 200 / 1.8;
    wall.scaling.z = 25 / 1.8;
    wall.material = new BABYLON.StandardMaterial("texture1", scene);
    wall.material.emissiveTexture = new BABYLON.Texture('../assets/tron1.jpg', scene);
    pellet = BABYLON.Mesh.CreateSphere("sphere", 16.0, 4.0, scene);
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
        if (gravityPositivei !== undefined) {
          mazemaker(that.maze, wall, pellet, hl, 1);
        }
        wall.position.x = -200
        wall.isVisible = false;
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
        ball.position.y = 5;
        ball.position.z = posz;
        ball.position.x = posx; 
        var ground = BABYLON.Mesh.CreateGround("ground1", 900, 900, 2, scene);
        ground.material = new BABYLON.StandardMaterial("texture1", scene);
        ground.material.emissiveTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
        ground.material.emissiveTexture.uScale = 100.0;
        ground.material.emissiveTexture.vScale = 100.0;
        pelletSound = new BABYLON.Sound("pellet", "../assets/pellet.wav", scene);
        canvas2 = create(scene, score);
        if (ghostx !== undefined) {
          var ground2 = ground.createInstance("hk2000");
          ground2.scaling.z = 900;
          ground2.scaling.y = 1500;
          ground2.scaling.x = 10;
          ground2.position.y = 1000;
          ground2.rotation.z = -Math.PI;
          var groundShape = new CANNON.Box(new CANNON.Vec3(ground2.scaling.x, ground2.scaling.y, ground2.scaling.z));
          var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
          groundBody.position.y = 1000;
          groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),-Math.PI/2); 
          world.add(groundBody);
        }
        // var getOptions = function() {
        //   var result = new BABYLON.SceneOptimizerOptions(60, 2000);
        //   var priority = 0;
        //   result.optimizations.push(new BABYLON.ShadowsOptimization(priority));
        //   result.optimizations.push(new BABYLON.LensFlaresOptimization(priority));
        //   priority++;
        //   result.optimizations.push(new BABYLON.PostProcessesOptimization(priority));
        //   result.optimizations.push(new BABYLON.ParticlesOptimization(priority));
        //   // Next priority
        //   priority++;
        //   result.optimizations.push(new BABYLON.TextureOptimization(priority, 1024));
        //   priority++;

        //   return result;
        // }
        // BABYLON.SceneOptimizer.OptimizeAsync(scene, getOptions(),
        // function() {
        //    // On success
        // }, function() {
        //    // FPS target not reached
        // })
        
        return scene;
  };  // End of createScene function
  var createWorld = function(){
    var world = new CANNON.World();
    world.gravity.set(0,-40,0);
    var mass = 5, radius = 1.25;
    var sphereShape = new CANNON.Sphere(radius); // Step 1
    sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
    sphereBody.position.set(posx,5,posz);
    sphereBody.rotation = new CANNON.Vec3();
    sphereBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    sphereBody.isPlayer = true;
    sphereBody.addEventListener('collide', function(e){
     if(e.body.isPellet){
       for (var p in pellets){
         if (pellets[p] === pellets[e.body.pelletId]){
           pelletMeshes[p].dispose();
             pelletRemover = p;
             pelletSound.play();
             score++;
             canvas2.children[0].text = score.toString();
           }
         }
       }
     });
    world.add(sphereBody);
    if(ghostx !== undefined) {
      var ghostShape = new CANNON.Sphere(2); // Step 1
    ghostBody = new CANNON.Body({mass: 1, shape: ghostShape}); // Step 2
    ghostBody.position.set(ghostx,1,ghostz);
    ghostBody.rotation = new CANNON.Vec3();
    ghostBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);  
    ghostBody.addEventListener('collide', function(e){
      console.log('collide');
      if (e.body.isPlayer) {
        console.log('lol');
        ghostBody.velocity.x = 0;
        ghostBody.velocity.z = 0;
        sphereBody.velocity.x = 0;
        sphereBody.velocity.z = 0;
        if(gameOverCanvas === undefined) {
          var data = scores;
          var scores = [];
          scores.push(new BABYLON.Text2D('Game Over', {
              id: "text5",
              y: 10,
              x: 325,
              marginAlignment: "h: left, v:center",
              fontName: "20pt Arial",
          }));
          scores.push(new BABYLON.Text2D('Your Score:', {
              id: "text3",
              y: -30,
              x: 325,
              marginAlignment: "h: left, v:center",
              fontName: "20pt Arial",
          }));
          scores.push(new BABYLON.Text2D(score.toString(), {
              id: "text4",
              y: -60,
              marginAlignment: "h: center, v:center",
              fontName: "20pt Arial",
          }));
          gameOverCanvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
                      id: "gameover2",
                      x: 400,
                      y: 0,
                      size: new BABYLON.Size(800, 1300),
                      backgroundFill: "#C0C0C040",
                      backgroundRoundRadius: 50,
                      children: scores
            });
        }
            $(".none").toggleClass("none");
            $(".play-again").click(function() {
              console.log('hello')
              that.setState({
                maze: [[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
                      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
                      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                      [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1],
                      [1, 1, 1, 1, 2, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 1],
                      [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 2, 1],
                      [1, 1, 1, 1, 2, 1, 0, 1, 0, 4, 0, 1, 0, 1, 2, 1],
                      [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1],
                      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                      [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                      [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
                      [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
                      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]]
              });
            });
            gameOverFlag = 1;
      }
    });
    world.add(ghostBody);
    }

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

  that.engine.runRenderLoop(function () {
    scene.render();
    world.step(1.0/60.0);
      if(pelletRemover !== 0) {
        world.remove(pellets[pelletRemover]);
        pelletRemover = 0;
      }
      if (cameraFlag && camera.rotationQuaternion !==undefined) {
        cam1 = parseFloat(Math.cos(camera.rotationQuaternion.toEulerAngles().y));
        cam2 = parseFloat(Math.sin(camera.rotationQuaternion.toEulerAngles().y));   
        sphereBody.velocity.z = cam1* 20;
        sphereBody.velocity.x = cam2* 20;
      } else {
        cam1 = parseFloat(Math.cos(camera.rotation.y));
        cam2 = parseFloat(Math.sin(camera.rotation.y));   
        sphereBody.velocity.z = cam1* 50;
        sphereBody.velocity.x = cam2* 50;
      }
      
      ball.position.x = sphereBody.position.x; 
      ball.position.y = sphereBody.position.y; 
      ball.position.z = sphereBody.position.z; 
      camera.position.x = sphereBody.position.x + .4;
      camera.position.y = sphereBody.position.y + 5;
      camera.position.z = sphereBody.position.z;
      if(Math.abs(Math.floor((camera.position.x) / 25)) !== currPacmanj || Math.abs(Math.floor((camera.position.z - 175) / 25) !== currPacmani)) {
        that.maze[currPacmani][currPacmanj] = 0;
        currPacmanj = Math.abs(Math.floor((camera.position.x) / 25));
        currPacmani = Math.abs(Math.floor((camera.position.z - 175) / 25));
        that.maze[currPacmani][currPacmanj] = 3;
        if(currPacmani === gravityPositivei && currPacmanj === gravityPositivej && upsidedown === 0) {
          world.gravity.set(0, 40, 0);
          upsidedown = 1;
        } else if (currPacmani === gravityNegativei && currPacmanj === gravityNegativej && upsidedown === 1) {
          world.gravity.set(0, -40, 0);
          upsidedown = 0;
        }
      }
      if (obj.ghost !== undefined && gameOverFlag === 0) {
        if (upsidedown == 1) {
          obj.ghost.position.x = ghostBody.position.x;
          obj.ghost.position.y = ghostBody.position.y - 10;
          obj.ghost.position.z = ghostBody.position.z;
        } else {
          obj.ghost.position.x = ghostBody.position.x;
          obj.ghost.position.y = ghostBody.position.y + 10;
          obj.ghost.position.z = ghostBody.position.z;
        }
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
      } 
      canvas2.children[0].text = Math.round(that.engine.fps).toString();
      
  });
  var resize = function(){
    that.engine.resize();
  }
  window.addEventListener("resize", resize);
  $(".back-to-menu").click(function() {
    $(".play-again").addClass("none");
    $(".back-to-menu").addClass("none");
    that.engine.stopRenderLoop();
    that.engine.clear(BABYLON.Color3.Black(),false,false);
    window.removeEventListener('resize', resize);
     that.props.router.push({pathname: '/'});
  });
}



render() {
  return (
          <div className="container">
          <div className="camera-toggle">Camera Toggle</div>
          <div className="play-again none">Play Again</div>
          <div className="back-to-menu none">Back to menu</div>
          <canvas id="renderCanvas"></canvas>
          </div>);
}
}
