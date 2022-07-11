window.onload = async function init() {
  let already = [];
  const response = await fetch("animationsList-BR.json").then((res) =>
    res.json()
  );
  for (let i = 0; i < response.length; ) {
    let random = Math.floor(Math.random() * response.length);
    if (!already.includes(random)) {
      const aux = document.createElement("div");
      aux.className = "card";
      aux.innerHTML = `<div class="imageContainer">
      <a href='${response[random].links.demo}'><img src='${response[random].picture}'></a>
      <a href='${response[random].links.github}' class='github'> <img src='/img/github.svg'> </a>
      </div>`;
      aux.id = "card-" + response[random].id;
      document.querySelector("main").appendChild(aux);
      already.push(random);
      i++;
    }
  }
  document.getElementById(
    "counter"
  ).innerHTML = `<h1>${already.length} Projects</h1>`;

  for (const i in response) {
    let linha = response[i];
    let $opt = document.createElement("option");
    $opt.value = "card-" + linha.id;
    $opt.textContent = linha.title;
    document.querySelector("#search").appendChild($opt);
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
