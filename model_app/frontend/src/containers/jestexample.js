const sum = (a, b) => {
  return a + b;
}
  
const multiply = (a, b) => {
  return a * b;
}

const division = (a,b) => {
  return a / b;
}

const subtraction = (a,b) => {
  return a - b;
}

const power = (a,b) => {
  return Math.pow(a,b);
}


module.exports = {
    sum,
    multiply,
    division,
    subtraction,
    power
}