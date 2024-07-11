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
    this.rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rectElement.setAttribute("x", (this.x) - (this.width / 2));
    this.rectElement.setAttribute("y", (-this.y) - (this.height / 2));
    this.rectElement.setAttribute("width", this.width);
    this.rectElement.setAttribute("height", this.height);
    this.rectElement.setAttribute("transform", `rotate(${this.rotate}) scale(${this.scaleX}, ${this.scaleY})`);
    this.rectElement.setAttribute("style", `position: fixed; z-index: ${this.z}; fill: ${this.fill === 'fill' ? this.color : 'none'}; stroke: ${this.fill === 'stroke' ? this.color : 'none'}; stroke-width: ${this.borderSize};`);

    this.rectElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.rectElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    if (this.ui) {
      this.rectElement.setAttribute("x", (this.x) - (this.width / 2) - (currentOffsetX - cameraSmooth*2));
      this.rectElement.setAttribute("y", (-this.y) - (this.height / 2) - (-currentOffsetY * cameraSmooth));
    }

    mainElement.appendChild(this.rectElement);

    if (state == 'hide') {
      this.rectElement.style.visibility = 'hidden';
    } else {
      this.rectElement.style.visibility = 'visible';
    }
  }

  onTouchStart(callback) {
    this.isPressed = true;
    if (typeof callback === 'function') {
      callback();
    }
  }

  onTouchEnd(callback) {
    this.isPressed = false;
    if (typeof callback === 'function') {
      callback();
    }
  }

  destroy() {
    mainElement.removeChild(this.rectElement);
  }

  scale(scaleX = 1, scaleY = 1) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
  }

  rotate(degrees) {
    this.rotate = degrees;
  }
}
/*
function rect(x = 0, y = 0, height = 50, width = 50, color = 'black', fill = 'fill') {
  let _rect = new Rect(x, y, height, width, color, fill);
  _rect.display();
  return _rect;
}
*/

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
    this.spriteElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
    this.spriteElement.setAttribute("x", (this.x) - (this.width / 2));
    this.spriteElement.setAttribute("y", (-this.y) - (this.height / 2));
    this.spriteElement.setAttribute("width", this.width);
    this.spriteElement.setAttribute("height", this.height);
    this.spriteElement.setAttribute("href", this.img);
    this.spriteElement.setAttribute("transform", `rotate(${this.rotate}) scale(${this.scaleX}, ${this.scaleY})`);
    this.spriteElement.setAttribute("style", `position: fixed; z-index: ${this.z}; image-rendering: ${this.smooth ? 'auto' : 'pixelated'};`);

    this.spriteElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.spriteElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    mainElement.appendChild(this.spriteElement);

    if (state == 'hide') {
      this.spriteElement.style.visibility = 'hidden';
    } else {
      this.spriteElement.style.visibility = 'visible';
    }
  }

  onTouchStart(callback) {
    this.isPressed = true;
    if (typeof callback === 'function') {
      callback();
    }
  }

  onTouchEnd(callback) {
    this.isPressed = false;
    if (typeof callback === 'function') {
      callback();
    }
  }

  destroy() {
    mainElement.removeChild(this.spriteElement);
  }

  scale(scaleX = 1, scaleY = 1) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
  }

  rotate(degrees = 0) {
    return this.rotate = degrees;
  }
}

function spr(x = 0, y = 0, width = 50, height = 50, img, smooth = false) {
  let _spr = new Spr(x, y, width, height, img, smooth);
  _spr.display();
  return _spr;
}

// Adaptações semelhantes precisam ser feitas para as outras




