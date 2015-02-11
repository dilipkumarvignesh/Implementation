var implCockpit = new angular.module('implCockpit', ['ngRoute', 'gameService'])

implCockpit.controller('gameCtrl', function($scope, CameraService, SceneService, $location) {
    var projector = new THREE.Projector(),
        mouse_vector = new THREE.Vector3(),
        mouse = {
            x: 0,
            y: 0,
            z: 1
        },
        ray = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)),
        intersects = [];
    var renderer;
    var scene;
    var camera;
    init();
    animate();


    function init() {

        Physijs.scripts.worker = 'physijs_worker.js';
        Physijs.scripts.ammo = 'ammo.js';

        // Add the camera
        CameraService.perspectiveCam.position.set(0, 20, 100);
        SceneService.scene.add(CameraService.perspectiveCam);

        camera = CameraService.perspectiveCam;
        scene = SceneService.scene;
        // create the renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.addEventListener('click', onMouseClick, false);

        // set up the controls with the camera and renderer
        //  controls = new THREE.FirstPersonControls(CameraService.perspectiveCam, renderer.domElement);
        clock = new THREE.Clock();
        controls = new THREE.FirstPersonControls(CameraService.perspectiveCam);
        controls.movementSpeed = 50;
        controls.lookSpeed = 0.05;
        // add renderer to DOM
        document.getElementById("renderGame").appendChild(renderer.domElement);

        // handles resizing the renderer when the window is resized
        // window.addEventListener('resize', onWindowResize, false);
        /*var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    				var cubeMaterial = new THREE.MeshLambertMaterial({
        				color: 0xff0000
    				});
    				
   				 var cube = new Physijs.Mesh(cubeGeometry, cubeMaterial);
    			 cube.castShadow = true;
    			 camera.lookAt(scene.position);
   			 // position the cube
    			cube.position.x = 0;
    			cube.position.y = 0;
    			cube.position.z = 0;*/

        geometry = new THREE.CubeGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            wireframeLinewidth: 2
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        mesh.position.x = 10;
        mesh.position.y = 10;
        mesh.position.z = 10;

        /*   			  add the cube to the scene
         */
        camera.position.x = 0;
        camera.position.y = 20;
        camera.position.z = 100;
        camera.lookAt(scene.position);

        scene.add(camera);

        var planeGeometry = new THREE.PlaneGeometry(580, 670, 51, 51);
        var planeMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('resources/Apollo15.jpg')
        });
        var plane = new Physijs.PlaneMesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('resources/Apollo15.jpg')
            }),
            .8, // high friction
            .3 // low restitution
        );
        ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
        ground_material.map.repeat.set(3, 3);

        ground = new Physijs.BoxMesh(
            new THREE.BoxGeometry(100, 1, 100),
            ground_material,
            0 // mass
        );
        scene.add(ground);
        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 25
        plane.position.y = 0
        plane.position.z = 0

        // add the plane to the scene
        scene.add(plane);
        //  scene.fog = new THREE.FogExp2(0xffffff, 0.005);

        // create a cube
        var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0xff0000
        });
        var cube = new Physijs.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;

        // add the cube to the scene
        scene.add(cube);
        var boxMaterial = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({
                color: 0x0000FF
            }), 0, 1);
        /* var directionalLight = new THREE.DirectionalLight(0xff0000, 0.5);
         directionalLight.position.set(0, 0, 1);

         // var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xff0000, 0.6 );

         //     hemiLight.position.set( 0, 500, -500 );
         //	scene.add(hemiLight);
         //scene.add( directionalLight );*/
        box = new Physijs.BoxMesh(


            new THREE.CubeGeometry(5, 5, 5),
            boxMaterial
        );
        /* var ambiColor = "#ff0000";
         var ambientLight = new THREE.AmbientLight(0x000000);
         scene.add(ambientLight);*/

        /* var pointColor = "#ff0000";
         var pointLight = new THREE.PointLight(pointColor);
         pointLight.distance = 200;
         scene.add(pointLight);*/
        box.position.y = 50;
        box.position.z = -10;
        box.rotation.z = 10;
        box.rotation.x = 50;

        /* box.name ="box";*/
        scene.add(box);
        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('resources/Micro.png')
        });
        var sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial, undefined, {
            restitution: Math.random() * 1.5
        });



        geometry = new THREE.IcosahedronGeometry(20, 1);

        material = new THREE.MeshBasicMaterial({
            color: 0x0000ff
        });
        mesh = new Physijs.Mesh(geometry, material);
        mesh.name = "change";
        scene.add(mesh);

        mesh.position.y = 20;

        var geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        var material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            wireframe: true
        });
        var torus = new THREE.Mesh(geometry, material);
        scene.add(torus);
        torus.position.x = -40;
        torus.position.y = 20;
        // position the sphere
        sphere.position.x = 20;
        sphere.position.y = 50;
        sphere.position.z = 2;
        sphere.castShadow = true;

        // add the sphere to the scene
        scene.add(sphere);

        // position and point the camera to the center of the scene
        camera.position.x = 0;
        camera.position.y = 20;
        camera.position.z = 100;
        camera.lookAt(scene.position);
        /*
            var light = new THREE.PointLight(0xff0000, 1, 100);
            light.position.set(-50, 50, -500);
            scene.add(light);
            // add subtle ambient lighting
            var ambientLight = new THREE.AmbientLight(0x0c0c0c);
            scene.add(ambientLight);
        */
        /* // add spotlight for the shadows
         var spotLight = new THREE.SpotLight(0xffffff);
         spotLight.position.set(-20, 140, 20);
         spotLight.castShadow = true;
         scene.add(spotLight);*/

        /*var spotLight1 = new THREE.SpotLight(0xffff00);
        spotLight.position.set(-20, 140, 20);
        spotLight.castShadow = true;
        scene.add(spotLight);*/

        /* var pointColor = "#ffffff";
         var spotLight = new THREE.SpotLight(pointColor);
         spotLight.position.set(0, 0, 10);
         spotLight.castShadow = true;
         spotLight.target = plane;
         scene.add(spotLight);*/

        /* var textureFlare0 = THREE.ImageUtils.loadTexture("resources/Micro.png");
         var flareColor = new THREE.Color(0xffaacc);
         var lensFlare = new THREE.LensFlare(textureFlare0, 350, 0.0, THREE.AdditiveBlending, flareColor);
         lensFlare.position.x = 10;
         lensFlare.position.y = 10;
         lensFlare.position.z = 100;
         scene.add(lensFlare);*/
    }

    function animate() {
        scene.simulate();
        requestAnimationFrame(animate);
        renderer.render(SceneService.scene, CameraService.perspectiveCam);
        controls.update(clock.getDelta());

    }

    function onMouseClick(evt) {
        console.log("hi");
        console.log(evt);
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        mouse_vector.set(mouse.x, mouse.y, mouse.z);

        cancelAnimationFrame(animate);


        //the final step of the transformation process, basically this method call
        //creates a point in 3d space where the mouse click occurd
        projector.unprojectVector(mouse_vector, camera);

        var direction = mouse_vector.sub(camera.position).normalize();

        //ray = new THREE.Raycaster( camera.position, direction );
        ray.set(camera.position, direction);
        intersects = ray.intersectObjects(scene.children);

        for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].object) {
                if (intersects[i].object.name == "change") {
                    //  alert("change Project selected")
                    $location.path("/orgStruct/");
                    $scope.$apply();

                }
            }
        }
    }


});

