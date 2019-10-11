import { lighten } from 'polished';
export default {
  // colors
  green: '#37a642',
  textDark: '#131516',
  textMedium: '#a3a9b3',
  textLight: lighten(0.4, '#131516'),
  uiBorder: '#DAE0E3',
  uiBackground: '#ededef',
  deepNavy: '#0a1b2a',
  teal: '#1fc3b3',
  purple: '#9632f3',
  yellow: '#f2d433',

  // structure
  headerHeight: '70px',
  contentMaxWidth: '960px',

  // buttons
  buttonSizes: {
    small: {
      height: '20px',
      fontSize: '11px',
      borderRadius: '2px',
      padding: '0 12px'
    },
    medium: {
      height: '30px',
      fontSize: '12px',
      borderRadius: '3px',
      padding: '0 20px'
    },
    large: {
      height: '50px',
      fontSize: '14px',
      borderRadius: '3px',
      padding: '0 30px'
    },
    extraLarge: {
      height: '80px',
      fontSize: '16px',
      borderRadius: '6px',
      padding: '0 40px'
    }
  },

  media: {
    highdensity:
      'only screen and (min-device-pixel-ratio: 1.5), (-webkit-min-device-pixel-ratio: 1.5)',
    mobile: 'only screen and (max-width: 529px)',
    tabletPort: 'only screen and (min-width: 530px) and (max-width: 768px)',
    tablet: 'only screen and (min-width: 530px) and (max-width: 1024px)',
    laptop: 'only screen and (min-width: 1025px) and (max-width: 1280px)',
    desktop: 'only screen and (min-width: 1025px) and (max-width: 1919px)',
    desktopXl: 'only screen and (min-width: 1920px)'
  }
};
