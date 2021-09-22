function fibonacci(t){

    for(i=0, result=1, aux1=0, aux=0 ; i<=t; i++){
        if(i==0){
         aux1 =0; 
         console.log('Fibonacci n= ' + i + ' result= ' + aux1);
        i++;
        }else {
            aux1=aux + result;
            aux = result;
            result = aux1;
            
        }
        console.log('Fibonacci n= ' + i + ' result= ' + result);
}
}
fibonacci(100);