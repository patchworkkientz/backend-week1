let outerFn = () => {
    let x = "Fun with Closures 😀"

    innerFn = () => console.log(x)
    return innerFn
}

let closureTest = outerFn()

closureTest()

//console.log(closureTest.toString()) // to see function definition, no x value included






