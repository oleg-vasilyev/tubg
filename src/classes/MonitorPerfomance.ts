export class MonitorPerfomance {

  public simulationStepDuration: number;
  public stepCounter: number;
  static checkLoop: number;
  static started: boolean;
  static desiredPerfomance: number;
  public actualPerfomance: any;
  public perfomanceIndex: number;
  public desiredQuality: number;
  public desiredPerfomance: any;
  static quality: number;
  static checkInterval: number;
  public started: boolean;
  public checkLoop: any;
  public checkInterval: number;
  public quality: number;

  constructor() {
    this.simulationStepDuration = 30;
    this.stepCounter = 0;
    this.checkLoop = 0;
    this.started = false;
    this.desiredPerfomance = Math.floor(1000/this.simulationStepDuration);
    this.actualPerfomance = this.desiredPerfomance;
    this.perfomanceIndex = 1;
    this.desiredQuality = 1;
    this.quality = this.desiredQuality;
    this.checkInterval = 500;
  }

  getStarted(): boolean {
    return this.started;
  }

  getDesiredPerfomance(): any {
    return this.desiredPerfomance;
  }

  getActualPerfomance(): any {
    return this.actualPerfomance;
  }

  start(): void {
    this.started = true;
    let self = this;
    this.checkLoop = setInterval(() => {
      self.check();
    }, this.checkInterval);
  }

  stop(): void {
    this.started = false;
    if(this.checkLoop) {
      clearInterval(this.checkLoop);
      this.checkLoop = null;
    }
  }

  setSimulationStepDuration(t: number): void {
    if(t != this.simulationStepDuration) {
      this.quality = this.desiredQuality;
    }
    this.simulationStepDuration = t;
    this.desiredPerfomance = Math.floor(1000/t);
  }

  onSimulationStep(): void {
    if(this.started) {
      this.stepCounter++;
    }
  }

  getQualityLevel(): number {
    return this.quality;
  }

  check(): void {
    this.actualPerfomance = Math.ceil(this.stepCounter*(1000/this.checkInterval));
    this.stepCounter = 0;
    let index = this.desiredPerfomance ? this.actualPerfomance/this.desiredPerfomance : 1;
    this.perfomanceIndex = (this.perfomanceIndex + index)/2;
    this.updateQuality();
  }

  updateQuality(): void {
    let lowestQuality = 2.5*this.perfomanceIndex - 1.25;
    lowestQuality = Math.max(0, Math.min(1, lowestQuality));
    let decreaseStep = -0.5*this.perfomanceIndex + 0.45;

    if(this.perfomanceIndex > 1) {
      this.desiredQuality += 0.1;
    } else {
      this.desiredQuality -= decreaseStep;
    }

    this.desiredQuality = Math.max(0, Math.min(1, this.desiredQuality));

    let targetQuality = Math.max(lowestQuality, this.desiredQuality);

    this.desiredQuality = (this.desiredQuality + targetQuality)/2;
    if(this.desiredQuality < this.quality ) {
      this.quality = this.desiredQuality;
    } else {
      this.quality = (this.desiredQuality + 9*this.quality)/10;
    }
  }
}
