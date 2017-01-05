class MazeRunner extends React.Component {
  constructor(props){
    super(props);
    this.count = 0;
  }

  componentDidMount() {
    
  // Get the canvas element from our HTML above
    var that = this;
    var canvas = document.getElementById("renderCanvas");
    var score = 0;
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
    // BABYLON.SceneLoader.ImportMesh("Plane", "", "ghost2.babylon", scene, function (newMeshes, particleSystems) {
    // });
  var mazemaker = function(arr, scene, plane, camera) {
    var boxes = [];
    var x = -187;
    var z = -13;
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 1) {
          var plane5 = BABYLON.MeshBuilder.CreateBox("plane", { width: 25, height: 200, depth: 25}, scene);
          // plane.position.x = 50;
          // plane.position.z = 50;
          plane5.parent = plane;
          plane5.position.z = z; 
          plane5.position.x = x; 
          plane5.checkCollisions = true;
          plane5.material = new BABYLON.StandardMaterial("texture1", scene);
          // plane5.material.diffuseColor = new BABYLON.Color3(1, 0.9, 0);
          plane5.material.emissiveTexture = new BABYLON.Texture('tron1.jpg', scene);
          // var light1 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 210, 0), new BABYLON.Vector3(0, -1, 0), 0.2, 1, scene);
          //light1.intensity = 1;
          // light0.diffuse = new BABYLON.Color3(1, 1, 1);
          // light0.specular = new BABYLON.Color3(1, 1, 1);
          // light0.groundColor = new BABYLON.Color3(0, 0, 0);
          // light1.parent = plane5;
          //boxes.push(plane5);
        } else if (arr[i][j] === 2) {
          var sphere = BABYLON.Mesh.CreateSphere("sphere", 20.0, 4.0, scene);
          // plane.position.x = 50;
          // plane.position.z = 50;

          sphere.parent = plane;
          sphere.position.z = z;
          sphere.position.x = x; 
          sphere.position.y = 10; 
          sphere.checkCollisions = true;
          sphere.material = new BABYLON.StandardMaterial("wow", scene);
          //sphere.material.diffuseTexture  = new BABYLON.Texture("grass.jpg", scene);
          sphere.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
          sphere.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
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
          boxes[sphere.uniqueId] = sphere;
        } else if (arr[i][j] === 3) {
          scene.activeCamera.position.z = z + 200; 
          scene.activeCamera.position.x = x - 200; 
          console.log('x:', camera.position.x, "z:", plane.position.z);
        }
        z -= 25;
      }
      z = -13;
      x += 25;
    }
    return boxes;
  };
  var createScene = function () {

    // Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    scene.collisionsEnabled = true;
    // Change the scene background color to green.
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    //VRDeviceOrientationFreeCamera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-10, 6, 0), scene);
    camera.inputs.addGamepad();
    camera.attachControl(canvas, true);
    camera.ellipsoid = new BABYLON.Vector3(2, 6, 2);
    //camera.position.y = 10;
    //camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);
    // Activate collisions
    camera.checkCollisions = true;
    // Activate gravity !
    //scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    camera.applyGravity = true;
    //camera.rotation.y = Math.PI/2; 
    camera.keysUp = [87]; // W
    camera.keysDown = [83]; // S
    camera.keysLeft = [65]; // Q
    camera.keysRight = [68]; // D
    camera.speed = 1;
    camera.inertia = 0.9;
    camera.angularSensibility = 1000;
    scene.activeCameras.push(camera);
    //scene.fog = new t.FogExp2(0xD6F1FF, 0.0005);
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('./sky35/citysky', scene);
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
    BABYLON.SceneLoader.ImportMesh("", "./", "ghostparent.babylon", scene, function (newMeshes, particleSystems) {
      for (var i = 0; i < newMeshes.length; i++) {
        var ghost = newMeshes[i];
        var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
        light0.parent = ghost;
        if (ghost.name === 'Plane') {
          ghost.position.y = 10;
          ghost.position.x = -200;
          ghost.position.z = -10;
          ghost.material = new BABYLON.StandardMaterial('ghost', scene);
          ghost.material.emissiveColor = new BABYLON.Color3(0.2, 0.4, 0.8);
        } else if (ghost.name === 'Sphere' || ghost.name === 'Sphere.001') {
          ghost.material = new BABYLON.StandardMaterial('ghost', scene);
          ghost.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
          ghost.material.specularColor = new BABYLON.Color3(1, 1, 1);
          ghost.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        } else if (ghost.name === 'Sphere.002' || ghost.name === 'Sphere.003') {
          ghost.material = new BABYLON.StandardMaterial('ghost', scene);
          ghost.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
          ghost.material.specularColor = new BABYLON.Color3(1, 1, 1);
          ghost.material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        }
         
      }
      
      //ghost.material = new BABYLON.StandardMaterial("lol", scene);
      //x.material.emissiveColor = new BABYLON.Color3(0.1, 0.8, 0.8);
    });
    var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,1000,0), scene);
    mm.setTarget(new BABYLON.Vector3(0.1,0.1,0.1));
    mm.checkCollisions = true;
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
    // var scoreTexture = new BABYLON.DynamicTexture("scoreTexture", 512, scene, true);
    // var scoreboard = BABYLON.Mesh.CreatePlane("scoreboard", 50, scene);
    // // Position the scoreboard after the lane.
    // scoreboard.position.x = -200; 
    // scoreboard.position.z = -50;
    // scoreboard.position.y = 30;
    // scoreboard.rotation.x = Math.PI;
    // scoreboard.checkCollisions = true; 
    // // Create a material for the scoreboard.
    // scoreboard.material = new BABYLON.StandardMaterial("scoradboardMat", scene);
    // scoreboard.material.diffuseTexture = scoreTexture;
    // Set the diffuse texture to be the dynamic texture.
    //scoreboard.material.diffuseTexture = scoreTexture;
    // Add the camera to the list of active cameras of the game
    
    // scene.registerBeforeRender(function() {
    //   var newScore = score;
    //   if (newScore !== score) {
    //     score = newScore;
    //     // Clear the canvas. 
    //     scoreTexture.clear();
    //     // Draw the text using a white font on black background.
    //     scoreTexture.drawText(score + " pins down", 40, 100,
    //       "bold 72px Arial", "white", "black");
    //   }
    // });
    scene.activeCameras.push(mm);
    mm.layerMask = 1;
    camera.layerMask = 2;
    var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 50, 0), new BABYLON.Vector3(0, -1, 0), 0.4, 3, scene);
    // light0.diffuse = new BABYLON.Color3(1, 0, 0);
    // light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.parent = camera;
    //light0.intensity = 0.3;
    //light0.range = 25;
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var plane = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;
    //console.log('x:',plane.position.x, "y:", plane.position.y, "z:", plane.position.z)
    plane.rotation.y = Math.PI/2; 
    plane.checkCollisions = true;
    plane.material = new BABYLON.StandardMaterial("texture1", scene);
    plane.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane.material.alpha = 0.2;
    //plane.material.backFaceCulling = false;
    var arr = mazemaker(that.props.maze, scene, plane, scene.activeCamera);
   
    console.log(arr);
    
    var plane2 = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    plane2.parent = plane;
    plane2.position.z = -400; 
    plane2.rotation.y = Math.PI; 
    plane2.checkCollisions = true;
    plane2.material = new BABYLON.StandardMaterial("grass.png", scene);
    plane2.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane2.material.alpha = 0.2;
    // var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(-200, 50, -15), scene);
    // light0.intensity = 0.9;
    //light0.diffuse = new BABYLON.Color3(1, 0, 0);
    //light0.specular = new BABYLON.Color3(1, 1, 1);
    //plane2.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    var plane3 = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    plane3.parent = plane;
    plane3.position.x = -200; 
    plane3.position.z = -200;
    plane3.rotation.y = Math.PI/2; 
    plane3.checkCollisions = true;
    plane3.material = new BABYLON.StandardMaterial("texture1", scene);
    plane3.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane3.material.alpha = 0.2;
    //plane3.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    var plane4 = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    plane4.parent = plane;
    plane4.position.x = 200; 
    plane4.position.z = -200;
    plane4.rotation.y = -Math.PI/2; 
    plane4.checkCollisions = true;
    plane4.material = new BABYLON.StandardMaterial("texture1", scene);
    plane4.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);
    plane4.material.alpha = 0.2;
    // var sphere = BABYLON.Mesh.CreateSphere("sphere", 5.0, 5.0, scene);
    // // plane.position.x = 50;
    // // plane.position.z = 50;

    // sphere.parent = plane;
    // sphere.position.z = -200;
    // sphere.position.x = -9; 
    // sphere.position.y = 3; 
    // sphere.checkCollisions = true;
    // sphere.material = new BABYLON.StandardMaterial("wow", scene);
    //sphere.material.diffuseTexture  = new BABYLON.Texture("grass.jpg", scene);
    // sphere.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    // sphere.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    // sphere.actionManager = new BABYLON.ActionManager(scene);
    // var action = new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: camera.ellipsoid }, sphere.dispose, true);
    //sphere.actionManager.registerAction(action); 
    //sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: scene.activeCamera }, sphere.dispose, 1));  
    //arr[sphere.uniqueId] = sphere;
    //plane4.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    //plane2.material.emissiveTexture = new BABYLON.Texture("grass.jpg", scene);
    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, scene);
    ground.checkCollisions = true;
    // ground.position.y = -10;
    //ground.position = new BABYLON.Vector3(5, -10, -15);
    ground.material = new BABYLON.StandardMaterial("texture1", scene);
    ground.material.emissiveColor = new BABYLON.Color3(1.0, 0.5, 0);
    //ground.applyGravity = true;
    var pellet = new BABYLON.Sound("pellet", "./pellet.wav", scene);
    //create(scene);
    var canvas2;
    camera.onCollide = function(collidedMesh) {
      //console.log(collidedMesh.uniqueId);
      //console.log(arr[collidedMesh.uniqueId])
      if (arr[collidedMesh.uniqueId] !== undefined) {
        //console.log('gone');
        arr[collidedMesh.uniqueId].dispose();
        pellet.play();
        score++;
        if (canvas2 === undefined) {
          canvas2 = create(scene, score);
        } else {
          canvas2.levelVisible = false;
          canvas2 = create(scene, score);
        }
      }
    };

    // mm.onCollide = function(collidedMesh) {
    //   console.log(collidedMesh.uniqueId);
    //   if (arr.indexOf(collidedMesh.uniqueId) !== -1) {
    //     arr[arr.indexOf(collidedMesh.uniqueId)].dispose();
    //   }
    // };
    // for (var i = 0; i < arr.length; i++) {
    //   arr[i].onCollide = function() {
    //     arr[i].dispose();
    //   };
    // }
    // for (var i = 0; i < arr.length; i++) {
    //   if (arr[i].intersectsMesh(camera, false)) {
    //     arr[i].dispose();
    //   }
    // }
    // for (var i = 0; i < arr.length; i++) {
    //   arr[i].actionManager = new BABYLON.ActionManager(scene);
    //   var action = new BABYLON.InterpolateValueAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: camera }, arr[i], "visibility", 0, 500, false, false, function() {arr[i].dispose()});
    //   arr[i].actionManager.registerAction(action);
    // }
    scene.activeCamera.checkCollisions = true;

    
    // Leave this function
    return scene;

  };  // End of createScene function
    var scene = createScene();
    engine.runRenderLoop(function () {
      scene.render();
    });
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }



  render() {
    return (<canvas id="renderCanvas"></canvas>);
  }
}

window.MazeRunner = MazeRunner;