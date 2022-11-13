let width = innerWidth;

container1 = document.getElementById('canvas1');
document.body.appendChild(container1);

container2 = document.getElementById('canvas2');
document.body.appendChild(container2);

renderer1 = new THREE.WebGLRenderer({alpha: true});
renderer1.setClearColor(0xffffff, 0);
renderer1.setSize(Math.round(0.4875 * width), Math.round(0.4875 * width));
container1.appendChild(renderer1.domElement);

renderer2 = new THREE.WebGLRenderer({alpha: true});
renderer2.setClearColor(0xffffff, 0);
renderer2.setSize(Math.round(0.4875 * width), Math.round(0.4875 * width));
container2.appendChild(renderer2.domElement);

var scene1 = new THREE.Scene();
var scene2 = new THREE.Scene();

var camera1 = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
camera1.position.z = 14;

var camera2 = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
camera2.position.z = 14;

var controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
controls1.enableDamping = true;
controls1.dampingFactor = 0.25;
controls1.enableZoom = false;
controls1.autoRotate = true;
controls1.autoRotateSpeed = -1.0;

var controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
controls2.enableDamping = true;
controls2.dampingFactor = 0.25;
controls2.enableZoom = false;
controls2.autoRotate = true;
controls2.autoRotateSpeed = -1.0;

function clicked()
{
    if(controls1.autoRotate == true)
    {
        controls1.autoRotate = false;
        controls2.autoRotate = false;
        toggle_btn.innerText = "Resume autorotation";
    }
    else
    {
        controls1.autoRotate = true;
        controls2.autoRotate = true;
        toggle_btn.innerText = "Pause autorotation";
    }
}

const light1 = new THREE.AmbientLight(0xffffff, 1.2);
scene1.add(light1);

const light2 = new THREE.AmbientLight(0xffffff, 1.2);
scene2.add(light2);

var mtlLoader1 = new THREE.MTLLoader();
mtlLoader1.setTexturePath('./assets/');
mtlLoader1.setPath('./assets/');
mtlLoader1.load('earth1.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./assets/');
    objLoader.load('earth.obj', function (object) {
        scene1.add(object);
    });
});

var mtlLoader2 = new THREE.MTLLoader();
mtlLoader2.setTexturePath('./assets/');
mtlLoader2.setPath('./assets/');
mtlLoader2.load('earth2.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./assets/');
    objLoader.load('earth.obj', function (object) {
        scene2.add(object);
    });
});

var animate1 = function () {
    requestAnimationFrame(animate1);
    controls1.update();
    renderer1.render(scene1, camera1);
};

var animate2 = function () {
    requestAnimationFrame(animate2);
    controls2.update();
    renderer2.render(scene2, camera2);
};

animate1();
animate2();
