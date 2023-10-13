// Проверка длины строки
function checkStringValid(string, lengthMax) {
  return string.length <= lengthMax;
}

checkStringValid('кекс любит кексы',20);
checkStringValid('ехал Грека через реку',10);


// Проверка на палиндром
const checkPalindrome = (string) => {
  const stringCheck = string.replaceAll(' ', '').toLowerCase();
  let stringReverse = '';
  for (let i = stringCheck.length - 1; i >= 0; i--) {
    stringReverse += stringCheck[i];
  }
  return stringCheck === stringReverse;
};

checkPalindrome('Леша на полке клопа нашел');
checkPalindrome('кекс');


// Проверка наличия цифр в строке
const getIntegerNumber = (string) => {
  let result = '';
  if (!Number.isNaN(string)) {
    string = string.toString();
    for (let i = 0; i <= string.length - 1; i++) {
      const resultItem = parseInt(string[i], 10);
      if (Number.isInteger(resultItem)) {
        result += resultItem;
      }
    }
  }
  const integerNumber = result.length > 0 ? Math.round(result) : NaN;

  return integerNumber;
};

getIntegerNumber('Год 2023');
