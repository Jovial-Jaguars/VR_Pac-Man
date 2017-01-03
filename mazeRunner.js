
  // Get the canvas element from our HTML above
  var canvas = document.getElementById("renderCanvas");

  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
   // This begins the creation of a function that we will 'call' just after it's built
  var mazemaker = function(arr, scene, plane) {
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
        }
        z -= 25;
      }
      z = -13;
      x += 25;
    }
  };
  var createScene = function () {

    // Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0, 0, 0.8);
    //VRDeviceOrientationFreeCamera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-5, 200, -15), scene);
    camera.inputs.addGamepad();
    camera.attachControl(canvas, false);
    camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
    // Activate collisions
    camera.checkCollisions = true;
    // Activate gravity !
    //camera.applyGravity = true;

    // Remap keys to move with ZQSD
    camera.keysUp = [87]; // W
    camera.keysDown = [83]; // S
    camera.keysLeft = [65]; // Q
    camera.keysRight = [68]; // D
    camera.speed = 1;
    camera.inertia = 0.9;
    camera.angularSensibility = 1000;
    // This creates and positions a free camera
    // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // // This targets the camera to scene origin
    // camera.setTarget(BABYLON.Vector3.Zero());

    // // This attaches the camera to the canvas
    // camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    // var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 1), scene);

    // // Dim the light a small amount
    // light.intensity = .6;
    var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 0, 0);
    light0.specular = new BABYLON.Color3(1, 1, 1);
    //light0.parent = camera;
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var plane = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;
    plane.rotation.y = Math.PI/2; 
    plane.checkCollisions = true;
    plane.material = new BABYLON.StandardMaterial("texture1", scene);
    plane.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.8);

    //plane.material.backFaceCulling = false;
    mazemaker([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
               [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
               [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
               [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
               [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
               [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], scene, plane);
   

    var plane2 = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    plane2.parent = plane;
    plane2.position.z = -400; 
    plane2.rotation.y = Math.PI; 
    plane2.checkCollisions = true;
    plane2.material = new BABYLON.StandardMaterial("texture1", scene);
    plane2.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    plane2.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    var plane3 = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    plane3.parent = plane;
    plane3.position.x = -200; 
    plane3.position.z = -200;
    plane3.rotation.y = Math.PI/2; 
    plane3.checkCollisions = true;
    plane3.material = new BABYLON.StandardMaterial("texture1", scene);
    plane3.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    plane3.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    var plane4 = BABYLON.MeshBuilder.CreateBox("plane", { width: 400, height: 200}, scene);
    // plane.position.x = 50;
    // plane.position.z = 50;

    plane4.parent = plane;
    plane4.position.x = 200; 
    plane4.position.z = -200;
    plane4.rotation.y = -Math.PI/2; 
    plane4.checkCollisions = true;
    plane4.material = new BABYLON.StandardMaterial("texture1", scene);
    plane4.material.diffuseColor = new BABYLON.Color3(0, 0.2, 0.7);
    plane4.material.emissiveColor = new BABYLON.Color3(0, .2, .7);
    //plane2.material.emissiveTexture = new BABYLON.Texture("grass.jpg", scene);
    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, scene);
    ground.checkCollisions = true;
    ground.material = new BABYLON.StandardMaterial("texture1", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);

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