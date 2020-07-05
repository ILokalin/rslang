import { painting } from './constants';

const drawPuzzlePiece = (canvas, size) => {
  const ctx = canvas.getContext('2d');
  const q = 14;
  const a = canvas.height / 2 - q / 2;

  ctx.fillStyle = 'white';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size, a);
  ctx.bezierCurveTo(
    size + 9, a - 4,
    size + 15, a - 2,
    size + 15, a + 7,
  );
  ctx.bezierCurveTo(
    size + 15, a + 22,
    size, a + 14,
    size, a + 14,
  );
  ctx.lineTo(size, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0, canvas.height - a);
  ctx.bezierCurveTo(
    9, canvas.height - a + 4,
    15, canvas.height - a + 2,
    15, canvas.height - a - 7,
  );
  ctx.bezierCurveTo(
    15, canvas.height - a - 22,
    0, canvas.height - a - 14,
    0, canvas.height - a - 14,
  );
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.fill();
  ctx.clip();
  ctx.save();
};

const drawFirstPuzzlePiece = (canvas, size) => {
  const ctx = canvas.getContext('2d');
  const q = 14;
  const a = canvas.height / 2 - q / 2; // upto circ
  ctx.fillStyle = 'white';

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size, a);
  ctx.bezierCurveTo(
    size + 9, a - 4,
    size + 15, a - 2,
    size + 15, a + 7,
  );
  ctx.bezierCurveTo(
    size + 15, a + 22,
    size, a + 14,
    size, a + 14,
  );
  ctx.lineTo(size, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.fill();
  ctx.clip();
  ctx.save();
};

const drawLastPuzzlePiece = (canvas, size) => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  const q = 14;
  const a = canvas.height / 2 - q / 2; // upto circ

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.lineTo(0, canvas.height - a);
  ctx.bezierCurveTo(
    9, canvas.height - a + 4,
    15, canvas.height - a + 2,
    15, canvas.height - a - 7,
  );
  ctx.bezierCurveTo(
    15, canvas.height - a - 22,
    0, canvas.height - a - 14,
    0, canvas.height - a - 14,
  );
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.clip();
  ctx.stroke();
  ctx.save();
};

const drawCorrect = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#53db5c';
  ctx.stroke();
};

const drawWrong = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#f04872';
  ctx.lineWidth = 2;
  ctx.stroke();
};

const drawWhiteBorder = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.stroke();
};

const setBackgroundToPuzzlePiece = (canvas, sx, sy, word, isPictureOn) => {
  const gameResult = document.querySelector('.game-result');
  const widthScale = gameResult.offsetWidth / painting.naturalWidth;
  const heightScale = gameResult.offsetHeight / painting.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (isPictureOn) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.drawImage(painting, sx / widthScale, sy / heightScale, canvas.width / widthScale, canvas.height / heightScale, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#f48fb1';
    ctx.fill();
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#795548';
  if (gameResult.offsetWidth < 500) {
    ctx.font = '0.8rem Montserrat';
  }
  else {
    ctx.font = '1rem Montserrat';
  }  
  ctx.fillText(word, (canvas.width - ctx.measureText(word).width) / 2, (canvas.height / 3) * 2);
  ctx.strokeStyle = 'white';
};

export {
  drawPuzzlePiece, drawFirstPuzzlePiece, drawLastPuzzlePiece, drawCorrect,
  drawWrong, drawWhiteBorder, setBackgroundToPuzzlePiece,
};
