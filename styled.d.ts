// import original module declarations
import 'styled-components';

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

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    // colors
    colors: {
      brand: Brand;
      ui: Ui;
      bg: Bg;
      text: Text;
      box_shadow: Boxshadow;
    };
    // fonts
    fonts: {
      body: string;
      heading: string;
      monospace: string;
    };
    fontWeights: {
      small: number;
      regular: number;
      medium: number;
      bold: number;
    };
    fontSizes: {
      caption: string;
      button: string;
      body: string;
      body2: string;
      title: string;
      h5: string;
      h4: string;
      h3: string;
      h2: string;
      h1: string;
    };
    // spacing
    space: Array<string>;
    lineHeights: {
      title: string;
      copy: string;
    };

    // sizing
    sizes: Array<string>;
  }
}
