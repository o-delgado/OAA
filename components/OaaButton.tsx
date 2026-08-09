import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  View,
} from 'react-native';

import { OaaText } from './OaaText';

interface OaaButtonProps
  extends Omit<PressableProps, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  className?: string;
}

export function OaaButton({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...props
}: OaaButtonProps) {
  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <Pressable
        disabled={isDisabled}
        className={`
          overflow-hidden
          border
          border-oaa-primary
          bg-oaa-primary
          ${isDisabled ? 'opacity-50' : 'active:opacity-80'}
          ${className}
        `}
        {...props}
      >
        <View className="min-h-16 flex-row items-stretch">
          <View className="flex-1 items-center justify-center px-5">
            {loading ? (
              <ActivityIndicator color="#071018" />
            ) : (
              <OaaText
                className="
                  text-base
                  font-bold
                  tracking-[2px]
                  text-[#071018]
                "
              >
                {children}
              </OaaText>
            )}
          </View>

          {!loading && (
            <View
              className="
                w-16
                items-center
                justify-center
                border-l
                border-[#071018]/20
              "
            >
              <Ionicons
                name="chevron-forward"
                size={22}
                color="#071018"
              />
            </View>
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={isDisabled}
      className={`
        min-h-14
        items-center
        justify-center
        border
        px-5
        ${
          variant === 'danger'
            ? 'border-oaa-danger bg-transparent'
            : 'border-oaa-border bg-oaa-surface'
        }
        ${isDisabled ? 'opacity-50' : 'active:opacity-70'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#F4F8FB" />
      ) : (
        <OaaText
          className={`
            font-bold
            tracking-[2px]
            ${
              variant === 'danger'
                ? 'text-oaa-danger'
                : 'text-oaa-text'
            }
          `}
        >
          {children}
        </OaaText>
      )}
    </Pressable>
  );
}