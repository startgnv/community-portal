import { lighten } from 'polished';
export default {
  // colors
  green: '#37a642',
  textDark: '#131516',
  textMedium: lighten(0.25, '#131516'),
  textLight: lighten(0.4, '#131516'),
  uiBorder: '#DAE0E3',
  uiBackground: '#F1F1F4',

  // structure
  headerHeight: '70px',

  // buttons
  buttonSizes: {
    small: {
      height: '20px',
      fontSize: '11px',
      borderRadius: '2px'
    },
    medium: {
      height: '30px',
      fontSize: '12px',
      borderRadius: '3px'
    },
    large: {
      height: '50px',
      fontSize: '14px',
      borderRadius: '3px'
    },
    extraLarge: {
      height: '80px',
      fontSize: '16px',
      borderRadius: '6px'
    }
  }
};
