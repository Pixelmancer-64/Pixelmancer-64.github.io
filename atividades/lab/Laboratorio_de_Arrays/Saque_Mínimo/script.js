function ATM(money){
    for(aHundred=0;money - 100 >= 0; aHundred++){
        money -= 100;
        
    }console.log('100 bills: ',aHundred);
    for(aFifty=0;money - 50 >= 0; aFifty++){
        money -= 50;
        
    }console.log('50 bills: ',aFifty);
    for(aTwenty=0;money - 20 >= 0; aTwenty++){
        money -= 20;
        
    }console.log('20 bills: ',aTwenty);
    for(aTen=0;money - 10 >= 0; aTen++){
        money -= 10;

    }console.log('10 bills: ',aTen);
    for(aFive=0;money - 5 >= 0; aFive++){
        money -= 5;
        
    }console.log('5 bills: ',aFive);
    for(aTwo=0;money - 2 >= 0; aTwo++){
        money -= 2;
        
    }console.log('2 bills: ',aTwo);
    if(money == 0) return 'Sucess'
    else return 'There is '+money+' Dolar left';

}
console.log(ATM(287));


