// Cria a tag main e configura o body
const bodyElement = document.body;
bodyElement.style.width = '100vw';
bodyElement.style.height = '100vh';
bodyElement.style.overflow = 'hidden';
bodyElement.style.margin = '0';
bodyElement.style.padding = '0';
bodyElement.style.backgroundColor = '#42445A';

const mainElement = document.createElement('main');

mainElement.style.width = '100%';
mainElement.style.height = '100%';
mainElement.style.position = 'fixed';
mainElement.style.top = '50%';
mainElement.style.left = '50%';
mainElement.style.transform = 'translate(-50%, -50%)';
//mainElement.style.overflow = 'hidden';
mainElement.style.backgroundColor = 'transparent';

document.body.appendChild(mainElement);


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
    //mainElement.style.overflow = 'hidden';
    screenLimit.style.backgroundColor = 'transparent';
  
    mainElement.appendChild(screenLimit);
    bodyElement.style.transform = `scale(${scale}, ${scale})`;
  },
  width: mainElement.offsetWidth,
  height: mainElement.offsetHeight
}







// Cria um novo estilo
const style = document.createElement('style');
style.type = 'text/css';


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
  //window.close();
  // Prevent default back button behavior
  history.pushState(null, null, ""); // Update browser history without creating a new entry
  // Optionally, disable the back button (only works in some browsers)
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


// Cria um retângulo
class Rect {
  constructor(x = 0, y = 0, height = 50, width = 50, color = 'black', fill = 'fill') {
    this.x = x;
    this.y = y;
    this.z = 50;
    this.width = width;
    this.height = height;
    this.borderSize = 2;
    this.color = color;
    this.fill = fill; // 'fill' ou 'stroke'
    this.ui = false;
    this.rotate = 0;
    this.scaleX = 1;
    this.scaleY = 1;
  }

  display(state = 'show') {
    this.rectElement = document.createElement('div');
    this.rectElement.id = this.constructor.name;
    this.rectElement.classList.add('rect');
    this.rectElement.style.position = 'fixed';
    this.rectElement.style.zIndex = this.z;
    this.rectElement.style.left = `${(this.x+screen.width/2)-(this.width/2)}px`;
    this.rectElement.style.bottom = `${(this.y+screen.height/2)-(this.height/2)}px`;
    this.rectElement.style.transform = `scale(${this.scaleX}, ${this.scaleY}) rotate(${this.rotate}deg)`;
    
    if (this.fill !== 'stroke') {
      this.rectElement.style.width = this.width + 'px';
      this.rectElement.style.height = this.height + 'px';
      this.rectElement.style.backgroundColor = this.color;
      
    }else{
      
      this.rectElement.style.border = `${this.borderSize}px solid ${this.color}`;
      this.rectElement.style.width = `${(this.width-2)-(this.borderSize*2)}px`;
      this.rectElement.style.height = `${(this.height-2)-(this.borderSize*2)}px`;
      this.rectElement.style.backgroundColor = 'transparent';
    }
    
    // Adiciona eventos de clique e touch para o retângulo
    /*
    rectElement.addEventListener('click', this.onClick.bind(this));
    */
    this.rectElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.rectElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    
    if (this.ui) {
      this.rectElement.style.left = `${(this.x) - (this.width / 2) - currentOffsetX}px`;
      this.rectElement.style.top = `${(-this.y) - (this.height / 2) - currentOffsetY}px`;
    }

    
    mainElement.appendChild(this.rectElement);
    
    if (state == 'hide') {
      this.rectElement.style.visibility = 'hidden';
    } else {
      this.rectElement.style.visibility = 'visible'
    } 
    
  }
  
  /*
    // Callback para o evento de clique
  onClick() {
    this.isPressed = true;
  }
  */

  // Callback para o evento de touchstart
  onTouchStart(callback) {
    this.isPressed = true;
    if (typeof callback === 'function') {
      callback();
    }
  }

  // Callback para o evento de touchend
  onTouchEnd(callback) {
    this.isPressed = false;
    if (typeof callback === 'function') {
      callback();
    }
  }
  
   // Destrói o retângulo
  destroy() {
    mainElement.removeChild(this.rectElement);
  }
  
// Escala o retângulo 
  scale(scaleX = 1, scaleY = 1) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
  }
  
  // Rotaciona o retângulo 
  rotate(degrees) {
    this.rotate = degrees;
  }
}
function rect(x = 0, y = 0, height = 50, width = 50, color = 'black', fill = 'fill') {
  let _rect = new Rect(x, y, height,width, color, fill);
  _rect.display();
  return _rect;
}


