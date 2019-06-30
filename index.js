const csv = require('csv-parser')
const fs = require('fs')
const results = [];
var insertionResults;
var shellSortResults;
var numbers = [];
 
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(JSON.parse(data.Number)))
  .on('end', () => {

    console.time('Insertion Sort');
    var insertionResults = InsertionSort(results);
    console.timeEnd('Insertion Sort');
    
    console.time('Shellsort');
    var shellSortResults = ShellSort(results);
    console.timeEnd('Shellsort');

    console.log('----------------------------');

    LogNumbers(shellSortResults);

    console.time('linearSearch Largest');
    linearSearch(shellSortResults, 999912);
    console.timeEnd('linearSearch Largest');

    numbers.forEach(num => {
      console.time(`linearSearch ${num}`);
      linearSearch(shellSortResults, num);
      console.timeEnd(`linearSearch ${num}`);
    });

    console.log('----------------------------');

    console.time('BinarySearch Largest');
    BinarySearch(shellSortResults, 999912);
    console.timeEnd('BinarySearch Largest');

    numbers.forEach(num => {
      console.time(`BinarySearch ${num}`);
      BinarySearch(shellSortResults, num);
      console.timeEnd(`BinarySearch ${num}`);
    });

  });

 

function InsertionSort (data) {
  for (let i = 1; i < data.length; i++) {
    let j = i - 1
    let tmp = data[i]
    while (j >= 0 && data[j] > tmp) {
      data[j + 1] = data[j]
      j--
    }
    data[j+1] = tmp
  }
  return data
}

function ShellSort(data) {
  var increment = data.length / 2;
  while (increment > 0) {
      for (i = increment; i < data.length; i++) {
          var j = i;
          var temp = data[i];
  
          while (j >= increment && data[j-increment] > temp) {
            data[j] = data[j-increment];
              j = j - increment;
          }
  
          data[j] = temp;
      }
  
      if (increment == 2) {
          increment = 1;
      } else {
          increment = parseInt(increment*5 / 11);
      }
  }
return data;
}

function LogNumbers (data) {
  for (i = 0; i <= data.length; i = i + 1500) {
    if (i < data.length) {
      //console.log (data[i]);
      numbers.push(data[i]);
    }
  }
}

function linearSearch(data, ToFind) {
  for (var i=0; i<data.length; i++) {
    if (data[i] == ToFind) {
      return i;
    }
  } return null;
}

function BinarySearch(data, toFind) {
  var lowIndex = 0;
  var highIndex = data.length - 1;
  while (lowIndex <= highIndex) {
    var midIndex = Math.floor((lowIndex + highIndex) / 2);
    if (data[midIndex] == toFind) {
      return midIndex;
    } else if (data[midIndex] < toFind) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  } return null;
}