function defaultBot(tankState, stepType) {
  if (tankState.state.health === 0) {
    return (false);
  }

  const position = {
    x: tankState.state.x,
    y: tankState.state.y,
    direction: tankState.state.direction,
    oppositeDirection : direction<180?direction+180:direction-180
  }

  const enemies = new Array(...tankState.state.vision.enemies);
  const bullets = new Array(...tankState.state.vision.bullets);
  const walls = new Array(...tankState.state.vision.walls);

  const directions = {
    top: 90,
    right: 0,
    bottom: 270,
    left: 180,
    angle: 90
  }

  let step = {
    move: false,
    shoot: false,
    rotate: position.direction
  }

  const bullets_length = bullets.length;
  const walls_length = walls.length;
  const enemies_length = enemies.length;

  if ((walls_length > 0) || (enemies_length > 0) || (bullets_length > 0)) {
    if (bullets_length > 0 && stepType !== "Init") {
      for (let i = 0; i < bullets_length; i++) {
        if (runFromObject(position, bullets[i], directions, step)) {
          return(step);
        }
      }
    }

    if (walls_length > 0) {
      for (let i = 0; i < walls_length; i++) {
        if (walls[i] < 2){
          if (runFromWall(position, i, directions, step)){
            return(step);;
          }
        }
      }
    }

    if (enemies_length > 0 && stepType !== "Init") {
      for (let i = 0; i < enemies_length; i++) {
        if (runFromObject(position, bullets[i], directions, step)) {
          return(step);
        }
      }
    }
  }
  else {
    step.rotate = step.rotate === (directions.angle * 3) ? 0 : step.rotate + directions.angle;
    return (step);
  }
}

function runFromObject(botPosition, objectPosition, directions, step){
  if ((objectPosition.x === botPosition.x) || (objectPosition.y === position.y)){
    if (objectPosition.direction === botPosition.oppositeDirection){
      step.rotate = step.rotate === (directions.angle * 3) ? 0 : step.rotate + directions.angle;
      return (step);
    } 
    else if (((objectPosition.x < botPosition.x) && (objectPosition.direction === directions.right)) || ((objectPosition.x > botPosition.x) && (objectPosition.direction === directions.left))){
      step.move = true;
      return (step);
    }
    else if (((objectPosition.y < botPosition.y) && (objectPosition.direction === directions.bottom)) || ((objectPosition.y > botPosition.y) && (objectPosition.direction === directions.top))){
      step.move = true;
      return (step);
    }
  }

  return (null);
}

function runFromWall(botPosition, wallPosition, directions, step){
  let wall_direction = wallPosition % 2 == 0 ? directions.angle*(wallPosition+1) : directions.angle*(wallPosition-1);
  if ( wall_direction === botPosition.direction){
    step.rotate = botPosition.oppositeDirection;
    return (step);
  }
  else{
    step.move = true;
    return (step);
  }

  return (null);
}