// Cria um sprite
class Spr {
  constructor(x = 0, y = 0, width = 50, height = 50, img, smooth = false) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width;
    this.height = height;
    this.img = img;
    this.smooth = smooth;
    this.rotate = 0;
    this.scaleX = 1;
    this.scaleY = 1;
     
  }
  
  display(state = 'show') {
    // Criar elemento DOM para o sprite
    this.spriteElement = document.createElement('img');
    this.spriteElement.id = this.constructor.name;
    this.spriteElement.classList.add('sprite');
    this.spriteElement.src = this.img;
    this.spriteElement.style.position = 'fixed';
    this.spriteElement.style.zIndex = this.z;
    this.spriteElement.style.width = this.width + 'px';
    this.spriteElement.style.height = this.height + 'px';
    this.spriteElement.style.left = `${(this.x+screen.width/2)-(this.width/2)}px`;
    this.spriteElement.style.bottom = `${(this.y+screen.height/2)-(this.height/2)}px`;
    this.spriteElement.style.transform = `scale(${this.scaleX}, ${this.scaleY}) rotate(${this.rotate}deg)`;
    
    if(!this.smooth) {
      // Aplica as propriedades de renderização da imagem
      this.spriteElement.style.imageRendering = 'pixelated'; 
      //this.spriteElement.style.imageRendering = '-moz-crisp-edges';
      //this.spriteElement.style.imageRendering = '-o-pixelated';
      //this.spriteElement.style.imageRendering = '-webkit-optimize-contrast';
      //this.spriteElement.style.imageRendering = 'crisp-edges';
    }

    // Adiciona eventos de clique e touch para o sprite
    /*
    this.spriteElement.addEventListener('click', this.onClick.bind(this));
    */
    this.spriteElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.spriteElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    // Adicionar sprite ao DOM
    mainElement.appendChild(this.spriteElement);
    
    if (state == 'hide') {
      this.spriteElement.style.visibility = 'hidden';
    } else {
      this.spriteElement.style.visibility = 'visible'
    }
  }
  
/*
  // Callback para o evento de clique
  onClick() {
    this.isPressed = true;
  }
*/
  // Callback para o evento de touchstart
  onTouchStart(callback) {
    this.isPressed = true;
    if (typeof callback === 'function') {
      callback();
    }
  }

  // Callback para o evento de touchend
  onTouchEnd(callback) {
    this.isPressed = false;
    if(typeof callback === 'function'){
      callback();
    }
  }
  
  // Destrói o sprite
  destroy() {
    mainElement.removeChild(this.spriteElement);
  }
  
  // Escala o sprite
  scale(scaleX = 1, scaleY = 1) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
  }
  
  // Rotaciona o sprite
  rotate(degrees = 0) {
    return this.rotate = degrees;
  }
  
}

function spr(x = 0, y = 0, width = 50, height = 50, img, smooth = false) {
  let _spr = new Spr(x, y, width, height, img, smooth);
  _spr.display();
  return _spr;
}

class Text {
  constructor(text = '', x = 0, y = 0, font = 'Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.align = 'center';
    this.size = 20;
    this.color = '#fff';
    this.rotate = 0;
  }
  
  display(state = 'show') {
    // Cria um elemento de texto
    this.textElement = document.createElement('p');
    this.textElement.id = this.constructor.name;
    this.textElement.classList.add('text');
    this.textElement.textContent = this.text;
    // Define as propriedades do texto
    this.textElement.style.fontSize = `${this.size}px`;
    this.textElement.style.fontFamily = this.font;
    this.textElement.style.color = this.color;
    this.textElement.style.position = 'fixed';
    this.textElement.style.userSelect = 'none'
    this.textElement.style.transform = `rotate(${this.rotate}deg)`;

    
    // Adiciona o texto ao elemento do DOM
    mainElement.appendChild(this.textElement);
    // Calcula o tamanho do texto
    const textMetrics = this.textElement.getBoundingClientRect();
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.height;
    // Define a origem do texto
    let centerX = screen.width / 2;
    let centerY = screen.height / 2;
    let textX = this.x;
    if (this.align == 'right') {
      textX = this.x + centerX;
    } else if (this.align == 'left') {
      textX = (this.x - textWidth) + centerX;
    } else {
      textX = (this.x - textWidth / 2) + centerX;
    }
    // Define a posição vertical do texto
    let textY = (this.y - textHeight) + centerY;
    // Define a posição do texto
    this.textElement.style.left = `${textX}px`;
    this.textElement.style.bottom = `${textY}px`;
    
    if (state == 'hide') {
      this.textElement.style.visibility = 'hidden';
    } else {
      this.textElement.style.visibility = 'visible'
    }
  }
  
