let response;
let a = 10;
let b = 20;

let message;
let sum;

exports.lambdaHandler = async (event, context) => {
    console.log(event);

    console.log(a);
    console.log(b);

    sum = a + b;
    console.log(sum);

    message = "Hello, world!";
    console.log(message);

    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
