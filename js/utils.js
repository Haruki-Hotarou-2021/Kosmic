// Define o background da tela
function setBackground(img, repeatX = 1, repeatY = 1) {
  // Define a imagem de fundo
  bodyElement.style.backgroundImage = `url("${img}")`;
  // Calcula o tamanho da repetição
  const backgroundSizeX = repeatX > 0 ? (100 / repeatX) + '%' : 'auto';
  const backgroundSizeY = repeatY > 0 ? (100 / repeatY) + '%' : 'auto';
  // Define o tamanho do fundo
  bodyElement.style.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`;
  // Define a repetição do fundo
  bodyElement.style.backgroundRepeat = 'repeat';
}

function bgPosition(x, y) {
  bodyElement.style.backgroundPosition = `${x}px ${y}px`;
}

const screen = {
  scale(scale) {
    bodyElement.style.transform = `scale(${scale}, ${scale})`
  },
  debug(scale = 0.5) {
    const screenLimit = document.createElement('div');

    screenLimit.style.width = '100vw';
    screenLimit.style.height = '100vh';
    screenLimit.style.position = 'fixed';
    screenLimit.style.top = '50%';
    screenLimit.style.left = '50%';
    screenLimit.style.zIndex = '-1';
    screenLimit.style.transform = 'translate(-50%, -50%)';
    screenLimit.style.border = '2px solid red';
    screenLimit.style.backgroundColor = 'transparent';

    mainElement.appendChild(screenLimit);
    bodyElement.style.transform = `scale(${scale}, ${scale})`;
  },
  width: mainElement.clientWidth,
  height: mainElement.clientHeight
}

// Função assíncrona que pré carrega a tela
async function preloadScene(pageName) {
  try {
    const response = await fetch(`${pageName}.html`);
    if (response.ok) {
      console.log(`Preloaded: ${pageName}.html`);
    } else {
      console.error(`Failed to preload: ${pageName}.html`);
    }
  } catch (error) {
    console.error(`Preloading error: ${error.message}`);
  }
}

// Função para trocar de tela
function startScene(pageName) {
  window.location.href = `${pageName}.html`;
}

// Função para fechar a tela
function preventBack() {
  history.pushState(null, null, ""); // Update browser history without creating a new entry
  if (window.history.replaceState) {
    window.history.replaceState(null, null, ""); // Replace the current history entry
  }
}

// Função para salvar dados localmente
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Função para carregar dados salvos localmente
function load(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}


// Limpa a tela
function cls() {
  // Obtem todos os elementos filhos do body
  const bodyChildren = mainElement.childNodes;

  for (let i = bodyChildren.length - 1; i >= 0; i--) {
    // Remove cada elemento filho do body
    mainElement.removeChild(bodyChildren[i]);
  }
}