  // Escala o texto
  scale(scaleX = 1, scaleY = 1) {
    this.textElement.style.transform = `scale(${scaleX}, ${scaleY})`;
  }
  
  // Rotaciona o texto
  rotate(degrees) {
  this.textElement.style.transform = `rotate(${degrees}deg)`;
  }
  
}
function print(text = '', x = 0, y = 0, font = 'Arial', fontSize = 20, color = '#000', align = 'center') {
  let _text = new Text(text, x, y, font);
  _text.color = color;
  _text.size = fontSize;
  _text.align = align;
  _text.display();
  return _text;
}




// Limpa a tela
function cls() {
  // Obtem todos os elementos filhos do mainElement
  const mainChildren = mainElement.childNodes;

  for (let i = mainChildren.length - 1; i >= 0; i--) {
    const child = mainChildren[i];
    // Remove cada elemento filho do mainElement que não tem a classe 'particle'
    if (!child.classList || !child.classList.contains('particle')) {
      mainElement.removeChild(child);
    }
  }
}






/*
// Limpa a tela
function cls() {
  // Obtem todos os elementos filhos do body
  const bodyChildren = mainElement.childNodes;

  for (let i = bodyChildren.length - 1; i >= 0; i--) {
    // Remove cada elemento filho do body
    mainElement.removeChild(bodyChildren[i]);
  }
}
*/







// Cria um novo script
function loadLib(script) {
  const _newScript = document.createElement("script");
  _newScript.src = script;
  document.head.appendChild(_newScript);
}
  
