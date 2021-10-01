const option1 = document.getElementById("inverter")
const option2 = document.getElementById("vogais")
const option3 = document.getElementById("separar")
const option4 = document.getElementById("maior")
const option5 = document.getElementById("substituir")
const option6 = document.getElementById("calculadora")
const option7 = document.getElementById("data")
const option8 = document.getElementById("distancia")
const option9 = document.getElementById("forca")
const option10 = document.getElementById("condificacao")
const old = document.getElementById("old")
const newC = document.getElementById("new")
const middle = document.getElementById("middle")
const currentDate = new Date()
const output = document.getElementById("output")

option1.addEventListener('click',() => {
    aux=middle.value
    output.innerHTML = aux.split("").reverse().join("")
})


option2.addEventListener('click',() => {
    let result = []
    aux = middle.value.split("")
    let i = 0;
    aux.forEach( () => {
        switch(aux[i]){
            case 'a': result[i] ="<b>a</b>"; break;
            case 'e': result[i] ="<b>e</b>"; break;
            case 'i': result[i] ="<b>i</b>"; break;
            case 'o': result[i] ="<b>o</b>"; break;
            case 'u': result[i] ="<b>u</b>"; break;
            case 'A': result[i] ="<b>A</b>"; break;
            case 'E': result[i] ="<b>E</b>"; break;
            case 'I': result[i] ="<b>I</b>"; break;
            case 'O': result[i] ="<b>O</b>"; break;
            case 'U': result[i] ="<b>U</b>"; break;
            default: result[i] = aux[i];
        }
       i++
    });
    console.log(result)
    output.innerHTML= result.join('')
    });


option3.addEventListener('click',() => {
        aux = middle.value.split(' ');
        let hand = []
        let txt = []
        for (i=0;i<aux.length;i++) {
            hand[i] = countOcurences(middle.value, aux[i])
            txt[i]='Para a palavra '+ aux[i]+ ' houve '+ hand[i] + ' ocorrências' + "<br></br>"
            output.innerHTML=txt.join("")
        }
    });


option4.addEventListener('click',() => {
        aux = middle.value.split(" ")
        let hand = []
        let max = []
        let maxHelper = []
        let j=0
        let i=0
        for (i=0;i<aux.length;i++) {
            hand[i] = countOcurences(middle.value,aux[i])

            if(hand[i] >= Math.max(...hand)){

                max[j] = aux[i]
                j++
            }

        }
        for (i=0,j=0;i<max.length;j++) {
            maxHelper[j] = max[i]
           i = i+Math.max(...hand)
        }
        output.innerHTML='A(s) palavra(s) com maior ocorrência foi(ram): '+ maxHelper+ ' com '+ Math.max(...hand)+' ocorrências'

    });


    option5.addEventListener('click',() => {
        old.type='text';
        newC.type='text'; 
        if(old.type=='text' && old.style.visibility=="visible"){
    
        let re = new RegExp(old.value,'g');
        let str = middle.value
        output.innerHTML=str.replace(re, newC.value)
        }
        camoRemoval()

    });

    option6.addEventListener('click',() => {

        old.type='date';
        newC.type='date';
        if(old.type=='date' && old.style.visibility=="visible"){
            aux = new Date(old.value)
            aux1 = new Date(newC.value)
            diff = new Date(aux.getTime() - aux1.getTime());
            day = Math.ceil(Math.abs(aux - aux1) / (1000 * 60 * 60 * 24));

            years =  aux1.getUTCFullYear() - aux.getUTCFullYear()
            months = aux1.getUTCMonth() - aux.getUTCMonth()
            days = aux1.getUTCDate() - aux.getUTCDate()

            output.innerHTML= years +` Ano(s), ` + months +` mes(es) e ` + days+ ` dia(s)  ou `+ day + ' dias no total' 
        }
        camoRemoval()
        });

    
    option7.addEventListener('click',() => {
        old.type='date';
        
        if(old.type=='date' && old.style.visibility=="visible"){

            const options = {year: 'numeric', month: 'long', day: 'numeric'}
            aux = new Date (old.value)
            aux.setDate(aux.getDate() + 1);
            output.innerHTML= aux.toLocaleDateString('pt-br', options)

        }
        partialCamoRemoval()
    });

    option8.addEventListener('click',() => {
        old.type='date';
        newC.type='date';
        
        if(old.type=='date' && old.style.visibility=="visible"){
            aux = new Date(old.value)
            aux1 = new Date(newC.value)
            weeks = Math.ceil(Math.abs(aux - aux1) / (1000 * 60 * 60 * 24 * 7));

            output.innerHTML= 'A distância é de: '+weeks+' semanas'
        }  
        camoRemoval()
    });

    option9.addEventListener('click',() => {
        old.type='password';
        // const strong = 
        const weak = /[a-z]|[A-Z]/
        const medium = /[a-z][A-Z][0-9]/
        const strong = /[a-z][A-Z][0-9][!@#\$%\^\&*\)\(+=._-]+$/

        if(old.type=='password' && old.style.visibility=="visible"){
            
            security = old.value
            
            if(weak.test(security)==true){
                old.style.backgroundColor="red"
            }
            if(medium.test(security)==true){
                old.style.backgroundColor="orange"
            }
            if(strong.test(security)==true){
                old.style.backgroundColor="green"
            }
            
        }
        partialCamoRemoval()

    });

    option10.addEventListener('click',() => {
        old.type='text';
        newC.type='text';
        let i=0 
        if(old.type=='text' && old.style.visibility=="visible"){
    
            let str = middle.value.split("")
            let result = str
            auxL = old.value.split("")
            auxR = newC.value.split("")
            for(i=0;i<old.value.length;i++){
            result = enigma(auxL[i],auxR[i],result) 
            }
            output.innerHTML = result.join("")
        }
        camoRemoval()
        

    });


    function countOcurences(s, word) {
let replace = word
let re = new RegExp(replace,"g");

txt = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
txt = txt.replace(/[ ]{2,}/gi," ");//2 or more space to 1
txt = txt.replace(/\n /,"\n"); // exclude newline with a start spacing

        return txt.match(re, '').length
     }

     function camoRemoval(){
        old.style.visibility='visible'
        newC.style.visibility='visible'

     }
     function partialCamoRemoval(){
        old.style.visibility='visible'
         
     }

     function enigma(code1,code2,txt){

        let res=[]
        for(i=0;i<txt.length;i++){

        switch(txt[i]){
            case code1: res[i]=code2; break;
            case code2: res[i]=code1; break;
            default: res[i]=txt[i]; 
        }
    }
    return(res)
}
    
