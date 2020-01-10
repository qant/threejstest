//https://github.com/mrdoob/three.js/
//https://github.com/mrdoob/three.js/archive/master.zip
// model from https://sketchfab.com/3d-models/the-neko-stop-off-hand-painted-diorama-a5ea0bf252884fceabf1007e8050f3fc
//video tutorial: https://www.youtube.com/watch?v=tsMHONmUkvI

let container;
let camera;
let renderer;
let scene;
let object;

function init() {
  container = document.querySelector(".scene");
  console.log(container);

  //Create scene
  scene = new THREE.Scene();

  const fov = 25;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 2000;
  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 30);
  scene.add(light);

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-100, 150, 1200);

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  //Load model
  let loader = new THREE.GLTFLoader();
  loader.load("./model/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    object = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  object.rotation.z += 0.02;
  renderer.render(scene, camera);
}

function resize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

init();

window.addEventListener("resize", resize);
