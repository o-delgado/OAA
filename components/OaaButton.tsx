import type { ReactNode } from 'react';
import {
    ActivityIndicator,
    Pressable,
    type PressableProps,
} from 'react-native';

import { OaaText } from './OaaText';

interface OaaButtonProps
  extends Omit<PressableProps, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

const variants = {
  primary: 'border border-oaa-primary bg-oaa-primary',
  secondary: 'border border-oaa-border bg-oaa-surface',
  danger: 'border border-oaa-danger bg-transparent',
};

export function OaaButton({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}: OaaButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={`min-h-12 items-center justify-center px-5 ${
        variants[variant]
      } ${isDisabled ? 'opacity-50' : ''}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary'
              ? '#070B10'
              : '#F4F8FB'
          }
        />
      ) : (
        <OaaText
          variant="caption"
          className={
            variant === 'primary'
              ? 'font-semibold text-oaa-background'
              : variant === 'danger'
                ? 'font-semibold text-oaa-danger'
                : 'font-semibold text-oaa-text'
          }
        >
          {children}
        </OaaText>
      )}
    </Pressable>
  );
}