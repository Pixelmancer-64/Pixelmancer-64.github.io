function factorial(a){

    for(i=0, result =1; i<a;i++){
        result = result * (a-i)
    }
    return result;
}

console.log(factorial(12));