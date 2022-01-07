function avaragePair(arr, target){
    let i = 0
    let j = arr.length - 1

    while(i < j){
        let avg = (arr[i] + arr[j])/2
        if(avg == target) return true
        else if(avg > target) j--
        else i++
    }
    return false
}

console.log(avaragePair([5,5], 8))