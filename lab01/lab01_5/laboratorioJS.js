function isPrime(result){
    switch(result){
        case 1: return false;
        case 2: return true;
        case 3: return true;
        case 5: return true;
    }
    if (result % 2 == 0 || result % 3 == 0 || result % 5 == 0){
        return false;
    } 
    var sqrt = Math.sqrt(result);
    for (var i = 7; i <= sqrt; i += 6) {
        if (result % i == 0) return false;
        if (result % (i + 2) == 0) return false;
    }
    return true;
   }

   t = 1000;
   for(i=0; i <= t; i++){
       if(isPrime(i)==true){
        console.log(i)
       }
   }