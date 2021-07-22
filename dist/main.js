var scene,camera,mesh,renderer,controls //objects used to do 3d model

var camera_positions = [[7.989,0.366,-0.18],[-0.002,0.514,7.982],[0.000,5.880,-0.00000],[-0.738,0.1437,-7.964],[-7.824,-0.152,-1.657],[0.000,-7.994,0.00000]]//x/y/z camera postions for each side of the sqaure 

var used_cube = false//used to check if user used to 3D cube to navigate or het nav bar
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);//check if site is on mobile or pc
var past_div = null//used to get the name of the past div that the user viewed, sets to null when user has not viewed any div

// if(isMobile == true){//displays a message to mobile users
//     var body_element = document.getElementsByTagName("BODY")[0];
//     body_element.innerHTML = body_element.innerHTML +
//     '<div class="mobile_message"> For the optimal experience, view on a desktop device</div';
// }
// else{
//     var body_element = document.getElementsByTagName("BODY")[0];
//     body_element.innerHTML = body_element.innerHTML +
//     '<div class="mobile_message"> <p>Double click on any side of the CUBE</p> <p>Click and drag your mouse to rotate</p></div';
// }

init();//initiate the 3D model
animate();//shows the 3D model on the site
window.history.forward(1)//stops the user from using browser back button

function init(){
    renderer = new THREE.WebGLRenderer();
    // render_setSize(window.innerWidth,window.innerHeight);
    render_setSize(600,300)
    document.body.appendChild(renderer.domElement);

    // window.addEventListener('resize',function(){//function used to change size of scene when size of browser window changes
    //     var width = window.innerWidth;
    //     var height = window.innerHeight;
    //     renderer.setSize(width,height);
    //     camera.aspect = width/height;
    //     camera.updateProjectmatrix;
    // })

    scene = new THREE.Scene();//space where 3D object is added to 

    //used to load custom image asb scene background
    // const img_loader = new THREE.TextureLoader();
    // img_loader.load('./1.jpg',function(texture){
    //     scene.background = texture;
    // });
    
    // const background_loader = new THREE.TextureLoader();
    // const texture = background_loader.load(
    //     'https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
    //     () => {
    //         const rt = new THREE.WebGLCubeRenderTarget(texture.image.height, texture.image.width);
    //         rt.fromEquirectangularTexture(renderer, texture);
    //         scene.background_loader = rt.texture;
    //     });
    
    // console.log(background_loader)

    var geometry = new THREE.SphereGeometry( 500, 60, 40 );
    geometry.scale(1,1,1);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/1.jpg')
    });

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)


    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    set_camera(7.989,0.366,-0.18)//set the camera position to the front of the 3D cube

    controls = new THREE.OrbitControls( camera, renderer.domElement );//Allows the user to rotate around the 3D object
    // controls.enableZoom = false
    controls.update()

    var previous_side = "About"
    var starting_y = null
    var moving_x = null
    var moving_y = null
    var region = document.getElementById("rotation_pad")
    region.addEventListener('touchstart', e=>{
        starting_x = e.touches[0].pageX
        starting_y = e.touches[0].pageY
    })
    
    region.addEventListener('touchmove', e=>{
        moving_x = e.touches[0].pageX
        moving_y  = e.touches[0].pageY
    })

    region.addEventListener('touchend', e=>{
        var test_x = Math.abs(starting_x - moving_x)
        var test_y = Math.abs(starting_y - moving_y)
        if (test_x > test_y){
            if((starting_x - moving_x) < 0){
                previous_side = determine_direction(previous_side,"right")
            }
            else{
                previous_side = determine_direction(previous_side,"left")
            }
        }
        else{
            if((starting_y - moving_y) < 0){
                previous_side = determine_direction(previous_side,"down")
            }
            else{
                previous_side = determine_direction(previous_side,"up")
            }
        }
    })
    
    var light = new THREE.AmbientLight(0xffffff, 1, 0 );//Adds ligthing object to scene
    scene.add(light);//adds lighting to scene

    //used to load custom 3D object
    var loader = new THREE.GLTFLoader();
    loader.load(`./The_cube.glb`,
        function (gltf){
            scene.add(gltf.scene);
        },
    );

    var raycaster = new THREE.Raycaster();//used as a base point to get mouse position relative to base point
    var mouse = new THREE.Vector3();

    if(isMobile == false){//stops mobile user from clicking and activating 3D object
        window.addEventListener('dblclick',raycast); //Single click used to rotate 3D-object, event listens for double click to stop possible miss clicks
    }

    function raycast(){
        console.log(camera.position)
        raycaster.setFromCamera(mouse,camera);
        let ray_x = raycaster.ray.direction.x;//gets current x position of object
        let ray_y = raycaster.ray.direction.y;//gets current y position of object
        let ray_z = raycaster.ray.direction.z;//gets current z position of object
        // console.log(raycaster.ray.direction)
        //if statements used to determine which side the user is looking at based on x/y/z opition
        if(ray_y >= 0.8){ //Bottom side
            zoomIN("References");
        }
        else if(ray_y <= -0.8){ //Top side
            zoomIN("Experience");
        }
        else{
            if(ray_z <= -0.9){ //Front side
                zoomIN("Langauge");
            }
            else if(ray_z >= 0.9){//Back side
                zoomIN("Downloads");
            }
            else{
                if(ray_x >= 0.9){//Left side
                    zoomIN("Links");
                }
                else if(ray_x <= -0.9){//Right side
                    zoomIN("About");
                }
            }
        }
    };    
}

