const parallaxItems = document.getElementsByClassName("parallax-item")
const parallaxArray = Array.from(parallaxItems)

let input = {
    x: {

    },
    y: {
        start: 0,
        end: document.documentElement.scrollHeight-window.innerHeight,
    }
}
input.y.range = input.y.end - input.y.start;

let output ={
    x: {
        
    },
    y: {
        start: -100,
        end: 1000,
        current: 0,
    },
    zIndex: {
        range: 10000,
    },
    scale: {
        start: 1,
        end: .3,
    },
    blur: {
        startDepth: 1,
        range: 20,
    }
}

output.y.range = output.y.end - output.y.start;
output.scale.range = output.scale.start - output.scale.end;

window.addEventListener('resize',function(){
    input.y.end =  document.documentElement.scrollHeight-window.innerHeight;
    input.y.range = input.y.end - input.y.start;
});

window.addEventListener('scroll', scrollBrain)

function scrollBrain(){
    input.y.current=document.documentElement.scrollTop
    input.y.fraction= (input.y.current - input.y.start)/input.y.range 
    output.y.current = output.y.start + (input.y.fraction * input.y.range)
    update();
}

function update(){
    parallaxArray.forEach(function(element, e){
        let depth = parseFloat(element.dataset.depth,10);
        console.log(depth)
        let itemInputs = {
            scrollY: {
                start: element.offsetParent.offsetTop,
                end: element.offsetParent.offsetTop + window.innerHeight,
            }
        }
        
        itemInputs.scrollY.range = itemInputs.scrollY.end - itemInputs.scrollY.start;
        itemInputs.scrollY.fraction = (input.y.current - itemInputs.scrollY.start)/itemInputs.scrollY.range
        let currentPos = output.y.start + (itemInputs.scrollY.fraction * output.y.range)
        
        let item = {
            x: 0,
            y: -(currentPos * depth),
            zIndex: output.zIndex.range + (output.zIndex.range * depth),
            scale: output.scale.start + (output.scale.range * depth),
            blur: (depth - output.blur.startDepth) * output.blur.range,
        }
        element.style.zIndex = item.zIndex;
        element.style.filter = 'blur('+item.blur+'px)';
        element.style.transform = ' scale('+item.scale+') translate('+item.x+'px,'+item.y+'px)';
        
    });
}

scrollBrain();