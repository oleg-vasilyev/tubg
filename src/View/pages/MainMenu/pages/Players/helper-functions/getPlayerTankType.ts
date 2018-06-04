let nextIndex = 0;
let random = false;
export default () => {
  if (nextIndex === 8){
    random = true;
  }
  if (random){
    return Math.round(Math.random() * 7);
  }
  return nextIndex++;
};