
// First-Class can be assigned to variables, passed into functions, and used as return values

const someVar = () => "Oh, the things you can do with JS functions 😀!!!"

// Higher-Order functions take functions as arguments or returns a function
// Callback functions are passed into a function as an argument and then called inside

function someFunc(callback) {
    return callback() 
}

console.log(someFunc(someVar))


