import { Battlefield } from "./Battlefield";
import { Tank } from "./Tank";
import { Bullet } from "./Bullet";

interface ITankTrack {
  id: number;
  x: number;
  y: number;
}

interface IBulletTrack {
  id: number;
  x: number;
  y: number;
  owner: number;
}
/**
 * 
 * `@class
 *  @description Class of collision solution
 * 
 */
export class CollisionSolution {

  public wallMap: Array<number>;
  private tankMap: Array<ITankTrack>;
  public bulletMap: Array<IBulletTrack>;
  public battlefield: Battlefield | null;

  constructor(battlefield: Battlefield | null) {
    this.wallMap = [];
    this.tankMap = [];
    this.bulletMap = [];
    this.battlefield = battlefield ? battlefield : null;
  }

  updateBattlefield(battlefield: Battlefield | null): void {
    if (battlefield !== null) {
      this.battlefield = battlefield;
      this.wallMap = [];
      let widthWall: number = this.battlefield.finishX - this.battlefield.startX;
      let heightWall: number = this.battlefield.finishY - this.battlefield.startY;
      this.wallMap = [(this.battlefield.startY - 1), (this.battlefield.finishX + 1), (this.battlefield.finishY + 1), (this.battlefield.startX - 1)];
    }
  }

  private getTankTrack(tank: Tank): [number, number] {
    if(!this.tankMap[tank.id]) {
      if(tank.health == 0) {
        throw "Tank is destroyed. Can't create track!";
      }
      let track = [tank.x, tank.y]
      this.tankMap[tank.id] = track;
    }
    return this.tankMap[tank.id];
  }

  private getBulletTrack(bullet: Bullet): [number, number] {
    if(!this.bulletMap[bullet.id]) {
      let bulletTrack: [number, number]= [bullet.x, bullet.y]
      this.bulletMap[bullet.id] = bulletTrack;
    }
    return this.bulletMap[bullet.id];
  }

  updateTank(tank: Tank): void {
    let tankTrack =  this.getTankTrack(tank);
    tankTrack[0] = tank.x;
    tankTrack[1] = tank.y;
  }

  removeBullet(bullet: Bullet): void {
    let bulletItem: Bullet = bullet;
    this.bulletMap.filter((bullet) => {
      bulletItem !== bullet;
    });
    bullet.onDestroy();
  }

  removeTank(tank: Tank): void {
    this.tankMap[tank.id] = null;
  }

  hitTestBullet(bullet: Bullet): boolean {
    let bulletTrack =  this.getBulletTrack(bullet);
    let tankTrack = bullet.owner.health ? this.getTankTrack(bullet.owner) : null;

    bulletTrack[0] = bullet.x;
    bulletTrack[1] = bullet.y;

    if (bullet.x == this.wallMap[1] || bullet.x == this.wallMap[3] || bullet.y == this.wallMap[0] || bullet.y == this.wallMap[3]) {
      bullet.onWall();
      return true;
    }

    this.tankMap.forEach((item: Tank, i: number, arr: Array<Tank>) => {
      if (bullet.x == item.x && bullet.y == item.y) {
        item.health -= bullet.power;
        this.removeBullet(bullet);
      }
    });
    return false;
  }

  getWallDistance(tank: Tank): number {

    let nDistance = Math.abs(tank.y - this.wallMap[0]);
    let eDistance = Math.abs(tank.x - this.wallMap[1]);
    let sDistance = Math.abs(tank.y - this.wallMap[2]);
    let wDistance = Math.abs(tank.x - this.wallMap[3]);

    return Math.min(nDistance, eDistance, wDistance, sDistance);
  }


}


// export default class CollisionResolver {

//   constructor() {
//     this._wallList = [];
//     this._tankMap = [];
//     this._bulletMap = [];
//     this._radarBeamMap = [];
//     this._battlefield = null;
//   }

//   private getTankShape(tank: Tank): any {
//     if(!this.tankMap[tank.id]) {
//       if(tank.health == 0) {
//         throw "Tank is destroyed. Can't create shape!";
//       }
//       let shape = [tank.x, tank.y]
//       this.tankMap[tank.id] = shape;
//       shape.tank = tank;
//     }
//     return this._tankMap[tank.id];
//   }

//   updateTank(tank) {
//     let tankShape =  this._getTankShape(tank);
//     tankShape.pos.x = tank.x;
//     tankShape.pos.y = tank.y;
//   }

