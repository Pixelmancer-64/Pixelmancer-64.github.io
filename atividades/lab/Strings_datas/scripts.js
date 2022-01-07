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
const oldLabel = document.getElementById("oldLabel")
const newLabel = document.getElementById("newLabel")
const old = document.getElementById("old")
const newC = document.getElementById("new")
const middle = document.getElementById("middle")
const currentDate = new Date()
const output = document.getElementById("output")


option1.addEventListener('click',() => {
    camo()
    camoMiddleRemoval()
    if (middle.value != ''){
    aux=middle.value
    output.innerHTML = aux.split("").reverse().join("")
    }
    
})

option2.addEventListener('click',() => {
    camo()
    camoMiddleRemoval()
    if(middle.value != ''){
    aux = middle.value.split("")
    let me = ''
    aux.forEach( (e) => {
        switch(e){
            case 'a': me +="<strong>a</strong>"; break;
            case 'e': me +="<strong>e</strong>"; break;
            case 'i': me +="<strong>i</strong>"; break;
            case 'o': me +="<strong>o</strong>"; break;
            case 'u': me +="<strong>u</strong>"; break;
            case 'A': me +="<strong>A</strong>"; break;
            case 'E': me +="<strong>E</strong>"; break;
            case 'I': me +="<strong>I</strong>"; break;
            case 'O': me +="<strong>O</strong>"; break;
            case 'U': me +="<strong>U</strong>"; break;
            case ' ': me += "&nbsp"; break;
            default: me += e;
        }
    });
    console.log(me)
    output.innerHTML = me
    }
    });

option3.addEventListener('click',() => {
    camo()
    camoMiddleRemoval()
    if(middle.value != ''){
        aux = middle.value.replace(/\s/g, '').toLowerCase().split('');
        let txt = {}
        for (i=0;i<aux.length;i++) {
            if(/[a-z0-9]/.test(aux[i])){
                if(!txt[aux[i]]){
                    txt[aux[i]] = 1
                }
                else txt[aux[i]]++
            }
        }

        let text = ''
        for(let e in txt){
            console.log(e)
            text += `${e}: ${txt[e]}<br>`
        }
        output.innerHTML=text
    }
    });


option4.addEventListener('click',() => {
    camo()
    camoMiddleRemoval()
    if(middle.value != ''){
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
    }
    });

option5.addEventListener('click',() => {
        old.type='text';
        newC.type='text'; 
        oldLabel.innerHTML = 'Palavra antiga:'
        newLabel.innerHTML = 'Nova palavra'

        if(old.type=='text' && old.style.visibility=="visible" && middle.value != '' ){
    
        let re = new RegExp(old.value,'g');
        let str = middle.value
        output.innerHTML=str.replace(re, newC.value)
        }
        camoRemoval()
        camoMiddleRemoval()


    });

option6.addEventListener('click',() => {
        camoMiddle()
        oldLabel.innerHTML = 'Data inicial:'
        newLabel.innerHTML = 'Data final'
        old.type='date';
        newC.type='date';
        if(old.type=='date' && old.style.visibility=="visible" && old.value != ''){
            aux = new Date(old.value)
            aux1 = new Date(newC.value)
            diff = new Date(aux1.getTime() - aux.getTime());
            const ageDate = new Date(diff);
            day = Math.ceil(Math.abs(ageDate) / (1000 * 60 * 60 * 24));

            years =  Math.abs(ageDate.getUTCFullYear() - 1970);
            months = ageDate.getUTCMonth();
            days = ageDate.getUTCDate();

            output.innerHTML=  years +` Ano(s), ` + months +` mes(es) e ` + days+ ` dia(s)  ou `+ day + ' dias no total' 
        }
        camoRemoval()
        });

    
option7.addEventListener('click',() => {
        old.type='date';
        
        if(old.type=='date' && old.style.visibility=="visible" && old.value != ''){

            const options = {year: 'numeric', month: 'long', day: 'numeric'}
            aux = new Date (old.value)
            aux.setDate(aux.getDate() + 1);
            output.innerHTML= aux.toLocaleDateString('pt-br', options)

        }
        camo();
        camoMiddle();
        partialCamoRemoval()
    });

option8.addEventListener('click',() => {
        old.type='date';
        newC.type='date';
        oldLabel.innerHTML = 'Data inicial:'
        newLabel.innerHTML = 'Data final'
        
        if(old.type=='date' && old.style.visibility=="visible" && old.value != ''){
            aux = new Date(old.value)
            aux1 = new Date(newC.value)
            weeks = Math.ceil(Math.abs(aux - aux1) / (1000 * 60 * 60 * 24 * 7));

            output.innerHTML= 'A distância é de: '+weeks+' semanas'
        }  
        camoMiddle();
        camoRemoval()
    });

option9.addEventListener('click',() => {
        old.type='password';
        oldLabel.innerHTML = 'Senha:'
        const medium = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
        const strong = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^\&*\)\(+=._-])/

        if(old.type=='password' && old.style.visibility=="visible" && old.value != ''){
            
            security = old.value

            console.log(medium.test(security))

            if(strong.test(security)){
                old.style.backgroundColor="green"
            }
            else if(medium.test(security)){
                old.style.backgroundColor="orange"
            }
            else old.style.backgroundColor="red"
    
            
            
        }
        camo();
        camoMiddle();
        partialCamoRemoval()

    });

option10.addEventListener('click',() => {
        old.type='text';
        newC.type='text';
        oldLabel.innerHTML = 'Primeira palavra:'
        newLabel.innerHTML = 'Segunda palavra'
        let i=0 
        if(old.type=='text' && old.style.visibility=="visible" && old.value != ''){
    
            let str = middle.value.split("")
            let result = str
            auxL = old.value.split("")
            auxR = newC.value.split("")
            for(i=0;i<old.value.length;i++){
            result = enigma(auxL[i],auxR[i],result) 
            }
            output.innerHTML = result.join("")
        }
        camoMiddleRemoval()
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

function camo(){
    old.style.visibility='hidden';
    newC.style.visibility='hidden';
    oldLabel.style.visibility='hidden';
    newLabel.style.visibility='hidden';
    old.value = '';
    newC.value = '';

}

function camoMiddle(){
    middle.style.visibility = 'hidden';
    middle.value = '';
}
function camoMiddleRemoval(){
    middle.style.visibility = 'visible';    
}

function camoRemoval(){
    old.style.visibility='visible';
    newC.style.visibility='visible';
    oldLabel.style.visibility='visible';
    newLabel.style.visibility='visible';

}
function partialCamoRemoval(){
    old.style.visibility='visible'
    oldLabel.style.visibility='visible';

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
    return res
}

