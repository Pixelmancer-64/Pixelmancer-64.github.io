// TODO
// Create a update_line, because we can already know if a line exists or not in the div
// Discover a better solution for storing the relationships, the way I am storing duplicates is really inefficient
let animals = [
  {
    name: "Onça pintada",
    image_name: "onca_pintada",
    description:
      "A onça-pintada é o maior felino das Américas. Espécie emblemática das matas brasileiras, a onça é importante para as ações de conservação. Por estar no topo da cadeia alimentar e necessitar de grandes áreas preservadas para sobreviver, esse animal o mesmo tempo temido e admirado que habita o imaginário das pessoas é um indicador de qualidade ambiental. ",
  },
  {
    name: "Capivara",
    image_name: "capivara",
    description:
      "A capivara ou capincho é uma espécie de mamífero roedor. Está incluída no mesmo grupo de roedores ao qual se classificam as pacas, cutias, os preás e o porquinho-da-índia. Ocorre por toda a América do Sul ao leste dos Andes em habitats associados a rios, lagos e pântanos, do nível do mar até 1 300 m de altitude.",
  },
  {
    name: "Jacaré-do-pantanal",
    image_name: "jacare_do_pantanal",
    description:
      "O jacaré-do-pantanal ou jacaré-do-paraguai é um jacaré que habita a parte central da América do Sul, incluindo o norte da Argentina, sul da Bolívia e Centro-Oeste do Brasil, especialmente no Pantanal e rios do Paraguai.",
  },
  {
    name: "Preá",
    image_name: "prea",
    description:
      "Cavia aperea, também chamado de preá, pereá, piriá ou bengo, é um roedor de ampla distribuição na América do Sul, do gênero Cavia, família dos caviídeos. Mede cerca de 25 cm de comprimento. Possuem pelagem cinzenta, corpo robusto, patas e orelhas curtas, incisivos brancos e cauda ausente. É aparentado com o porquinho-da-índia (Cavia porcellus). Em algumas regiões do Brasil é criado e usado como alimento. Possuem comportamento social, hábitos matutinos e noturnos.",
  },
  {
    name: "Surucucu-do-pantanal",
    image_name: "surucucu_do_pantanal",
    description:
      "A surucucu-do-pantanal é uma serpente grande e opistóglifa do Novo Mundo, endêmica à América do Sul. Também é conhecida como boipevaçu, jaracussu, mboi-peba, ñcaniná, víbora-ladradora e yacanina. Apesar de compartilhar um nome com à, tem pouco em comum com a surucucu, não sendo peçonhenta nem parte da família Viperidae. Isto pode ser devido ao comportamento agressivo que a serpente pode apresentar.",
  },
  {
    name: "Veado-campeiro",
    image_name: "veado_campeiro",
    description:
      "O veado-campeiro é um mamífero ruminante da família dos cervídeos e único representante do gênero Ozotoceros. Semelhante fisicamente ao cervo-do-pantanal, é geneticamente próximo ao cervo-andino-do-norte",
  },
  {
    name: "Tucano",
    image_nameme: "tucano",
    description:
      "Os tucanos são membros da família Neotropical de aves passeriformes Ramphastidae. Os Ramphastidae estão mais intimamente relacionados com os barbets americanos. Eles são brilhantemente marcados com seus longos bicos",
  },
  {
    name: "Seriema",
    image_name: "seriema",
    description:
      "As seriemas são os únicos membros vivos da pequena família de aves Cariamidae, que também é a única linhagem sobrevivente da ordem Cariamiformes. Uma vez que se acredita estar relacionado com guindastes, eles foram colocados perto dos falcões, papagaios e passeriformes, bem como o extinto Phorusrhacidae.",
  },
  {
    name: "Produtores",
    image_name: "produtores",
    description:
      "São os seres autótrofos, ou seja, que são capazes de produzir seu próprio alimento. Eles representam sempre o primeiro nível trófico de uma cadeia ou teia alimentar",
  },
  {
    name: "Decompositores",
    image_name: "decompositores",
    description:
      "Os decompositores são microrganismos, bactérias e fungos que, juntamente com pequenos animais, como as minhocas, o minhocuçu e os gôngolos, formam um batalhão de bichinhos que vivem no solo e são responsáveis pelo trabalho de reciclagem de detritos e de resíduos depositados em sua superfície.",
  },

  {
    name: "Fitoplâncton",
    image_name: "fitoplancton",
    description:
      "É um tipo de plâncton que flutua na água doce e em ambiente marinho. Esse tipo de plâncton destaca-se por ser capaz de realizar fotossíntese, sendo a base da cadeia alimentar dos ambientes aquáticos",
  },
  {
    name: "Tubarão-baleia",
    image_name: "tubarao_baleia",
    description:
      "É uma espécie de Tubarão filtrador dos orectolobiformes e a maior espécie de peixe existente conhecida. Eles possuem bocas muito grandes, são filtradores e distribuem-se em regiões tropicais e temperados",
  },
  {
    name: "Zooplâncton",
    image_name: "zooplancton",
    description:
      "Chama-se Zooplâncton ao conjunto dos organismos microscópicos aquáticos que não têm capacidade fotossintética e que vivem dispersos na água. Possuí importância de conduzir o fluxo de energia para os níveis trópicos superiores.",
  },
  {
    name: "Tilápia",
    image_name: "tilapia",
    description:
      "É o nome comum dado á várias espécies de peixes ciclídeos de água doce pertencentes à subfamília Pseudocrodolita. São nativos da África, mas foram introduzidas em muitos lugares nas águas abertas na América do Sul",
  },
  {
    name: "Raia Jamanta",
    image_name: "raia_jamanta",
    description:
      "É uma espécie de peixes cartilagíneos pelágicos, oceânico da família Myliobathidae e é a maior espécie de raia atualmente. Encontra-se nas regiões tropicais e subtropicais de todos os oceanos, tipicamente de recifes de coral",
  },
  {
    name: "Orca",
    image_name: "orca",
    description: `Também conhecido como "baleia assassina", é um membro da família dos golfinhos. Comunicam-se através de sons e costumam viajar em grupo. Além de serem um dos predadores mais eficientes da natureza, não são predadas por praticamente nenhum animal conhecido`,
  },
];

