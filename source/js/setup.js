'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
    'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_AMOUNT = 4;

  var setup = document.querySelector('.setup');
  var coatInput = setup.querySelector('form.setup-wizard-form input[name=coat-color]');
  var eyesInput = setup.querySelector('form.setup-wizard-form input[name=eyes-color]');
  var fireballInput = setup.querySelector('form.setup-wizard-form input[name=fireball-color]');

  window.setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
      'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],

    changeColor: function (currentElement, currentArray) {
      var resultColor;
      resultColor = window.util.randomizeSelect(currentArray);
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
    }
  };

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
    wizard.name = window.util.randomizeSelect(WIZARD_NAMES) + ' ' + window.util.randomizeSelect(WIZARD_SURNAMES);
    wizard.coatColor = window.util.randomizeSelect(window.setup.COAT_COLORS);
    wizard.eyesColor = window.util.randomizeSelect(window.setup.EYES_COLORS);
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
})();
