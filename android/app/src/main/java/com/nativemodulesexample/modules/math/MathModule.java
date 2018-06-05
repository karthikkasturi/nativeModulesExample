package com.nativemodulesexample.modules.math;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import java.util.Map;
import java.util.HashMap;

public class MathModule extends ReactContextBaseJavaModule {

  private static final double PI = 3.141592653589793;
  private static final String PI_NAME = "PI";
  private static final String DIVISION_BY_ZERO = "DIVISION BY ZERO";


  public MathModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "MathNative";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(PI_NAME, PI);
    return constants;
  }

  @ReactMethod
  public void rootsWithCallback(ReadableArray arr, Callback errorCallback, Callback successCallback) {
    try {
      int length = arr.size();
      WritableArray result = new WritableNativeArray();
      for (int i = 0; i < length; i++) {
        double iterand = arr.getDouble(i);
        if (iterand > 0)
          result.pushDouble(Math.sqrt(iterand));
        else
          throw new IllegalArgumentException("Input Array must have all positive numbers");
      }
      successCallback.invoke(result);

    } catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }
  @ReactMethod
  public void rootsWithPromise(ReadableArray arr, Callback errorCallback, Callback successCallback) {
    try {
      int length = arr.size();
      WritableArray result = new WritableNativeArray();
      for (int i = 0; i < length; i++) {
        double iterand = arr.getDouble(i);
        if (iterand > 0)
          result.pushDouble(Math.sqrt(iterand));
        else
          throw new IllegalArgumentException("Input Array must have all positive numbers");
      }
      successCallback.invoke(result);

    } catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }
  @ReactMethod
  public void divide(double a, double b, Promise promise) {
    try {
      if(b==0) throw new IllegalArgumentException("Division by zero is not allowed");
      double result = a / b;
      promise.resolve(result);

    } catch (Exception e) {
      promise.reject(DIVISION_BY_ZERO, e.getMessage());
    }
  }
}
