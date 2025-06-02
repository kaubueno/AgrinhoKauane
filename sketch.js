let cestaX, cestaY;
let cestaW = 120, cestaH = 80;
let cestaMoving = false;
let cestaArrived = false;
let alimentos = [];

function setup() {
  createCanvas(1000, 480);
  cestaX = 180;
  cestaY = height - 140;

  // Alimentos dentro da cesta com posições relativas
  alimentos.push(new Alimento("Maçã", -40, -15, 'red'));
  alimentos.push(new Alimento("Milho", -10, -30, 'yellow'));
  alimentos.push(new Alimento("Pão", 25, -15, '#D2B48C'));
  alimentos.push(new Alimento("Cenoura", 50, 0, 'orange'));
  alimentos.push(new Alimento("Folha", 10, 10, 'green'));
}

function draw() {
  background(180, 220, 255); // Céu azul claro

  drawCampo();
  drawEstrada();
  drawCidade();
  drawLoja();

  if (!cestaArrived) {
    drawCesta(cestaX, cestaY);
    alimentos.forEach(a => a.draw(cestaX + a.x, cestaY + a.y));
  } else {
    drawCestaNaLoja();
    drawAlimentosNaLoja();
  }

  // Movimento da cesta
  if (cestaMoving && !cestaArrived) {
    cestaX += 6;
    if (cestaX >= 700) {  // ponto onde cesta chega na lojinha
      cestaArrived = true;
      cestaMoving = false;
    }
  }

  // Texto guia
  fill(0);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  if (!cestaMoving && !cestaArrived) {
    text("Clique na cesta para levar os produtos do campo até a lojinha", width / 2, 40);
  } else if (cestaMoving) {
    text("Levando a cesta para a lojinha...", width / 2, 40);
  } else {
    text("Produtos chegaram na lojinha! Alimentos descarregados.", width / 2, 40);
  }
}

// -- Desenhos principais --

function drawCampo() {
  // Grama do campo
  noStroke();
  fill(60, 180, 75);
  rect(0, height - 120, width / 2, 120);

  // Fazenda
  fill(245, 200, 100);
  rect(60, height - 210, 150, 90, 15);

  fill(180, 40, 40);
  triangle(50, height - 210, 135, height - 270, 220, height - 210);

  // Porta centralizada na fazenda
  fill(140, 75, 30);
  let doorW = 45, doorH = 60;
  rect(60 + 150/2 - doorW/2, height - 150, doorW, doorH, 10);

  // Janela
  fill(135, 206, 235);
  stroke(255);
  strokeWeight(3);
  rect(90, height - 180, 40, 40, 8);
  line(90, height - 160, 130, height - 160);
  line(110, height - 180, 110, height - 140);
  noStroke();

  // Horta ao lado direito da fazenda
  let startX = 230, startY = height - 140;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      drawPlanta(startX + c * 40, startY + r * 30);
    }
  }

  // Texto
  fill(0);
  textSize(26);
  textAlign(LEFT);
  text("Campo", 50, height - 260);
}

function drawPlanta(x, y) {
  fill(34, 139, 34);
  ellipse(x, y, 18, 30);
  ellipse(x - 8, y + 5, 14, 20);
  ellipse(x + 8, y + 5, 14, 20);
  stroke(0, 100, 0);
  strokeWeight(2);
  line(x, y - 15, x, y + 20);
  noStroke();
}

function drawEstrada() {
  fill(90);
  // Estrada vai do meio da tela até pouco antes da fazenda (termina perto do campo)
  rect(width / 2, height - 100, width / 2 - 300, 80);

  fill(255, 204, 0);
  rect(width / 2, height - 60, width / 2 - 300, 10);

  // Grama onde a estrada termina (no início do campo)
  fill(60, 180, 75);
  rect(0, height - 100, width / 2, 80);
}

function drawCidade() {
  let baseX = width / 2 + 120;
  let baseY = height - 100;
  for (let i = 0; i < 5; i++) {
    let buildingW = 60;
    let buildingH = [140, 160, 120, 180, 150][i];
    fill(120, 130, 140);
    rect(baseX + i * 70, baseY - buildingH, buildingW, buildingH, 5);

    fill(255, 255, 180);
    let rows = floor(buildingH / 25);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < 3; c++) {
        rect(baseX + i * 70 + 10 + c * 15, baseY - buildingH + 10 + r * 25, 10, 15, 3);
      }
    }
  }
  fill(0);
  textSize(26);
  textAlign(LEFT);
  text("Cidade", width / 2 + 130, height - 160);
}

