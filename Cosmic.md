# Kosmic 2D

Kosmic é um framework de jogos JavaScript 2D leve e fácil de usar, projetado para ajudar desenvolvedores iniciantes a criar jogos simples.

Esta documentação fornece uma visão geral do framework e documenta suas funções e classes principais. Para começar a usar o kodoma, siga estas etapas:

#### Inclusão: 
Adicione o arquivo kodoma.js ao seu projeto HTML, acima do arquivo do seu jogo:

```html
<script src="kosmic.js"></script>
<script src="game.js"></script>
```

## Funções e Classes

### `setBackground(img, repeatX, repeatY)`

Define a imagem de fundo da tela.

**Parâmetros:**
- `img`: URL da imagem de fundo.
- `repeatX`: Número de repetições horizontais (O padrão é 1)
- `repeatY`: Número de repetições verticais (O padrão é 1)

**Exemplo:**
```javascript
setBackground('background.jpg', 2, 3);
```

### `limit(scale)`

Configura os limites da tela.

**Parâmetros:**
- `scale`: Escala da tela (O padrão é 0.5)

**Exemplo:**
```javascript
limit(0.8);
```

### `screen`

Objeto que gerencia a tela.

**Métodos:**
- `scale(scale)`: Ajusta a escala da tela.
- `width`: Largura da tela.
- `height`: Altura da tela.

**Exemplo:**
```javascript
screen.scale(1.2);
screen.width;
screen.height;
```

### `preloadScene(pageName)`

Pré-carrega uma página HTML.

**Parâmetros:**
- `pageName`: Nome da página.

**Exemplo:**
```javascript
preloadScene('level1');
```

### `startScene(pageName)`

Troca de tela para uma nova página HTML.

**Parâmetros:**
- `pageName`: Nome da página.

**Exemplo:**
```javascript
startScene('level2');
```

### `save(key, value)`

Salva dados localmente.

**Parâmetros:**
- `key`: Chave de identificação dos dados.
- `value`: Valor dos dados.

**Exemplo:**
```javascript
save('playerScore', 100);
```

### `load(key)`

Carrega dados salvos localmente.

**Parâmetros:**
- `key`: Chave de identificação dos dados.

**Exemplo:**
```javascript
const score = load('playerScore');
```

### Classe `Rect`

Cria um retângulo na tela.

**Construtor:**
- `Rect(x, y, height, width, color, fill)`

**Métodos:**
- `display(state)`: Exibe o retângulo, o parâmetro state pode ser "show" (padrão) ou "hide" (para esconder)
- `destroy()`: Remove o retângulo.
- `scale(scaleX, scaleY)`: Escala o retângulo.
- `rotate`: Rotaciona o retângulo.
- `isPressed`: Retorna True quando o retângulo é pressionado e False quando o retângulo é solto.
- `ui`: Recebe um valor boleano para fazer com que o retângulo não seja afetado pelo movimento da câmera (O padrão é false)


**Exemplo:**
```javascript
const rect1 = new Rect(100, 100, 50, 50, 'red', 'fill');

rect1.display();
rect1.rotate = 45;
rect1.ui = true;
```

### `rect(x, y, height, width, color, fill)`

Função para criar um retângulo.

**Parâmetros:**
- `x`, `y`: Posições.
- `height`, `width`: Tamanho.
- `color`: Cor.
- `fill`: Tipo de preenchimento ('fill' ou 'stroke').

**Exemplo:**
```javascript
const myRect = rect(100, 100, 50, 50, 'blue', 'stroke');
```

### Classe `Spr`

Cria um sprite na tela.

**Construtor:**
- `Spr(x, y, width, height, img, smooth)`

**Métodos:**
- `display(state)`: Exibe o sprite, o parâmetro state pode ser "show" (padrão) ou "hide" (para esconder)
- `destroy()`: Remove o sprite.
- `scale(scaleX, scaleY)`: Escala o sprite.
- `rotate`: Rotaciona o sprite.
- `isPressed`: Retorna True quando o sprite é pressionado e False quando o sprite é solto.

**Exemplo:**
```javascript
const sprite1 = new Spr(100, 100, 50, 50, 'sprite.png');

sprite1.display();
sprite1.rotate = 90;
```

### `spr(x, y, width, height, img, smooth)`

Função para criar um sprite.

**Parâmetros:**
- `x`, `y`: Posições.
- `width`, `height`: Tamanho.
- `img`: URL da imagem.
- `smooth`: Renderização suave.

