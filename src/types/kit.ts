export interface ColorSet {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textMuted: string
  border: string
  accent: string
  success: string
  warning: string
}

export interface Typography {
  headingFont: string
  bodyFont: string
  baseFontSize: string
  lineHeight: string
}

export interface Kit {
  id: string
  name: string
  industry: string
  description: string
  palette: {
    light: ColorSet
    dark: ColorSet
  }
  typography?: Typography
  spacing?: {
    base: string
    scale: number
  }
  borderRadius?: {
    sm: string
    md: string
    lg: string
    full: string
  }
  shadow?: {
    sm: string
    md: string
    lg: string
  }
}
