const allCheckingInput = document.querySelector('#allCheck');
const checkInput1 = document.querySelector('#check-1');
const checkInput2 = document.querySelector('#check-2');
const checkInput3 = document.querySelector('#check-3');

const init = () => {
  if (checkInput1.checked && checkInput2.checked && checkInput3.checked) {
    return (allCheckingInput.checked = true);
  }

  return (allCheckingInput.checked = false);
};

const handleAllInputChecked = () => {
  if (!allCheckingInput.checked) {
    checkInput1.checked = false;
    checkInput2.checked = false;
    checkInput3.checked = false;
  } else {
    checkInput1.checked = true;
    checkInput2.checked = true;
    checkInput3.checked = true;
  }
};

checkInput1.addEventListener('click', init);
checkInput2.addEventListener('click', init);
checkInput3.addEventListener('click', init);
allCheckingInput.addEventListener('click', handleAllInputChecked);
