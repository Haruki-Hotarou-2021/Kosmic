/*
@Concluído: 04/07/24 17:31
*/

// LOOP ---------------------------------

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