function drawLoja() {
  let baseX = 700;
  let baseY = height - 180;

  fill(255, 248, 220);
  rect(baseX, baseY, 210, 140, 15);

  fill(200, 70, 40);
  triangle(baseX - 20, baseY, baseX + 105, baseY - 60, baseX + 230, baseY);

  fill(135, 206, 235);
  stroke(255);
  strokeWeight(3);
  rect(baseX + 40, baseY + 30, 60, 60, 10);
  line(baseX + 40, baseY + 60, baseX + 100, baseY + 60);
  line(baseX + 70, baseY + 30, baseX + 70, baseY + 90);
  noStroke();

  fill(160, 82, 45);
  rect(baseX + 120, baseY + 60, 60, 80, 10);

  fill(80, 50, 10);
  textSize(24);
  textAlign(CENTER);
  text("Produtos do Campo", baseX + 105, baseY - 15);

  fill(139, 69, 19);
  rect(baseX + 10, baseY + 110, 190, 20, 8);
}

function drawCesta(x, y) {
  fill(210, 180, 140);
  stroke(139, 69, 19);
  strokeWeight(4);
  rect(x - cestaW / 2, y - cestaH / 2, cestaW, cestaH, 25);

  noFill();
  stroke(139, 69, 19);
  strokeWeight(6);
  arc(x, y - cestaH / 2 + 5, cestaW * 0.85, cestaH, PI, 0);

  noStroke();
}

function drawCestaNaLoja() {
  let x = 760;
  let y = height - 80;
  fill(210, 180, 140, 150);
  stroke(139, 69, 19);
  strokeWeight(3);
  rect(x - 50, y - 30, 100, 60, 20);

  noFill();
  stroke(139, 69, 19);
  strokeWeight(4);
  arc(x, y - 30, 90, 50, PI, 0);

  noStroke();
}

function drawAlimentosNaLoja() {
  let baseX = 710;
  let baseY = height - 75;
  alimentos.forEach((a, i) => {
    a.draw(baseX + i * 38, baseY);
  });
}

class Alimento {
  constructor(nome, x, y, cor) {
    this.nome = nome;
    this.x = x;
    this.y = y;
    this.cor = cor;
  }

  draw(x, y) {
    push();
    translate(x, y);
    noStroke();

    switch (this.nome) {
      case "Maçã":
        fill(this.cor);
        ellipse(0, 0, 28, 28);
        fill(34, 139, 34);
        rect(-3, -18, 6, 12, 2);
        ellipse(-6, -10, 8, 12);
        break;

      case "Milho":
        fill(this.cor);
        ellipse(0, 0, 20, 45);
        fill(255, 255, 150);
        for (let i = -15; i <= 15; i += 6) {
          ellipse(0, i, 12, 8);
        }
        fill(0, 150, 0);
        triangle(-10, 10, 0, -20, 10, 10);
        break;

      case "Pão":
        fill('#D2B48C');
        ellipse(0, 0, 40, 25);
        fill('#F5DEB3');
        ellipse(0, 0, 30, 15);
        break;

      case "Cenoura":
        fill(this.cor);
        triangle(-7, 12, 7, 12, 0, -15);
        fill(30, 120, 30);
        rect(-5, -15, 10, 8, 3);
        break;

      case "Folha":
        fill(this.cor);
        ellipse(0, 0, 20, 35);
        stroke(0, 100, 0);
        strokeWeight(2);
        line(0, -18, 0, 18);
        noStroke();
        break;
    }
    pop();
  }
}

function mousePressed() {
  if (!cestaMoving && !cestaArrived) {
    if (
      mouseX > cestaX - cestaW / 2 &&
      mouseX < cestaX + cestaW / 2 &&
      mouseY > cestaY - cestaH / 2 &&
      mouseY < cestaY + cestaH / 2
    ) {
      cestaMoving = true;
    }
  }
}
