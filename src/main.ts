import { Greeter } from './greeter';

const greeter = new Greeter('Test');
const greeting = greeter.greet();

// tslint:disable-next-line:no-console
console.log(greeting);
