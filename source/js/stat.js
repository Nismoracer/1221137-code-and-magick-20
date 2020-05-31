'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var MARGIN = 20;
var GAP = 10;
var SPACE_BETWEEN = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var textArray = ['Ура! Вы победили!', 'Список результатов!'];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var printText = function (ctx, textX, textY, textSpace) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  for (var i = 0; i < textArray.length; i++) {
    ctx.fillText(textArray[i], textX, (textY + (textSpace * i)));
  }
};

var randomBlue = function () {
  var colorString = '';
  var randomNumber = Math.round(Math.random() * 100);
  colorString = 'hsl(240, ' + randomNumber.toString() + '%, 50%)';
  return colorString;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  var currentHeight;
  var currentTime;
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  printText(ctx, CLOUD_X + MARGIN, CLOUD_Y + MARGIN, 20);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    currentHeight = (BAR_HEIGHT * times[i]) / maxTime;
    currentTime = Math.round(times[i]);
    ctx.fillText(currentTime, CLOUD_X + MARGIN + ((BAR_WIDTH + SPACE_BETWEEN) * i), CLOUD_Y + CLOUD_HEIGHT - currentHeight - (MARGIN * 3));
    ctx.fillText(players[i], CLOUD_X + MARGIN + ((BAR_WIDTH + SPACE_BETWEEN) * i), CLOUD_Y + CLOUD_HEIGHT - (MARGIN * 1.5));
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = randomBlue();
    }
    ctx.fillRect(CLOUD_X + MARGIN + ((BAR_WIDTH + SPACE_BETWEEN) * i), CLOUD_Y + CLOUD_HEIGHT - (MARGIN * 2) - currentHeight, BAR_WIDTH, currentHeight);
  }
};
