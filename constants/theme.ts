export const colors = {
  background: '#070B10',
  surface: '#0D131A',
  surfaceElevated: '#121B24',

  primary: '#20A9FF',
  primaryBright: '#4CC4FF',
  primaryDark: '#0A6FA8',

  text: '#F4F8FB',
  textSecondary: '#8EA0AE',
  textMuted: '#596A76',

  border: '#20303D',
  borderActive: '#1F9CE5',

  success: '#46C78A',
  warning: '#E8B84B',
  danger: '#EF6464',

  black: '#000000',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
} as const;

export const typography = {
  display: {
    fontSize: 48,
    fontWeight: '300' as const,
  },

  title: {
    fontSize: 28,
    fontWeight: '600' as const,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 2,
  },

  body: {
    fontSize: 14,
    fontWeight: '400' as const,
  },

  caption: {
    fontSize: 11,
    fontWeight: '400' as const,
    letterSpacing: 1,
  },
} as const;