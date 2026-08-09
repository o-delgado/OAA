import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps extends PropsWithChildren {
  className?: string;
}

export function Screen({
  children,
  className = '',
}: ScreenProps) {
  return (
    <SafeAreaView
      className="flex-1 bg-oaa-background"
      edges={['top']}
    >
      <View
        className={`flex-1 bg-oaa-background px-5 ${className}`}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}