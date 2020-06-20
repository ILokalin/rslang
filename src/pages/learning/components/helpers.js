export const measureWordWidth = (word) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 2rem serif';
  return ctx.measureText(word).width;
}

export const againBtnHandler = () => {
  

};

export const simpleBtnHandler = () => {

}

export const goodBtnHandler = () => {

}

export const hardBtnHandler = () => {

}