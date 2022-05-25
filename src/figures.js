function setupRotateHandler(scene) {
    let mouseDown = false, mouseX = 0, mouseY = 0;
    function rotateScene(deltaX, deltaY) {
        scene.rotation.z += deltaY * 0.01;
        scene.rotation.y += deltaX * 0.01;
    }
    function onMouseMove(evt) {
        if (!mouseDown) {
            return;
        }
        evt.preventDefault();
        let deltaX = evt.clientX - mouseX, deltaY = evt.clientY - mouseY;
        mouseX = evt.clientX;
        mouseY = evt.clientY;
        rotateScene(deltaX, deltaY);
    }
    function onMouseDown(evt) {
        evt.preventDefault();
        mouseDown = true;
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }
    function onMouseUp(evt) {
        evt.preventDefault();
        mouseDown = false;
    }
    document.body.addEventListener("mousemove", function (e) {
        onMouseMove(e);
    }, false);
    document.body.addEventListener("mousedown", function (e) {
        onMouseDown(e);
    }, false);
    document.body.addEventListener("mouseup", function (e) {
        onMouseUp(e);
    }, false);
}
const figureProperties = {
    color: 0xc0ffee,
    transparent: true,
    opacity: 0.8,
};
const WIRE_FRAME_COLOR = { color: 0x61d0f1 };
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
/* - - - - - - - - - - - POLYHEDRON - - - - - - - - - - - - - - - */
const polyhedronGeometry = new THREE.DodecahedronGeometry(5, 0);
const polyhedronMaterial = new THREE.MeshBasicMaterial(figureProperties);
const polyhedron = new THREE.Mesh(polyhedronGeometry, polyhedronMaterial);
scene.add(polyhedron);
polyhedron.scale.set(0.15, 0.15, 0.15);
const geomentryEdgesPolyhedron = new THREE.EdgesGeometry(polyhedron.geometry); // or WireframeGeometry
const materialPolyhedron = new THREE.LineDashedMaterial(WIRE_FRAME_COLOR);
const wireframePolyhedron = new THREE.LineSegments(geomentryEdgesPolyhedron, materialPolyhedron);
scene.add(wireframePolyhedron);
wireframePolyhedron.scale.set(0.15, 0.15, 0.15);
/* - - - - - - - - - - - CUBO - - - - - - - - - - - - - - - */
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial(figureProperties);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
/* - - - - - - - - - - - CONO - - - - - - - - - - - - - - - */
const coneHeight = 1;
const coneRadius = 1;
const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 64);
const coneMaterial = new THREE.MeshBasicMaterial(figureProperties);
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
scene.add(cone);
/* - - - - - - - - - - - CIRCULO - - - - - - - - - - - - - - - */
const circleGeometry = new THREE.CircleGeometry(1, 128);
const circleMaterial = new THREE.MeshBasicMaterial({
    color: 0xc0ffee,
    transparent: true,
    opacity: 0,
});
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
scene.add(circle);
/* - - - - - - - - - - - Line - - - - - - - - - - - - - - - */
const lineMaterial = new THREE.LineBasicMaterial(WIRE_FRAME_COLOR);
const points = [];
points.push(new THREE.Vector3(-1, 0, 0));
points.push(new THREE.Vector3(-1, coneHeight, 0));
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, lineMaterial);
scene.add(line);
// - - - - Wireframe cube  - - - -
const geomentryEdgesCube = new THREE.EdgesGeometry(cube.geometry); // or WireframeGeometry
const materialCube = new THREE.LineBasicMaterial(WIRE_FRAME_COLOR);
const wireframeCube = new THREE.LineSegments(geomentryEdgesCube, materialCube);
cube.add(wireframeCube);
// ----
////////////////////////////////////////
// var radius = 4;
// var height = 5;
// var geometry66 = new THREE.CylinderGeometry(0, radius, height, 4, 1);
// var material = new THREE.MeshNormalMaterial();
// var pyramid = new THREE.Mesh(geometry66, material);
// scene.add(pyramid);
// - - - -  Wireframe cone  - - - -
// const geomentryEdgesCone = new THREE.EdgesGeometry(cone.geometry); // or WireframeGeometry
// const materialCone = new THREE.LineBasicMaterial({
//   ...WIRE_FRAME_COLOR,
//   vertexColors: false,
// });
// const wireframeCone = new THREE.LineSegments(
//   geomentryEdgesCone,
//   materialCone
// );
// cone.add(wireframeCone);
// - - - -  Wireframe circle  - - - -
const geomentryEdgesCircle = new THREE.EdgesGeometry(circle.geometry); // or WireframeGeometry
const materialCircle = new THREE.LineDashedMaterial(WIRE_FRAME_COLOR);
const wireframeCircle = new THREE.LineSegments(geomentryEdgesCircle, materialCircle);
circle.add(wireframeCircle);
/* - - - - - - - Posicion de las figuras - - - - - - - */
cube.position.x = -1.5;
cone.position.x = 1;
circle.position.x = 1;
circle.position.y = -coneHeight / 2;
circle.rotation.x = -Math.PI / 2;
line.position.x = 1 + coneRadius;
line.position.y = -coneHeight / 2;
// line.position.y = 1;
polyhedron.position.x = 0;
polyhedron.position.y = 2.5;
wireframePolyhedron.position.x = 0;
wireframePolyhedron.position.y = 2.5;
camera.position.z = 5;
setupRotateHandler(scene);
/* Animar la rotación de las figuras */
function animate() {
    requestAnimationFrame(animate);
    // figure.rotation.x += 0.008;
    // figure.rotation.y += 0.01;
    // cube.rotation.x += 0.008;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
