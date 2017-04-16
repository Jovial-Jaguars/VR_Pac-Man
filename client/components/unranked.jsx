import React from 'react';

export default class Unranked extends React.Component {
  constructor(props){
    super(props);
    var maze = [];
    for(var i = 0; i  < window.selectedMaze.length; i++) {
      maze[i] = [];
      for(var j = 0; j < window.selectedMaze[i].length; j++) {
        maze[i].push(window.selectedMaze[i][j]);
      }
    }
    this.maze = maze;
    this.path = this.path.bind(this);
    this.mazemaker = this.mazemaker.bind(this);
    this.createWallBody = this.createWallBody.bind(this);
    this.createSphereBody = this.createSphereBody.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.createScene = this.createScene.bind(this);
    this.create = this.create.bind(this);
    this.createWorld = this.createWorld.bind(this);
    this.runLoop = this.runLoop.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
    this.createGhostBody = this.createGhostBody.bind(this); 
    this.pacmanIntro = new Audio('../assets/pacman_beginning.wav');
    this.pacmanIntro.loop = false;
    this.pacmanIntro.volume = 0.01;
    // add pellet sound to the scene
    this.pelletSound;
    this.score = 0;
    this.scoreboard;
    this.pacmanMesh;
    this.pacmanBody;
    this.camera;
    this.pellets = [];
    this.pelletMeshes = [];
    this.cameraFlag = false;
    this.pelletRemover = 0;
    this.pacmanPosition = {'x': 6.5,'y': 5,'z': 93.5};
    this.isGhostOne = false;
    this.isGhostTwo = false;
    this.isGhostThree = false;
    this.ghostCount = 0;
    this.ghosts = [];
    this.blockMesh;
    this.pelletMesh;
    this.ghostOneDirections = [];
    this.isUpsideDown = false;
    this.isGameOver = false;
    this.currPacVec = {'i': 0, 'j': 0};
    this.assetsManager;
    this.pacVelocity = 30;
    this.isGrav = false;
    this.isGhostPellet = false;
    this.ghostRemover = 0;
  }


  routerWillLeave() {
    this.engine.stopRenderLoop();
    this.engine.clear(BABYLON.Color3.Black(),false,false);
  }