//   removeBullet(bullet) {
//     this._bulletMap[bullet.id] = null;
//   }


//   removeTank(tank) {
//     this._tankMap[tank.id] = null;
//     this._radarBeamMap[tank.id] = null;
//   }

//   hitTestBullet(bullet) {
//     let bulletShape =  this._getBulletShape(bullet);
//     let tankShape =  bullet.owner.energy ? this._getTankShape(bullet.owner) : null;

//     bulletShape.pos.x = bullet.x;
//     bulletShape.pos.y = bullet.y;

//     let i;
//     let hitTest;
//     let wall;
//     for(i in this._wallList ) {
//       wall = this._wallList[i];
//       hitTest = SAT.testCirclePolygon(bulletShape, wall);
//       if(hitTest) {
//         bullet.onWallHit();
//         return true;
//       }
//     }
//     let enemyShape;
//     for(i in this._tankMap ) {
//       enemyShape = this._tankMap[i];
//       if(!enemyShape) continue;
//       if(enemyShape == tankShape) {
//         continue;
//       }
//       hitTest = SAT.testCircleCircle(bulletShape, enemyShape);
//       if(hitTest) {
//         let energyBefore = enemyShape.tank.energy;
//         bullet.onEnemyHit(enemyShape.tank);
//         bullet.owner.onEnemyHitScore(energyBefore - enemyShape.tank.energy);
//         if(enemyShape.tank.energy == 0) {
//           bullet.owner.onEnemyKillScore();
//         }
//         return true;
//       }
//     }
//     return false;
//   }

//   checkTank(tank) {
//     let tankShape =  this._getTankShape(tank);

//     tankShape.pos.x = tank.x;
//     tankShape.pos.y = tank.y;

//     let i;
//     let hitTest;
//     let wall;
//     for(i in this._wallList ) {
//       wall = this._wallList[i];
//       hitTest = SAT.testCirclePolygon(tankShape, wall);
//       if(hitTest) {
//         tank.onWallHit();
//         return false;
//       }
//     }
//     let enemyShape;
//     for(i in this._tankMap ) {
//       enemyShape = this._tankMap[i];
//       if(!enemyShape) continue;
//       if(enemyShape == tankShape) {
//         continue;
//       }
//       hitTest = SAT.testCircleCircle(tankShape, enemyShape);
//       let areAllies = tank.isAlly(enemyShape.tank);
//       if(hitTest) {
//         if(!areAllies) {
//           let energyBefore = enemyShape.tank.energy;
//           tank.onEnemyHit();
//           enemyShape.tank.onBeingRam(tank.speed);
//           tank.onEnemyHitScore(energyBefore - enemyShape.tank.energy);
//           return false;
//         } else {
//           tank.onAllyHit();
//           return false;
//         }
//       }
//     }
//     return true;
//   }

//   scanTanks(tank) {
//     let radarBeamShape =  this._getRadarBeamShape(tank);
//     let tankShape =  this._getTankShape(tank);
//     radarBeamShape.setAngle((tank.angle + tank.radarAngle)*Math.PI/180);
//     radarBeamShape.pos.x = tank.x;
//     radarBeamShape.pos.y = tank.y;

//     let i;
//     let enemyShape;
//     let hitTest;
//     let enemies = [];

//     for(i in this._tankMap ) {
//       enemyShape = this._tankMap[i];
//       if(!enemyShape) continue;
//       if(enemyShape == tankShape) {
//         continue;
//       }
//       hitTest = SAT.testPolygonCircle(radarBeamShape, enemyShape);
//       if(hitTest) {
//         enemies.push(enemyShape.tank);
//       }
//     }
//     if(enemies.length == 0) {
//       return false;
//     }
//     let closestEnemy = null;
//     let closestEnemyDistance = tank.radarRange;
//     let closestAlly = null;
//     let closestAllyDistance = tank.radarRange;
//     let d, dx, dy, ally;
//     for(i in enemies ) {
//       dx = enemies[i].x - tank.x;
//       dy = enemies[i].y - tank.y;
//       d = Math.sqrt(dx*dx + dy*dy);
//       ally = enemies[i].isAlly(tank);
//       if(!ally && (!closestEnemy || d < closestEnemyDistance)) {
//         closestEnemy = enemies[i];
//         closestEnemyDistance = d;
//       } else if(ally && (!closestAlly || d < closestAllyDistance)) {
//         closestAlly = enemies[i];
//         closestAllyDistance = d;
//       }
//     }
//     if(closestAlly) {
//       tank.onAllySpot(closestAlly);
//     }
//     if(closestEnemy) {
//       tank.onEnemySpot(closestEnemy);
//       closestEnemy.onTargetingAlarm();
//     }


