import { Battlefield } from './Battlefield';
import { Bullet } from './Bullet';
import { CONFIG } from './Config';
import { Tank } from './Tank';

export class CollisionSolution {
  public wallList: number[];
  public tankList: Tank[];
  public bulletList: Bullet[];
  public battlefield: Battlefield;

  public constructor(battlefield: Battlefield) {
    this.wallList = [battlefield.startX, battlefield.finishX, battlefield.startY, battlefield.finishY];
    this.tankList = [];
    this.bulletList = [];
    this.battlefield = battlefield;
  }

  public removeBullet(bullet: Bullet): void {
    this.bulletList = this.bulletList.filter((item) => {
      return item.id !== bullet.id;
    });
  }

  public removeTank(tank: Tank): void {
    this.tankList = this.tankList.filter((item) => {
      return item.id !== tank.id;
    });
  }

  public hitWallTestBullet(bullet: Bullet): boolean {
    let hitWallTest: boolean = false;
    if (bullet.x < this.wallList[0] || bullet.x > this.wallList[2] || bullet.y > this.wallList[3] || bullet.y < this.wallList[1]) {
      hitWallTest = true;
    }

    return hitWallTest;
  }

  public hitEnemyTestBullet(bullet: Bullet): boolean {
    let hitEnemyTest: boolean = false;
    for (const item of this.tankList) {
      if (item.x === bullet.x && item.y === bullet.y) {
        if (item.id !== bullet.owner.id) {
          hitEnemyTest = true;
          item.health = item.health - bullet.power;
          if (item.health <= 0) {
            bullet.owner.addKillsScore();
          }
        }
      }
    }

    return hitEnemyTest;
  }

  public hitWallTestTank(tank: Tank): boolean {
    let hitWallTest: boolean = false;
    if (tank.x < this.wallList[0] || tank.x > this.wallList[2] || tank.y > this.wallList[3] || tank.y < this.wallList[1]) {
      hitWallTest = true;
    }

    return hitWallTest;
  }

  public hitEnemyTestTank(tank: Tank): boolean {
    let hitEnemyTest: boolean = false;
    for (const item of this.tankList) {
      if (item.x === tank.x && item.y === tank.y) {
        hitEnemyTest = true;
      }
    }

    return hitEnemyTest;
  }

  public hitBulletTestTank(tank: Tank): boolean {
    let hitBulletsTest: boolean = false;
    for (const item of this.bulletList) {
      if (item.x === tank.x && item.y === tank.y) {
        hitBulletsTest = true;
      }
    }

    return hitBulletsTest;
  }

  public hitDeathTankTestTank(tank: Tank): boolean {
    let hitDTanksTest: boolean = false;
    for (const item of this.tankList) {
      if (item.health <= 0 && item.x === tank.x && item.y === tank.y) {
        hitDTanksTest = true;
      }
    }

    return hitDTanksTest;
  }

  public scanTanks(tank: Tank): void {
    const vision: number[] = this.getVisionArray(tank);
    for (const item of this.tankList) {
      tank.enemyTracks = [];
      if (item.x >= vision[0] && item.x <= vision[1] && item.y >= vision[2] && item.y <= vision[3]) {
        tank.enemyTracks.push({
          id: item.id,
          x: item.x,
          y: item.y,
          direction: item.direction,
          health: item.health
        });
      }
    }

  }

  public scanBullets(tank: Tank): void {
    const vision: number[] = this.getVisionArray(tank);
    for (const item of this.bulletList) {
      tank.bulletTracks = [];
      if (item.x >= vision[0] && item.x <= vision[1] && item.y >= vision[2] && item.y <= vision[3]) {
        tank.bulletTracks.push({
          id: item.id,
          x: item.x,
          y: item.y,
          direction: item.direction
        });
      }
    }
  }

  public scanWalls(tank: Tank): void {
    const vision: number[] = this.getVisionArray(tank);
    for (let i = 0; i < this.wallList.length; i++) {
      tank.wall = [null, null, null, null];
      if (i === 0 && vision[2] <= this.wallList[i]) {
        tank.wall[i] = tank.y - vision[2];
      } else if (i === 1 && vision[1] >= this.wallList[i]) {
        tank.wall[i] = tank.x - vision[1];
      } else if (i === 2 && vision[3] <= this.wallList[i]) {
        tank.wall[i] = tank.y - vision[3];
      } else if (i === 3 && vision[0] <= this.wallList[i]) {
        tank.wall[i] = tank.x - vision[0];
      }
    }
  }

  public getVisionArray(tank: Tank): number[] {
    const dirThis: number = (tank.direction) * Math.PI / 180;
    const coefA: number = CONFIG.smallVisionSide;
    const coefB: number = CONFIG.bigVisionSide;
    const xA: number = Math.round(coefA * Math.sin(dirThis) - coefA * Math.cos(dirThis) + tank.x);
    const yA: number = Math.round(coefA * Math.cos(dirThis) - coefA * Math.sin(dirThis) + tank.y);
    const xB: number = Math.round(coefB * Math.cos(dirThis) + coefA * Math.sin(dirThis) + tank.x);
    const yB: number = Math.round(coefB * Math.sin(dirThis) + coefA * Math.cos(dirThis) + tank.y);
    const xC: number = Math.round(coefB * Math.cos(dirThis) - coefA * Math.sin(dirThis) + tank.x);
    const yC: number = Math.round(coefB * Math.sin(dirThis) - coefA * Math.cos(dirThis) + tank.y);
    const xD: number = Math.round(-coefA * Math.sin(dirThis) - coefA * Math.cos(dirThis) + tank.x);
    const yD: number = Math.round(-coefA * Math.cos(dirThis) - coefA * Math.sin(dirThis) + tank.y);

    const maxX: number = Math.max(xA, xB, xC, xD);
    const maxY: number = Math.max(yA, yB, yC, yD);
    const minX: number = Math.min(xA, xB, xC, xD);
    const minY: number = Math.min(yA, yB, yC, yD);

    return [minX, maxX, minY, maxY];
  }
}
