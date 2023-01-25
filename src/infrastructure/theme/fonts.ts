interface IFonts {
  body: string;
  heading: string;
  monospace: string;
}
export const fonts: IFonts = {
  body: "",
  heading: "",
  monospace: "",
};

interface IFontWeights {
  small: number;
  regular: number;
  medium: number;
  bold: number;
}
export const fontWeights: IFontWeights = {
  small: 400,
  regular: 500,
  medium: 600,
  bold: 700,
};

interface IFontSizes {
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
}
export const fontSizes: IFontSizes = {
  caption: "12px",
  button: "14px",
  body: "16px",
  body2: "18px",
  title: "24px",
  h5: "28px",
  h4: "30px",
  h3: "45px",
  h2: "56px",
  h1: "112px",
};
