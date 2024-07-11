let w = 500;
let h = 500;

setBackground('img/space.png', 2, 2)

// Cria os objetos
const player = new Spr(0, 100, 150, 150, 'img/nave/base.png');
camera(player, 30);
//player.scale(2, 2)
player.z = 2;

const player2 = new Spr(0, 400, 24, 21, 'img/nave/base.png');
//player2.scale(2, 2)
player2.z = 1;

const left = new Rect(-100, -100, 100, 100, 'green')
left.ui = true;

const right = new Rect(left.x + 100, h * -0.3, 100, 100, 'green')
right.ui = true;

const down = new Rect(w * 0.2, h * -0.4, 100, 100, 'green')
//down.ui = true;

const up = new Rect(w * 0.2, down.y + 100, 50, 50, 'green')
//up.ui = true;

const baseII = new Spr(1800, 0, 100, 80, 'img/BaseII.png')
baseII.scale(2, 2);
baseII.rotate = -90;
baseII.z = 4;

const dropship = new Spr(0, -500, 65, 82, 'img/experimental_dropship.png')
dropship.scale(2, 2)
dropship.z = 2;

const boss = new Spr(0, 1200, 403, 400, 'img/rEAK.png')
boss.scale(2, 2);
boss.rotate = 180;
boss.z = 5;

/*
// Cria o sistema de partículas
let fire1 = new Particle(player.x, player.y, 10, 'yellow', 5000, 60);
fire1.rotate = -100;
fire1.z = 0;

let fire2 = new Particle(player.x, player.y, 10, 'orange', 5000, 60);
fire2.rotate = -100;
fire2.z = -1;

const fire3 = new Particle(player.x, player.y, 10, 'red', 5000, 60);
fire3.rotate = -100;
fire3.z = -2;
*/
let bgX, bgY;

// Loop do jogo
function TIC() {
  // Limpa a tela
  cls()
  //screen.debug()
  bgX = -player.x/10;
  bgY = player.y/10;
  //bgPosition(bgX, bgY)
  
  // Desenha os objetos
  player.display()
  player2.display()
  right.display()
  left.display()
  up.display()
  down.display()
  
  baseII.display()
  boss.display()
  
  dropship.display();
  
  // Move o player
  move(speed);
  //changeSpr();
  /*
  // Atualiza a posição do sistema de partículas para a posição atual do player
  fire1.x = player.x;
  fire1.y = player.y;
  fire1.rotate = -player.rotate-90;
  fire2.x = player.x;
  fire2.y = player.y;
  fire2.rotate = -player.rotate-90;
  fire3.x = player.x;
  fire3.y = player.y;
  fire3.rotate = -player.rotate-90;
  
  // Exibe as partículas
  fire1.display(anim);
  fire2.display(anim);
  fire3.display(anim);
*/

//colide2(player, player2);

  
}

let speed = 10;
let angle = 90;
let anim = 'hide'; // Mostra ou esconde a animação de fogo

// Função para calcular a direção da nave
function getDirection() {
  if (right.isPressed) {
    return -1;
  } else if (left.isPressed) {
    return 1;
  } else {
    return 0;
  }
}

// Função para calcular o movimento vetorial
function getMovementVector(angle, speed) {
  const radians = angle * Math.PI / 180; // Converte o ângulo para radianos
  return {
    x: Math.cos(radians) * speed, // Calcula o movimento do x
    y: Math.sin(radians) * speed // Calcula o movimento do y
  };
}

// Move o player
function move(speed) {
  const direction = getDirection();
  angle += direction * speed;

  // Aplica a rotação ao player
  player.rotate = -angle + 90;

  // Calcula o movimento vetorial baseado no ângulo e velocidade atual
  const movementVector = getMovementVector(angle, speed);

  // Atualiza a posição do player baseado no movimento vetorial
  if (up.isPressed) {
    player.x += movementVector.x;
    player.y += movementVector.y;
    anim = 'show';
  } else if (down.isPressed) {
    player.x -= movementVector.x;
    player.y -= movementVector.y;
  } else {
    anim = 'hide';
  }
}



function colide2(r1, r2) {
  // r1 -> bloqueado
  // r2 -> parede
  // Distâncias entre os centros dos elipses
  var catX = r1.x - r2.x;
  var catY = r1.y - r2.y;
  
  // Raio das elipses (metade das dimensões)
  var r1RadiusX = r1.width / 2;
  var r1RadiusY = r1.height / 2;
  var r2RadiusX = r2.width / 2;
  var r2RadiusY = r2.height / 2;

  // Distância entre os centros normalizada pelos raios
  var normalizedCatX = catX / (r1RadiusX + r2RadiusX);
  var normalizedCatY = catY / (r1RadiusY + r2RadiusY);

  // Verifica colisão elíptica
  if (normalizedCatX * normalizedCatX + normalizedCatY * normalizedCatY < 1) {
    var overlapX = (r1RadiusX + r2RadiusX) / Math.abs(normalizedCatX);
    var overlapY = (r1RadiusY + r2RadiusY) / Math.abs(normalizedCatY);

    if (overlapX >= overlapY) { // Colisão por cima ou por baixo
      if (catY > 0) { // Por cima
        r1.y += overlapY;
      } else {
        r1.y -= overlapY;
      }
    } else { // Colisão pela esquerda ou direita
      if (catX > 0) { // Pela esquerda
        r1.x += overlapX;
      } else {
        r1.x -= overlapX;
      }
    }
  }
}
