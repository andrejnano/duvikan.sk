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

export const colors = {
  dark: '#1C1C1C',
  light: '#fafafa',
  purple: '#9135AD',
  red: '#f93a3c',
};

export const duration = 300;
