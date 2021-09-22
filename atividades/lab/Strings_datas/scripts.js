const option1 = document.getElementById("inverter")
const option2 = document.getElementById("vogais")
const option3 = document.getElementById("separar")
const option4 = document.getElementById("maior")
const option5 = document.getElementById("substituir")
const option6 = document.getElementById("calculadora")
const option7 = document.getElementById("data")
const option8 = document.getElementById("distancia")
const option9 = document.getElementById("forca")
const option10 = document.getElementById("codificacao")
const old = document.getElementById("old")
const newC = document.getElementById("new")
const middle = document.getElementById("middle")
const currentDate = new Date()
const output = document.getElementById("output")

function spliter(){

}

option1.addEventListener('click',() => {
    aux=middle.value
    output.innerHTML = aux.split("").reverse().join("")
})


option2.addEventListener('click',() => {
    aux = middle.value.split("")
    let i = 0;
    aux.forEach( () => {
        switch(aux[i]){
            case 'a': aux[i] ="<b>a</b>"; break;
            case 'e': aux[i] ="<b>e</b>"; break;
            case 'i': aux[i] ="<b>i</b>"; break;
            case 'o': aux[i] ="<b>o</b>"; break;
            case 'u': aux[i] ="<b>u</b>"; break;
            case 'A': aux[i] ="<b>A</b>"; break;
            case 'E': aux[i] ="<b>E</b>"; break;
            case 'I': aux[i] ="<b>I</b>"; break;
            case 'O': aux[i] ="<b>O</b>"; break;
            case 'U': aux[i] ="<b>U</b>"; break;
            default: break;
        }
       i++
    });
    output.innerHTML= aux.join(" ")
    });


option3.addEventListener('click',() => {
        aux = middle.value.split(" ")
        let hand = []
        let txt = []
        for (i=0;i<aux.length;i++) {
            hand[i] = countOcurences(middle.value,aux[i])
            txt[i]='Para a palavra '+ aux[i]+ ' houveram '+ hand[i] + ' ocorrências' + "<br></br>"
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
            days = Math.ceil(Math.abs(aux - aux1) / (1000 * 60 * 60 * 24));

            output.innerHTML= 1970 - diff.getUTCFullYear() +` Anos, ` + diff.getUTCMonth() +` mes(es) e ` + diff.getUTCDate()+ ` dias  ou `+ days + ' dias no total' 
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
        console.log('oi')
        old.type='password';

        if(old.type=='password' && old.style.visibility=="visible"){
            
            security = old.value
            console.log(security)
        }  

        partialCamoRemoval()

    });


    function countOcurences(s, word) {
let replace = word
let re = new RegExp(replace,"g");

txt = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
txt = txt.replace(/[ ]{2,}/gi," ");//2 or more space to 1
txt = txt.replace(/\n /,"\n"); // exclude newline with a start spacing

        return txt.match(re, "").length
     }

     function camoRemoval(){
        old.style.visibility='visible'
        newC.style.visibility='visible'

     }
     function partialCamoRemoval(){
        old.style.visibility='visible'
         
     }

     