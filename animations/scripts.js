window.onload = async function init() {
  const response = await fetch("animationsList-BR.json", {
    headers: {
      cache: "force-cache",
    },
  }).then((res) => res.json());

  document.getElementById(
    "counter"
  ).innerHTML = `<h1>${response.length} Projects</h1>`;

  for (const i in response) {
    let linha = response[i];
    let $opt = document.createElement("option");
    $opt.value = "card-" + linha.id;
    $opt.textContent = linha.title;
    document.querySelector("#search").appendChild($opt);
  }

  while (response.length) {
    let random = Math.floor(Math.random() * (response.length - 1));
    const aux = document.createElement("div");
    aux.className = "card";
    aux.innerHTML = `<div class="imageContainer">
      <a href="/animations/${response[random].title}" aria-label="${response[random].title} generative art homepage"><img src="./img/${response[random].id}.${response[random].format}" alt="Banner of the ${response[random].title} generative art page" ></a>
      <a href='https://github.com/pixelmancer-64/pixelmancer-64.github.io/tree/master/animations/${response[random].title}' class='github'> <img src='/img/github.svg'> </a>
      </div>`;
    aux.id = "card-" + response[random].id;
    document.querySelector("main").appendChild(aux);
    response.splice(random, 1);
  }
};

const search = document.querySelector("#search");
search.addEventListener("change", () => {
  const a = document.createElement("a");
  const id = search.value;
  a.href = `#${id}`;
  a.click();

  const selected = document.querySelector(`#${id}`);
  selected.className = "card ativou";

  setTimeout(() => {
    selected.className = "card";
  }, 1300);

  a.remove();
});

document.getElementById("showGithub").addEventListener("change", () => {
  const aux = document.querySelectorAll(".github");
  aux.forEach((e) => {
    e.style.display == "block"
      ? (e.style.display = "none")
      : (e.style.display = "block");
  });
});
