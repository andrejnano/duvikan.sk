import bp from './breakpoints';

const mq = {
  mobile: `${bp.mobile}px`,
  tablet: `${bp.tablet}px`,
  desktop: `${bp.desktop}px`,
};

export const font = {
  h1: `
        font-size: 5rem;
        font-weight: 900;
        @media screen and (max-width: ${mq.tablet}) {
            font-size: 4rem;
        }
    `,
  button: `
        font-weight: 700;
    `,
};

export const gradients = {
  gray1:
    'background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;',
  gray2:
    'background-image: linear-gradient(to right, #868f96 0%, #596164 100%);',
};

export const colors = {
  white: '#ffffff',
  black: '#050526',
  pink: '#e6a2e4',
  magenta: '#dd5ce5',
  red: '#bd1c5f',
  brightRed: '#ef4146',
  orange: '#e86c09',
  golden: '#f4ac36',
  yellow: '#ebe93d',
  lightGreen: '#68de7a',
  darkGreen: '#10a37f',
  teal: '#2ff3ce',
  lightBlue: '#27b5ea',
  mediumBlue: '#2e95d3',
  darkBlue: '#5436da',
  navyBlue: '#3b2479',
  lightPurple: '#6b40d8',
  darkPurple: '#412991',
  gray1: '#c5c5d2',
  gray2: '#8e8ea0',
  gray3: '#6e6e80',
  gray4: '#404452',
  lightWash: '#f7fbfb',
  mediumWash: '#eff7f8',
  darkWash: '#e6f3f3',
  bg: '#1D1D1D',
  fg: '#ffffff',
};

export const duration = 300;
