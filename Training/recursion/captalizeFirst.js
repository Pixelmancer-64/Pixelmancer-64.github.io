function captalizeFirst(array){
    return array.map(element => element[0].toUpperCase() + element.slice(1, element.length));
}

console.log(captalizeFirst(['car','taco','banana']))


