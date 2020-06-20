export const measureWordWidth = (word) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 2rem serif';
  return ctx.measureText(word).width;
}