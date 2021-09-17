class brains{
    constructor(previousText, currentText){
        this.previousText = previousText 
        this.currentText = currentText 
        this.cleaning()
    }
    cleaning(){
        this.current = ''
        this.previous = ''
        this.operation=undefined
    }
    partialCleaner(){
        this.current=''
    }

    deleting(){
        this.current = this.current.toString().slice(0,-1)
    }

    writer(number){
        if(number==='.' && this.current.includes('.')) return 0;
        this.current = this.current.toString() + number.toString()
    }
    mathematician(operation){
        if(this.current ==='') return 0
        if(this.previous !=='') this.realDeal()
        this.operation = operation;
        this.previous = this.current;
        this.current = ''
    }

    realDeal(){
        let result 
        const prev = parseFloat(this.previous)
        const cur =  parseFloat(this.current)
        if(isNaN(this.previous) ||
         isNaN(this.current)){
             return 0} 
        switch(this.operation){
            case '/':
                result = prev / cur
                break
            case '*':
                result = prev * cur
                break
            case '-':
                result = prev - cur
                break
            case '+':
                result = prev + cur
                break
            default: return 0
        }
        if(isNaN(result)){
            this.mathPolice()
            return 

        }
        this.current = result
        this.operation = undefined
        this.previous = ''
    }
    

    mathPolice(){
        document.getElementById('warning').style.visibility = "visible"
      //  this.typeWriter('warning', 'testee', 10000)

    }

    update(){
        currentText.innerHTML = this.current
        if(this.operation != null){
            previousText.innerHTML = `${this.previous} ${this.operation}`
        }else previousText.innerHTML = ''
    }
    /*
    typeWriter(dummy, txt, speed){
        let i = 0
        if (i < txt.length) {
            console.log(i)
          document.getElementById(dummy).innerHTML += txt.charAt(i);
          i++;
          setTimeout(this.typeWriter(), speed);
        }
      }
      */
}

const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equals = document.getElementById("equals")
const clear = document.getElementById("clear")
const del = document.getElementById("delete")
const previousText = document.querySelector(".previous")
const currentText = document.querySelector(".current")

const calculator = new brains(previousText, currentText)

//listiners for the numbers

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.writer(button.innerHTML)
        calculator.update()
    })
})
document.addEventListener('keydown', (event) => {

    let name= event.key;
     if(isNaN(name)==false || name ==='.' ){
        calculator.writer(name)
    calculator.update()
     }
    
})

//listeners for the operators 
operators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.mathematician(button.innerHTML)
        calculator.update()
    })
})
document.addEventListener('keydown', (event) => {

    let name= event.key;
     if(name === '*' ||name === '/' ||name === '+' ||name === '-' ){
        calculator.mathematician(name)
    calculator.update()
     }
    
})

//listeners for Del, AC and Equals 
    equals.addEventListener('click', () => {
        calculator.realDeal()
        calculator.update()
    })

    clear.addEventListener('click', () => {
            calculator.cleaning()
        document.getElementById('warning').style.visibility = "hidden"
        calculator.update()
            
    })

    del.addEventListener('click', () => {
        
        calculator.deleting()
        document.getElementById('warning').style.visibility = "hidden"
        calculator.update()
    })


document.addEventListener('keydown', (event) => {

    let name= event.key;
     if(name === 'Enter'){
        calculator.realDeal()
        calculator.update()
     }
     if(name === 'Backspace'){
        calculator.deleting()
        document.getElementById('warning').style.visibility = "hidden"
        calculator.update()
     }
})