implCockpit.controller('quizCtrl', function($scope) {
    {
        $scope.showResult = false;
        $scope.answerScore = 0;
        $scope.questions = [{
            "questions": {
                "question": "Current Implementation Cockpit Supports how many Change Projects",
                "answers": [
                    "1",
                    "2",
                    "10",
                    "Multiple"
                ],
                "a": 0
            }
        }, {
            "questions": {
                "question": "Change Project can be created in which Phase",
                "answers": [
                    "ProductionPhase",
                    "RealizePhase",
                    "ChangePhase",
                    "EvaluatePhase"
                ],
                "a": 2
            }
        }, {
            "questions": {
                "question": "Implementation Cockpit Belongs to ",
                "answers": [
                    "SFin",
                    "SPro",
                    "SSuite",
                    "SCrm"
                ],
                "a": 2
            }
        }, {
            "questions": {
                "question": "Change Project can be created in which Phase",
                "answers": [
                    "ProductionPhase",
                    "RealizePhase",
                    "ChangePhase",
                    "EvaluatePhase"
                ],
                "a": 2
            }
        }, {
            "questions": {
                "question": "Change Project can be created in which Phase",
                "answers": [
                    "ProductionPhase",
                    "RealizePhase",
                    "ChangePhase",
                    "EvaluatePhase"
                ],
                "a": 2
            }
        }, {
            "questions": {
                "question": "Change Project can be created in which Phase",
                "answers": [
                    "ProductionPhase",
                    "RealizePhase",
                    "ChangePhase",
                    "EvaluatePhase"
                ],
                "a": 1
            }
        }];

        $scope.setAnswer = function(question, answer) {
            if ($scope.questions[question].questions.a == answer)
                $scope.answerScore++;

        }
        $scope.compute = function(question) {
            $scope.showResult = true;
        }

    }


});

