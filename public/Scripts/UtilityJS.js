//UTILITY FUNCTIONS. IsPrimeNumber. getFactors. getRandomInt.
function isPrimeNumber(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
            }
        }
        return true;
}

function getFactors(num){
    var num = Number(num);
    var factorArray = [];
    for (var i = 1; i <= num; i++){
        if (num % i === 0){
            factorArray.push(i);
            }
        }
        //I DONT KNOW WHAT THIS PART DOES. DOCUMENT BETTER!

        // if (isPrimeNumber(num) === false){
        //     factorArray.splice(factorArray.length-1,1);
        //     factorArray.splice(0,1);
        // }

        var randomIndex = Math.floor(Math.random()* factorArray.length);
        var factor = factorArray[randomIndex];
        return factor;
 }

//The max and the min are inclusive in this function
function getRandomInt(min, max) {
    min = Number(min);
    max = Number(max);
    var randomInt;
    randomInt = Math.floor(Math.random() * max) + min; 
    return randomInt;
}

//The max and min are inclusive. Will never return the value of the exception
function getRandomIntWithException(min, max, exception){
    min = Number(min);
    max = Number(max);
    var randomInt;
    randomInt = Math.floor(Math.random() * max) + min;

    while (randomInt == exception){
        randomInt = Math.floor(Math.random() * max) + min;
    }
    return randomInt;
}

//Remove item from array by value (array, value)
function removeItemFromArrayByValue(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

//Get random value from array
function getValueFromArray(array){
    var value = array[getRandomInt(0,array.length-1)];
    return value;
}