function loadFont(font) {
  
  let url = font;
let fontName = url.split('/').pop().split('.')[0]; // Obtém o nome da fonte a partir da URL
let fontFace;

// Verifica se a URL termina com .ttf, .woff, .woff2, etc.
if (url.endsWith('.ttf')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('truetype');
  }`;
} else if (url.endsWith('.woff')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('woff');
  }`;
} else if (url.endsWith('.woff2')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('woff2');
  }`;
} // Adicione mais formatos conforme necessário

  
  /*
  // Define o conteúdo da regra @font-face com o nome da fonte passado como parâmetro
  let URL;

  if (!url) {
    URL = `${fontName}.ttf`;
  } else {
    URL = url;
  }
  
  let fontFace = '\
  @font-face {\
    font-family: "' + fontName + '";\
    src: url("' + URL + '") format("truetype")}'/*,\
    src: url("' + URL + '") format("opentype"),\
    src: url("' + URL + '") format("woff"),\
    src: url("' + URL + '") format("woff2"),\
  }'*/
  // Adiciona a regra @font-face ao estilo
  style.appendChild(document.createTextNode(fontFace));
  // Adiciona o estilo ao cabeçalho do documento
  document.head.appendChild(style);
}

// Define o Título da página
function setTitle(title) {
  document.title = title;
}

// Define o favicon da página
function setFavicon(url) {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = url;
  document.head.appendChild(link);
}

// Recarrega a página
function reload() {
  window.location.reload();
}

// Aguardar segundos e executar callback
function wait(seconds, callback) {
  if (isNaN(seconds) || seconds < 0) {
    console.error("O parâmetro 'seconds' deve ser um número não negativo");
    return; // Retorna undefined se o parâmetro 'seconds' for inválido
  }
  if (typeof callback !== 'function') {
    console.error("O parâmetro 'callback' deve ser uma função");
    return; // Retorna undefined se o parâmetro 'callback' não for uma função
  }
  setTimeout(() => {
    callback(); // Chama a função callback após o tempo de espera
  }, seconds * 1000);
}


function colide(r1,r2){
	//r1 -> bloqueado
	//r2 -> parede
	//catetos; armazenam a distância entre os retângulos
	var catX = r1.x - r2.x;
	var catY = r1.y - r2.y;
	
	//soma das metades
	var sumHalfWidth = (r1.width/2) + (r2.width/2);
	var sumHalfHeight = (r1.height/2) + (r2.height/2);
	
	if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight){
		//r2.visible = false;
		//setTimeout(function(){
		//	r2.visible = true;
		//},1000);
		var overlapX = sumHalfWidth - Math.abs(catX);
		var overlapY = sumHalfHeight - Math.abs(catY);
		
		console.log(catX, catY)
		
		if(overlapX >= overlapY){//colisão por cima ou por baixo
			if(catY > 0){//por cima
				r1.y += overlapY;
			} else {
				r1.y -= overlapY;
			}
		} else {//colisão pela esquerda ou direita
			if(catX > 0){//colisão pela esquerda
				r1.x += overlapX;
			} else {
				r1.x -= overlapX;
			}
		}
	}
}













class Particle {
  constructor(x, y, size = 5, color = 'orange', lifetime = 1000, dispersion = 45) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.baseSize = size;
    this.color = color;
    this.lifetime = lifetime; // Lifetime in milliseconds
    this.dispersion = dispersion; // Ângulo de dispersão em graus
    this.rotate = 0; // Inicializa a rotação
    this.particles = []; // Lista de partículas
  }

  createParticle() {
    const size = this.baseSize * (0.75 + Math.random() * 0.5);
    const angle = this.rotate * Math.PI / 180 + (Math.random() - 0.5) * this.dispersion * Math.PI / 180;
    const velocityX = Math.cos(angle);
    const velocityY = Math.sin(angle);

    const particle = {
      x: this.x,
      y: this.y,
      size: size,
      color: this.color,
      creationTime: Date.now(),
      velocityX: velocityX,
      velocityY: velocityY,
      element: document.createElement('div')
    };

    particle.element.style.position = 'fixed';
    particle.element.style.visibility = this.state;
    particle.element.style.zIndex = this.z; // Para garantir que as partículas sejam renderizadas acima de outros elementos
    particle.element.style.backgroundColor = this.color;
    particle.element.style.borderRadius = '50%'; // Tornando a partícula circular
    particle.element.style.pointerEvents = 'none'; // Evitar interação do mouse com as partículas
    particle.element.id = this.constructor.name;
    particle.element.classList.add('particle'); // Adiciona a classe particle
    mainElement.appendChild(particle.element); // Anexar ao mainElement
    this.particles.push(particle);
  }

  updateParticle(particle) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - particle.creationTime;
    if (elapsedTime > this.lifetime) {
      this.destroyParticle(particle);
      return false;
    }

    const remainingLife = 1 - elapsedTime / this.lifetime;
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.size *= 0.96;
    particle.opacity = remainingLife;

    particle.element.style.left = `${(particle.x - particle.size / 2) + screen.width / 2}px`;
    particle.element.style.bottom = `${(particle.y - particle.size / 2) + screen.height / 2}px`;
    particle.element.style.width = `${particle.size}px`;
    particle.element.style.height = `${particle.size}px`;
    particle.element.style.opacity = particle.opacity;

    return particle.opacity > 0;
  }

  destroyParticle(particle) {
    if (particle.element && particle.element.parentNode) {
      mainElement.removeChild(particle.element); // Remover do mainElement
    }
  }

  display(state = 'show') {
    this.createParticle();
    this.particles = this.particles.filter(particle => this.updateParticle(particle));
    
    if (state == 'hide') {
      this.state = 'hidden';
    } else {
      this.state = 'visible';
    }
  }
}

















// Funções de câmera
let cameraTarget = null;
let cameraSmooth = 1;

function camera(target, smooth = 1) {
  cameraTarget = target;
  cameraSmooth = smooth;
}

// Posições atuais da câmera
let currentOffsetX = -screen.width/2;
let currentOffsetY = -screen.height/2;


// Loop de atualização da câmera
function updateCamera() {
  if (cameraTarget) {
    const targetX = -cameraTarget.x;
    const targetY = cameraTarget.y;

    const desiredOffsetX = targetX - screen.width / 2;
    const desiredOffsetY = targetY - screen.height / 2;

    // Ajuste suave da posição atual
    currentOffsetX += (desiredOffsetX - currentOffsetX) / cameraSmooth;
    currentOffsetY += (desiredOffsetY - currentOffsetY) / cameraSmooth;

    mainElement.style.transform = `translate(${currentOffsetX}px, ${currentOffsetY}px)`;
  } else {
    mainElement.style.transform = 'translate(-50%, -50%)';
  }
}

let loop = `
    function update() {
        let lastTime = 0;
        function loop(timestamp) {
          const dt = timestamp - lastTime;
          if (typeof TIC === 'function') {
            TIC(dt);
          }
          updateCamera();
          lastTime = timestamp;
          requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
      }
      update();
  `;


// Cria um novo elemento <script>
let scpt = document.createElement('script');

// Atribui o código JavaScript à propriedade textContent do novo elemento <script>
scpt.textContent = loop;

// Seleciona o elemento body
let body = document.querySelector('body');

// Adiciona o novo elemento <script> como um nó irmão do elemento body
document.body.parentNode.insertBefore(scpt, document.body.nextSibling);