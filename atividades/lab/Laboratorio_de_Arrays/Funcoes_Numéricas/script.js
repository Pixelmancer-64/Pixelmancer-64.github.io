const reduceHelp = (aux, auxNow) => aux + auxNow;
const reduceProduct = (auxP,auxNowP ) => auxP * auxNowP  ; 
const sumAux = [1,2,3];
const sumAux1 = [2,2,2];
const sumAux2 = [1,2,3,4,5,6];
console.log("Sum: ", sumAux.reduce(reduceHelp));
console.log("Sum: ",sumAux1.reduce(reduceHelp));
console.log("Sum: ",sumAux2.reduce(reduceHelp));


function oddSum (oddSumAux){ 
let oddHelper = [];
oddHelper = oddSumAux.filter(function(odd){
    return odd % 2 != 0;
});
if(oddHelper.length!=0)return oddHelper.reduce(reduceHelp)
else return 0;
}

console.log("sumOdds: ",oddSum(sumAux));
console.log("sumOdds: ",oddSum(sumAux1));
console.log("sumOdds: ",oddSum(sumAux2));



console.log("Product: ", sumAux.reduce(reduceProduct));
console.log("Product: ",sumAux1.reduce(reduceProduct));
console.log("Product: ",sumAux2.reduce(reduceProduct));