function adjust_line(from, to) {
  let line = document.querySelector(`#${from.id}_${to.id}`);
  if (!line) {
    line = document.querySelector(`#${to.id}_${from.id}`);
  }
  if (!line) {
    line = document.createElement("div");
    line.className = "line";
    line.id = `${from.id}_${to.id}`;
    from.parentNode.appendChild(line);
  }

  const fT = from.offsetTop + from.offsetHeight / 2;
  const tT = to.offsetTop + to.offsetHeight / 2;
  const fL = from.offsetLeft + from.offsetWidth / 2;
  const tL = to.offsetLeft + to.offsetWidth / 2;

  const CA = Math.abs(tT - fT);
  const CO = Math.abs(tL - fL);
  const H = Math.sqrt(Math.pow(CA, 2) + Math.pow(CO, 2));
  let ANG = (180 / Math.PI) * Math.acos(CA / H);

  //   console.log(fT, tT, fL, tL, CA, CO, H, ANG);

  let top;
  let left;

  if (tT > fT) {
    top = (tT - fT) / 2 + fT;
  } else {
    top = (fT - tT) / 2 + tT;
  }
  if (tL > fL) {
    left = (tL - fL) / 2 + fL;
  } else {
    left = (fL - tL) / 2 + tL;
  }

  if (
    (fT < tT && fL < tL) ||
    (tT < fT && tL < fL) ||
    (fT > tT && fL > tL) ||
    (tT > fT && tL > fL)
  ) {
    ANG *= -1;
  }

  top -= H / 2;

  line.style["-webkit-transform"] = "rotate(" + ANG + "deg)";
  line.style["-moz-transform"] = "rotate(" + ANG + "deg)";
  line.style["-ms-transform"] = "rotate(" + ANG + "deg)";
  line.style["-o-transform"] = "rotate(" + ANG + "deg)";
  line.style["-transform"] = "rotate(" + ANG + "deg)";
  line.style.top = top + "px";
  line.style.left = left + "px";
  line.style.height = H + "px";

  // const [origin, end] = [from, to].sort((a, b) => {
  //   if (a.id - b.id) return a;
  // });

  if (relations[from.id]) {
    if (!relations[from.id].includes(to.id)) relations[from.id].push(to.id);
  } else {
    relations[from.id] = [to.id];
  }

  if (relations[to.id]) {
    if (!relations[to.id].includes(from.id)) relations[to.id].push(from.id);
  } else {
    relations[to.id] = [from.id];
  }
}

let is_pressed = false;

const options = {
  drag: drag_block,
  create: create_block,
  delete: delete_block,
  line: create_line,
  delete_line: delete_line,
  selected: "create",
};

let selected_element;
let highlighted = [];
let relations = {};
let mouse = {
  x: null,
  y: null,
};

