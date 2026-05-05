//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

let ids = [];

// botões
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

function definirDificuldade(qtd) {
  const linha = document.getElementById("linha1");

  linha.innerHTML = "";
  ids = [];

  for (let i = 1; i <= qtd; i++) {
    const div = document.createElement("div");

    div.id = "num" + i;
    div.className = "inicial";
    div.innerHTML = "?";

    div.onclick = function () {
      verifica(this);
    };

    linha.appendChild(div);
    ids.push(div.id);
  }

  reiniciar();
}

// 🔁 reiniciar tudo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente();
  atualizaPlacar(0, 0);

  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// 🔄 jogar novamente
function jogarNovamente() {
  jogar = true;

  ids.forEach(id => {
    const div = document.getElementById(id);
    if (div) {
      div.className = "inicial";
      div.innerHTML = "?";
    }
  });

  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }
}

// 📊 placar
function atualizaPlacar(acertos, tentativas) {
  let desempenhoCalc = tentativas === 0 ? 0 : (acertos / tentativas) * 100;

  document.getElementById("resposta").innerHTML =
    "<span>Acertos: " + acertos + "</span> " +
    "<span>Tentativas: " + tentativas + "</span> " +
    "<span>Desempenho: " + Math.round(desempenhoCalc) + "%</span>";
}

// 🎯 acertou
function acertou(obj) {
  obj.className = "acertou";
  obj.innerHTML = "";

  const img = new Image();
  img.id = "imagem";
  img.src = "https://i.pinimg.com/originals/08/11/a3/0811a35a1fff5513ee97b3db2e405d18.jpg";

  obj.appendChild(img);
}

function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 3) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteadoIndex = Math.floor(Math.random() * ids.length);
    let sorteadoId = ids[sorteadoIndex];

    if (obj.id === sorteadoId) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      const objSorteado = document.getElementById(sorteadoId);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);

  } 
}

// eventos
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

// 🔥 inicia com fácil automaticamente
window.onload = () => {
  definirDificuldade(3);
};