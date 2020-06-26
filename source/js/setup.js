'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
  'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
  'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARDS_AMOUNT = 4;

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var coatInput = setup.querySelector('form.setup-wizard-form input[name=coat-color]');
var eyesInput = setup.querySelector('form.setup-wizard-form input[name=eyes-color]');
var fireballInput = setup.querySelector('form.setup-wizard-form input[name=fireball-color]');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');


var randomizeSelect = function (strings) {
  var randomNumber = Math.floor((Math.random() * strings.length));
  return strings[randomNumber];
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (userNameInput !== document.activeElement) {
      closePopup();
    }
  }
};

var changeColor = function (currentElement, currentArray) {
  var resultColor;
  resultColor = randomizeSelect(currentArray);
  if (currentElement.className.baseVal === 'wizard-coat') {
    coatInput.value = resultColor;
    currentElement.style.fill = resultColor;
  } else if (currentElement.className.baseVal === 'wizard-eyes') {
    eyesInput.value = resultColor;
    currentElement.style.fill = resultColor;
  } else {
    fireballInput.value = resultColor;
    currentElement.style.background = resultColor;
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

wizardCoat.addEventListener('click', function () {
  changeColor(wizardCoat, COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  changeColor(wizardEyes, EYES_COLORS);
});

wizardFireball.addEventListener('click', function () {
  changeColor(wizardFireball, FIREBALL_COLORS);
});


setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = [];

var createWizards = function () {
  var wizard = {
    name: '',
    coatColor: '',
    eyesColor: ''
  };
  wizard.name = randomizeSelect(WIZARD_NAMES) + ' ' + randomizeSelect(WIZARD_SURNAMES);
  wizard.coatColor = randomizeSelect(COAT_COLORS);
  wizard.eyesColor = randomizeSelect(EYES_COLORS);
  return wizard;
};

for (var i = 0; i < WIZARDS_AMOUNT; i++) {
  wizards[i] = createWizards();
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');