document.querySelector(".controls").addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    e.target.parentNode.parentNode.querySelectorAll("button").forEach((e) => {
      e.classList.remove("selected");
    });
    e.target.classList.add("selected");
    options.selected = e.target.value;
  }
});

// let scale = 1;
// document.addEventListener("wheel", (event) => {
//   event.preventDefault();

//   scale += event.deltaY * -0.001;

//   // Restrict scale
//   scale = Math.min(Math.max(0.125, scale), 4);

//   // Apply scale transform
//   console.log(document.querySelector(".white_board"))
//   document.querySelector(".white_board").style.transform = `scale(${scale})`;
// });

document.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;

  if (!event.target.closest("section") && highlighted.length) {
    highlighted[0].classList.remove("highlight");
    highlighted = [];
  }

  console.log(options.selected);
  options[options.selected](event);
});
document.addEventListener("mousedown", (event) => {
  // move the responsibility of defining the selected_element to here
  selected_element = undefined;
  is_pressed = true;
});
document.addEventListener("mousemove", (e) => {
  if (options.selected == "drag") options["drag"](e);
});

document.addEventListener("mouseup", () => {
  is_pressed = false;
  if (selected_element) {
    selected_element.classList.remove("being_dragged");
    selected_element = undefined;
  }
});

function remove_relation(key, value) {
  const index = relations[key].indexOf(value);
  if (index > -1) relations[key].splice(value, 1);
}

function delete_line(event) {
  if (!event.target.classList.contains("line")) return;

  const line = event.target;
  const [first_id, second_id] = line.id.split("_");

  remove_relation(first_id, second_id);
  remove_relation(second_id, first_id);

  line.remove();
}

function create_line(event) {
  const section = event.target.closest("section");

  if (section) {
    section.classList.add("highlight");
    highlighted.push(section);
  }

  if (highlighted.length != 2) return;

  const [element_1, element_2] = highlighted;

  const content = document.createElement("div");
  content.className = "content";
  content.appendChild(element_1);
  content.appendChild(element_2);

  document.querySelector(".white_board").appendChild(content);

  adjust_line(element_1, element_2);

  highlighted.forEach((e) => e.classList.remove("highlight"));
  highlighted = [];
}

function drag_block(event) {
  mouse.x = event.x;
  mouse.y = event.y;

  if (
    !selected_element &&
    event.target.tagName != "HTML" &&
    event.target.closest("section")
  ) {
    selected_element = event.target.closest("section");
  }
  if (is_pressed && selected_element) {
    selected_element.classList.add("being_dragged");

    if (relations[selected_element.id]) {
      relations[selected_element.id].forEach((e) => {
        adjust_line(selected_element, document.querySelector(`#${e}`));
      });
    }
    selected_element.style.top = event.clientY - 25 + "px";
    selected_element.style.left = event.clientX - 25 + "px";
  }
}

function delete_block(event) {
  if (!event.target.closest("section")) return;
  const id = event.target.closest("section").id;

  if (relations[id]) {
    relations[id].forEach((e) => {
      // problem in relations after delete
      // it seams that in some place, the order of line creation matters

      delete relations[id];
      remove_relation(e, id);

      let line = document.querySelector(`#${id}_${e}`);
      if (!line) {
        line = document.querySelector(`#${e}_${id}`);
      }
      line.remove();
    });
  }
  document.querySelector(`#${id}`).remove();
}

function create_block(event) {
  if (event.target.tagName == "HTML") {
    let random = Math.floor(Math.random() * (animals.length - 1));
    let animal = animals[random];

    const card = document.createElement("section");
    const divTop = document.createElement("div");
    const divBottom = document.createElement("div");
    const divImage = document.createElement("div");
    const image = document.createElement("img");
    const topText = document.createElement("h1");
    const bottomText = document.createElement("p");

    image.src = `./imgs/${animal.image_name}.jpg`;
    topText.innerText = animal.name;
    bottomText.innerText = animal.description;

    card.className = "card";
    divTop.className = "top";
    divBottom.className = "bottom";
    divImage.className = "divImage";
    image.className = "image";
    image.draggable = false;
    topText.className = "topText";
    bottomText.className = "bottomText";

    card.id = `card-${event.x}-${event.y}`;
    card.style.top = event.clientY - 25 + "px";
    card.style.left = event.clientX - 25 + "px";

    this.relations = [];
    this.element = card;
    divImage.appendChild(image);
    divTop.appendChild(topText);
    divBottom.appendChild(bottomText);
    card.appendChild(divTop);
    card.appendChild(divImage);
    card.appendChild(divBottom);
    document.querySelector(".white_board").appendChild(card);

    animals.splice(random, 1);
  }
}
