class MazeRunner extends React.Component {
  constructor(props ){
    super(props);
  }

  componentDidMount() {
    
  // Get the canvas element from our HTML above
  var that = this;
  var canvas = document.getElementById("renderCanvas");

  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
   // This begins the creation of a function that we will 'call' just after it's built
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
          plane5.material.diffuseColor = new BABYLON.Color3(1, 0.9, 0);
          var light1 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 210, 0), new BABYLON.Vector3(0, -1, 0), 0.2, 1, scene);
          //light1.intensity = 1;
          // light0.diffuse = new BABYLON.Color3(1, 1, 1);
          // light0.specular = new BABYLON.Color3(1, 1, 1);
          // light0.groundColor = new BABYLON.Color3(0, 0, 0);
          light1.parent = plane5;
          //boxes.push(plane5);
        } else if (arr[i][j] === 2) {
          var sphere = BABYLON.Mesh.CreateSphere("sphere", 2.0, 2.0, scene);
          // plane.position.x = 50;
          // plane.position.z = 50;

          sphere.parent = plane;
          sphere.position.z = z;
          sphere.position.x = x; 
          sphere.position.y = 2; 
          sphere.checkCollisions = true;
          sphere.material = new BABYLON.StandardMaterial("wow", scene);
          //sphere.material.diffuseTexture  = new BABYLON.Texture("grass.jpg", scene);
          sphere.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
          sphere.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
          // sphere.onCollide = function() {
          //   sphere.dispose();
          // };
          // camera.onCollide = function(collidedMesh) {
          //   console.log(collidedMesh.uniqueId);
          //   if (sphere.uniqueId === collidedMesh.uniqueId) {
          //     sphere.dispose();
          //   }
          // };
          var light1 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 10, 0), new BABYLON.Vector3(0, -1, 0), 0.5, 1, scene);
          light1.intensity = 1;
          // light0.diffuse = new BABYLON.Color3(1, 1, 1);
          // light0.specular = new BABYLON.Color3(1, 1, 1);
          // light0.groundColor = new BABYLON.Color3(0, 0, 0);
          light1.parent = plane;
          light1.position.z = z;
          light1.position.x = x; 
          light1.position.y = 2; 
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
    scene.clearColor = new BABYLON.Color3(0, 0, 0.8);
    //VRDeviceOrientationFreeCamera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-200, 1, -15), scene);
    camera.inputs.addGamepad();
    camera.attachControl(canvas, true);
    //camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
    //camera.position.y = 10;
    //camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);
    // Activate collisions
    camera.checkCollisions = true;
    // Activate gravity !
    //scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    camera.applyGravity = true;
    camera.rotation.y = Math.PI/2; 
    camera.keysUp = [87]; // W
    camera.keysDown = [83]; // S
    camera.keysLeft = [65]; // Q
    camera.keysRight = [68]; // D
    camera.speed = 1;
    camera.inertia = 0.9;
    camera.angularSensibility = 1000;
    scene.activeCameras.push(camera);
    // var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
    // var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('./lmcity/lmcity', scene, ["_ft.png", "_up.png", "_rt.png", "_bk.png", "_dn.png", "_lf.png"]);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);1
    // skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // skybox.infiniteDistance = true;
    var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,1000,0), scene);
    mm.setTarget(new BABYLON.Vector3(0.1,0.1,0.1));
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

    // Add the camera to the list of active cameras of the game
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
    plane.rotation.y = Math.PI/2; 
    plane.checkCollisions = true;
    plane.material = new BABYLON.StandardMaterial("texture1", scene);
    plane.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);

    //plane.material.backFaceCulling = false;
    var arr = mazemaker(that.props.maze, scene, plane, camera);
   
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
    ground.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    //ground.applyGravity = true;
    scene.activeCamera.onCollide = function(collidedMesh) {
      //console.log(sphere.position.y);
      if (arr[collidedMesh.uniqueId] !== undefined) {
        console.log('gone');
        collidedMesh.dispose();
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