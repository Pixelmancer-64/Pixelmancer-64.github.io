function power(base, exponent){
    if(exponent == 1) return base;
    return base * power(base, --exponent)
}

console.log(power(8,3))