//
//  MathNative.m
//  NativeModulesExample
//
//  Created by THANESH.LOCAL on 6/5/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "MathNative.h"
#include "math.h"
@implementation MathNative

RCT_EXPORT_MODULE(MathNative);

RCT_EXPORT_METHOD(rootsWithCallback:(NSArray *) arr errCallback: (RCTResponseSenderBlock) errCallback
                  successCallback: (RCTResponseSenderBlock) successCallback)
{
  @try{
    NSLog(@"Beginning");
    NSMutableArray *result = [NSMutableArray array];
    for (int i = 0; i < [arr count]; i++)
    {
      double x = [[arr objectAtIndex:i] doubleValue];
      if(x<0)
        [NSException raise:@"Invalid array" format:@"Numbers should be positive"];
      else
        [result addObject:[NSNumber numberWithDouble: sqrt(x)]];
    }
    successCallback(@[result]);

  }@catch(NSException * e){
    errCallback(@[[e reason]]);
  }
}

RCT_EXPORT_METHOD(divide: (nonnull NSNumber *) a by: (nonnull NSNumber *) b resolver:(RCTPromiseResolveBlock) resolve rejecter: (RCTPromiseRejectBlock) reject)
{
  @try{
    double dividend = [a doubleValue], divisor = [b doubleValue];
    if(divisor==0)
      [NSException raise: @"Illegal argument exception" format: @"Division by zero not allowed"];
    double result = dividend / divisor;
    resolve(@[[NSNumber numberWithDouble:result]]);
  }@catch(NSException *exception){
  
    reject([exception reason], [exception reason], nil );
  }
}

@end
