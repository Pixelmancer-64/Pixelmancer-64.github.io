export class Card {
  constructor(x, y) {

    const card = document.createElement("div");
    card.className = "card";
    card.id = `card-${x}-${y}`;
    card.style.top = y - 25 + "px";
    card.style.left = x - 25 + "px";
    document.querySelector("body").appendChild(card);

    this.relations = []
    this.element = card;
}

  drag_block(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    if (!selected_element) {
      selected_element = event.target;
    }
    if (is_pressed) {
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

  delete_block(event) {
    if (!event.target.classList.contains("card")) return;

    const id = event.target.id;
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
      console.log(relations);
    }
    document.querySelector(`#${id}`).remove();
  }

}
