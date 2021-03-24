function square(pattern) {
    let result = '';
    for (var i=0 ; i<=pattern ; i++){
        for (var j=0 ; j<=pattern ; j++){
            result += '* '               
    }
    result += '\n'  ;
    }
    return result;
}
console.log(square(5));