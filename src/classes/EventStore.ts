
/**
 * 
 * `@class
 *  @description Class Store of event
 * 
 */


export class EventStore {
  
  public data: Array<any>;

  constructor() {
    this.data = [];
  }

  add(index: number, event: any): void {
    if(!this.data[index]) {
      this.data[index] = [];
    }
    this.data[index].push(event);
  }

  get(index: number): void {
    if(!this.data[index]) {
      this.data[index] = [];
    }
    return this.data[index];
  }

  clear(index: number): void {
    this.data[index] = [];
  }

}