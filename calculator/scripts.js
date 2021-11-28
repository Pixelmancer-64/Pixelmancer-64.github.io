class Calculator{
    static deleting(){
        his.pop();
    }

    static cleaning(){
        monitor.innerHTML = '';
    }

    static realDeal(res){
        if(isNaN(res)  || res === Infinity){
            this.mathPolice(res)
            return true
        } else{
            this.cleaning()
            his = [];
            let aux = res.toString().split('')
            aux.forEach((e) => his.push(e))
            return res
        } 
    }
    
    static mathPolice(num){
        document.getElementById('warning').innerHTML = `${num} - clear ou del para continuar`
        document.getElementById('warning').style.visibility = "visible"
    }

    static update(newRes){
        console.log(his)
        if(newRes==undefined) {
            this.cleaning();
            his = [];
        }
        else if(newRes === true) return
        else monitor.innerHTML += newRes; 
    }
}

const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equals = document.getElementById("equals")
const clear = document.getElementById("clear")
const del = document.getElementById("delete")
const monitor = document.querySelector(".monitor")
let his = []

numbers.forEach(button => {
    button.addEventListener('click', () => radio(button.innerHTML))
})

operators.forEach(button => {
    button.addEventListener('click', () => radio(button.innerHTML))
})

document.addEventListener('keydown', (event) => {
    let name= event.key;
    if(name === 'Enter' || name === '='){
        let aux = ''
        his.forEach((e) => {
            aux += e
        }) 
        Calculator.update(Calculator.realDeal(eval(aux)))
     }
    else if(name === 'Backspace') delShortcut()
    else if(isNaN(name)==false || name ==='.' || name === '*' || name === '/' || name === '+' || name === '-' || name === '(' || name === ')') radio(name)
})

equals.addEventListener('click', () => {
    let aux = ''
    his.forEach((e) => {
        aux += e
    }) 
    Calculator.update(Calculator.realDeal(eval(aux)))
})

clear.addEventListener('click', () => {
    Calculator.cleaning()
    document.getElementById('warning').style.visibility = "hidden"
    Calculator.update()
})

del.addEventListener('click', () => delShortcut())

function delShortcut(){
    Calculator.deleting()
    document.getElementById('warning').style.visibility = "hidden"
    let aux = ''

    his.forEach((e) => {
        aux += e
    })
    
    Calculator.cleaning()
    Calculator.update(aux)
    backspace()
}

let started = true;
function radio(e){
    his.push(e)
    Calculator.update(e)
    init(e)
    if(started === true) {
        console.log('hi')   
        animate()
        started = false
    }
}