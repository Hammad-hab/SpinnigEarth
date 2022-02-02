import * as THREE from 'three'
import Img from './Comp/Img.bmp'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
var Appended = false
var ix = 10000
const Main = () => {

    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
    camera.position.z = 1;
    camera.position.x = 2
    camera.zoom = 10
    var time = 0
    var geometry = new THREE.SphereBufferGeometry(1)
    var material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
            time: { value: 10 },
            Smtexture: { value: new THREE.TextureLoader().load(Img) }
        },
        vertexShader: `
        uniform float time;
        varying float vNoise;
        varying vec2 vUv;
        void main() {
            vec3 newposition = position;
            // float noise = 0.5 * cnoise(vec3(position.x * 2., position.y  + time , 0.));
            // vNoise = noise;
            // newposition.z += noise;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0 );
        }`,
        fragmentShader: `
        varying float vNoise;
        uniform sampler2D Smtexture;
        varying vec2 vUv;
        void main(){ 
            // vec3 colorA = vec3(0.,0,0.);
            // vec3 colorB = vec3(0.5,1.3,0.5);
            // vec3 colorC = mix(colorB, colorA, 0 + 0.5);
            vec4 veiw = texture2D(Smtexture, vUv);
            gl_FragColor = veiw;
        }`,
        //wireframe: true,
    })

    var mesh = new THREE.Mesh(geometry, material);
    // var mesh2 = new THREE.Mesh(geometry2, material2)
    mesh.rotation.x = 2
    mesh.rotation.z = 3
    scene.add(mesh);
    // scene.add(mesh2)
    time += 0.05
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    var controls = new OrbitControls(camera, renderer.domElement)
    controls.minPolatAngle = 0
    controls.maxpPolarAngle = 1
    controls.enableZoom = true
    controls.enableRotate = true
    // renderer.setAnimationLoop(animation)
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (Appended === false) {
        document.body.appendChild(renderer.domElement);
        Appended = true
    }
    function animation() {
        //  requestAnimationFrame(animation)
        //  setTimeout(() => {
        mesh.rotation.x += 0.01
        mesh.rotation.z += 0.01
        mesh.rotation.y += 0.01
        renderer.render(scene, camera);

        //  }, 100);

    }
    setInterval(() => {
        animation()
    }, 120);
    animation()
    window.addEventListener(
        'resize',
        () => {
            renderer.setSize(window.innerWidth, window.innerHeight - 50);
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        }
    )
    window.addEventListener(
        'keypress',
        (e) => {
            if (e.key === 'w') {
                camera.position.z += 0.1
                camera.position.x = 0
                camera.position.y += 0.1
            }
            else if (e.key === 's') {
                camera.position.z -= 0.1
            }
        }

    )
  window.onload = () => {

  }
}

export default Main