function maxSubarraySum(arr, window){
    let highest = 0

    if(arr.length < window) return null

    for(let i=0; i < window; i++) highest += arr[i]
    let aux = highest
    
    for(let i=window; i < arr.length; i++) {
        aux += arr[i] - arr[i - window]
        if(highest < aux) highest = aux
    }
    return highest;
}

console.log(maxSubarraySum([1,4,2,10,23,3,1,0,20], 4))