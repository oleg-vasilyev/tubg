let nextIndex = 0;
export default () => {
  const playerName = 'player-' + nextIndex;
  nextIndex++;
  return playerName;
};