//     return true;
//   }

//   scanBullets(tank) {
//     let radarBeamShape =  this._getRadarBeamShape(tank);
//     radarBeamShape.setAngle((tank.angle + tank.radarAngle)*Math.PI/180);
//     radarBeamShape.pos.x = tank.x;
//     radarBeamShape.pos.y = tank.y;

//     let i;
//     let hitTest;
//     let bulletShape;
//     let spottedBullets = false;

//     for(i in this._bulletMap) {
//       bulletShape = this._bulletMap[i];
//       if(!bulletShape) continue;
//       if(bulletShape.bullet.owner == tank) continue;
//       hitTest = SAT.testCirclePolygon(bulletShape, radarBeamShape);
//       if(hitTest) {
//         tank.onBulletSpot(bulletShape.bullet);
//         spottedBullets = true;
//       }
//     }

//     return spottedBullets;
//   }


//   scanWalls(tank) {
//     let distance = this.getWallDistance(tank);
//     if(distance < tank.radarRange) {
//       tank.onWallSpot(distance);
//       return true;
//     }
//     return false;
//   }

//   _getWallDistance(tank) {
//     let angle = tank.angle + tank.radarAngle;
//     while(angle > 180) angle -= 360;
//     while(angle < -180) angle += 360;

//     let distanceNorth = tank.y - this._battlefield.minY;
//     let distanceSouth = this._battlefield.maxY - tank.y;
//     let distanceWest = tank.x - this._battlefield.minX;
//     let distanceEast = this._battlefield.maxX - tank.x;

//     if(angle == -180 || angle == 180) { // W
//       return distanceWest;
//     } else if(angle == 0) { // E
//       return distanceEast;
//     } else if(angle == -90) { // N
//       return distanceNorth;
//     } else if(angle == 90) { // S
//       return  distanceSouth;
//     }

//     let d1, d2;

//     if(angle > -180 && angle < -90) { // NW
//       d1 = distanceWest / Math.cos((angle+180)*(Math.PI/180));
//       d2 = distanceNorth / Math.sin((angle+180)*(Math.PI/180));
//     } else if(angle > -90 && angle < 0) { // NE
//       d1 = distanceEast / Math.cos((-angle)*(Math.PI/180));
//       d2 = distanceNorth / Math.sin((-angle)*(Math.PI/180));
//     } else if(angle > 0 && angle < 90) { // SE
//       d1 = distanceEast / Math.cos((angle)*(Math.PI/180));
//       d2 = distanceSouth / Math.sin((angle)*(Math.PI/180));
//     } else { // SW
//       d1 = distanceWest / Math.cos((180-angle)*(Math.PI/180));
//       d2 = distanceSouth / Math.sin((180-angle)*(Math.PI/180));
//     }

//     return Math.min(d1, d2);
//   }

 

//   _getBulletShape(bullet) {
//     if(!this._bulletMap[bullet.id]) {
//       if(bullet.exploded) {
//         throw "Cannot create shape for exploded bullet";
//       }
//       let shape = new SAT.Circle(new SAT.Vector(bullet.x,bullet.y), 3);
//       this._bulletMap[bullet.id] = shape;
//       shape.bullet = bullet;
//     }
//     return this._bulletMap[bullet.id];
//   }

//   _getRadarBeamShape(tank) {
//     if(!this._radarBeamMap[tank.id]) {
//       if(tank.energy == 0) {
//         throw "Cannot create radar beam shape for destroyed tank";
//       }
//       let width = tank.radarRange * Math.tan(tank.radarFocal*(Math.PI/180))/2;
//       let shape = new SAT.Polygon(new SAT.Vector(tank.x, tank.y), [
//         new SAT.Vector(0, 3),
//         new SAT.Vector(0, -3),
//         new SAT.Vector(tank.radarRange,-width),
//         new SAT.Vector(tank.radarRange,width)
//       ]);

//       this._radarBeamMap[tank.id] = shape;
//       shape.tank = tank;
//     }
//     return this._radarBeamMap[tank.id];
//   }

// }
