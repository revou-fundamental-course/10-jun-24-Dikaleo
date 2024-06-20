// Event when the user scrolls the page
window.onscroll = function() {startScrolling()};

const temperatureDiv = document.getElementById('js-temperature');
const temperatureValueLeftDiv = document.getElementById('js-temperature-value--left');
const temperatureValueRightDiv = document.getElementById('js-temperature-value--right');

const temperatureInput = document.getElementById('js-temperature-input');
const temperatureType = document.getElementById('js-temperature-type');
const temperatureTarget = document.getElementById('js-target-temperature');
const temperatureTargetType = document.getElementById('js-target-type');

const convertButton = document.getElementById('js-convert-button');
const reverseButton = document.getElementById('js-reverse-button');
const resetButton = document.getElementById('js-reset-button');

const temperatureHowTo = document.getElementById('js-temperature-how-to');

updateTemperature(50);

convertButton.addEventListener('click', convertConversion);
reverseButton.addEventListener('click', reverse);
resetButton.addEventListener('click', reset);

function startScrolling() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("js-progress-bar").style.width = scrolled + "%";
}

function updateTemperature(value) {
  calculateTemperatureColor(value);
  calculateTemperature(value, temperatureType.value, temperatureTargetType.value);
}

function calculateTemperatureColor(value){
  let divider = setDivider(temperatureType.value);
  let valuePercentage = (value / divider);
  let height = valuePercentage * 60;
  temperatureDiv.style.height = height + 'vh';

  const red = Math.round(valuePercentage * 255);
  const blue = Math.round(255 - valuePercentage * 255);
  const color = `rgb(${red}, 0, ${blue})`;

  temperatureDiv.style.backgroundColor = color;

  temperatureValueLeftDiv.style.bottom = height + 'vh';
  temperatureValueRightDiv.style.bottom = height + 'vh';
}

function calculateTemperature(inputValue, type, target){
  if(type == target){
    setValueLeft(inputValue, temperatureType.value);
    setValueRight(inputValue, temperatureTargetType.value);
    return;
  }

  setValueLeft(inputValue, temperatureType.value);

  if(type == 0){
    if(target == 1){
      let targetValue = (inputValue * 9 / 5) + 32;
      setValueRight(targetValue, temperatureTargetType.value);
      temperatureHowTo.textContent = `(${inputValue}°${checkSymbol(type)} 9 / 5) + 32 = ${targetValue}°${checkSymbol(temperatureTargetType.value)}`
    }
    else if (target == 2){
      let targetValue = parseInt(inputValue) + 273;
      setValueRight(targetValue, temperatureTargetType.value);
      temperatureHowTo.textContent = `${inputValue}°${checkSymbol(type)} + 273 = ${targetValue}°${checkSymbol(temperatureTargetType.value)}`
    }
  }
  if(type == 1){
    if(target == 0){
      let targetValue = (inputValue - 32) * 5 / 9;
      setValueRight(targetValue, temperatureTargetType.value);
      temperatureHowTo.textContent = `(${inputValue}°${checkSymbol(type)} - 32) * 5 / 9 = ${targetValue}°${checkSymbol(temperatureTargetType.value)}`
    }
    else if (target == 2){
      let targetValue = (inputValue - 32) * 5 / 9 + 273;
      setValueRight(targetValue, temperatureTargetType.value);
      temperatureHowTo.textContent = `(${inputValue}°${checkSymbol(type)} - 32) * 5 / 9 + 273 = ${targetValue}°${checkSymbol(temperatureTargetType.value)}`
    }
  }
  if(type == 2){
    if(target == 0){
      let targetValue = parseInt(inputValue) - 273;
      setValueRight(targetValue, temperatureTargetType.value);
      temperatureHowTo.textContent = `${inputValue}°${checkSymbol(type)} - 273 = ${targetValue}°${checkSymbol(temperatureTargetType.value)}`
    }
    else if (target == 1){
      let targetValue = (inputValue - 273) * 9 / 5 + 32;
      setValueRight(targetValue, temperatureTargetType.value);
      temperatureHowTo.textContent = `(${inputValue}°${checkSymbol(type)} - 273) * 9 / 5 + 32 = ${targetValue}°${checkSymbol(temperatureTargetType.value)}`
    }
  }
}

function setDivider(type){
  if(type == 0){
    return 100;
  }
  else if(type == 1){
    return 212;
  }
  else{
    return 373;
  }
}

function setValueLeft(value, type){
  temperatureValueLeftDiv.textContent = `${value}°${checkSymbol(type)}`;
  temperatureInput.value = value;
}

function setValueRight(value, type){
  temperatureValueRightDiv.textContent = `${value}°${checkSymbol(type)}`;
  temperatureTarget.value = value;
}

function checkSymbol(type){
  if(type == 0){
    return "C";
  }
  else if(type == 1){
    return "F";
  }
  else{
    return "K";
  }
}

function convertConversion(){
  if(temperatureInput.value == ""){
    alert("You need to input temperature!");
    return;
  }
  if(checkSymbolMaxAndMinimum(temperatureType.value)){
    return;
  }

  updateTemperature(temperatureInput.value);
}

function checkSymbolMaxAndMinimum(type){
  
  if(type == 0){
    if(temperatureInput.value > 100 || temperatureInput.value < 0){
      alert("Value not supported!");
      return true;
    }
  }
  else if(type == 1){
    if(temperatureInput.value > 212 || temperatureInput.value < 0){
      alert("Value not supported!");
      return true;
    }
  }
  else{
    if(temperatureInput.value > 373 || temperatureInput.value < 273){
      alert("Value not supported!");
      return true;
    }
  }

  return false;
}

function reverse(){
  let temp = temperatureType.value;
  temperatureType.value = temperatureTargetType.value;
  temperatureTargetType.value = temp;
}

function reset(){
  temperatureType.value = 0;
  temperatureTargetType.value = 1;
  updateTemperature(50);
}