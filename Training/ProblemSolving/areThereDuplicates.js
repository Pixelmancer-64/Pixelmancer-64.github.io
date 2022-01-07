function areThereDuplicates(...args){
    console.log(args)

    const aux = {}
    for (i=0; i<args.length; i++) {
        if(!aux[args[i]]) aux[args[i]] = 1
        else return false
    }
    return true

}

console.log(areThereDuplicates('a', 'b', 2))