function set_camera(x,y,z){//is used to set camera position to the side that the user clicked last
    camera.position.set(x,y,z);
};

function render_setSize(width,height){//used to change the size of the 3D scene to hide from users
    renderer.setSize(width,height);
};

function animate(){
	requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
};

function zoomIN(elementID){//zoom in animation function for the 3D object
    used_cube = true;
    setTimeout(function(){
        setTimeout(function(){
            showDiv(elementID);//calls function to show div according to the Id of the div
        },2000);

        gsap.to(camera.position,{//position to where to camera must go to
            duration:2,//duration of animation
            z:0,
            x:0,
            y:0,
            onUpdate: function(){
                camera.updateMatrix();//updates scene to create the animation effect
            }
        });
    
        gsap.to(controls.target,{
            duration:2,
            x:0,
            y:0,
            z:0,
            onUpdate: function(){
                controls.update();
            }
        });
        
    },0);
};

function zoomOut(elementID,previous_camera_pos){//function used to zoom out of 3D object once a user has clicked to home button
    setTimeout(function(){
        setTimeout(function(){
            gsap.to(camera.position,{
                duration: 3,
                x: previous_camera_pos[0],
                y: previous_camera_pos[1],
                z: previous_camera_pos[2],
                onUpdate:function(){
                    camera.updateMatrix();
                }
            })
        },500)
        render_setSize(window.innerWidth,window.innerHeight);//changes to size of the scene to be big once the user returns to the home page
        set_camera(0,0,0);//sets camera position to inside cube to allow animation to zoom out of cube
        elementID.style.visibility = "hidden";//changes the visiblity of the current viewed div to be hidden again
        elementID.classList.remove("heading");//used to remove class styles to hide div again
    },3000)
};

