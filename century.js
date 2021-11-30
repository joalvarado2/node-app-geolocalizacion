// funcion que calcula el siglo segun el año ingresado
function solution2(year) {
  let century = Math.ceil(year / 100);

  return century;
}
console.log(solution2(1905));

// funcion que evalua si una palabra es palindroma o no
function palindrono(text) {
  let firtLetter = 0;
  let secondLetter = text.length - 1;
  let x = 0;

  for (let i = 0; i <= text.length; i++) {
    text[firtLetter] !== text[secondLetter]
      ? (x = x + 1)
      : (firtLetter = firtLetter + 1);
    secondLetter = secondLetter - 1;
  }
  let value = x === 0 ? true : false;

  return value;
}
console.log(palindrono("reconocer"));

// funcion que determina cual multiploicacion es mayor de los numeros ingresados (de menor a mayor)
function mayor(arr) {
  let result = Number.MIN_SAFE_INTEGER,
    higher = 0,
    less = 0;

  for (let i = 0; i <= arr.length; i++) {
    less = arr[i + 1];
    higher = arr[i];
    less * higher > result ? result = less * higher) : null;
  }
  return result;
}

console.log(mayor([-2,5,-6,2,-9]));


