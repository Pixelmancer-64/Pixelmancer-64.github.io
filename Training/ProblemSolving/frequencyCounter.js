function sameFrequency(num1, num2){
    const n1 = num1.toString()
    const n2 = num2.toString() 

    if(n1.length != n2.length) return false
    const aux1 = prepareObject(n1)
    const aux2 = prepareObject(n2)

    for(let e in aux1){
        if(aux1[e] != aux2[e]) return false
    }
    return true

}


function prepareObject(arr){
    const aux = {}
    for (i=0; i<arr.length;i++) {
        if(!aux[arr[i]]) aux[arr[i]] = 1
        else aux[arr[i]]++
    }
    return aux
} 

console.log(sameFrequency(3589578,5879385))