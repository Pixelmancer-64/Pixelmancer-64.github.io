function productOfArray(array){
    let accumulator = 1;

    function helper(auxArray){
        if(auxArray.length == 0) return;

        accumulator = accumulator * auxArray[0];
        helper(auxArray.slice(1))

    }

    helper(array)
    return accumulator;

}

console.log(productOfArray([1,2,3,10]))