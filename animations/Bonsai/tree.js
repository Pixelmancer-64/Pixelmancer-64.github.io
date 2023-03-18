export default class Tree {
  constructor(ctx, canvas, min_dist, max_dist, growth_rate) {
    this.leaves = [];
    this.branches = [];
    this.max_branch_distance = max_dist;
    this.min_branch_distance = min_dist;
    this.growth_rate = growth_rate;

    this.canvas = canvas;
    this.ctx = ctx;

    for (let i = 0; i < 1000; i++) {
      let position = {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height - 300),
      };

      this.leaves.push(new Leaf(position));
    }

    const root = new Branch(
      { x: canvas.width / 2, y: canvas.height },
      { x: canvas.width / 2, y: canvas.height - this.growth_rate },
      { x: 0, y: -1 },
      Math.random() * (this.growth_rate - 10) + 10,
      10
    );

    this.branches.push(root);

    let current = root;
    let found_max = false;

    while (!found_max) {
      for (let i = 0; i < this.leaves.length; i++) {
        if (distance(current.end, this.leaves[i].position) < max_dist) {
          found_max = true;
          break;
        }
      }

      if (!found_max) {
        let branch = current.next_segment();
        this.branches.push(branch);
        current = branch;
      }
    }
  }

  grow() {
    this.leaves.forEach((leaf, index) => {
      const current_leaf = leaf;
      let closest_branch = null;
      let closest_branch_distance = 999;

      for (let i = 0; i < this.branches.length; i++) {
        const current_branch = this.branches[i];
        const dist = distance(current_leaf.position, current_branch);

        if (dist < this.min_branch_distance) {
          current_leaf.reached = true;
          this.leaves.splice(index, 1);
          closest_branch = null;
          break;
        }

        // engraçado notar que o else aqui não serve para nada devido ao break logo em cima
        // servindo basicamente como um guard clause
        else if (closest_branch == null || closest_branch_distance > dist) {
          closest_branch = current_branch;
          closest_branch_distance = dist;
        }
      }

      if (closest_branch != null) {
        const direction = {
          x: current_leaf.position.x - closest_branch.end.x,
          y: current_leaf.position.y - closest_branch.end.y,
        };

        const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
        const normalized_direction = {
          x: direction.x / magnitude,
          y: direction.y / magnitude,
        };

        // somar a direção aqui provavelmente n vai ser tão fácil assim
        closest_branch.direction.x += normalized_direction.x;
        closest_branch.direction.y += normalized_direction.y;
        closest_branch.count++;
      }

      this.branches.forEach(branch=> {
        if(branch.count > 0){
            // fazer o avarage do direction baseado no count
            this.branches.push(branch.next_segment())
        }
        branch.count = 0
      })
    });
  }

  draw() {
    this.branches.forEach((e) => e.draw(this.ctx));
    this.leaves.forEach((e) => e.draw(this.ctx));
  }
}

class Leaf {
  constructor(position) {
    this.position = position;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 4, 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

class Branch {
  constructor(start, end, direction, growth_rate, thickness) {
    this.start = start;
    this.end = end;
    this.direction = direction;
    this.growth_rate = growth_rate;
    this.thickness = thickness;
    this.count = 0;
  }

  next_segment() {
    const next_position = {
      x: this.end.x + this.direction.x * this.growth_rate,
      y: this.end.y + this.direction.y * this.growth_rate,
    };

    return new Branch(
      this.end,
      next_position,
      this.direction,
      this.growth_rate,
      this.thickness * 0.95
    );
  }

  draw(ctx) {
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.closePath();
    ctx.stroke();
  }
}

function distance(point_1, point_2) {
  return Math.sqrt((point_1.x - point_2.x) ** 2 + (point_1.y - point_2.y) ** 2);
}
