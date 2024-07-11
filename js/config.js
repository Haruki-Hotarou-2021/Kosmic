/*
@Concluído: 04/07/24 17:31
*/

// Cria a tag svg e configura o body
const bodyElement = document.body;
bodyElement.style.width = '100vw';
bodyElement.style.height = '100vh';
bodyElement.style.overflow = 'hidden';
bodyElement.style.margin = '0';
bodyElement.style.padding = '0';
bodyElement.style.backgroundColor = '#42445A';

// Cria o elemento SVG
const mainElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mainElement.setAttribute("width", "100%");
mainElement.setAttribute("height", "100%");
mainElement.setAttribute("viewBox", "-500 -500 1000 1000"); // Centraliza a origem
//mainElement.style.border = '2px solid red';
mainElement.style.backgroundColor = 'transparent';

// Adiciona o SVG ao body
bodyElement.appendChild(mainElement);
