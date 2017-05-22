
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  // camera
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 1;
  var FAR = 500;
  var camera, scene, renderer, mesh;
  var cameraControls;
  var sphereGroup, smallSphere;
  init();
  animate();

    function init() {
      var container = document.getElementById( 'container' );
      // renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( WIDTH, HEIGHT );
      container.appendChild( renderer.domElement );
      // scene
      scene = new THREE.Scene();
      // camera
      camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      camera.position.set( 0, 75, 160 );
      cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
      cameraControls.target.set( 0, 40, 0);
      cameraControls.maxDistance = 400;
      cameraControls.minDistance = 10;
      cameraControls.update();
      //
      var planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );
      // MIRROR planes
      var groundMirror = new THREE.Mirror( 100, 100, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0x777777 } );
      groundMirror.rotateX( - Math.PI / 2 );
      scene.add( groundMirror );
      var verticalMirror = new THREE.Mirror( 60, 60, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color:0x889999 } );
      verticalMirror.position.y = 35;
      verticalMirror.position.z = -45;
      scene.add( verticalMirror );

      var planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
				planeTop.position.y = 100;
				planeTop.rotateX( Math.PI / 2 );
				scene.add( planeTop );
				var planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
				planeBack.position.z = -50;
				planeBack.position.y = 50;
				scene.add( planeBack );
				var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
				planeFront.position.z = 50;
				planeFront.position.y = 50;
				planeFront.rotateY( Math.PI );
				scene.add( planeFront );
				var planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) );
				planeRight.position.x = 50;
				planeRight.position.y = 50;
				planeRight.rotateY( - Math.PI / 2 );
				scene.add( planeRight );
				var planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );
				planeLeft.position.x = -50;
				planeLeft.position.y = 50;
				planeLeft.rotateY( Math.PI / 2 );
				scene.add( planeLeft );

        // lights
				var mainLight = new THREE.PointLight( 0xcccccc, 1.5, 250 );
				mainLight.position.y = 60;
				scene.add( mainLight );
				var greenLight = new THREE.PointLight( 0x00ff00, 0.25, 1000 );
				greenLight.position.set( 550, 50, 0 );
				scene.add( greenLight );
				var redLight = new THREE.PointLight( 0xff0000, 0.25, 1000 );
				redLight.position.set( - 550, 50, 0 );
				scene.add( redLight );
				var blueLight = new THREE.PointLight( 0x7f7fff, 0.25, 1000 );
				blueLight.position.set( 0, 50, 550 );
				scene.add( blueLight );
        // on effectue le rendu de la scène
        //renderer.render( scene, camera );
      }

      function animate() {
				requestAnimationFrame( animate );
				var timer = Date.now() * 0.01;

				cameraControls.update();
				renderer.render(scene, camera);
			}
