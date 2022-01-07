function isSubsequence(string1, string2){
    let i = 0;
    for(let j=0; j < string2.length - 1; j++){
        if(string1[i] == string2[j]) {
            i++
            if(i == string1.length) return true
        }
    }
    return false
}

console.log(isSubsequence('hello', 'hello world'))