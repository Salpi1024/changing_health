exports.convert =  (req, res) => {
    try {
      const decimalNumber = romanConverter(req.headers.input);
      const binaryNumber = decimalNumber.toString(2);
      const ternaryNumber = decimalNumber.toString(3);
      const vigesimalNumber = decimalNumber.toString(20);
      const sexagesimalNumber = decToSex(decimalNumber);
      res.status(201); 
      res.send({"decimal": {"value": decimalNumber, "type": "Decimal"}, "binary": {"value": binaryNumber, "type": "Binary"}, 
      "ternary": {"value": ternaryNumber, "type": "Ternary"}, "vigesimal": {"value": vigesimalNumber, "type": "Vigesimal"},
       "sexagesimal": {"value": sexagesimalNumber, "type": "Sexagesimal"}});
    } catch (e) {
      console.log('e', e); // eslint-disable-line no-console
      res.sendStatus(500);
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
    }
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
  }

  
      
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
