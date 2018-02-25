(function()
{
  'use strict';
  window.GAME = window.GAME ||
  {};

  GAME.controls = {};

  GAME.controls.initMouse = function()
  {
    ENGINE.controls.pointer.onMove(function(event, point)
    {
      GAME.var.cameraTargetLon += point.x * 0.1;
      GAME.var.cameraTargetLat -= point.y * 0.1;
    });
  };

  GAME.controls.update = function()
  {
    if (ENGINE.controls.isKeyDown(ENGINE.controls.key.UP))
    {
      GAME.DATA.camera.lookAt(new THREE.Vector3().copy(GAME.var.cameraTarget).setY(GAME.DATA.camera.position.y));

      GAME.DATA.camera.translateZ(-GAME.const.cameraSpeed);

      GAME.DATA.camera.lookAt(GAME.var.cameraTarget);
    }

    if (ENGINE.controls.isKeyDown(ENGINE.controls.key.DOWN))
    {
        GAME.DATA.camera.lookAt(new THREE.Vector3().copy(GAME.var.cameraTarget).setY(GAME.DATA.camera.position.y));

      GAME.DATA.camera.translateZ(GAME.const.cameraSpeed);

      GAME.DATA.camera.lookAt(GAME.var.cameraTarget);
    }

    if (ENGINE.controls.isKeyDown(ENGINE.controls.key.LEFT))
    {
      GAME.DATA.camera.translateX(-GAME.const.cameraSpeed);
    }

    if (ENGINE.controls.isKeyDown(ENGINE.controls.key.RIGHT))
    {
      GAME.DATA.camera.translateX(GAME.const.cameraSpeed);
    }
  };
})();
