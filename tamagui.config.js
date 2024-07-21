// tamagui.config.js
import { createTamagui } from 'tamagui';
import { tokens, themes } from '@tamagui/themes';
import { createFont } from '@tamagui/core';

const headingFont = createFont({
  family: 'Arial', // Change to your desired font family
  weight: {
    400: 'normal',
    700: 'bold',
  },
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 30,
    8: 36,
    9: 48,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 24,
    6: 28,
    7: 34,
    8: 40,
    9: 52,
  },
});

const bodyFont = createFont({
  family: 'Arial', // Change to your desired font family
  weight: {
    400: 'normal',
    700: 'bold',
  },
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 30,
    8: 36,
    9: 48,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 24,
    6: 28,
    7: 34,
    8: 40,
    9: 52,
  },
});

const config = createTamagui({
  tokens,
  themes,
  shorthands: {
    ai: 'alignItems',
    jc: 'justifyContent',
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
  },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});

export default config;
