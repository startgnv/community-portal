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
  darkGreen: '#00502d',
  lightGreen: '#dcebd7',
  orange: '#f35b1a',
  lightBlue: '#ccdee5',

  // structure
  headerHeight: '70px',
  contentMaxWidth: '960px',

  // buttons
  buttonSizes: {
    small: {
      height: '30px',
      fontSize: '11px',
      borderRadius: '2px',
      padding: '0 20px'
    },
    medium: {
      height: '40px',
      fontSize: '12px',
      borderRadius: '3px',
      padding: '0 30px'
    },
    large: {
      height: '50px',
      fontSize: '14px',
      borderRadius: '3px',
      padding: '0 40px'
    },
    extraLarge: {
      height: '60px',
      fontSize: '16px',
      borderRadius: '6px',
      padding: '0 50px'
    }
  }
};
