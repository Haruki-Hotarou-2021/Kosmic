# Kosmic 2D

Kosmic é um framework de jogos JavaScript 2D leve e fácil de usar, projetado para ajudar desenvolvedores iniciantes a criar jogos simples.

Esta documentação fornece uma visão geral do framework e documenta suas funções e classes principais. Para começar a usar o kodoma, siga estas etapas:

#### Inclusão: 
Adicione o arquivo kodoma.js ao seu projeto HTML, acima do arquivo do seu jogo:

```html
<script src="kosmic.js"></script>
<script src="game.js"></script>
```

## Funções do Jogo:

`TIC(dt)`: Função chamada em cada frame do jogo. <br>
Use-a para atualizar a lógica do jogo e desenhar na tela. <br>
O parâmetro `dt` representa o tempo decorrido desde o último frame (em segundos).

`cls()`: Limpa a tela, apagando o conteúdo desenhado anteriormente.

## Desenho:

`Spr`: Classe para criar sprites a partir de imagens.

`Rect`: Classe para criar retângulos


###### Exemplo de uso:
```javascript
// Define o Título da página e o FavIcon
setTitle("Meu Primeiro Jogo");
setFavicon("caminho/para/favicon.png");

// Criar as variáveis (Sem usar var, let ou const)
let largura = 50;
let altura = 50;
let x = 150;
let y = 200;
let text = "Hey Devs!"
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// Carregar sprites
const player = new Spr("caminho/para/sua/imagem.png", largura, altura, x, y)


// Função onGame para atualizar e desenhar o jogo
function TIC(dt) {

  // Desenha o sprite do player na tela
  player.display();
  
}
```

## Funções Úteis

`setTitle(title)`: Define o título da página da web.

`setFavicon(url)`: Define o favicon da página da web (o pequeno ícone na aba do navegador).

`wait(seconds, callback)`: Aguarda um determinado número de segundos e então executa a função de callback.

## Classes

`Spr`: Classe para criar sprites a partir de imagens.

`new spr(sprite, width, height, X, Y)`: Quando atribuido à uma variável cria uma instância do sprite.

`sprite`: Caminho para a imagem do sprite.

`width`: Largura do sprite (em pixels).

`height`: Altura do sprite (em pixels).

`X`: Posição X do centro do sprite (em pixels).

`Y`: Posição Y do centro do sprite (em pixels).

### Métodos:

`display()`: Desenha o sprite na tela.

`isPressed`: Detecta evento de toque e retorna um valor boleano (true ou false) ao objeto.

# Licença

### MIT

Este documento fornece uma introdução básica ao kodoma. Para explorar todos os recursos do framework, consulte o código fonte e experimente com diferentes funcionalidades.