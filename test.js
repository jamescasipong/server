const fetchData = (callback) => {
    // Simulate an asynchronous operation (e.g., API request)
    setTimeout(() => {
      console.log("Data fetched");
      callback(); // Call the callback function
    }, 1000);
}
  
  function onDataFetched() {
    console.log("Callback executed");
  }


const test = (callback, value, value3) => {

    const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
    
    const sum = callback(numbersCombined) + value();

    if (isEqual(sum)){
      console.log("Equals to 31");
    }
    else{
      console.log("Does not equal 31");
    }

    value3(isEqual(sum));

    try {
      console.log("total: ", callback(numbersCombined) , value());
      console.log("total: ", callback(numbersCombined) + value());
    }

    catch (err){
      console.log({error: err});
    }
}

function getBool(target){
  if (target){
    console.log("True")
  }
  else{
    console.log("False")
  }
}

function isEqual(target){
  return 31 == target
}


function valueOf10(){
   return 10;
}

function sumArray(arr){
  var total = 0;

  for (var i = 0; i < arr.length; i++){
    total += arr[i];
  }

  return total;
}

  test(sumArray, valueOf10, getBool)
  
  fetchData(onDataFetched);