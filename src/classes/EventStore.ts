import { IEvent } from '../interfaces/interfaces';

/**
 *  @class
 *  @description Class Store of event
 */

export class EventStore {

  public data: IEvent[];

  public constructor() {
    this.data = [];
  }

  public add(index: string, event: {}): void {
    this.data.push(
      {
        index,
        event
      }
    );
  }

  public get(i: string): IEvent {
    let events: IEvent[] = [...this.data];
    events = events.filter((item: IEvent) => {
      return item.index === i;
    });

    return events[events.length - 1];
  }

  public clear(i: string): void {
    this.data = this.data.filter((item: IEvent) => {
      return item.index === i;
    });
  }
}
