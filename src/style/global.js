import 'typeface-inter';
import { createGlobalStyle } from 'styled-components';
import { colors, gradients } from '../consts/style';

const Global = createGlobalStyle`

html { 
  font-family: 'Inter', sans-serif; 
  font-feature-settings: 'dlig', 'zero', 'ss01', 'cv05', 'cv10';
  scroll-behavior: smooth;
}

@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}

body {
  overflow-x: hidden;
  word-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${colors.fg};
  background-color: ${colors.bg};
  background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,197,118,1) 0%, rgba(254,106,103,1) 47.7%, rgba(240,23,23,1) 92.3% );
  ${gradients.gray2};
}

// links reset
a {
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
}

::-webkit-scrollbar-track
{
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #191919;
}

::-webkit-scrollbar
{
	width: 5px;
	background-color: #191919;
}

::-webkit-scrollbar-thumb
{
	background-color: #f93a3c;
	background-image: -webkit-linear-gradient(90deg, rgba(255, 255, 255, .2) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, .2) 50%,
                    rgba(255, 255, 255, .2) 75%,
                    transparent 75%,
                    transparent)
}

`;

export default Global;
