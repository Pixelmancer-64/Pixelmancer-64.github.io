window.onload = async function init() {
  const response = await fetch("animationsList-BR.json", {
    headers: {
      cache: "force-cache",
    },
  }).then((res) => res.json());

  let track = 1;

  document.getElementById(
    "counter"
  ).innerHTML = `<h1>${response.length} Projects</h1>`;

  while (response.length) {
    let random = Math.floor(Math.random() * (response.length - 1));
    const aux = document.createElement("div");
    aux.className = "card";
    // aux.innerHTML = `<div class="imageContainer">
    //   <a href="/animations/${response[random].title}" aria-label="${response[random].title} generative art homepage"><img src="./img/${response[random].id}.${response[random].format}" alt="Banner of the ${response[random].title} generative art page" ></a>
    //   <a href='https://github.com/pixelmancer-64/pixelmancer-64.github.io/tree/master/animations/${response[random].title}' class='github'> <img src='/img/github.svg'> </a>
    //   </div>`;

    aux.id = "card-" + response[random].id;

    const image = document.createElement("img");
    image.className = "image";
    image.src = `./img/${response[random].id}.png`;
    image.alt = `Banner of the ${response[random].title} generative art page`;
    image.draggable = false;

    aux.append(image);

    document.querySelector(`#track-${track}`).appendChild(aux);
    track == 4 ? (track = 1) : track++;
    response.splice(random, 1);
  }

  document.querySelectorAll(".track").forEach((e) => {
    // LEMBRAR QUE ESSE 32 É O MARGIN DO MAIN, SE TROCAR LÁ TEM QUE MUDAR AQUI TBM
    // idk mas n to conseguindo pegar o margin do main, provavelmente pq o css n carregou ainda, sla
    e.dataset.max_percentage = (e.scrollWidth - (window.innerWidth - 32)) / e.scrollWidth * -100;
  });
};

function get_track(event) {
  if (!event.target.closest) return;
  return event.target.closest(".track");
}

let last_track;

const handleOnDown = (e) => {
  const track = get_track(e);
  if (!track) return;

  last_track = track;
  track.dataset.mouseDownAt = e.clientX / 4;
};

const handleOnUp = (e) => {
  last_track.dataset.mouseDownAt = "0";
  last_track.dataset.prevPercentage = last_track.dataset.percentage;
};

const handleOnMove = (e) => {
  const track = get_track(e);
  if (!track) return;

  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX / 4,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    track.dataset.max_percentage
  );

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, 0)`,
    },
    { duration: 1200, fill: "forwards" }
  );
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

// window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

// window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

// window.ontouchmove = (e) => handleOnMove(e.touches[0]);













// for (const i in response) {
//   let linha = response[i];
//   let $opt = document.createElement("option");
//   $opt.value = "card-" + linha.id;
//   $opt.textContent = linha.title;
//   document.querySelector("#search").appendChild($opt);
// }

// const search = document.querySelector("#search");
// search.addEventListener("change", () => {
//   const a = document.createElement("a");
//   const id = search.value;
//   a.href = `#${id}`;
//   a.click();

//   document.querySelectorAll(".card").forEach((e) => e.classList.add("gray"));
//   const selected = document.querySelector(`#${id}`);
//   selected.className = "card active";

//   setTimeout(() => {
//     selected.className = "card";
//     document
//       .querySelectorAll(".card")
//       .forEach((e) => e.classList.remove("gray"));
//   }, 1300);

//   a.remove();
// });

// document.getElementById("showGithub").addEventListener("change", () => {
//   const aux = document.querySelectorAll(".github");
//   aux.forEach((e) => {
//     e.style.display == "block"
//       ? (e.style.display = "none")
//       : (e.style.display = "block");
//   });
// });
