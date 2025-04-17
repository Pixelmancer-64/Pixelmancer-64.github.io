function reverse(string){
    if(string.length < 1) return string
    return reverse(string.slice(1)) + string[0];

}

console.log(reverse('awesome'))