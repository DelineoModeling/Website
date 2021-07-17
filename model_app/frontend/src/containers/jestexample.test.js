const {sum,multiply, division, subtraction, power} = require('./jestexample.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('multiply 2 and 3 to equal 6', () => {
    expect(multiply(2,3)).toBe(6);
});

test('divide 6 and 3 to equal 2', () => {
  expect(division(6,3)).toBe(2);
});

test('subtraction 2 and 3 to equal -1', () => {
  expect(subtraction(2,3)).toBe(-1);
});

test('power 5 and 3 to equal 125', () => {
  expect(power(5,3)).toBe(125);
});


