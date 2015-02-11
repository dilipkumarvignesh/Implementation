var gameService=angular.module('gameService',[]);

gameService.service('SceneService', function () {
        return {
            scene: new Physijs.Scene()
        }
    })

    // Returns a single instance of a camera.  Consumed by directive and controls.
	gameService.service('CameraService', function () {
        // default values for camera
        var viewAngle = 45;
        var aspectRatio = window.innerWidth / window.innerHeight;
        var near = 0.1
        var far = 1000;

        return {
            perspectiveCam: new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far)
        }
    });