function determine_side(current_side,direction){
    var new_side = null
    switch(current_side){
        // about
        case 'About' : if(direction == 'up'){
                        new_side = "Experience"
                    }
                    else if(direction == 'right'){
                        new_side = "Downloads"
                    }
                    else if (direction == 'down'){
                        new_side = "References"
                    }
                    else{
                        new_side = "Langauge"
                    }
        break;
        // downloads
        case 'Downloads' : if(direction == 'up'){
                        new_side = "Experience"
                    }
                    else if(direction == 'right'){
                        new_side = "Interests"
                    }
                    else if (direction == 'down'){
                        new_side = "References"
                    }
                    else{
                        new_side = "About"
                    }
        break;
        // interest
        case 'Interests' : if(direction == 'up'){
                        new_side = "Experience"
                    }
                    else if(direction == 'right'){
                        new_side = "Langauge"
                    }
                    else if (direction == 'down'){
                        new_side = "Reference"
                    }
                    else{
                        new_side = "Download"
                    }
        break;
        // langauge
        case 'Langauge' : if(direction == 'up'){
                        new_side = "Experience"
                    }
                    else if(direction == 'right'){
                        new_side = "About"
                    }
                    else if (direction == 'down'){
                        new_side = "Reference"
                    }
                    else{
                        new_side = "Interest"
                    }
        break;
        // Experience
        case 'Experience' :  if (direction == 'down'){
                        new_side = "About"
                    }
        break;
        //References 
        case 'References' : if(direction == 'up'){
                        new_side = "About"
                    }
        break;
    }
    return new_side
}

function determine_direction(side,direction){
    new_side = determine_side(side,direction)
    rotate(new_side)
    return new_side
    // console.log(camera_touch.position)
    // if(camera_touch.position.y >= 0.8){ //Bottom side
    //     console.log("References");
    // }
    // else if(camera_touch.position.y <= -0.8){ //Top side
    //     console.log("Experience");
    // }
    // else{
    //     if(camera_touch.position.z <= -0.9){ //Front side
    //         console.log("Langauge");
    //     }
    //     else if(camera_touch.position.z >= 0.9){//Back side
    //         console.log("Downloads");
    //     }
    //     else{
    //         if(camera_touch.position.x >= 0.9){//Left side
    //             console.log("Links");
    //         }
    //         else if(camera_touch.position.x <= -0.9){//Right side
    //             console.log("About");
    //         }
    //     }
    // }
}

function rotate(rotate_side){
    console.log(rotate_side)
    const sides = ["About","Downloads","Interests","Langauge","References","Experience"]
    const sides_x = [7,0.020904104495790363,7,-0.010139336351216562,0.5,0.5]
    const sides_y = [-0.02975327986781878,-0.006864156244615587,-0.003881470534919586,-0.01783159229728872,-7,7]
    const sides_z = [0.043734974574030666,-7,-0.06437004881137393,7,9.999671259919298e-7,2.1319999999996445e-7]
    var index = sides.indexOf(rotate_side)
    console.log(index)
    setTimeout(function(){
        setTimeout(function(){
            gsap.to(camera.position,{
                duration: 3,
                x:sides_x[index],
                y:sides_y[index],
                z:sides_z[index],
                onUpdate:function(){
                    camera.updateMatrix();
                }
            })
        },500);
    },0)
}

function showDiv(elementID){// function used to remove a DIV html tag from the html file
    render_setSize(0,0);//hide scene
    var element = document.getElementById(elementID);

    if((past_div != elementID) && (past_div != null)){ //if statement is used to hide previous div when a user navigated using the nav bar
        prev_element = document.getElementById(past_div);
        prev_element.classList.remove("heading");
        prev_element.style.visibility = "hidden";
        prev_element.classList.add("hide_section");
    }

    if(isMobile == true){//changes the layout of langauge div if user is viewing page on a mobile device
        change_lang_mobil();//calls method to change innerHTML of div
    }
    
    document.getElementById(elementID+"_btn").disabled = false;//disables 
    element.classList.remove("hide_section");//used to remove class styles
    element.style.visibility = "visible";//changes div visiblity to allow user to see it
    element.classList.add("heading"); //used to add a new class style

    if(isMobile == true){//if statement used to had back button when on mobile
        var test = document.getElementById(elementID+'_btn')
        test.style.visibility = "hidden";
    };

    if(elementID == "Langauge"){//checks if th current div is the langauge dic
        var bar_elements = document.getElementsByClassName("bar_fill")//gets all the elements with the class of 'bar_fill'
        for(var i=0; i<bar_elements.length ;i++){//adds animation and width to each of the elements in bar_elements
            bar_elements[i].style.animationName = "bar_load";
            bar_elements[i].style.width="var(--percent)";
        };
    };
    past_div = elementID;//sets the current div to be the next previous div
}

