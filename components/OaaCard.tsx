import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface OaaCardProps extends PropsWithChildren {
  className?: string;
}

export function OaaCard({
  children,
  className = '',
}: OaaCardProps) {
  return (
    <View
      className={`border border-oaa-border bg-oaa-surface p-4 ${className}`}
    >
      {children}
    </View>
  );
}