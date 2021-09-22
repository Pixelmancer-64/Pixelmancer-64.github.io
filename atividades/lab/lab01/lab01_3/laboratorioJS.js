function sumEven(t){

    for(i=0, result=0; i<=t; i++){

        if(i % 2 == 0){
        result = result + i;
        }else{
            continue;
        }
    }
    return result;

}
console.log(sumEven(1000));