function hideDiv(elementID){//method used to hide html and show the cube
    var element = document.getElementById(elementID);
    var previous_side;//used to save the camera position based on which div needs to be hidden
    switch(elementID){//switch statements is used to determine which camera position to use in the camera_position array
        case "About":
            previous_side = camera_positions[0];
            break;
        case "Langauge":
            previous_side = camera_positions[1];
            var bar_elements=document.getElementsByClassName("bar_fill");//gets all the item with the 'bar_fill' class
            for(var i=0; i<bar_elements.length ;i++){//changes the animation name and width of each of the item with the 'bar_fill' class 
                bar_elements[i].style.animationName="";//removes animations
                bar_elements[i].style.width="";//makes element invisible
            }
            break;
        case "Experience":
            previous_side = camera_positions[2];
            break;
        case "Downloads":
            previous_side = camera_positions[3];
            break;
        case "Links":
            previous_side = camera_positions[4];
            break;
        case "References":
            previous_side = camera_positions[5];
            break;
    };
    
    if(document.getElementById(elementID+"_btn").disabled == false && used_cube == true){
        element.classList.add("hide_section");//adds class to div to hide div from user
        document.getElementById(elementID+"_btn").disabled = true;//disbales the back button to stop user from pressing multiple times
        zoomOut(element,previous_side);//class xoomout animation for 3D object
        used_cube = false;//changes used_cube to check if user useses the cube the next time
    }
    else{//changes div's properties for when user used the nav bar to move between different div's
        var element = document.getElementById(elementID);
        element.classList.add("hide_section");//used to add a new class style
        element.style.visibility = "hidden";
        element.classList.remove("heading");
        render_setSize(window.innerWidth,window.innerHeight);//Makes scene space bigger to show 3D object to user
    }
};

function open_new_window(URL){//function used to open other webpages in a new browser window
    window.open("https://"+URL);
};

function change_lang_mobil(){//function us used to replace the innerHTML of the langauge class when a user views the site on mobile
    var element = document.getElementById("lang_skils")
    var new_text = 
    '<section style="float: left; width:60%">'+
        '<p class="langauge_text" style"width:100%;">For the past 6 years I have been improving and expading my programming knowledge while also learning new langauges every change I get.</p>'+
        '<p class="langauge_text">I have a greater interest in back-end development but I am also passion for front-end development and providing the user with both a great user interface and expereince.</p>'+
        '<p class="langauge_text" style="width: 90%">I am very experienced working with SQL based databases, I haved used multiple different DBMS like MYSQL, Oracle and MS Access.</p>'+
    '</section>'+

    '<div class="bar_position" style="--top_position: 11rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p>C# - 9/10</p>'+
        '<div id="bar_border" style="--percent: 90%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 16rem;--right_position:19rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p >SQL - 8/10</p>'+
        '<div id="bar_border" style="--percent: 80%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 16rem;--right_position:4rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p>Python - 8/10</p>'+
        '<div id="bar_border" style="--percent: 80%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:22rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> JavaScript - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> C++ - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:0rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> Java - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 28rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> Delphi - 6/10</p>'+
        '<div id="bar_border" style="--percent: 60%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 33rem;--right_position:19rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> HTML - 5/10</p>'+
        '<div id="bar_border" style="--percent: 50%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 33rem;--right_position:4rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> CSS - 5/10</p>'+
        '<div id="bar_border" style="--percent: 50%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'

    element.innerHTML = new_text
}