implCockpit.controller('orgStruct', function($scope) {

    var treeData = [{
        "name": "Suta",
        "info": "Manager",
        "children": [{
            "name": "ModelS",
            "info": "Implementation Cockpit",
            "children": [{
                    "name": "UI Development",
                    "info": "Fiori Development",
                    "children": [{
                        "name": "Vinay",
                        "info": "Scrum Master"
                    }, {
                        "name": "Dinesh",
                        "info": "Senior Developer"
                    }]

                }, {
                    "name": "BackEnd",
                    "info": "ABAP",
                    "children": [{
                        "name": "Leon",
                        "info": "Scrum Architect"
                    }, {
                        "name": "Saurabh",
                        "info": "Scrum Architect"
                    }]
                }

            ]
        }, {
            "name": "DC",
            "info": "Deployment Cockpit",
            "children": [{
                    "name": "Bharat",
                    "info": "Development Specialist"
                }, {
                    "name": "Nanditha",
                    "info": "Design Thinking Coach"
                }




            ]
        }, {
            "name": "TR",
            "info": "Task Respository",
            "children": [{
                    "name": "Muthu",
                    "info": "Scrum Architect"
                }, {
                    "name": "Ishwar",
                    "info": "Scrum Architect"
                }




            ]
        }]
    }];


    // ************** Generate the tree diagram	 *****************
    var margin = {
            top: 20,
            right: 120,
            bottom: 20,
            left: 120
        },
        width = 1200 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var copy = [];

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    d3.select(self.frameElement).style("height", "500px");

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) {
            d.y = d.depth * 180;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function(d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", click)
            .on('contextmenu', rightClick)
            .on('mouseover', hover)
            .on('mouseout', out);
        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", function(d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
                return d.name;
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function(d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function rightClick(d) {
        d3.event.preventDefault();

        var position = d3.mouse(this);
        var node = d3.select(this).attr("id");
        d3.select('#my_custom_menu')
            .style('position', 'absolute')
            .style('left', position[0] + 1000 + "px")
            .style('top', position[1] + 300 + "px")
            .style('display', 'block');
        console.log(d);
        var data = this;
        $('ul.liStyling').on('click', 'li', function(eve) {
            console.log(this.textContent);
            console.log(eve);
            if (this.textContent == "Info") {
                alert(d.info);
            } else if (this.textContent == "Close") {
                document.getElementById("my_custom_menu").style.display = 'none';
                $('ul.liStyling').off();
            } else if (this.textContent == "Delete") {
                d.children = [];
                update(d);
            } else if (this.textContent == "Paste") {
                var copy1 = copy.children;
                for (var i = 0; i < copy1.length; i++) {
                    var element = copy1[i];
                    d.children.push(element);
                }
                update(d);
            } else if (this.textContent == "Copy") {
                console.log(copy);
                var name;
                var info;
            } else if (this.textContent = "Add") {

            }

        });
        //document.getElementById("my_custom_menu").addEventListener("click", displayInfo(d));
        d3.event.preventDefault();
        //document.getElementById('nodeId').value= node
    }

    function displayInfo(d) {
        console.log(this);
    }

    function hover(d, e) {

            //alert(d.info);
        }
        // Toggle children on click.
    function click(d) {
        if (!d.children && !d._children) {
            d.children = [];

        }

        var selectValue = $('#action').val();
        if (selectValue == "none") {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {

                d.children = d._children;
                d._children = null;

                //d.children.append=[{"name":orgValue}];
            }
            update(d);
        } else if (selectValue == "add") {
            var orgValue = $('#orgValue').val();
            d.children.push({
                "name": orgValue
            });
            update(d);
        } else if (selectValue == "copy") {
            copy = (JSON.parse(JSON.stringify(d.children)));
            console.log(copy);
        } else if (d.children) {
            copy.push(d._children);
        } else if (selectValue == "paste") {
            d.children.push(copy);
            update(d);
        } else if (selectValue == "delete") {
            d.children = [];
            d._children = [];
            update(d);
        }
    }

    function out() {

    }
});

implCockpit.controller('progressController', function($scope) {

    this.progress = {};
    this.progress.status = 100;
    /*$scope.apply(function(){
    $scope.progress=dataService.progress;
    });
    */
    this.setUpdate = function() {
        this.progress.status = dataService.progress;
    };
});
implCockpit.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/game/', {
            templateUrl: 'partials/game.html',
            controller: 'gameCtrl'
        }).
        when('/quiz/', {
            templateUrl: 'partials/quiz.html',
            controller: 'quizCtrl'
        }).
        when('/orgStruct/', {
            templateUrl: 'partials/org_struct.html',
            controller: 'orgStruct'
        }).
        otherwise({
            redirectTo: '/'
        });

    }
]);