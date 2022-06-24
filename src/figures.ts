function setupRotateHandler(scene) {
  let mouseDown = false,
    mouseX = 0,
    mouseY = 0;

  function rotateScene(deltaX, deltaY) {
    scene.rotation.z += deltaY * 0.01;
    scene.rotation.y += deltaX * 0.01;
  }

  function onMouseMove(evt) {
    if (!mouseDown) {
      return;
    }

    evt.preventDefault();

    let deltaX = evt.clientX - mouseX,
      deltaY = evt.clientY - mouseY;
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

  document.body.addEventListener(
    "mousemove",
    function (e) {
      onMouseMove(e);
    },
    false
  );
  document.body.addEventListener(
    "mousedown",
    function (e) {
      onMouseDown(e);
    },
    false
  );
  document.body.addEventListener(
    "mouseup",
    function (e) {
      onMouseUp(e);
    },
    false
  );
}

const figureProperties = {
  color: 0xc0ffee,
  transparent: true,
  opacity: 0.8,
};
const WIRE_FRAME_COLOR = { color: 0x61d0f1 };

const CONE_X_POSITION = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* - - - - - - - - - - - CONO TRUNCADO - - - - - - - - - - - - - - - */
const topRadius = 0.4;
const bottomRadius = 0.9;
const distanceBetweenCircles = 1.3;

const truncatedConeGeometry = new THREE.CylinderGeometry(
  topRadius,
  bottomRadius,
  distanceBetweenCircles,
  64
);
const truncatedConeMaterial = new THREE.MeshBasicMaterial(figureProperties);
const truncatedCone = new THREE.Mesh(
  truncatedConeGeometry,
  truncatedConeMaterial
);
// scene.add(truncatedCone);

/* - - - - - - - - - - - POLYHEDRON - - - - - - - - - - - - - - - */
const polyhedronGeometry = new THREE.DodecahedronGeometry(5, 0);

const polyhedronMaterial = new THREE.MeshBasicMaterial(figureProperties);
const polyhedron = new THREE.Mesh(polyhedronGeometry, polyhedronMaterial);
// scene.add(polyhedron);

polyhedron.scale.set(0.15, 0.15, 0.15);

const geomentryEdgesPolyhedron = new THREE.EdgesGeometry(polyhedron.geometry); // or WireframeGeometry
const materialPolyhedron = new THREE.LineDashedMaterial(WIRE_FRAME_COLOR);
const wireframePolyhedron = new THREE.LineSegments(
  geomentryEdgesPolyhedron,
  materialPolyhedron
);
// scene.add(wireframePolyhedron);

wireframePolyhedron.scale.set(0.15, 0.15, 0.15);

/* - - - - - - - - - - - CUBO - - - - - - - - - - - - - - - */
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial(figureProperties);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

/* - - - - - - - - - - - CONO - - - - - - - - - - - - - - - */
const coneHeight = 1.5;
const coneRadius = 2;
const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 64);
const coneMaterial = new THREE.MeshBasicMaterial(figureProperties);
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
// scene.add(cone);

// const verticesOfCube = [
//   -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
//   -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
// ];

// const indicesOfFaces = [
//   2,1,0,    0,3,2,
//   0,4,7,    7,3,0,
//   0,1,5,    5,4,0,
//   1,2,6,    6,5,1,
//   2,3,7,    7,6,2,
//   4,5,6,    6,7,4
// ];

// const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
// const verticesOfPolygon2D = [4, 2, 2.19, 2.5, 1.15, 0.92, 2.33, -0.54, 3.77, 0];
// const verticesOfPolygon = [
//   4, 2, -1, 2.19, 2.5, -1, 1.15, 0.92, -1, 2.33, -0.54, -1, 3.77, 0, -1,
// ];

// const verticesOfPolygon3D = [
// 0|  0, 0, 0,
// 1|  0, 0.48, 0,
// 2|  -0.46, 0.63, 0,
// 3|  -0.74, 0.24, 0,
// 4|  -0.46, -0.15, 0,
// ];

// const verticesOfPolygon3D = [
// 5|  2, 2, -2,
// 6|  2, 2.48, -2,
// 7|  1.54, 2.63, -2,
// 8|  1.26, 2.24, -2,
// 9|  1.54, 1.85, -2,
// ];
// const dictionaryPolygon3D = {

// }
// hexagono
const verticesOfPolygon2DDDDD = [
  0, 0, 0, 0.48, -0.46, 0.63, -0.74, 0.24, -0.46, -0.15,
];

const verticesOfPolygon3D = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1];
const verticesOfPolygon2D = [-1, -1, 1, -1, 1, 1, -1, 1];
// const verticesOfCube = [

//   -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
// ];
const indicesOfFacesOfPolygon = new Delaunator(verticesOfPolygon2DDDDD)
  .triangles;
console.log(indicesOfFacesOfPolygon);

// const vertices3DDDD = new Float32Array([
// 0   -0.74, 0.24, 0,
// 1  -0.46, 0.63, 0,
// 2  0, 0.48, 0,
// 3  0, 0.48, 0,
// 4  0, 0, 0,
// 5  -0.74, 0.24, 0,
// 6  0, 0, 0,
// 7  -0.46, -0.15, 0,
// 8  -0.74, 0.24, 0,
// ]);

// const vertices3DDDD_2 = new Float32Array([
//   1.26, 2.24, -2,
//   1.54, 2.63, -2,
//   2, 2.48, -2,
//   2, 2.48, -2,
//   2, 2, -2,
//   1.26, 2.24, -2,
//   2, 2, -2,
//   1.54, 1.85, -2,
//   1.26, 2.24, -2,
// ]);

