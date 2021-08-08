function powerOf(num, times){

    for(i=0, result=0; i<=times; i++){
        result = Math.pow(num,i);
        console.log(num + ' to the power of ' + i +' = ' + result);
    }
}
powerOf(4,30);