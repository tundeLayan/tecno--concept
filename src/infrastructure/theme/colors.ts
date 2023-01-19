export const colors: IColors = {
  brand: {
    primary: '#0163F8',
    secondary: '#222222',
    muted: '#222222',
  },
  ui: {
    primary: '#0163F8',
    secondary: '#222222',
    tertiary: '#676565',
    quaternary: '#FFFFFF',
    disabled: '#DEDEDE',
    error: '#D0421B',
    success: '#138000',
  },
  bg: {
    primary: '#F5F5F5',
    secondary: '#FFFFFF',
    secondary2: '#EBECF0',
    dark1: '#4C4D4C',
    dark2: '#222222',
  },
  text: {
    primary: '#0163F8',
    secondary: '#222222',
    tertiary: '#D3D3D3',
    disabled: '#9C9C9C',
    inverse: '#FFFFFF',
    error: '#D0421B',
    success: '#138000',
  },
  box_shadow: {
    primary: '0px 6px 6px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4);',
    primary2: '0px 6px 6px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4);',
  },
};

interface IColors {
  brand: Brand;
  ui: Ui;
  bg: Bg;
  text: Text;
  box_shadow: Boxshadow;
}

interface Boxshadow {
  primary: string;
  primary2: string;
}

interface Text {
  primary: string;
  secondary: string;
  disabled: string;
  tertiary: string;
  inverse: string;
  error: string;
  success: string;
}

interface Bg {
  primary: string;
  secondary: string;
  secondary2: string;
  dark1: string;
  dark2: string;
}

interface Ui {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  disabled: string;
  error: string;
  success: string;
}

interface Brand {
  primary: string;
  secondary: string;
  muted: string;
}
