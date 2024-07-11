const rect = new Rect(100, 100, 100, 100, 'red')

const rect2 = new Rect(0, 0, 100, 100, 'blue')
camera(rect2, 30)



function TIC() {
  cls();
  rect.display();
  rect2.display();
  move(10)
}

function move(speed) {
  if(rect2.isPressed){
    rect2.y -= speed;
  }
  if(rect.isPressed) {
    rect2.y += speed;
  }
}