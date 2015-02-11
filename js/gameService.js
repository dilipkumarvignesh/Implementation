var gameService=angular.module('gameService',[]);

gameService.service('SceneService', function () {
        return {
            scene: new Physijs.Scene()
        }
    })

    // Returns a single instance of a camera.  Consumed by directive and controls.
	gameService.service('CameraService', function () {
        // default values for camera
        var viewAngle = 55;
        var aspectRatio = window.innerWidth / window.innerHeight;
        var near = 0.1
        var far = 1000;

        return {
            perspectiveCam: new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far)
        }
    });

	gameService.service('ThreeDModelService',function()
	{
		return {
		loader:new THREE.ColladaLoader()
	}

	});

	gameService.service('GameObjectService',function()
	{	 
		geometry = new THREE.CubeGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            wireframeLinewidth: 2
        });

        cube1 = new THREE.Mesh(geometry, material);


        var planeGeometry = new THREE.PlaneGeometry(580, 670, 51, 51);
        var planeMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('resources/Apollo15.jpg')
        });
        var plane = new Physijs.PlaneMesh(planeGeometry, planeMaterial);
	  return {
	  	GameObjects:
	  	{
	  		cube1:cube1,
	  		plane:plane
	  	}
	  }	
	});