  componentWillMount() {
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    )
  }

  getSuccessors(coordz, coordx, arr) {
    var suc = [];
    if(arr[coordz + 1] !== undefined) {
      if (arr[coordz + 1][coordx] !== 1 && arr[coordz + 1][coordx] !== 4 && arr[coordz + 1][coordx] !== undefined) {
        suc.push([[coordz + 1,coordx], 'S']);
      }  
    }
    if (arr[coordz][coordx - 1] !== 1 && arr[coordz][coordx - 1] !== 4 && arr[coordz][coordx - 1] !== undefined) {
      suc.push([[coordz,coordx - 1], 'W']);
    }
    if(arr[coordz - 1] !== undefined) {
      if (arr[coordz - 1][coordx] !== 1 && arr[coordz - 1][coordx] !== 4 && arr[coordz - 1][coordx] !== undefined) {
        suc.push([[coordz - 1,coordx], 'N']);
      }
    }
    if (arr[coordz][coordx + 1] !== 1 && arr[coordz][coordx + 1] !== 4 && arr[coordz][coordx + 1] !== undefined) {
      suc.push([[coordz, coordx + 1], 'E']);
    }
    return suc;
  }
  path(start, arr) {
    var q = [];
    var recur = {};
    var suc = [];
    var Successors;
    var curr = [start, []];
    do {
      if(!((curr[0][0] * 16) + curr[0][1] in recur)) {
        recur[(curr[0][0] * 16) + curr[0][1]] = curr[0];
      } 
      Successors = this.getSuccessors(curr[0][0], curr[0][1], arr);
      for(var suc in Successors) {
        var calc = (Successors[suc][0][0] * 16) + Successors[suc][0][1]
        if (!(calc in recur)) {
          q.unshift([[Successors[suc][0][0], Successors[suc][0][1]], curr[1] + Successors[suc][1]]);
          if (arr[Successors[suc][0][0]][Successors[suc][0][1]] !== 3) {
            recur[calc] = Successors[suc];
          }
        }
      }
      if(q.length === 0 && Successors.length === 0 ) {
        return 'NESW';
      }
      curr = q.pop();
    } while(arr[curr[0][0]][curr[0][1]] !== 3 && q.length !== 0);
    return curr[1];
  }

  createWallBody(position, size, flag){  
    var boxShape = new CANNON.Box(size);
    var boxBody = new CANNON.Body({shape: boxShape, position: new CANNON.Vec3(position.x, position.y, position.z), mass:0});
    if(flag === 1) {
      boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),-Math.PI/2);  
    } else if(flag === 2) {
      boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),Math.PI/2); 
    } else if(flag === 3) {
      boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2); 
    }
    this.world.add(boxBody); 
  };

  createSphereBody(position, radius, id, type){  
    var pelletShape = new CANNON.Sphere(radius);
    var pelletBody = new CANNON.Body({mass: 0, position: new CANNON.Vec3(position.x, position.y, position.z), shape: pelletShape});
    pelletBody.isPellet = true;
    pelletBody.collisionResponse = 0;
    pelletBody.pelletId = id;
    pelletBody.type = type;
    this.pellets[id] = pelletBody;
    this.world.add(pelletBody); 
  }
  createGhostBody(ghostPosition, id) {
    var ghostShape = new CANNON.Sphere(3); // Step 1
    var ghostBody = new CANNON.Body({mass: 1, position: new CANNON.Vec3(ghostPosition.x, ghostPosition.y, ghostPosition.z),  shape: ghostShape}); // Step 2
    ghostBody.rotation = new CANNON.Vec3();
    ghostBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    ghostBody.id = id;
    ghostBody.addEventListener('collide', function(ghostBody, e){
      if (e.body.isPlayer && !this.isGameOver) {
        if(this.isGhostPellet && this.ghostRemover === 0){  
          this.score += 250;
          this.scoreboard.children[0].text = 'Score: ' + this.score.toString();
          this.ghosts[ghostBody.id].mesh.dispose();
          // this.world.remove(this.ghosts[ghostBody.id].body); 
          this.ghostRemover = ghostBody.id;
          clearInterval(this.ghosts[ghostBody.id].interval)
        } else {
          for(var i = 0; i < this.ghostCount; i++) {
            this.ghosts[i].body.velocity.x = 0;
            this.ghosts[i].body.velocity.z = 0;
            this.ghosts[i].body.removeEventListener('collide');
          }
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
          scores.push(new BABYLON.Text2D(this.score.toString(), {
              id: "text4",
              y: -60,
              marginAlignment: "h: center, v:center",
              fontName: "20pt Arial",
          }));

          scores.push(new BABYLON.Rectangle2D({
          id: "gg", width: 200, height: 100, y: 150, x:175,
          fill: "#404080FF", border: "#A040A0D0, #FFFFFFFF", borderThickness: 10, 
          roundRadius: 10, 
          children: 
            [
              new BABYLON.Text2D('Play Again', {
                id: "ploy",
                marginAlignment: "h: center, v:center",
                fontName: "20pt Arial",
              })
            ]
          }));
          scores.push(new BABYLON.Rectangle2D({
          id: "back", width: 200, height: 100, y: 150, x:450,
          fill: "#404080FF", border: "#A040A0D0, #FFFFFFFF", borderThickness: 10, 
          roundRadius: 10, 
          children: 
            [
              new BABYLON.Text2D('Main Menu', {
                id: "menu",
                marginAlignment: "h: center, v:center",
                fontName: "20pt Arial",
              })
            ]
          }));
          var gameOver = new BABYLON.ScreenSpaceCanvas2D(this.scene, {
                      id: "gameover2",
                      x: 400,
                      y: 0,
                      size: new BABYLON.Size(800, 1300),
                      backgroundFill: "#C0C0C040",
                      backgroundRoundRadius: 50,
                      children: scores
            });
          gameOver.children[3].pointerEventObservable.add(function () {
            this.score = 0;
            this.engine.stopRenderLoop();
            this.engine.clear(BABYLON.Color3.Black(),false,false);
            this.maze = [];
            for(var i = 0; i < window.selectedMaze.length; i++) {
              this.maze[i] = [];
              for(var j = 0; j < window.selectedMaze[i].length; j++) {
                this.maze[i].push(window.selectedMaze[i][j]);
              }
            }
            this.setState({});
          }.bind(this), BABYLON.PrimitivePointerInfo.PointerUp);
          gameOver.children[4].pointerEventObservable.add(function () {
            this.engine.stopRenderLoop();
            this.engine.clear(BABYLON.Color3.Black(),false,false);
            window.removeEventListener('resize', this.resize);
            this.props.router.push({pathname: '/'});
          }.bind(this), BABYLON.PrimitivePointerInfo.PointerUp);
          for(var i = 0; i < this.ghostCount; i++) {
            clearInterval(this.ghosts[i].interval);
          }
          this.isGameOver = true;
        }
      }
    }.bind(this, ghostBody));
    this.ghosts[id].body = ghostBody;
    this.world.add(ghostBody);
  }

  mazemaker(arr, wall, pellet, flipMaze, scene) {
      var x = 6.5;                                                                     //starting x position
      var z = 93.9;                                                                    //starting z position
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {                                                         
          if (arr[i][j] === 1) {  ///if theres a wall
            if(flipMaze) {  //if theres an upside down maze, gravity switch
              var newInstanceWall = wall.createInstance(flipMaze + "block j" + (i *16) + j);  //creates instance/copy  of a single block as many times needed
              newInstanceWall.position.z = z; 
              newInstanceWall.position.x = x; 
              newInstanceWall.position.y = 900; // set positions relative to array
              this.createWallBody({x: newInstanceWall.position.x, y: newInstanceWall.position.y, z: newInstanceWall.position.z}, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0); /// create cannon physics version of block with the same size
            } else { 
              var newInstanceWall = wall.createInstance("block i" + (i *16) + j); //creates instance/copy  of a single block as many times needed
              newInstanceWall.position.z = z; 
              newInstanceWall.position.x = x;
              this.createWallBody({x: newInstanceWall.position.x, y: newInstanceWall.position.y, z: newInstanceWall.position.z}, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0); //t gives block physics in cannon world
            }
          } else if (arr[i][j] === 2 || arr[i][j] === 5  || arr[i][j] === 6 || arr[i][j] === 7) { // same thing but for pellets
            if(flipMaze) {
              if(arr[i][j] === 2) {
                var newInstanceSphere = pellet.createInstance(flipMaze + "pellet i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 995;
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'normal');
              } else if(arr[i][j] === 5){
                var newInstanceSphere = pellet.clone(flipMaze + "gravity i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 995;
                newInstanceSphere.material = new BABYLON.StandardMaterial("gravity1", scene);
                newInstanceSphere.material.emissiveColor = new BABYLON.Color3.White();
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'gravity');
              } else if(arr[i][j] === 6){
                var newInstanceSphere = pellet.clone(flipMaze + "ghost i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 995;
                newInstanceSphere.material = new BABYLON.StandardMaterial("ghostPellet1", scene);
                newInstanceSphere.material.emissiveColor = new BABYLON.Color3.Purple();
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'ghost');
              } else if(arr[i][j] === 7){
                var newInstanceSphere = pellet.clone(flipMaze + "orange i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 995;
                newInstanceSphere.material = new BABYLON.StandardMaterial("orange1", scene);
                newInstanceSphere.material.emissiveColor = new BABYLON.Color3.Red();
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'orange');
              }
              this.pelletMeshes[flipMaze + '' + (i *16) + j] = newInstanceSphere;

            } else {
              if(arr[i][j] === 2) {
                var newInstanceSphere = pellet.createInstance("pellet i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 5;
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'normal');
              } else if(arr[i][j] === 5){
                var newInstanceSphere = pellet.clone("gravity i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 5;
                newInstanceSphere.material = new BABYLON.StandardMaterial("gravity2", scene);
                newInstanceSphere.material.emissiveColor = new BABYLON.Color3.White();
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'gravity');
              } else if(arr[i][j] === 6){
                var newInstanceSphere = pellet.clone("ghost i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 5;
                newInstanceSphere.material = new BABYLON.StandardMaterial("ghostPellet2", scene);
                newInstanceSphere.material.emissiveColor = new BABYLON.Color3.Purple();
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'ghost');
              } else if(arr[i][j] === 7){
                var newInstanceSphere = pellet.clone("orange i" + (i *16) + j);
                newInstanceSphere.position.z = z; 
                newInstanceSphere.position.x = x; 
                newInstanceSphere.position.y = 5;
                newInstanceSphere.material = new BABYLON.StandardMaterial("orange2", scene);
                newInstanceSphere.material.emissiveColor =new BABYLON.Color3.Red();
                this.createSphereBody({x: newInstanceSphere.position.x, y: newInstanceSphere.position.y, z: newInstanceSphere.position.z}, 6, flipMaze + '' + (i *16) + j, 'orange');
              }
              this.pelletMeshes[flipMaze + '' + (i *16) + j] = newInstanceSphere;
            }
        }
        x += 12.5;
      }
      x = 6.5;
      z -= 12.5;
    }
  }

  switchCamera(scene, cam, canvas) { //copy ove all of current camera parameters to new camera either vr or 3d view
      if (scene.activeCameras[0].rotation) {
        cam.rotation = scene.activeCameras[0].rotation.clone();
      }
      cam.fov = scene.activeCameras[0].fov;
      cam.minZ = scene.activeCameras[0].minZ;
      cam.maxZ = scene.activeCameras[0].maxZ;

      if (scene.activeCameras[0].ellipsoid) {
        cam.ellipsoid = scene.activeCameras[0].ellipsoid.clone();
      }
      cam.speed = scene.activeCameras[0].speed;

      cam.postProcesses = scene.activeCameras[0].postProcesses;
      scene.activeCameras[0].postProcesses = [];
      scene.activeCameras[0].detachControl(canvas);
      if (scene.activeCameras[0].dispose) {
        scene.activeCameras[0].dispose();
      }
      var cool = scene.activeCameras.pop();// remove and replace currently active camera
      scene.activeCameras.pop();
      scene.activeCameras.push(cam);
      scene.activeCameras.push(cool);


      scene.activeCameras[0].attachControl(canvas);
      this.cameraFlag = !this.cameraFlag;

  }
  create(scene, score) {
    var controls = new BABYLON.ScreenSpaceCanvas2D(scene, {
      id: "Controls",
      size: new BABYLON.Size(400, 500),
      backgroundFill: "#4040408F",
      backgroundRoundRadius: 50,
      children: [
        new BABYLON.Text2D('Score: ' + score.toString(), {
          id: "text",
          parent: controls, 
          marginAlignment: "h: center, v:center",
          fontName: "20pt Arial",
        }),
        new BABYLON.Rectangle2D({
          id: "mainRect", width: 400, height: 100, 
          fill: "#404080FF", border: "#A040A0D0, #FFFFFFFF", borderThickness: 10, 
          roundRadius: 10, 
          children: 
            [
              new BABYLON.Text2D('camera toggle', {
                id: "text",
                marginAlignment: "h: center, v:center",
                fontName: "20pt Arial",
              })
            ]
        })
      ]
    });
    return controls;
  };




  // This is the main babylon function to create the entire scene
  createScene(canvas) {

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(this.engine);
    this.assetsManager = new BABYLON.AssetsManager(scene);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    var hl = new BABYLON.HighlightLayer("hl1", scene);
    //VRDeviceOrientationFreeCamera
    this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    this.camera.inputs.addGamepad();
    this.camera.setTarget(BABYLON.Vector3.Zero());
    this.camera.attachControl(canvas, true);
    scene.activeCameras.push(this.camera);
    scene.cameraToUseForPointers = this.camera;
    // This the minimap
    var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,400,0), scene);
    mm.setTarget(new BABYLON.Vector3(0.1,0.1,0.1));
    mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    mm.orthoLeft = -50;
    mm.orthoRight = 300;
    mm.orthoTop =  100;
    mm.orthoBottom = -100;
    mm.rotation.y = 0;//Camera Toggle
    var xstart = 0.8; // 80% from the left
    var ystart = 0.75; // 75% from the bottom
    var width = 0.99-xstart // Almost until the right edge of the screen
    var height = 1-ystart;  // Until the top edge of the screen
    mm.viewport = new BABYLON.Viewport(xstart, ystart, width, height); 
    // add the minimap to the list of active cameras
    scene.activeCameras.push(mm);
    mm.layerMask = 2;
    this.camera.layerMask = 1;


    this.scoreboard = this.create(scene, this.score);
    this.scoreboard.children[1].pointerEventObservable.add(function (scene, canvas) {
      window.scrollTo(0,1);
      if (scene.activeCameras[0] instanceof BABYLON.FreeCamera && !(scene.activeCameras[0] instanceof BABYLON.VRDeviceOrientationFreeCamera)) { //if 3d camera
        this.camera = new BABYLON.VRDeviceOrientationFreeCamera("deviceOrientationCamera", scene.activeCameras[0].position, scene);
        this.switchCamera(scene, this.camera, canvas);
        this.engine.switchFullscreen(false);
      } else {
        this.camera = new BABYLON.FreeCamera("freeeCamera", scene.activeCameras[0].position, scene);
        this.switchCamera(scene, this.camera, canvas);
      }
    }.bind(this, scene, canvas), BABYLON.PrimitivePointerInfo.PointerUp);


    var hl = new BABYLON.HighlightLayer("hl1", scene);
    var pacTask = this.assetsManager.addMeshTask("pacman task", "", "../assets/", "pac.babylon");
    pacTask.onSuccess = function (task) {
      this.pacmanMesh = task.loadedMeshes[0]
      this.pacmanMesh.material = new BABYLON.StandardMaterial("wow", scene);
      this.pacmanMesh.material.emissiveColor = new BABYLON.Color3.Yellow();
      // position the initial pacman to the specified starting position
      this.pacmanMesh.position.x = this.pacmanPosition.x; 
      this.pacmanMesh.position.y = this.pacmanPosition.y;
      this.pacmanMesh.position.z = this.pacmanPosition.z;
      this.pacmanMesh.scaling.x = 4;
      this.pacmanMesh.scaling.z = 4;
    }.bind(this)
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //if there's a ghost that needs to be added
    // the mesh gets imported from the .babylon file
    if(this.isGhostOne) {
      this.createGhostBody(this.ghosts[0].position, 0);
      if(this.isGhostTwo) {
         this.createGhostBody(this.ghosts[1].position, 1);
      }
      if(this.isGhostThree) {
         this.createGhostBody(this.ghosts[2].position, 2);
      }
      var meshTask = this.assetsManager.addMeshTask("ghost task", "", "../assets/", "ghostparent.babylon");
      meshTask.onSuccess = function (task) {
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        for (var i = 0; i < task.loadedMeshes.length; i++) {
          var ghosty = task.loadedMeshes[i];
          //this.ghost = newMeshes[0];
          // var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.7, 3, scene);
          // light0.parent = ghosty;
          if (ghosty.name === 'Plane') {
            ghosty.position.y = this.ghosts[0].position.y;
            ghosty.position.x = this.ghosts[0].position.x;
            ghosty.position.z = this.ghosts[0].position.z;
            ghosty.scaling.x = 4;
            ghosty.scaling.y = 2;
            ghosty.scaling.z = 4;
            hl.addMesh(ghosty, BABYLON.Color3.Green());
            ghosty.material = new BABYLON.StandardMaterial('ghosty', scene);
            ghosty.material.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0.8);
            this.ghosts[0].mesh = ghosty;
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
        if(this.isGhostTwo) {
          this.ghosts[1].mesh = this.ghosts[0].mesh.clone('ghost2');
          this.ghosts[1].mesh.material = new BABYLON.StandardMaterial("ghostPellet2", scene);
          this.ghosts[1].mesh.material.emissiveColor = new BABYLON.Color3.Black();
          this.ghosts[1].mesh.position.x = this.ghosts[1].position.x;
          this.ghosts[1].mesh.position.y = this.ghosts[1].position.y;
          this.ghosts[1].mesh.position.z = this.ghosts[1].position.z;
        }
        if(this.isGhostThree) {
          this.ghosts[2].mesh = this.ghosts[0].mesh.clone('ghost3');
          this.ghosts[2].mesh.material = new BABYLON.StandardMaterial("ghostPellet3", scene);
          this.ghosts[2].mesh.material.emissiveColor = new BABYLON.Color3.Red();
          this.ghosts[2].mesh.position.x = this.ghosts[1].position.x;
          this.ghosts[2].mesh.position.y = this.ghosts[1].position.y;
          this.ghosts[2].mesh.position.z = this.ghosts[1].position.z;
        }
      }.bind(this);
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    // Thus is the main block
    // The rest of the blocks are copies of this one
    this.blockMesh = BABYLON.Mesh.CreateBox("plane", 1.8, scene);
    this.blockMesh.scaling.x = 12.5 / 1.8;
    this.blockMesh.scaling.y = 200 / 1.8;
    this.blockMesh.scaling.z = 12.5 / 1.8;
    this.blockMesh.material = new BABYLON.StandardMaterial("texture1", scene);
    this.blockMesh.material.emissiveTexture = new BABYLON.Texture('../assets/tron1.jpg', scene);
    // This is the main pellet 
    // The rest are copies
    this.pelletMesh = BABYLON.Mesh.CreateSphere("sphere", 16.0, 4.0, scene);
    this.pelletMesh.material = new BABYLON.StandardMaterial("wow", scene);
    // this.pelletMesh.material.emissiveColor = new BABYLON.Color3.Yellow();
    this.pelletMesh.material.emissiveColor = new BABYLON.Color3.Yellow();
    // this.pelletMesh.visibility = 0.4;
    

    // add a spot light that follows the camera
    // var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
    // light0.diffuse = new BABYLON.Color3(1, 0, 0);
    // light0.specular = new BABYLON.Color3(1, 1, 1);
    // light0.parent = camera;

    // there will be 4 walls that enclose the maze
    // they will be copies/instances of this wall for optimization
    var plane = BABYLON.Mesh.CreateBox("plane", 2, scene);
    plane.scaling.z = 100;
    plane.scaling.y = 1000;
    plane.scaling.x = .2;
    plane.material = new BABYLON.StandardMaterial("texture1", scene);
    plane.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane.material.alpha = 0.2;
    //create the same wall in cannon 
    this.createWallBody({x: 0, y: 0, z: 0}, new CANNON.Vec3(plane.scaling.x, plane.scaling.y, plane.scaling.z), 0);
    this.mazemaker(this.maze, this.blockMesh, this.pelletMesh, false, scene);
    //if theres a gravity switch then 
    //we have to recreate the level upside down
    if (this.isGrav) {
      this.mazemaker(this.maze, this.blockMesh, this.pelletMesh, true, scene);
    }
    // the other 3 walls
    var plane2 = plane.createInstance("i" + 201);
    plane2.scaling.z = 100;
    plane2.scaling.y = 1000;
    plane2.scaling.x = .2;
    plane2.position.x = 200;
    this.createWallBody({x: plane2.position.x, y: 0, z: 0}, new CANNON.Vec3(plane2.scaling.x, plane2.scaling.y, plane2.scaling.z), 0);
    var plane3 = plane.createInstance("i" + 302);
    plane3.scaling.z = 100;
    plane3.scaling.y = 1000;
    plane3.scaling.x = .2;
    plane3.rotation.y = Math.PI/2;
    plane3.position.x = 100;
    plane3.position.z = 100;
    this.createWallBody({x: plane3.position.x, y: 0, z: plane3.position.z}, new CANNON.Vec3(plane3.scaling.x, plane3.scaling.y, plane3.scaling.z), 2);
    var plane4 = plane.createInstance("i" + 403);
    plane4.scaling.z = 100;
    plane4.scaling.y = 1000;
    plane4.scaling.x = 0.2;
    plane4.rotation.y = Math.PI/2;
    plane4.position.x = 100;
    plane4.position.z = -100;
    this.createWallBody({x: plane4.position.x, y: 0, z: plane4.position.z}, new CANNON.Vec3(plane4.scaling.x, plane4.scaling.y, plane4.scaling.z), 2);
    // create the ground
    var ground = BABYLON.Mesh.CreateGround("ground1", 450, 450, 2, scene);
    ground.material = new BABYLON.StandardMaterial("texture1", scene);
    ground.material.emissiveTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
    ground.material.emissiveTexture.uScale = 100.0;
    ground.material.emissiveTexture.vScale = 100.0;
    this.pelletSound = new BABYLON.Sound("pellet", "../assets/pellet.wav", scene, null, {volume: 0.006});
    // if there's a gravity switch
    if (this.isGrav) {
      // create a second ground
      var ground2 = ground.createInstance("hk2000");
      ground2.position.y = 1000; // but place it way high in the sky
      ground2.rotation.z = -Math.PI;
      //add the cannon physics to it
      var groundShape = new CANNON.Box(new CANNON.Vec3(2, 450, 450));
      var groundBody = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 1000, 0), shape: groundShape });
      groundBody.position.y = 1000;
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),-Math.PI/2); 
      this.world.add(groundBody);
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
    // BABYLON.SceneOptimizer.OptimizeAsync(scene);
    window.addEventListener('keyup', function(e) {
      if(e.keyCode === 37) {//left
        this.camera.rotation.y -= Math.PI/2;
        this.pacmanMesh.rotation.y -= Math.PI/2;
      }else if (e.keyCode === 39) { //right
        this.camera.rotation.y += Math.PI/2;
        this.pacmanMesh.rotation.y += Math.PI/2;
      } else if (e.keyCode === 40) { //down
        this.camera.rotation.y +=  Math.PI;
        this.pacmanMesh.rotation.y += Math.PI;
      }
    }.bind(this));
    this.blockMesh.position.x = -200
    this.blockMesh.isVisible = false;
    this.pelletMesh.isVisible = false;
    return scene;
  } // End of createScene function
  /////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////////////////
  createWorld(){
    var world = new CANNON.World();
    world.gravity.set(0,-40,0);
    var mass = 5, radius = 2;
    var sphereShape = new CANNON.Sphere(radius); // Step 1
    this.pacmanBody = new CANNON.Body({mass: mass, position: new CANNON.Vec3(this.pacmanPosition.x, this.pacmanPosition.y, this.pacmanPosition.z), shape: sphereShape}); // Step 2
    this.pacmanBody.rotation = new CANNON.Vec3();
    this.pacmanBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    this.pacmanBody.isPlayer = true;
    this.pacmanBody.addEventListener('collide', function(e){
      if(e.body.isPellet){
        for (var p in this.pellets){
          if (this.pellets[p] === this.pellets[e.body.pelletId]){
            this.pelletMeshes[p].dispose();
            this.pelletRemover = p;
            this.pelletSound.play();
            this.score += 10;
            if(this.pellets[p].type === 'orange') {
              this.score += 10;
              this.pacVelocity += 60;
              setTimeout(function(){
                this.pacVelocity = 30;
              }.bind(this), 5000);
            } else if(this.pellets[p].type === 'gravity') {
              if(this.isUpsideDown) {
                this.world.gravity.set(0, -40, 0);
                this.isUpsideDown = false;
              } else {
                this.world.gravity.set(0, 40, 0);
                this.isUpsideDown = true;
              }
            } else if(this.pellets[p].type === 'ghost') {
              this.isGhostPellet = true;
              setTimeout(function(){
                this.isGhostPellet = false;
              }.bind(this), 10000);
            }
            this.scoreboard.children[0].text = 'Score: ' + this.score.toString();
          }
        }
      }
    }.bind(this));
    world.add(this.pacmanBody);
    

    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 0 , 0), shape: groundShape });
    world.add(groundBody);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);

    return world;
  }

  runLoop() {
    this.scene.render();
    this.world.step(1.0/60.0);
    if(this.pelletRemover !== 0) {
      this.world.remove(this.pellets[this.pelletRemover]);
      this.pelletRemover = 0;
    }
    if(this.ghostRemover !== 0) {
      this.world.remove(this.ghosts[this.ghostRemover].body);
      this.ghostRemover = 0;
    }
    if (this.cameraFlag && this.camera.rotationQuaternion !== undefined) {
      this.pacmanBody.velocity.z = this.pacVelocity * parseFloat(Math.cos(this.camera.rotationQuaternion.toEulerAngles().y));
      this.pacmanBody.velocity.x = this.pacVelocity * parseFloat(Math.sin(this.camera.rotationQuaternion.toEulerAngles().y));
    } else {
      this.pacmanBody.velocity.z = this.pacVelocity * parseFloat(Math.cos(this.camera.rotation.y));
      this.pacmanBody.velocity.x = this.pacVelocity * parseFloat(Math.sin(this.camera.rotation.y));
    }  
      
    this.pacmanMesh.position.x = this.pacmanBody.position.x; 
    this.pacmanMesh.position.y = this.pacmanBody.position.y; 
    this.pacmanMesh.position.z = this.pacmanBody.position.z;
    this.pacmanMesh.rotation.y = this.camera.rotation.y - Math.PI/2; 
    if(this.camera.position.y > 950) {
      this.camera.position.x = this.pacmanBody.position.x + .4;
      this.camera.position.y = this.pacmanBody.position.y - 3;
      this.camera.position.z = this.pacmanBody.position.z;
    } else {
      this.camera.position.x = this.pacmanBody.position.x + .4;
      this.camera.position.y = this.pacmanBody.position.y + 5;
      this.camera.position.z = this.pacmanBody.position.z;
    }
    if(Math.abs(Math.floor((this.camera.position.x) / 12.5)) !== this.currPacVec.j || Math.abs(Math.floor((this.camera.position.z - 87.5) / 12.5) !== this.currPacVec.i)) {
      this.maze[this.currPacVec.i][this.currPacVec.j] = 0;
      this.currPacVec.j = Math.abs(Math.floor((this.camera.position.x) / 12.5));
      this.currPacVec.i = Math.abs(Math.floor((this.camera.position.z - 87.5) / 12.5));
      this.maze[this.currPacVec.i][this.currPacVec.j] = 3;
    }
    if (this.isGhostOne && !this.isGameOver) {
      if(Math.abs(Math.floor((this.ghosts[0].body.position.x) / 12.5)) !== this.ghosts[0].j || Math.abs(Math.floor((this.ghosts[0].body.position.z - 87.5) / 12.5) !== this.ghosts[0].i)) {
        this.maze[this.ghosts[0].i][this.ghosts[0].j] = 0;
        this.ghosts[0].j = Math.abs(Math.floor((this.ghosts[0].body.position.x) / 12.5));
        this.ghosts[0].i = Math.abs(Math.floor((this.ghosts[0].body.position.z - 87.5) / 12.5));
        this.maze[this.ghosts[0].i][this.ghosts[0].j] = 4;
      }
      if (this.isUpsideDown) {
        this.ghosts[0].mesh.position.x = this.ghosts[0].body.position.x;
        this.ghosts[0].mesh.position.y = this.ghosts[0].body.position.y - 2;
        this.ghosts[0].mesh.position.z = this.ghosts[0].body.position.z;
      } else {  
        this.ghosts[0].mesh.position.x = this.ghosts[0].body.position.x;
        this.ghosts[0].mesh.position.y = this.ghosts[0].body.position.y + 10;
        this.ghosts[0].mesh.position.z = this.ghosts[0].body.position.z;
      }
      if(this.ghosts[0].directions[0] === 'N') {
        this.ghosts[0].body.velocity.z = 30;
        this.ghosts[0].body.velocity.x = 0;
      } 
      if(this.ghosts[0].directions[0] === 'E') {
        this.ghosts[0].body.velocity.z = 0;
        this.ghosts[0].body.velocity.x = 30;
      } 
      if(this.ghosts[0].directions[0] === 'W') {
        this.ghosts[0].body.velocity.z = 0;
        this.ghosts[0].body.velocity.x = -30;
      } 
      if(this.ghosts[0].directions[0] === 'S') {
        this.ghosts[0].body.velocity.z = -30;
        this.ghosts[0].body.velocity.x = 0;
      } 
    }    
    if (this.isGhostTwo && !this.isGameOver) {
      if(Math.abs(Math.floor((this.ghosts[1].body.position.x) / 12.5)) !== this.ghosts[1].j || Math.abs(Math.floor((this.ghosts[1].body.position.z - 87.5) / 12.5) !== this.ghosts[1].i)) {
        this.maze[this.ghosts[1].i][this.ghosts[1].j] = 0;
        this.ghosts[1].j = Math.abs(Math.floor((this.ghosts[1].body.position.x) / 12.5));
        this.ghosts[1].i = Math.abs(Math.floor((this.ghosts[1].body.position.z - 87.5) / 12.5));
        this.maze[this.ghosts[1].i][this.ghosts[1].j] = 4;
      }
      if (this.isUpsideDown) {
        this.ghosts[1].mesh.position.x = this.ghosts[1].body.position.x;
        this.ghosts[1].mesh.position.y = this.ghosts[1].body.position.y - 2;
        this.ghosts[1].mesh.position.z = this.ghosts[1].body.position.z;
      } else {  
        this.ghosts[1].mesh.position.x = this.ghosts[1].body.position.x;
        this.ghosts[1].mesh.position.y = this.ghosts[1].body.position.y + 10;
        this.ghosts[1].mesh.position.z = this.ghosts[1].body.position.z;
      }
      if(this.ghosts[1].directions[0] === 'N') {
        this.ghosts[1].body.velocity.z = 30;
        this.ghosts[1].body.velocity.x = 0;
      } 
      if(this.ghosts[1].directions[0] === 'E') {
        this.ghosts[1].body.velocity.z = 0;
        this.ghosts[1].body.velocity.x = 30;
      } 
      if(this.ghosts[1].directions[0] === 'W') {
        this.ghosts[1].body.velocity.z = 0;
        this.ghosts[1].body.velocity.x = -30;
      } 
      if(this.ghosts[1].directions[0] === 'S') {
        this.ghosts[1].body.velocity.z = -30;
        this.ghosts[1].body.velocity.x = 0;
      } 
    }
    if (this.isGhostThree && !this.isGameOver) {
      if(Math.abs(Math.floor((this.ghosts[2].body.position.x) / 12.5)) !== this.ghosts[2].j || Math.abs(Math.floor((this.ghosts[2].body.position.z - 87.5) / 12.5) !== this.ghosts[2].i)) {
        this.maze[this.ghosts[2].i][this.ghosts[2].j] = 0;
        this.ghosts[2].j = Math.abs(Math.floor((this.ghosts[2].body.position.x) / 12.5));
        this.ghosts[2].i = Math.abs(Math.floor((this.ghosts[2].body.position.z - 87.5) / 12.5));
        this.maze[this.ghosts[2].i][this.ghosts[2].j] = 4;
      }
      if (this.isUpsideDown) {
        this.ghosts[2].mesh.position.x = this.ghosts[2].body.position.x;
        this.ghosts[2].mesh.position.y = this.ghosts[2].body.position.y - 2;
        this.ghosts[2].mesh.position.z = this.ghosts[2].body.position.z;
      } else {  
        this.ghosts[2].mesh.position.x = this.ghosts[2].body.position.x;
        this.ghosts[2].mesh.position.y = this.ghosts[2].body.position.y + 10;
        this.ghosts[2].mesh.position.z = this.ghosts[2].body.position.z;
      }
      if(this.ghosts[2].directions[0] === 'N') {
        this.ghosts[2].body.velocity.z = 30;
        this.ghosts[2].body.velocity.x = 0;
      } 
      if(this.ghosts[2].directions[0] === 'E') {
        this.ghosts[2].body.velocity.z = 0;
        this.ghosts[2].body.velocity.x = 30;
      } 
      if(this.ghosts[2].directions[0] === 'W') {
        this.ghosts[2].body.velocity.z = 0;
        this.ghosts[2].body.velocity.x = -30;
      } 
      if(this.ghosts[2].directions[0] === 'S') {
        this.ghosts[2].body.velocity.z = -30;
        this.ghosts[2].body.velocity.x = 0;
      } 
    }     
  }
  
  
  componentDidMount() {
    this.pacmanIntro.play();
    var canvas = document.getElementById("renderCanvas");
    var hl;
    for (var i = 0; i < this.maze.length; i++) {
      for (var j = 0; j < this.maze[i].length; j++) {
        if (this.maze[i][j] === 3) {
          this.currPacVec.i = i;
          this.currPacVec.j = j;
          this.pacmanPosition.x = (j * 12.5) + 6.5;
          this.pacmanPosition.y = 3;
          this.pacmanPosition.z = 93.5 - (i * 12.5);
        } else if (this.maze[i][j] === 4 && this.ghostCount === 0) {
          this.isGhostOne = true;
          this.ghosts[0] = {};
          this.ghosts[0].i = i;
          this.ghosts[0].j = j;
          this.ghosts[0].position = {};
          this.ghosts[0].position.x = (j * 12.5) + 6.5;
          this.ghosts[0].position.y = 3;
          this.ghosts[0].position.z = 93.5 - (i * 12.5);
          this.ghostCount++;
        } else if (this.maze[i][j] === 4 && this.ghostCount === 1) {
          this.isGhostTwo = true;
          this.ghosts[1] = {};
          this.ghosts[1].i = i;
          this.ghosts[1].j = j;
          this.ghosts[1].position = {};
          this.ghosts[1].position.x = (j * 12.5) + 6.5;
          this.ghosts[1].position.y = 3;
          this.ghosts[1].position.z = 93.5 - (i * 12.5);
          this.ghostCount++;
        } else if (this.maze[i][j] === 4 && this.ghostCount === 2) {
          this.isGhostThree = true;
          this.ghosts[2] = {};
          this.ghosts[2].i = i;
          this.ghosts[2].j = j;
          this.ghosts[2].position = {};
          this.ghosts[2].position.x = (j * 12.5) + 6.5;
          this.ghosts[2].position.y = 3;
          this.ghosts[2].position.z = 93.5 - (i * 12.5);
          this.ghostCount++;
        } else if (this.maze[i][j] === 5) {
          this.isGrav = true;
        }
      }
    }

    // Load the BABYLON 3D engine

    this.engine = new BABYLON.Engine(canvas, true,{ stencil: true });

    this.engine.loadingUIText = "Loading...";
    this.engine.loadingUIBackgroundColor = "blue";

    
  this.world = this.createWorld();
  this.createScene = this.createScene.bind(this, canvas);     
  this.scene = this.createScene();
  if(this.isGhostOne) {
    this.ghosts[0].interval = setInterval(function() {
      this.ghosts[0].directions = this.path([Math.abs(Math.floor((this.ghosts[0].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[0].body.position.x) / 12.5))], this.maze).split('');
    }.bind(this), 500);
    this.ghosts[0].directions = this.path([Math.abs(Math.floor((this.ghosts[0].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[0].body.position.x) / 12.5))], this.maze).split('');
  }
  if(this.isGhostTwo) {
    this.ghosts[1].interval = setInterval(function() {
      this.ghosts[1].directions = this.path([Math.abs(Math.floor((this.ghosts[1].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[1].body.position.x) / 12.5))], this.maze).split('');
    }.bind(this), 500);
    this.ghosts[1].directions = this.path([Math.abs(Math.floor((this.ghosts[1].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[1].body.position.x) / 12.5))], this.maze).split('');
  }
  if(this.isGhostThree) {
    this.ghosts[2].interval = setInterval(function() {
      this.ghosts[2].directions = this.path([Math.abs(Math.floor((this.ghosts[2].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[2].body.position.x) / 12.5))], this.maze).split('');
    }.bind(this), 500);
    this.ghosts[2].directions = this.path([Math.abs(Math.floor((this.ghosts[2].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[2].body.position.x) / 12.5))], this.maze).split('');
  }
  this.assetsManager.onFinish = function(tasks) {
    this.engine.runRenderLoop(this.runLoop);
  }.bind(this);

  this.assetsManager.load();
  this.resize = function(){
    this.engine.resize();
  }.bind(this);
  window.addEventListener("resize", this.resize);

/////////////////////////////////////////////////
////////////////////////////////////////////////////


}
componentDidUpdate() {
  this.score = 0;
  this.pellets = [];
  this.pelletMeshes = [];
  this.cameraFlag = false;
  this.pelletRemover = 0;
  this.pacmanPosition = {'x': 6.5,'y': 5,'z': 93.5};
  this.isGhostOne = false;
  this.isGhostTwo = false;
  this.isGhostThree = false;
  this.ghostCount = 0;
  this.ghosts = [];
  this.ghostOneDirections = [];
  this.isUpsideDown = false;
  this.isGameOver = false;
  this.currPacVec = {'i': 0, 'j': 0};
  this.pacVelocity = 30;
  this.isGrav = false;
  this.isGhostPellet = false;
  this.ghostRemover = 0;
  this.maze = [];
  for(var i = 0; i  < window.selectedMaze.length; i++) {
    this.maze[i] = [];
    for(var j = 0; j < window.selectedMaze[i].length; j++) {
      this.maze[i].push(window.selectedMaze[i][j]);
    }
  }
  this.pacmanIntro.play();
  var canvas = document.getElementById("renderCanvas");
  var hl;
  for (var i = 0; i < this.maze.length; i++) {
    for (var j = 0; j < this.maze[i].length; j++) {
      if (this.maze[i][j] === 3) {
        this.currPacVec.i = i;
        this.currPacVec.j = j;
        this.pacmanPosition.x = (j * 12.5) + 6.5;
        this.pacmanPosition.y = 3;
        this.pacmanPosition.z = 93.5 - (i * 12.5);
      } else if (this.maze[i][j] === 4 && this.ghostCount === 0) {
        this.isGhostOne = true;
        this.ghosts[0] = {};
        this.ghosts[0].i = i;
        this.ghosts[0].j = j;
        this.ghosts[0].position = {};
        this.ghosts[0].position.x = (j * 12.5) + 6.5;
        this.ghosts[0].position.y = 3;
        this.ghosts[0].position.z = 93.5 - (i * 12.5);
        this.ghostCount++;
      } else if (this.maze[i][j] === 4 && this.ghostCount === 1) {
        this.isGhostTwo = true;
        this.ghosts[1] = {};
        this.ghosts[1].i = i;
        this.ghosts[1].j = j;
        this.ghosts[1].position = {};
        this.ghosts[1].position.x = (j * 12.5) + 6.5;
        this.ghosts[1].position.y = 3;
        this.ghosts[1].position.z = 93.5 - (i * 12.5);
        this.ghostCount++;
      } else if (this.maze[i][j] === 4 && this.ghostCount === 2) {
        this.isGhostThree = true;
        this.ghosts[2] = {};
        this.ghosts[2].i = i;
        this.ghosts[2].j = j;
        this.ghosts[2].position = {};
        this.ghosts[2].position.x = (j * 12.5) + 6.5;
        this.ghosts[2].position.y = 3;
        this.ghosts[2].position.z = 93.5 - (i * 12.5);
        this.ghostCount++;
      } else if (this.maze[i][j] === 5) {
        this.isGrav = true;
      }
    }
  }

  // Load the BABYLON 3D engine

  this.engine = new BABYLON.Engine(canvas, true,{ stencil: true });

  this.engine.loadingUIText = "Loading...";
  this.engine.loadingUIBackgroundColor = "blue";

    
  this.world = this.createWorld();
  this.createScene = this.createScene.bind(this, canvas);     
  this.scene = this.createScene();
  if(this.isGhostOne) {
    this.ghosts[0].interval = setInterval(function() {
      this.ghosts[0].directions = this.path([Math.abs(Math.floor((this.ghosts[0].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[0].body.position.x) / 12.5))], this.maze).split('');
    }.bind(this), 500);
    this.ghosts[0].directions = this.path([Math.abs(Math.floor((this.ghosts[0].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[0].body.position.x) / 12.5))], this.maze).split('');
  }
  if(this.isGhostTwo) {
    this.ghosts[1].interval = setInterval(function() {
      this.ghosts[1].directions = this.path([Math.abs(Math.floor((this.ghosts[1].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[1].body.position.x) / 12.5))], this.maze).split('');
    }.bind(this), 500);
    this.ghosts[1].directions = this.path([Math.abs(Math.floor((this.ghosts[1].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[1].body.position.x) / 12.5))], this.maze).split('');
  }
  if(this.isGhostThree) {
    this.ghosts[2].interval = setInterval(function() {
      this.ghosts[2].directions = this.path([Math.abs(Math.floor((this.ghosts[2].body.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghosts[2].body.position.x) / 12.5))], this.maze).split('');
    }.bind(this), 500);
  }
  this.assetsManager.onFinish = function(tasks) {
    this.engine.runRenderLoop(this.runLoop);
  }.bind(this);

  this.assetsManager.load();
  this.resize = function(){
    this.engine.resize();
  }.bind(this);
  window.addEventListener("resize", this.resize);

    // this.engine.stopRenderLoop();
    // this.engine.clear(BABYLON.Color3.Black(),false,false);
}



render() {
  return (
    <div className="container">
      <canvas id="renderCanvas"></canvas>
    </div>);
}
}
