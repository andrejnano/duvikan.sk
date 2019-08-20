import 'typeface-inter';
import { createGlobalStyle } from 'styled-components';
import { colors, colors2, colorScheme, boxShadow, gradients } from '../consts/style';

const Global = createGlobalStyle`

html { 
  font-family: 'Inter', sans-serif; 
  font-feature-settings: 'dlig', 'zero', 'ss01', 'cv05', 'cv10';
  font-kerning: auto;
  scroll-behavior: smooth;
}

@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}

body {
  overflow-x: hidden;
  word-wrap: break-word;
  color: #000;
  background: #fff;
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
	background-color: ${colorScheme.main};
}

::-webkit-scrollbar
{
	width: 5px;
	background-color: ${colorScheme.main};
}

::-webkit-scrollbar-thumb
{
	background-color: ${colorScheme.secondary};
	${
    '' /* background-image: -webkit-linear-gradient(90deg, rgba(255, 255, 255, .2) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, .2) 50%,
                    rgba(255, 255, 255, .2) 75%,
                    transparent 75%,
                    transparent) */
  }
}

`;

export default Global;