const vertices3DDDD = new Float32Array([
  -0.74, 0.24, 0, -0.46, 0.63, 0, 0, 0.48, 0, 0, 0.48, 0, 0, 0, 0, -0.74, 0.24,
  0, 0, 0, 0, -0.46, -0.15, 0, -0.74, 0.24, 0,
]);

const vertices3DDDD_2 = new Float32Array([
  1.26, 2.24, -2, 1.54, 2.63, -2, 2, 2.48, -2, 2, 2.48, -2, 2, 2, -2, 1.26,
  2.24, -2, 2, 2, -2, 1.54, 1.85, -2, 1.26, 2.24, -2,
]);
//
const vertices3DDDD_3 = new Float32Array([
  0, 0, 0, -0.46, -0.15, 0, 1.54, 1.85, -2, 0, 0, 0, 2, 2, -2, 1.54, 1.85, -2,
]);

const geometry = new THREE.BufferGeometry();
const geometry_2 = new THREE.BufferGeometry();
const geometry_3 = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array(vertices3DDDD);
const vertices_2 = new Float32Array(vertices3DDDD_2);
const vertices_3 = new Float32Array(vertices3DDDD_3);

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geometry_2.setAttribute("position", new THREE.BufferAttribute(vertices_2, 3));
geometry_3.setAttribute("position", new THREE.BufferAttribute(vertices_3, 3));
const material = new THREE.MeshBasicMaterial({
  color: 0xc0ffee,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
const mesh_2 = new THREE.Mesh(geometry_2, material);
const mesh_3 = new THREE.Mesh(geometry_3, material);
scene.add(mesh);
scene.add(mesh_2);
scene.add(mesh_3);

// const mesh1 = new THREE.Mesh(geometry, material);
// mesh1.rotateX(Math.PI / 2);
// scene.add(mesh1);

//
// const geometryx = new THREE.PlaneGeometry(1, 1);
// const materialx = new THREE.MeshBasicMaterial({
//   color: 0xffff00,
//   side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(geometryx, materialx);
// scene.add(plane);
//
const polygonGeometry = new THREE.PolyhedronGeometry(
  verticesOfPolygon3D,
  indicesOfFacesOfPolygon,
  1,
  4
);
const polygonMaterial = new THREE.MeshBasicMaterial({
  color: 0xc0ffee,
  transparent: true,
  opacity: 1,
});

polygonGeometry.computeVertexNormals();
const polygon = new THREE.Mesh(polygonGeometry, polygonMaterial);
// scene.add(polygon);

// polygon.scale.set(0.15, 0.15, 0.15);

// var vertices = [
//   0, 0, 0, 0, 0.48, 0, -0.46, 0.63, 0, -0.74, 0.24, 0, -0.46, -0.15, 0,
// ];
// var holes = [];
// var triangles, mesh;
// var geometry = new THREE.BufferGeometry();
// var material = new THREE.MeshBasicMaterial();

// geometry.vertices = vertices;

// triangles = THREE.ShapeUtils.triangulateShape(vertices, holes);

// for (var i = 0; i < triangles.length; i++) {
//   geometry.faces.push(
//     new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2])
//   );
// }

// mesh = new THREE.Mesh(geometry, material);

/* - - - - - - - - - - - CIRCULO - - - - - - - - - - - - - - - */
const circleGeometry = new THREE.CircleGeometry(coneRadius, 128);
const circleMaterial = new THREE.MeshBasicMaterial({
  color: 0xc0ffee,
  transparent: true,
  opacity: 0,
});
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
// scene.add(circle);

/* - - - - - - Dashed line of cone height - - - - - - - - - - */
const lineMaterial = new THREE.LineDashedMaterial({
  color: 0xffffff,
  linewidth: 1,
  scale: 1,
  dashSize: coneHeight / 20,
  gapSize: coneHeight / 20,
});
const pointsLineConeHeight = [];
pointsLineConeHeight.push(new THREE.Vector3(-coneRadius, 0, 0));
pointsLineConeHeight.push(new THREE.Vector3(-coneRadius, coneHeight, 0));

const geometryLineConeHeight = new THREE.BufferGeometry().setFromPoints(
  pointsLineConeHeight
);

const lineConeHeight = new THREE.Line(geometryLineConeHeight, lineMaterial);
lineConeHeight.computeLineDistances();
// scene.add(lineConeHeight);

/* - - - - - - Dashed line of cone radius - - - - - - - - - - */
const lineMaterialRadius = new THREE.LineDashedMaterial({
  color: 0xffffff,
  linewidth: 1,
  scale: 1,
  dashSize: coneRadius / 20,
  gapSize: coneRadius / 20,
});
const pointsLineRadius = [];
pointsLineRadius.push(new THREE.Vector3(-coneRadius, -(coneHeight / 2), 0));
pointsLineRadius.push(new THREE.Vector3(0, -(coneHeight / 2), 0));

const geometryAux = new THREE.BufferGeometry().setFromPoints(pointsLineRadius);

const lineConeRadius = new THREE.Line(geometryAux, lineMaterialRadius);
lineConeRadius.computeLineDistances();
// scene.add(lineConeRadius);

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
const wireframeCircle = new THREE.LineSegments(
  geomentryEdgesCircle,
  materialCircle
);
circle.add(wireframeCircle);

/* - - - - - - - Posicion de las figuras - - - - - - - */
cube.position.x = -1.5;

truncatedCone.position.x = -3;
truncatedCone.position.y = 2;

cone.position.x = CONE_X_POSITION;

circle.position.x = cone.position.x;
circle.position.y = -coneHeight / 2;
circle.rotation.x = -Math.PI / 2;

lineConeHeight.position.x = cone.position.x + coneRadius;
lineConeHeight.position.y = -coneHeight / 2;
lineConeRadius.position.x = cone.position.x;
// lineConeRadius.position.y = coneHeight / 2;
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
