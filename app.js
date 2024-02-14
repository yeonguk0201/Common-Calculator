const result = document.getElementById('result');
const current = document.getElementById('current');
const btnPer = document.getElementById('btn-per');
const btnCancelAll = document.getElementById('btn-cancelAll');
const btnCancel = document.getElementById('btn-cancel');
const btnDel = document.getElementById('btn-del');
const btnFountain = document.getElementById('btn-fountain');
const btnSqare = document.getElementById('btn-square');
const btnRoot = document.getElementById('btn-root');
const btnDiv = document.getElementById('btn-div');
const btnMul = document.getElementById('btn-mul');
const btnMin = document.getElementById('btn-min');
const btnPlus = document.getElementById('btn-plus');
const btnPlusMin = document.getElementById('btn-plus-min');
const btnDot = document.getElementById('btn-dot');
const btnResult = document.getElementById('btn-result');
const nums = document.querySelectorAll('.num');
const logBox = document.getElementById('log-box');
const logBoxBackground = document.getElementById('log-box-background');
const logList = document.getElementById('log-list');
const logBtn = document.getElementById('log');
const cleanLogBtn = document.getElementById('clean-log');

let resultValue = '0';
let currentValue = '';
let calValue = 0;
result.textContent = resultValue;
current.textContent = currentValue;

//숫자 키
nums.forEach((num) => {
  num.addEventListener('click', () => {
    if (resultValue === '0' || resultValue === '-0') {
      resultValue = num.textContent;
    } else {
      if (currentValue.charAt(currentValue.length - 2) === '=') {
        resetValue();
        resultValue = num.textContent;
      } else {
        resultValue += num.textContent;
      }
    }
    result.textContent = resultValue;
  });
});

//.버튼
btnDot.addEventListener('click', () => {
  if (result.textContent.includes('.')) {
  } else {
    resultValue += '.';
    result.textContent = resultValue;
  }
});

//취소버튼
btnCancel.addEventListener('click', () => {
  resultValue = '0';
  result.textContent = resultValue;
});

//다 취소하는 버튼
btnCancelAll.addEventListener('click', () => {
  resetValue();
});

//지우는 버튼
btnDel.addEventListener('click', () => {
  if (resultValue === '0') {
  } else {
    if (currentValue.charAt(currentValue.length - 2) === '=') {
      currentValue = '';
      current.textContent = currentValue;
    } else {
      if (resultValue.length === 1) {
        resultValue = '0';
        result.textContent = '0';
      } else {
        resultValue = result.textContent.slice(0, -1);
        result.textContent = resultValue;
      }
    }
  }
});

//더하기 버튼
btnPlus.addEventListener('click', () => {
  performOperation('+');
});
//빼기 버튼
btnMin.addEventListener('click', () => {
  performOperation('-');
});
//나누기 버튼
btnDiv.addEventListener('click', () => {
  performOperation('/');
});
//곱하기 버튼
btnMul.addEventListener('click', () => {
  performOperation('*');
});
//분수 버튼
btnFountain.addEventListener('click', () => {
  resultValue = 1 / resultValue;
  result.textContent = resultValue;
});
//제곱 버튼
btnSqare.addEventListener('click', () => {
  resultValue = Math.pow(resultValue, 2);
  result.textContent = resultValue;
});
//제곱근 버튼
btnRoot.addEventListener('click', () => {
  resultValue = Math.sqrt(resultValue);
  result.textContent = resultValue;
});
//플마 버튼
btnPlusMin.addEventListener('click', () => {
  resultValue = -resultValue;
  result.textContent = resultValue;
});
//퍼센트 버튼
btnPer.addEventListener('click', () => {
  resultValue = resultValue * 0.01;
  result.textContent = resultValue;
});
// 결과 버튼
btnResult.addEventListener('click', () => {
  let operation = currentValue.charAt(currentValue.length - 2);
  resultCalculator(operation);
  const log = current.textContent + result.textContent;
  addLog(log);
});
//로그 버튼
logBtn.addEventListener('click', toggleLogBox);
//로그 삭제 버튼
cleanLogBtn.addEventListener('click', cleanLog);

//함수
function resultCalculator(operator) {
  if (operator === '×') {
    operator = '*';
  }
  if (operator === '÷') {
    operator = '/';
  }
  if (currentValue.charAt(currentValue.length - 2) === '=') {
    let operator = currentValue.split(' ')[1];
    resultValue = math.evaluate(`${currentValue.split(' ')[0]} ${operator} ${resultValue}`);
    currentValue = `${calValue.toString()} ${operator} ${result.textContent} = `;
    result.textContent = math.evaluate(`${calValue} ${operator} ${parseFloat(result.textContent)}`);
    current.textContent = currentValue;
  } else {
    resultValue = math.evaluate(`${calValue} ${operator} ${resultValue}`);
    currentValue = `${calValue.toString()} ${operator} ${result.textContent} = `;
    result.textContent = math.evaluate(`${calValue} ${operator} ${parseFloat(result.textContent)}`);
    current.textContent = currentValue;
  }
}

function resetValue() {
  resultValue = '0';
  currentValue = '';
  calValue = 0;
  result.textContent = resultValue;
  current.textContent = currentValue;
}

function performOperation(operator) {
  if (currentValue.charAt(currentValue.length - 2) === '=') {
    calValue = resultValue;
    currentValue = calValue + ` ${operator} `;
    current.textContent = currentValue;
    resultValue = '0';
    result.textContent = resultValue;
  } else if (current.textContent !== '') {
    let operation = currentValue.charAt(currentValue.length - 2);
    if (operation === '÷') {
      operation = '/';
    } else if (operation === '×') {
      operation = '*';
    }
    calValue = math.evaluate(`${calValue} ${operation} ${resultValue}`);
    currentValue = calValue + ` ${operator} `;
    current.textContent = currentValue;
    resultValue = '0';
    result.textContent = resultValue;
  } else {
    if (currentValue === '') {
      calValue = resultValue;
    } else {
      calValue = math.evaluate(`${calValue} ${operator} ${parseFloat(resultValue)}`);
    }
    currentValue = calValue + ` ${operator} `;
    current.textContent = currentValue;
    resultValue = '0';
    result.textContent = resultValue;
  }
}

function toggleLogBox() {
  logBoxBackground.classList.toggle('show');
}

function addLog(text) {
  const listItem = document.createElement('li');
  listItem.textContent = text;
  logList.appendChild(listItem);
}

function cleanLog() {
  logList.innerHTML = '';
}
