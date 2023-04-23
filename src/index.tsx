import React from 'react';
import {
  NativeModules,
  Platform,
  View,
  Button,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-designlibrary' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Designlibrary = NativeModules.Designlibrary
  ? NativeModules.Designlibrary
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function sim(a: number) {
  return a;
}
export function multiply(a: number, b: number): Promise<number> {
  return Designlibrary.multiply(a, b);
}

interface Props {
  color: string;
  action: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TestButton: React.FC<Props> = ({ color, action, style }) => {
  return (
    <View style={[{ backgroundColor: color }, style]}>
      <Button title={'Press'} onPress={action} />
    </View>
  );
};

export const TextView: React.FC<null> = () => {
  return (
    <View style={{ height: 400, width: 300, backgroundColor: 'grey' }}>
      <Text>Test Component</Text>
    </View>
  );
};
