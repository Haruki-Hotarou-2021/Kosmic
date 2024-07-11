/*
@Concluído: 04/07/24 17:31
*/

// CAMERA -------------------------------

// Funções de câmera
let cameraTarget = null;
let cameraSmooth = 1;

function camera(target, smooth = 1) {
  cameraTarget = target;
  cameraSmooth = smooth;
}

// Posições atuais da câmera
let currentOffsetX = -500;
let currentOffsetY = -500;


// Loop de atualização da câmera
function updateCamera() {
  if (cameraTarget) {
    const targetX = cameraTarget.x;
    const targetY = -cameraTarget.y;

    const desiredOffsetX = targetX - 500;
    const desiredOffsetY = targetY - 500;

    // Ajuste suave da posição atual
    currentOffsetX += (desiredOffsetX - currentOffsetX) / cameraSmooth;
    currentOffsetY += (desiredOffsetY - currentOffsetY) / cameraSmooth;

    mainElement.setAttribute("viewBox", `${currentOffsetX} ${currentOffsetY} 1000 1000`);
  } else {
    mainElement.setAttribute("viewBox",` -500 -500 1000 1000`);
  }
}








/*

// Configurações de câmera
let cameraTarget = null;
let cameraSmooth = 1;

function camera(target, smooth = 1) {
  cameraTarget = target;
  cameraSmooth = smooth;
}

// Loop de atualização da câmera
function updateCamera() {
  if (cameraTarget) {
    const targetX = cameraTarget.x;
    const targetY = cameraTarget.y;

    const viewBoxX = targetX - 500 * cameraSmooth;
    const viewBoxY = -targetY - 500 * cameraSmooth;

    mainElement.setAttribute("viewBox", `${viewBoxX} ${viewBoxY} 1000 1000`);
  } else {
    mainElement.setAttribute("viewBox", `-500 -500 1000 1000`);
  }
}
*/