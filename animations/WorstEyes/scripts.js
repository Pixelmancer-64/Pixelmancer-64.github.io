const pupil = document.getElementsByClassName("pupil")
const pupilArray = Array.from(pupil)

let mouse ={
    x: {
        start: 0,
        end: window.innerWidth,
        current: 0,
        range: 0,
        fraction: 0,
    },
    y: {
        start: 0,
        end: window.innerHeight,
        current: 0,
        range: 0,
        fraction: 0,
    }, 
}

mouse.x.range = mouse.x.end - mouse.x.start;
mouse.y.range = mouse.y.end - mouse.y.start;
let pupils ={
    x: {
        start: -75,
        end: 60,
        current: 0,
        range: 0,
    },
    y: {
        start: -75,
        end: 50,
        current: 0,
        range: 0,
    },

}

pupils.x.range = pupils.x.end - pupils.x.start;
pupils.y.range = pupils.y.end - pupils.y.start;


window.addEventListener('mousemove', function(event){
    mouse.x.current = event.x;
    mouse.x.fraction = (mouse.x.current - mouse.x.start)/mouse.x.range;
    mouse.y.current = event.y;
    mouse.y.fraction = (mouse.y.current - mouse.y.start)/mouse.y.range;

    pupils.x.current = pupils.x.start + (mouse.x.fraction * pupils.x.range);
    pupils.y.current = pupils.y.start + (mouse.y.fraction * pupils.y.range);

    pupilArray.forEach(function(element){
        element.style.transform = 'translate('+pupils.x.current+'px,'+pupils.y.current+'px)'
        

    });

});
window.addEventListener('resize',function(){
    mouse.x.end = innerWidth;
    mouse.y.end = innerHeight;
    mouse.x.range = mouse.x.end - mouse.x.start;
    mouse.y.range = mouse.y.end - mouse.y.start;
});

window.addEventListener('mouseout', function(){
    mouse.x.current = undefined;
    mouse.y.current = undefined;
});