**Exemplo:**
```javascript
const mySprite = spr(100, 100, 50, 50, 'sprite.png', true);
```

### Classe `Text`

Cria um texto na tela.

**Construtor:**
- `Text(text, x, y, font)`

**Métodos:**
- `display(state)`: Exibe o texto, o parâmetro state pode ser "show" (padrão) ou "hide" (para esconder)
- `scale(scaleX, scaleY)`: Escala o texto.
- `rotate(degrees)`: Rotaciona o texto.

**Exemplo:**
```javascript
const text1 = new Text('Hello, World!', 100, 100, 'Arial');

text1.display();
```

### `print(text, x, y, font, fontSize, color, align)`

Função para criar um texto.

**Parâmetros:**
- `text`: Conteúdo do texto.
- `x`, `y`: Posições.
- `font`: Fonte.
- `fontSize`: Tamanho da fonte.
- `color`: Cor.
- `align`: Alinhamento ('left', 'center', 'right').

**Exemplo:**
```javascript
const myText = print('Hello, World!', 100, 100, 'Arial', 20, '#000', 'center');
```

### Classe `Particle`

Cria partículas na tela.

**Construtor:**
- `Particle(x, y, size, color, lifetime, dispersion)`

**Métodos:**
- `display(state)`: Exibe as partículas.

**Exemplo:**
```javascript
const particle1 = new Particle(100, 100, 10, 'orange', 1000, 45);

particle1.display();
```

### `TIC(dt)`
Função chamada em cada frame do jogo.

Use-a para atualizar a lógica do jogo e desenhar na tela.

O parâmetro `dt` representa o tempo decorrido desde o último frame (em segundos).

**Exemplo:**
```javascript
function TIC() {
  // Lógica do Jogo
}
```

### `cls()`

Limpa a tela.

**Exemplo:**
```javascript
cls();
```

### `loadLib(script)`

Carrega um script JavaScript externamente.

**Parâmetros:**
- `script`: URL do script.

**Exemplo:**
```javascript
loadLib('path/to/external/script.js');
```

### `loadFont(font)`

Carrega uma fonte externa.

**Parâmetros:**
- `font`: URL da fonte.

**Exemplo:**
```javascript
loadFont('path/to/font.ttf');
```

### `setTitle(title)`

Define o título da página.

**Parâmetros:**
- `title`: Título.

**Exemplo:**
```javascript
setTitle('Meu Jogo');
```

### `setFavicon(url)`

Define o favicon da página.

**Parâmetros:**
- `url`: URL do favicon.

**Exemplo:**
```javascript
setFavicon('path/to/favicon.ico');
```

### `reload()`

Recarrega a página.

**Exemplo:**
```javascript
reload();
```

### `wait(seconds, callback)`

Aguarda um determinado tempo antes de executar uma função.

**Parâmetros:**
- `seconds`: Tempo em segundos.
- `callback`: Função a ser executada.

**Exemplo:**
```javascript
wait(2, function() {
  console.log('2 segundos se passaram!');
});
```

### `camera(target, smooth)`

Configura a câmera para seguir um alvo.

**Parâmetros:**
- `target`: alvo que a câmera irá seguir.
- `smooth`: suavidade da câmera (padrão é 1).

**Exemplo:**
```javascript
camera(mySprite, 5);
```

## Exemplo de Jogo

```javascript

// Cria os objetos
const player = new Spr(0, 20, 50, 50, '/RPG Demo/img/player.png')
player.z = 10;
camera(player, 20)

const right = new Rect(50, -150, 50, 50, 'green')
right.ui = true;

const left = new Rect(-50, -150, 50, 50, 'green')
left.ui = true;

const up = new Rect(0, -100, 50, 50, 'green')
up.ui = true;

const down = new Rect(0, -200, 50, 50, 'green')
down.ui = true;

// Loop do jogo
function TIC() {
  cls(); // Limpa a tela
  
  // Deseja os objetos
  player.display()
  right.display()
  left.display()
  up.display()
  down.display()
  
  // Move o player
  move(speed);
}

// Variavel de velocidade do player
let speed = 5;

// Move o player
function move(speed) {
  if (right.isPressed) {
    player.x += speed;
  } else if (left.isPressed) {
    player.x -= speed;
  }
  
  if (up.isPressed) {
    player.y += speed;
  } else if (down.isPressed) {
    player.y -= speed;
  }
}

```