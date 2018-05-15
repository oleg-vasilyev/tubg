import { Battlefield } from "./Battlefield";
import { Tank } from "./Tank";
import { Bullet } from "./Bullet";

export class CollisionSolution {

  public wallList: Array<number>;
  public tankMap: Array<any>;
  public bulletMap: Array<any>;
  public visorMap: Array<any>;
  public battlefield: Battlefield;

  constructor(battlefield: Battlefield) {
    this.wallList = [0, 0, 0, 0];
    this.tankMap = [];
    this.bulletMap = [];
    this.visorMap = [];
    this.battlefield = battlefield;
  }

  updateBattlefield(battlefield: Battlefield): void {
    this.battlefield = battlefield;
    let wall: Array<number> = [];
    wall[0] = battlefield.startX-1;
    wall[1] = battlefield.finishX+1;
    wall[2] = battlefield.startY-1;
    wall[3] = battlefield.finishY+1;
  }

  updateTank(tank: Tank): void {
    let tankMark =  this.getTankMark(tank);
    tankMark.x = tank.x;
    tankMark.y = tank.y;
  }

  removeBullet(bullet: Bullet): void {
    this.bulletMap[bullet.id] = null;
  }


  removeTank(tank: Tank): void {
    this.tankMap[tank.id] = null;
    this.visorMap[tank.id] = null;
  }

  hitTestBullet(bullet: Bullet): boolean {
    let bulletMark =  this.getBulletMark(bullet);
    let tankMark =  bullet.owner.health ? this.getTankMark(bullet.owner) : null;

    bulletMark.x = bullet.x;
    bulletMark.y = bullet.y;

    let i: any;
    let hitTest: boolean;
    let wall: number ;
    for(i in this.wallList ) {
      wall = this.wallList[i];
      if (i < 2 && bulletMark.x == wall) {
        hitTest = true;
      } else if (bulletMark.y == wall) {
        hitTest = true;
      } else {
        hitTest = false;
      }
      if(hitTest) {
        bullet.onWall();
        return true;
      }
    }
    let enemyMark;
    for(i in this.tankMap ) {
      enemyMark = this.tankMap[i];
      if(!enemyMark) continue;
      if(enemyMark == tankMark) {
        continue;
      }
      if (bulletMark.x == enemyMark.x && bulletMark.y == enemyMark.y) {
        hitTest = true;
      } else {
        hitTest = false;
      }
      if(hitTest) {
        let energyBefore = enemyMark.tank.health;
        bullet.onEnemy(enemyMark.tank);
        bullet.owner.onEnemyHit();
        if (enemyMark.tank.energy == 0) {
          bullet.owner.onEnemyKillScore();
        }
        return true;
      }
    }
    return false;
  }

  checkTank(tank: Tank): boolean {
    let tankMark =  this.getTankMark(tank);

    tankMark.x = tank.x;
    tankMark.y = tank.y;

    let i: any;
    let hitTest: boolean;
    let wall: number;
    for(i in this.wallList ) {
      wall = this.wallList[i];
      if (i < 2 && tankMark.x == wall) {
        hitTest = true;
      } else if (tankMark.y == wall) {
        hitTest = true;
      } else {
        hitTest = false;
      }
      if(hitTest) {
        tank.onWall();
        return true;
      }
    }

    let enemyMark;
    for(i in this.tankMap) {
      enemyMark = this.tankMap[i];
      if(!enemyMark) continue;
      if(enemyMark == tankMark) {
        continue;
      }
      if (tankMark.x == enemyMark.x && tankMark.y == enemyMark.y) {
        hitTest = true;
      } else {
        hitTest = false;
      }
      
      if(hitTest) {
          let healthBefore: number = enemyMark.tank.health;
          tank.onEnemy();
          enemyMark.tank.onEnemy();
          return true;
      }
    }
    return false;
  }

