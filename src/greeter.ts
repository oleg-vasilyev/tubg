export class Greeter {

  private to: string;

  public constructor(to: string) {
    this.to = to;
  }

  public greet(): string {
    return `Hi ${this.to}!`;
  }
}
