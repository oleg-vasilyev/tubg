function defaultBot(tankState) {
  if (tankState.state.health === 0) {
    return (false);
  }

  let position = {
    x: tankState.state.x,
    y: tankState.state.y,
    direction: tankState.state.direction
  }

  let enemies = new Array(...tankState.state.vision.enemies);
  let bullets = new Array(...tankState.state.vision.bullets);
  let walls = new Array(...tankState.state.vision.walls);








}

