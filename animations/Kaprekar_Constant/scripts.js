class Canvas {

    constructor(){
        let canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        if(window.innerWidth <= window.innerHeight){
            canvas.width = window.innerWidth;
            canvas.height = window.innerWidth;
        } else {
            canvas.width = window.innerHeight;
            canvas.height = window.innerHeight;
        }

        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;

        this.width = canvas.width;
        this.height = canvas.height;

        this.his = [];
        this.size = this.width/100;


        this.colors = random_color(7);
    }  

    animate(){
        for(let i = 9999; i >= 0; i--){
        // for(let i = 0; i <= 9999; i++){
            let now = i
            //fill zero
            now = this.fill(now.toString().split('').map(Number)).join('');

            for(let j = 0 ; j < 7; j++){
                let arr = this.fill(now.toString().split('').map(Number));
                let lowestToHighest = arr.sort((a, b) => a - b).join('');
                let highestToLowest = arr.sort((a, b) => b-a).join('');
                now = highestToLowest - lowestToHighest

                // console.log('Rodada '+j+ '; lowest: ' + lowestToHighest + ' highest: ' + highestToLowest + ' now: ' + now)
                if(now == 0){
                    this.his.push(j)
                    break;
                }
                else if(now == 6174){
                    this.his.push(j)
                    break;
                }
            }
        }
    }

    fill(quarentine){
        if(quarentine.length < 4){
            let auxArr = Array(4-quarentine.length).fill(0)
            quarentine.forEach(e => {
                auxArr.push(e)    
            });
            return auxArr
        }
        else return quarentine
    }

    draw(){
        let x = 0
        let y = 0
        for(let i = this.his.length-1; i >= 0; i--){
        // this.his.forEach((e) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(' + this.colors[this.his[i]].r + ',' + this.colors[this.his[i]].g + ',' + this.colors[this.his[i]].b + ',' + 1 +')'
            // this.ctx.fillStyle = 'rgba(' + this.colors[e].r + ',' + this.colors[e].g + ',' + this.colors[e].b + ',' + 1 +')'
            this.ctx.fillRect(x, y, this.size, this.size);
            x += this.size;
            if(x > this.size*99) {
                y += this.size;
                x = 0
            }
        // });
        }
    }
}

const random_rgb = () => {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	return {r: r, g: g, b: b}
};

function random_color (num){
	let aux = []
    for(let i=0; i < num; i++){
		aux.push(random_rgb())
	}
    return aux;
};

window.onload = function(){
    let control = new Canvas();
    control.animate();
    control.draw();
}