const palavras = [
  {
    nome: "Maçã",
    dica: "Fruta vermelha ou verde, famosa por aparecer em conto de fadas.",
    imagem: "Orion.png",
    personagem: "maçã"
  },
  {
    nome: "Açai",
    dica: "Frutinhs roxa da Amazônia, muito usada em tigelas com granola.",
    imagem: "sky.png",
    personagem: "Açai"
  },
  {
    nome: "Banana",
    dica: "Amarela por fora, é uma das frutas mais consumidas do Brasil",
    imagem: "Sky.Png",
    personagem: "Banana"
  },
  {
    nome: "Goiaba",
    dica: "Fruta tropical, pode ter polpa branca ou rosa e muitas sementes.",
    imagem: "Orion.png",
    personagem: "Goiaba"
  },
  {
    nome: "Laranja",
    dica: "Cítrica, rica em vitamina C e muito usada em sucos.",
    imagem: "Sky.png",
    personagem: "Laranja"
  },
  {
    nome: "Pitaya",
    dica: "Fruta exótica com casca rosa e polpa branca ou rosa cheio de sementes.",
    imagem: "Orion.png",
    personagem: "Pitaya"
  },
  {
    nome: "Mexerica",
    dica: "Parecida com a laranja, mas menor, mais fácil de descascar e muito cheirosa. ",
    imagem: "Sky.png",
    personagem: "Mexerica"
  },
  {
    nome: "Amora",
    dica: "Pequena, escura e usada em geleia e tortas.",
    imagem: "Orion.png",
    personagem: "Amora"
  }
];

let palavraSelecionada;
let dicasPor = ""; // sky ou orion
let letrasCorretas = [];
let tentativas = 0;
let rodadaAtual = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", iniciarJogo);
});

function iniciarJogo() {
  const nome = document.getElementById("nomeUsuario").value.trim();
  if (!nome) {
    alert("Digite seu nome para começar.");
    return;
  }

  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("jogoContainer").style.display = "block";
  iniciarPartida();
}

function iniciarPartida() {
  if (rodadaAtual >= palavras.length) {
    mostrarMensagemFinal(true);
    return;
  }

  const sorteada = palavras[rodadaAtual];
  palavraSelecionada = sorteada;
  dicasPor = Math.random() < 0.5 ? "sky" : "orion";
  letrasCorretas = [];
  tentativas = 0;

  document.getElementById("palavra").innerText = "_ ".repeat(palavraSelecionada.nome.length).trim();
  document.getElementById("erros").innerText = tentativas;
  mostrarDica();

  const letrasContainer = document.getElementById("letras");
  letrasContainer.innerHTML = "";

  const alfabeto = [...Array(26)].map((_, i) => String.fromCharCode(65 + i)).concat(["Ç", "ã"]);

  alfabeto.forEach(letra => {
    const botao = document.createElement("button");
    botao.textContent = letra;
    botao.onclick = () => verificarLetra(letra.toLowerCase(), botao);
    letrasContainer.appendChild(botao);
  });
}

function mostrarDica() {
  const img = document.getElementById("imgDica");
  const texto = document.getElementById("textoDica");

  img.src = `${dicasPor}.png`;
  if (dicasPor === "sky") {
    texto.innerHTML = `<strong>Sky</strong> Cruzando os braços <br><em>"Tá na cara o que é, presta atenção!"</em><br><br><strong>Dica:</strong> ${palavraSelecionada.dica}`;
  } else {
    texto.innerHTML = `<strong>Orion</strong> sorrir<br><em>"Vou te dar uma dica, você consegue."</em><br><br><strong>Dica:</strong> ${palavraSelecionada.dica}`;
  }
}

function verificarLetra(letra, botao) {
  botao.disabled = true;

  if (palavraSelecionada.nome.toLowerCase().includes(letra)) {
    letrasCorretas.push(letra);
  } else {
    tentativas++;
    document.getElementById("erros").innerText = tentativas;
  }

  atualizarPalavra();

  if (!document.getElementById("palavra").innerText.includes("_")) {
    rodadaAtual++;
    setTimeout(iniciarPartida, 1000); // Avançar para o próximo personagem após um segundo
  } else if (tentativas >= 6) {
    mostrarMensagemFinal(false); // Termina o jogo ao errar a primeira vez
  }
}

function atualizarPalavra() {
  const exibicao = palavraSelecionada.nome
    .split("")
    .map(letra => letrasCorretas.includes(letra.toLowerCase()) ? letra : "_")
    .join(" ");
  document.getElementById("palavra").innerText = exibicao;
}

function mostrarMensagemFinal(vitoria) {
  document.getElementById("jogoContainer").style.display = "none";
  const fim = document.getElementById("fimContainer");
  const msg = document.getElementById("mensagemFinal");

  if (vitoria) {
    msg.innerHTML = `
      <strong>Parabéns!</strong> Você venceu todas fruta!
      <br>Agora pode se orgulhar da sua vitória.
    `;
  } else {
    msg.innerHTML = `
      <strong>Game Over!</strong> Você realmente é um imprestavel, não é? Conhecer frutas é o BÁSICO!.
      <br>
    `;
  }

  fim.style.display = "flex";
}
