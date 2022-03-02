import { Handler } from 'aws-lambda';

let a: number = 10;
let b: number = 20;

let message: string;
let sum: number;

const helloWorld: Handler = async (event: object): Promise<object> => {
    console.log(event);

    console.log(a);
    console.log(b);

    sum = a + b;
    console.log(sum);

    message = "Hello, world!";
    console.log(message);

    return { message: message };
}

export const handler = helloWorld;
