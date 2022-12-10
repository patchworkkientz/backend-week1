// global scope
const e = 10

const sum = (a) => {
  // outer functions scope
  return (b) => {
    // outer functions scope
    return (c) => {
      // outer functions scope
      return (d) => {
        // most inner scope
        return a + b + c + d + e
      }
    }
  }
}

const sum2 = sum(1)
const sum3 = sum2(2)
const sum4 = sum3(3)
const result = sum4(4)
console.log(result) // 20