  scanTanks(tank: Tank) {
    let VisorBeamMark =  this.getVisorBeamMark(tank);
    let tankMark =  this.getTankMark(tank);
    let dirThis: number = (tank.direction)*Math.PI/180;
    VisorBeamMark.x = tank.x;
    VisorBeamMark.y = tank.y;

    let i: any;
    let enemyMark: any;
    let hitTest: boolean;
    let enemies = [];
    let coefA: number = 3;
    let coefB: number = 8;
    let xA: number = Math.round(coefA*Math.sin(dirThis) - coefA*Math.cos(dirThis) + VisorBeamMark.x);
    let yA: number = Math.round(coefA*Math.cos(dirThis) - coefA*Math.sin(dirThis) + VisorBeamMark.y);
    let xB: number = Math.round(coefB*Math.cos(dirThis) + coefA*Math.sin(dirThis) + VisorBeamMark.x);
    let yB: number = Math.round(coefB*Math.sin(dirThis) + coefA*Math.cos(dirThis) + VisorBeamMark.y);
    let xC: number = Math.round(coefB*Math.cos(dirThis) - coefA*Math.sin(dirThis) + VisorBeamMark.x);
    let yC: number = Math.round(coefB*Math.sin(dirThis) - coefA*Math.cos(dirThis) + VisorBeamMark.y);
    let xD: number = Math.round(-coefA*Math.sin(dirThis) - coefA*Math.cos(dirThis) + VisorBeamMark.x);
    let yD: number = Math.round(-coefA*Math.cos(dirThis) - coefA*Math.sin(dirThis) + VisorBeamMark.y);

    let maxX: number = Math.max(xA, xB, xC, xD);
    let maxY: number = Math.max(yA, yB, yC, yD);
    let minX: number = Math.min(xA, xB, xC, xD);
    let minY: number = Math.min(yA, yB, yC, yD);

    for(i in this.tankMap ) {
      enemyMark = this.tankMap[i];
      if(!enemyMark) continue;
      if(enemyMark == tankMark) {
        continue;
      }
      if (enemyMark.pos.x >= minX && enemyMark.pos.x <= maxX && enemyMark.pos.y >= minY && enemyMark.pos.y <= maxY) {
        hitTest = true;
      } else {
        hitTest = false;
      }
      if(hitTest) {
        enemies.push(enemyMark.tank);
        tank.getEnemy(tank);
      }
    }
    if(enemies.length == 0) {
      return false;
    }


    return true;
  }

  scanBullets(tank: Tank): boolean {
    let VisorBeamMark =  this.getVisorBeamMark(tank);
    let dirThis: number = tank.direction;
    VisorBeamMark.x = tank.x;
    VisorBeamMark.y = tank.y;
    let tankMark =  this.getTankMark(tank);
    let i: any;
    let hitTest: boolean;
    let bulletMark: Bullet;
    let spottedBullets: boolean = false;
    let bullets = [];
    let coefA: number = 3;
    let coefB: number = 8;
    let xA: number = Math.round(coefA*Math.sin(dirThis) - coefA*Math.cos(dirThis) + VisorBeamMark.x);
    let yA: number = Math.round(coefA*Math.cos(dirThis) - coefA*Math.sin(dirThis) + VisorBeamMark.y);
    let xB: number = Math.round(coefB*Math.cos(dirThis) + coefA*Math.sin(dirThis) + VisorBeamMark.x);
    let yB: number = Math.round(coefB*Math.sin(dirThis) + coefA*Math.cos(dirThis) + VisorBeamMark.y);
    let xC: number = Math.round(coefB*Math.cos(dirThis) - coefA*Math.sin(dirThis) + VisorBeamMark.x);
    let yC: number = Math.round(coefB*Math.sin(dirThis) - coefA*Math.cos(dirThis) + VisorBeamMark.y);
    let xD: number = Math.round(-coefA*Math.sin(dirThis) - coefA*Math.cos(dirThis) + VisorBeamMark.x);
    let yD: number = Math.round(-coefA*Math.cos(dirThis) - coefA*Math.sin(dirThis) + VisorBeamMark.y);

    let maxX: number = Math.max(xA, xB, xC, xD);
    let maxY: number = Math.max(yA, yB, yC, yD);
    let minX: number = Math.min(xA, xB, xC, xD);
    let minY: number = Math.min(yA, yB, yC, yD);

    for(i in this.bulletMap ) {
      bulletMark = this.bulletMap[i];
      if(!bulletMark) continue;
      if (bulletMark.x >= minX && bulletMark.x <= maxX && bulletMark.y >= minY && bulletMark.y <= maxY) {
        hitTest = true;
      } else {
        hitTest = false;
      }
      if(hitTest) {
        bullets.push(bulletMark);
        tank.getBullet(bulletMark);
        spottedBullets = true;
      }
    }

    return spottedBullets;
  }


  scanWalls(tank: Tank) {
    
  }

  getTankMark(tank: Tank): Tank {
    if(!this.tankMap[tank.id]) {
      if(tank.health == 0) {
        throw "Cannot create Mark for destroyed tank";
      }
      this.tankMap[tank.id] = tank;
    }
    return this.tankMap[tank.id];
  }

  getBulletMark(bullet: Bullet): Bullet {
    if(!this.bulletMap[bullet.id]) {
      if(bullet.destroyed) {
        throw "Cannot create Mark for destroyed bullet";
      }
      this.bulletMap[bullet.id] = bullet;
    }
    return this.bulletMap[bullet.id];
  }

  getVisorBeamMark(tank: Tank): Tank {
    if(!this.visorMap[tank.id]) {
      if(tank.health == 0) {
        throw "Cannot create Visor beam Mark for destroyed tank";
      }

      this.visorMap[tank.id] = tank;
    }
    return this.visorMap[tank.id];
  }

}
