exports.convert = = (req, res) => {
    try {
      
      res.status(201); 
      res.send();
    } catch (e) {
      console.log('e', e); // eslint-disable-line no-console
      res.sendStatus(500);
    }
  };

  const romanConverter = (number) => {
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