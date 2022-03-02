import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import { Runtime, LayerVersion, CfnFunction } from '@aws-cdk/aws-lambda';

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const thundraLayer = LayerVersion.fromLayerVersionArn(
      this,
      "ThundraLayer",
      `arn:aws:lambda:${this.region}:269863060030:layer:thundra-lambda-node-layer:107`
    );

    const lambdaFunction = new lambda.NodejsFunction(this, 'HelloWorldFunction', {
      // entry: './lib/src/hello-world.ts',
      functionName: 'HelloWorld-Example-CDK',
      runtime: Runtime.NODEJS_14_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(120),
      layers: [
        thundraLayer,
      ],
      bundling: {
        sourceMap: true,
        sourceMapMode: lambda.SourceMapMode.BOTH,
        sourcesContent: true,
        keepNames: true,
      },
      environment: {
        THUNDRA_APIKEY: '<THUNDRA_APIKEY>',
        THUNDRA_AGENT_LAMBDA_DEBUG_ENABLE: 'true',
        THUNDRA_AGENT_LAMBDA_HANDLER: 'index.handler',
        THUNDRA_AGENT_LAMBDA_DEBUGGER_AUTH_TOKEN: '<THUNDRA_AGENT_LAMBDA_DEBUGGER_AUTH_TOKEN>',
        THUNDRA_AGENT_LAMBDA_DEBUGGER_ENABLE: 'true',
      }
    });

    const lambdaHandler = lambdaFunction.node.defaultChild as CfnFunction;
    lambdaHandler.addOverride('Properties.Handler', 'thundra_handler.wrapper');
  }
}
