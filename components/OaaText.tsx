import type { PropsWithChildren } from 'react';
import { Text, type TextProps } from 'react-native';

type OaaTextVariant =
  | 'display'
  | 'title'
  | 'section'
  | 'body'
  | 'caption'
  | 'muted';

interface OaaTextProps
  extends PropsWithChildren,
    Omit<TextProps, 'children'> {
  className?: string;
  variant?: OaaTextVariant;
}

const variants: Record<OaaTextVariant, string> = {
  display: 'text-5xl font-light text-oaa-text',
  title: 'text-3xl font-semibold text-oaa-text',
  section:
    'text-xs font-semibold uppercase tracking-widest text-oaa-secondary',
  body: 'text-sm text-oaa-text',
  caption:
    'text-[11px] uppercase tracking-widest text-oaa-secondary',
  muted: 'text-sm text-oaa-muted',
};

export function OaaText({
  children,
  variant = 'body',
  className = '',
  ...props
}: OaaTextProps) {
  return (
    <Text
      {...props}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </Text>
  );
}