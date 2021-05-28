exports.convert =  (req, res) => {  
  const valid = isRoman(req.header.input);
  if(valid) {
    try {
      const decimalNumber = romanConverter(req.headers.input);
      const binaryNumber = decimalNumber.toString(2);
      const ternaryNumber = decimalNumber.toString(3);
      const vigesimalNumber = decimalNumber.toString(20);
      const sexagesimalNumber = decToSex(decimalNumber);
      res.status(200); 
      res.send({'decimal': {'value': decimalNumber, 'type': 'Decimal'}, 'binary': {'value': binaryNumber, 'type': 'Binary'}, 
        'ternary': {'value': ternaryNumber, 'type': 'Ternary'}, 'vigesimal': {'value': vigesimalNumber, 'type': 'Vigesimal'},
        'sexagesimal': {'value': sexagesimalNumber, 'type': 'Sexagesimal'}});
    } catch (e) {
      console.log('e', e); // eslint-disable-line no-console
      res.sendStatus(500);
    }
  } else {
    res.status(400);
    res.send('The provided input is not a valid Roman Numeral, please try again.');
  }
};

const romanConverter = (romanNumber) => {  
  const romanDict = 
    {
      'M': 1000,
      'D': 500,
      'C': 100,
      'L': 50,
      'X': 10,
      'V': 5,
      'I': 1
    };
    /*if the input is one letter the function will 
    short circuit here and send the conversion straight away */
  if(romanDict[romanNumber]) {
    return romanDict[romanNumber];
  }
  /*
      Otherwise the input will be split in individual letters, 
      loop through them and progressively added to a final result to send to the user.
      the loop compare one value with the next one, to make sure  respect roman subtractive notation. 
      If not, they will be subtracted and the index of the loop will increase in order to not add 
      what was romanDict[romanArr[i +1] to the result again.
      */
  const romanArr = romanNumber.split('');
  let result = 0;
  for(let i = 0; i < romanArr.length; i++) {
    if(romanDict[romanArr[i]] < romanDict[romanArr[i +1]]) {
      result += romanDict[romanArr[i + 1]] - romanDict[romanArr[i]];
      i++;
    } else result += romanDict[romanArr[i]];
  }
  return result;
};

const isRoman = (string) => {
  // regex pattern
  const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/;
  return pattern.test(string);
};

  
      
function decToSex(number){
  var decToSexMap = ['0','1','2','3','4','5','6','7','8','9',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x'];

  number = number.toString().split('.');
  var integer = Math.abs(number[0]);
  var fraction = number[1];
  var result = '';

  do {
    result = decToSexMap[integer % 60] + result;
    integer = parseInt(integer / 60);
  } while (integer > 0);

  if (fraction){
    var decimalPlaces = fraction.toString().length;
    result += '.';
    fraction = parseFloat('.' + fraction);

    var x = 0;
    do {
      x++;
      var res = (fraction * 60).toString().split('.');
      result = result + decToSexMap[res[0]];

      if (res[1]) {
        fraction = parseFloat('.' + res[1]);
      }
      else {
        break;
      }
    } while (x < decimalPlaces);
  }
  return result;
}
