let rect = require("./rectangle");

let solveRect = (l, w) => {
    rect(l, w, (err, rectangle) => {
        if (err) console.log(err)
        else {
            console.log(`Area: ${rectangle.area()}`)
            console.log(`Perimeter: ${rectangle.perimeter()}`)
        }
    })
}

solveRect(2, 3)
