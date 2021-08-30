const romanNumList = {M:1000,CM:900, D:500,CD:400, C:100, XC:90,L:50, XL: 40, X:10, IX:9, V:5, IV:4, I:1};
function romanEmpire(num){
    let a = 0;
    let romanConvert = "";
    for(chave in romanNumList){
        // a função verifica, a partir da chave M:1000, 
        //se $num dividido pelo valor da chave é igual a 1 
        a = Math.floor(num/romanNumList[chave]);
        //sendo $a >= 0, (sendo que ele recebeu 1 ou mais valores válidos)
        //é escrito o valor da chave no string romanConvert
        if(a >= 0){
            for(i=0;a > i; i++){
                romanConvert += chave;
                
            }
            num %= romanNumList[chave];
        }
    }
    return romanConvert;
} 

//Policial, aqui está o problema
/*
for(i=1; i<=10; i++){ 
console.log('Resultado: ',romanEmpire(i));
}
*/

//Funciona apenas de 1 a 3999 :p 
console.log('Resultado: ',romanEmpire(1));
console.log('Resultado: ',romanEmpire(3));
console.log('Resultado: ',romanEmpire(6));
console.log('Resultado: ',romanEmpire(9));
console.log('Resultado: ',romanEmpire(48));
console.log('Resultado: ',romanEmpire(59));
console.log('Resultado: ',romanEmpire(93));
console.log('Resultado: ',romanEmpire(575));