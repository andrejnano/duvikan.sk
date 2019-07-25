import 'typeface-inter';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

html { 
  font-family: 'Inter', sans-serif; 
  font-feature-settings: 'dlig', 'zero', 'ss01', 'cv05', 'cv10';
  scroll-behavior: smooth;
}

@supports (font-variation-settings: normal) {
  html { font-family: 'Inter var', sans-serif; }
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar-track
{
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
