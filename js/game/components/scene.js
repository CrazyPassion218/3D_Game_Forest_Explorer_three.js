(function()
{
  'use strict';
  window.GAME = window.GAME ||
  {};

  GAME.scene = {};

  GAME.scene.init = function()
  {
    GAME.DATA.renderer = new THREE.WebGLRenderer();

    GAME.DATA.scene = new Physijs.Scene;
    GAME.DATA.scene.fog = new THREE.Fog(0xabaf99, 0, 3000);

    GAME.DATA.camera = new THREE.PerspectiveCamera(GAME.const.cameraFov, ENGINE.NULL, 1, 20000);
    GAME.DATA.camera.position.z = 0;
    GAME.DATA.camera.position.y = GAME.const.cameraHeightOffset;
    GAME.DATA.scene.add(GAME.DATA.camera);

    GAME.DATA.renderer.setClearColor(GAME.DATA.scene.fog.color);
    GAME.DATA.renderer.sortObjects = false;

    var shader = THREE.ShaderLib["cube"];
    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    uniforms['tCube'].value = ENGINE.material.loadCube("downpour_light").texture;

    var _material = new THREE.ShaderMaterial(
    {
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: uniforms
    });

    var geometry = new THREE.CubeGeometry(2500, 2500, 2500, 7, 7, 7);
    var material = new THREE.MeshNormalMaterial();
    var mesh = new Physijs.BoxMesh(geometry, _material, 0);
    mesh.scale.x = -1;
    GAME.DATA.scene.add(mesh);

    var aLight = new THREE.AmbientLight(0x151c0f);
    GAME.DATA.scene.add(aLight);

    var pLight = new THREE.PointLight(0xe3fbdc, 0.9);
    pLight.position.set(1000, 600, 0);
    GAME.DATA.scene.add(pLight);

    var plane = new THREE.PlaneGeometry(5000, 5000);
    plane.computeTangents();

    var material = new THREE.MeshBasicMaterial(
    {
      color: 0x0f110d,
      map: ENGINE.material.load("ground").texture,
    });

    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.x = 20;
    material.map.repeat.y = 20;

    var ground = new Physijs.BoxMesh(plane, material, 0);
    ground.material.side = THREE.DoubleSide;
    ground.rotation.x = -Math.PI * 0.5;
    GAME.DATA.scene.add(ground);

    ENGINE.bind(GAME.DATA.renderer, GAME.DATA.camera, '#container');
  };
})();
