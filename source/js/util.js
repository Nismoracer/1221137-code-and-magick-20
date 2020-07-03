'use strict';

(function () {
  window.util = {
    randomizeSelect: function (strings) {
      var randomNumber = Math.floor((Math.random() * strings.length));
      return strings[randomNumber];
    }
  };
})();
