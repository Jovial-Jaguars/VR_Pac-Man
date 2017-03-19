import React from 'react';

export default class MazeRunner extends React.Component {
  constructor(props){
    super(props);
    console.log('lol');
    //console.log(window.selectedMaze);
    var maze = [];
    for(var i = 0; i  < this.props.maze.length; i++) {
      maze[i] = [];
      for(var j = 0; j < this.props.maze[i].length; j++) {
        maze[i].push(this.props.maze[i][j]);
      }
    }
    this.maze = maze;
    this.path = this.path.bind(this);
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
    this.ghostPosition = {'x': 0,'y': 1,'z': 0};
    this.isGhost = false;
    this.isPosGrav = false;
    this.isNegGrav = false;
    this.posGravVec = {'i': 0, 'j': 0};
    this.negGravVec = {'i': 0, 'j': 0};
    this.ghostBody;
    this.blockMesh;
    this.pelletMesh;
    this.ghostDirections = [];
    this.isUpsideDown = false;
    this.isGameOver = false;
    this.currPacVec = {'i': 0, 'j': 0};
    this.assetsManager;
    console.log(maze);
  }

  getSuccessors(coordz, coordx, arr) {
    var suc = [];
    if(arr[coordz + 1] !== undefined) {
      if (arr[coordz + 1][coordx] !== 1 && arr[coordz + 1][coordx] !== undefined) {
        suc.push([[coordz + 1,coordx], 'S']);
      }  
    }
    if (arr[coordz][coordx - 1] !== 1 && arr[coordz][coordx - 1] !== undefined) {
      suc.push([[coordz,coordx - 1], 'W']);
    }
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
      curr = q.pop();
    } while(arr[curr[0][0]][curr[0][1]] !== 3 && q.length !== 0);
    return curr[1];
  }

  componentDidMount() {
    this.pacmanIntro.play();
    var that = this;
    var canvas = document.getElementById("renderCanvas");
    var hl;
    for (var i = 0; i < that.maze.length; i++) {
      for (var j = 0; j < that.maze[i].length; j++) {
        if (that.maze[i][j] === 3) {
          this.currPacVec.i = i;
          this.currPacVec.j = j;
          this.pacmanPosition.x = (j * 12.5) + 6.5;
          this.pacmanPosition.z = 93.5 - (i * 12.5);
        } else if (that.maze[i][j] === 4) {
          this.isGhost = true;
          this.ghostPosition.x = (j * 12.5) + 6.5;
          this.ghostPosition.z = 93.5 - (i * 12.5);
        } else if (that.maze[i][j] === 5) {
          this.isPosGrav = true;
          this.posGravVec.i = i;
          this.posGravVec.j = j;
        } else if (that.maze[i][j] === 6) {
          this.isNegGrav = true;
          this.negGravVec.i = i;
          this.negGravVec.j = j;
        }
      }
    }

    // Load the BABYLON 3D engine

    this.engine = new BABYLON.Engine(canvas, true,{ stencil: true });

    this.engine.loadingUIText = "Loading...";
    this.engine.loadingUIBackgroundColor = "blue";

    if(this.isGhost === true) {
      setInterval(function() {
      this.ghostDirections = this.path([Math.abs(Math.floor((this.ghostBody.position.z - 87.5) / 12.5)),Math.abs(Math.floor((this.ghostBody.position.x) / 12.5))], that.maze).split('');
    }.bind(this), 500);
    }
    var create = function (scene, score) {
      var controls = new BABYLON.ScreenSpaceCanvas2D(scene, {
        id: "Controls",
        size: new BABYLON.Size(400, 500),
        backgroundFill: "#4040408F",
        backgroundRoundRadius: 50,
        children: [
          new BABYLON.Text2D(score.toString(), {
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
      controls.pointerEventObservable.add(function (d, s) {
          console.log("UP");
      }, BABYLON.PrimitivePointerInfo.PointerUp);
      return controls;
    };
    var switchCamera = function (cam) { //copy ove all of current camera parameters to new camera either vr or 3d view
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

    }.bind(this);

    var c2 = document.getElementsByClassName("camera-toggle")[0]; //if camera tiggle is clicked
    c2.addEventListener("click", function () {
      window.scrollTo(0,1);
      if (scene.activeCameras[0] instanceof BABYLON.FreeCamera && !(scene.activeCameras[0] instanceof BABYLON.VRDeviceOrientationFreeCamera)) { //if 3d camera
        this.camera = new BABYLON.VRDeviceOrientationFreeCamera("deviceOrientationCamera", scene.activeCameras[0].position, scene);
        switchCamera(this.camera);
      } else {
        this.camera = new BABYLON.FreeCamera("freeeCamera", scene.activeCameras[0].position, scene);
        switchCamera(this.camera);
      }
      return;
    });
    //mazemaker function
    //converts 16 x 16 array to maze
    // 1s become a wall
    // 2s become pellets
    var mazemaker = function(arr, wall, pellet, flipMaze) {
      var x = 6.5;                                                                     //starting x position
      var z = 93.9;                                                                    //starting z position
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {                                                         
          if (arr[i][j] === 1) {  ///if theres a wall
            if(flipMaze === 1) {  //if theres an upside down maze, gravity switch
              var newInstanceWall = wall.createInstance("block j" + (i *16) + j);  //creates instance/copy  of a single block as many times needed
              newInstanceWall.position.z = z; 
              newInstanceWall.position.x = x; 
              newInstanceWall.position.y = 900; // set positions relative to array
              createWallBody(newInstanceWall.getBoundingInfo().boundingBox.center, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0); /// create cannon physics version of block with the same size
            } else { 
              var newInstanceWall = wall.createInstance("block i" + (i *16) + j); //creates instance/copy  of a single block as many times needed
              newInstanceWall.position.z = z; 
              newInstanceWall.position.x = x;
              createWallBody(newInstanceWall.getBoundingInfo().boundingBox.center, new CANNON.Vec3(wall.scaling.x, wall.scaling.y, wall.scaling.z), 0); //t gives block physics in cannon world
            }
          } else if (arr[i][j] === 2) { // same thing but for pellets
            if(flipMaze === 1) {
              var newInstanceSphere = pellet.createInstance("pellet j" + (i *16) + j);
              newInstanceSphere.position.z = z; 
              newInstanceSphere.position.x = x;
              newInstanceSphere.position.y = 995;
              createSphereBody(newInstanceSphere.getBoundingInfo().boundingBox.center, 6, newInstanceSphere.uniqueId);
              this.pelletMeshes[newInstanceSphere.uniqueId] = newInstanceSphere; // pellets are stored in an array so they can be colletcted and add to the score
            } else {
              var newInstanceSphere = pellet.createInstance("pellet i" + (i *16) + j);
              newInstanceSphere.position.z = z; 
              newInstanceSphere.position.x = x; 
              newInstanceSphere.position.y = 5;
              createSphereBody(newInstanceSphere.getBoundingInfo().boundingBox.center, 4, newInstanceSphere.uniqueId);
              this.pelletMeshes[newInstanceSphere.uniqueId] = newInstanceSphere;
            }
        }
        x += 12.5;
      }
      x = 6.5;
      z -= 12.5;
    }
  }.bind(this);


  // This is the main babylon function to create the entire scene
    var createScene = function () {

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(that.engine);
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
    var xstart = 0.9; // 80% from the left
    var ystart = 0.85; // 75% from the bottom
    var width = 0.99-xstart // Almost until the right edge of the screen
    var height = 1-ystart;  // Until the top edge of the screen
    mm.viewport = new BABYLON.Viewport(xstart, ystart, width, height); 
    // add the minimap to the list of active cameras
    scene.activeCameras.push(mm);
    mm.layerMask = 2;
    this.camera.layerMask = 1;


    this.scoreboard = create(scene, this.score);



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
    if(this.isGhost === true) {
      var meshTask = this.assetsManager.addMeshTask("ghost task", "", "../assets/", "ghostparent.babylon");
      meshTask.onSuccess = function (task) {
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        for (var i = 0; i < task.loadedMeshes.length; i++) {
          var ghosty = task.loadedMeshes[i];
          //this.ghost = newMeshes[0];
          // var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.7, 3, scene);
          // light0.parent = ghosty;
          if (ghosty.name === 'Plane') {
            ghosty.position.y = 10;
            ghosty.position.x = -200;
            ghosty.position.z = -10;
            ghosty.scaling.x = 4;
            ghosty.scaling.y = 2;
            ghosty.scaling.z = 4;
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
    this.pelletMesh.material.emissiveColor = new BABYLON.Color3.Yellow();
    

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
    createWallBody(plane.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane.scaling.x, plane.scaling.y, plane.scaling.z), 0);
    mazemaker(that.maze, this.blockMesh, this.pelletMesh, 0);
    //if theres a gravity switch then 
    //we have to recreate the level upside down
    if (this.isPosGrav === true) {
      mazemaker(that.maze, this.blockMesh, this.pelletMesh, 1);
    }
    // the other 3 walls
    var plane2 = plane.createInstance("i" + 201);
    plane2.scaling.z = 100;
    plane2.scaling.y = 1000;
    plane2.scaling.x = .2;
    plane2.position.x = 200; 
    createWallBody(plane2.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane2.scaling.x, plane2.scaling.y, plane2.scaling.z), 0);
    var plane3 = plane.createInstance("i" + 302);
    plane3.scaling.z = 100;
    plane3.scaling.y = 1000;
    plane3.scaling.x = .2;
    plane3.rotation.y = Math.PI/2;
    plane3.position.x = 100; 
    plane3.position.z = 100;
    createWallBody(plane3.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane3.scaling.x, plane3.scaling.y, plane3.scaling.z), 2);
    var plane4 = plane.createInstance("i" + 403);
    plane4.scaling.z = 100;
    plane4.scaling.y = 1000;
    plane4.scaling.x = 0.2;
    plane4.rotation.y = Math.PI/2;
    plane4.position.x = 100; 
    plane4.position.z = -100;
    createWallBody(plane4.getBoundingInfo().boundingBox.center, new CANNON.Vec3(plane4.scaling.x, plane4.scaling.y, plane4.scaling.z), 2);
    // create the ground
    var ground = BABYLON.Mesh.CreateGround("ground1", 450, 450, 2, scene);
    ground.material = new BABYLON.StandardMaterial("texture1", scene);
    ground.material.emissiveTexture = new BABYLON.Texture('../assets/ground2.jpg', scene);
    ground.material.emissiveTexture.uScale = 100.0;
    ground.material.emissiveTexture.vScale = 100.0;
    this.pelletSound = new BABYLON.Sound("pellet", "../assets/pellet.wav", scene, null, {volume: 0.006});
    // if there's a gravity switch
    if (this.isPosGrav === true) {
      // create a second ground
      var ground2 = ground.createInstance("hk2000");
      ground2.position.y = 1000; // but place it way high in the sky
      ground2.rotation.z = -Math.PI;
      //add the cannon physics to it
      var groundShape = new CANNON.Box(new CANNON.Vec3(2, 450, 450));
      var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
      groundBody.position.y = 1000;
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),-Math.PI/2); 
      world.add(groundBody);
      // create a positive gravity switch
      var posSwitch = this.blockMesh.clone('hello');
      posSwitch.material = new BABYLON.StandardMaterial("+veSwitch", scene);
      posSwitch.material.emissiveColor = new BABYLON.Color3.Yellow();
      posSwitch.visibility = 0.4;
      posSwitch.position.x = (this.posGravVec.j * 12.5) + 6.5;
      posSwitch.position.y = 5;
      posSwitch.position.z = 93.5 - (this.posGravVec.i * 12.5);
      var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 70, 10, 10, 24, 1, scene);
      cylinder.material = new BABYLON.StandardMaterial("cyl", scene);
      cylinder.material.emissiveColor = new BABYLON.Color3.Red();
      cylinder.position.x = (this.posGravVec.j * 12.5) + 6.5;
      cylinder.position.y = 0;
      cylinder.position.z = 93.5 - (this.posGravVec.j * 12.5);
      var cone = BABYLON.Mesh.CreateCylinder("cone", 15, 0, 20, 24, 1, scene);
      cone.material = new BABYLON.StandardMaterial("cyl", scene);
      cone.material.emissiveColor = new BABYLON.Color3.Blue();
      cone.position.x = (this.posGravVec.j * 12.5) + 6.5;
      cone.position.y = 40;
      cone.position.z = 93.5 - (this.posGravVec.i * 12.5);
      // var negSwitch = posSwitch.createInstance('swcopy');
      // negSwitch.position.x = (this.negGravVec.j * 12.5) + 6.5;
      // negSwitch.position.y = 995;
      // negSwitch.position.z = 93.5 - (this.negGravVec.i * 12.5);
      // var cylinder2 = cylinder.createInstance('cylcopy');
      // cylinder2.position.x = (this.negGravVec.j * 12.5) + 6.5;
      // cylinder2.position.y = 965;
      // cylinder2.position.z = 93.5 - (this.negGravVec.i * 12.5);
      // var cone2 = cone.createInstance('conecopy');
      // cone2.position.x = (this.negGravVec.j * 12.5) + 6.5;
      // cone2.rotation.x = Math.PI;
      // cone2.position.y = 920;
      // cone2.position.z = 93.5 - (this.negGravVec.i * 25);
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
    window.addEventListener('keyup', function(e) {
      if(e.keyCode === 39) {
        this.camera.rotation.y += Math.PI/2;
        this.pacmanMesh.rotation.y += Math.PI/2;
      } else if (e.keyCode === 37) {
        this.camera.rotation.y -= Math.PI/2;
        this.pacmanMesh.rotation.y -= Math.PI/2;
      }
    }.bind(this))
    this.blockMesh.position.x = -200
    this.blockMesh.isVisible = false;
    this.pelletMesh.isVisible = false;
    return scene;
  }.bind(this);  // End of createScene function
  /////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////
  var createWorld = function(){
    var world = new CANNON.World();
    world.gravity.set(0,-40,0);
    var mass = 5, radius = 1.75;
    var sphereShape = new CANNON.Sphere(radius); // Step 1
    this.pacmanBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
    this.pacmanBody.position.set(this.pacmanPosition.x, this.pacmanPosition.y, this.pacmanPosition.z);
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
            this.score++;
            this.scoreboard.children[0].text = this.score.toString();
          }
        }
      }
    }.bind(this));
    world.add(this.pacmanBody);
    if(this.isGhost === true) {
      var ghostShape = new CANNON.Sphere(3); // Step 1
      this.ghostBody = new CANNON.Body({mass: 1, shape: ghostShape}); // Step 2
      this.ghostBody.position.set(this.ghostPosition.x,this.ghostPosition.y,this.ghostPosition.z);
      this.ghostBody.rotation = new CANNON.Vec3();
      this.ghostBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);  
      this.ghostBody.addEventListener('collide', function(e){
        console.log('collide');
        if (e.body.isPlayer && !this.isGameOver) {
  	      this.ghostBody.velocity.x = 0;
  	      this.ghostBody.velocity.z = 0;
  	      this.pacmanBody.velocity.x = 0;
  	      this.pacmanBody.velocity.z = 0;
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
  	        scores.push(new BABYLON.Text2D(this.score.toString(), {
  	            id: "text4",
  	            y: -60,
  	            marginAlignment: "h: center, v:center",
  	            fontName: "20pt Arial",
  	        }));
  	        new BABYLON.ScreenSpaceCanvas2D(scene, {
  	                    id: "gameover2",
  	                    x: 400,
  	                    y: 0,
  	                    size: new BABYLON.Size(800, 1300),
  	                    backgroundFill: "#C0C0C040",
  	                    backgroundRoundRadius: 50,
  	                    children: scores
  	          });
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
	          this.isGameOver = true;
            this.ghostBody.removeEventListener('collide')
          }
    }.bind(this));
    world.add(this.ghostBody);
    }

    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    world.add(groundBody);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);  

    return world;
  }.bind(this);

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
    this.pellets[id] = pelletBody;
    world.add(pelletBody); 
  }.bind(this);


  var world = createWorld();     
  var scene = createScene();

  this.assetsManager.onFinish = function(tasks) {
    


  that.engine.runRenderLoop(function () {
    scene.render();
    world.step(1.0/60.0);
    if(this.pelletRemover !== 0) {
      world.remove(this.pellets[this.pelletRemover]);
      this.pelletRemover = 0;
    }
    if (this.cameraFlag && this.camera.rotationQuaternion !== undefined) {
      this.pacmanBody.velocity.z = 30 * parseFloat(Math.cos(this.camera.rotationQuaternion.toEulerAngles().y));
      this.pacmanBody.velocity.x = 30 * parseFloat(Math.sin(this.camera.rotationQuaternion.toEulerAngles().y));
    } else {
      this.pacmanBody.velocity.z = 30 * parseFloat(Math.cos(this.camera.rotation.y));
      this.pacmanBody.velocity.x = 30 * parseFloat(Math.sin(this.camera.rotation.y));
    }
      
    this.pacmanMesh.position.x = this.pacmanBody.position.x; 
    this.pacmanMesh.position.y = this.pacmanBody.position.y; 
    this.pacmanMesh.position.z = this.pacmanBody.position.z; 
    if(this.isUpsideDown) {
      this.camera.position.x = this.pacmanBody.position.x + .4;
      this.camera.position.y = this.pacmanBody.position.y - 3;
      this.camera.position.z = this.pacmanBody.position.z;
    } else {
      this.camera.position.x = this.pacmanBody.position.x + .4;
      this.camera.position.y = this.pacmanBody.position.y + 5;
      this.camera.position.z = this.pacmanBody.position.z;
    }
    if(Math.abs(Math.floor((this.camera.position.x) / 12.5)) !== this.currPacVec.j || Math.abs(Math.floor((this.camera.position.z - 87.5) / 12.5) !== this.currPacVec.i)) {
      that.maze[this.currPacVec.i][this.currPacVec.j] = 0;
      this.currPacVec.j = Math.abs(Math.floor((this.camera.position.x) / 12.5));
      this.currPacVec.i = Math.abs(Math.floor((this.camera.position.z - 87.5) / 12.5));
      that.maze[this.currPacVec.i][this.currPacVec.j] = 3;
      if(this.currPacVec.i === this.posGravVec.i && this.currPacVec.j === this.posGravVec.j && !this.isUpsideDown) {
        world.gravity.set(0, 40, 0);
        this.isUpsideDown = true;
      } else if (this.currPacVec.i === this.negGravVec.i && this.currPacVec.j === this.negGravVec.j && this.isUpsideDown) {
        world.gravity.set(0, -40, 0);
        this.isUpsideDown = false;
      }
    }
    if (this.ghost !== undefined && this.isGameOver === false) {
      if (this.isUpsideDown) {
        this.ghost.position.x = this.ghostBody.position.x;
        this.ghost.position.y = this.ghostBody.position.y - 2;
        this.ghost.position.z = this.ghostBody.position.z;
      } else {
        this.ghost.position.x = this.ghostBody.position.x;
        this.ghost.position.y = this.ghostBody.position.y + 10;
        this.ghost.position.z = this.ghostBody.position.z;
      }
      if(this.ghostDirections[0] === 'E') {
        this.ghostBody.velocity.z = 0;
        this.ghostBody.velocity.x = 30;
      } 
      if(this.ghostDirections[0] === 'W') {
        this.ghostBody.velocity.z = 0;
        this.ghostBody.velocity.x = -30;
      } 
      if(this.ghostDirections[0] === 'S') {
        this.ghostBody.velocity.z = -30;
        this.ghostBody.velocity.x = 0;
      } 
      if(this.ghostDirections[0] === 'N') {
        this.ghostBody.velocity.z = 30;
        this.ghostBody.velocity.x = 0;
      } 
    } 
      
  }.bind(this));
  }.bind(this);
  this.assetsManager.load();
  var resize = function(){
    that.engine.resize();
  }
  window.addEventListener("resize", resize);

  //////////////////////////////////////////////////////////////////
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
