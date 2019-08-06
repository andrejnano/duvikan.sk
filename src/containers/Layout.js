import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Transition from '../components/Transition';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reboot from '../style/reboot';
import Global from '../style/global';

import { colors, gradients } from '../consts/style';

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faClock,
  faCalendarAlt,
} from '@fortawesome/pro-regular-svg-icons';

library.add(
  fab,
  faBars,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faClock,
  faCalendarAlt
);

const SiteWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  &.bgGradient {
    background-image: radial-gradient(
      circle farthest-corner at 10% 20%,
      rgba(255, 197, 118, 1) 0%,
      rgba(254, 106, 103, 1) 47.7%,
      rgba(240, 23, 23, 1) 92.3%
    );
    background: #1a1a1a;
    background-image: radial-gradient(
      circle,
      #171ab6,
      #171fb9,
      #1723bc,
      #1827be,
      #182bc1,
      #252cc0,
      #2e2dc0,
      #362ebf,
      #432dbb,
      #4d2cb7,
      #562bb3,
      #5d2baf
    );
    /* background-image: linear-gradient(
      114.9deg,
      rgba(34, 34, 34, 1) 8.3%,
      rgba(0, 40, 60, 1) 41.6%,
      rgba(0, 143, 213, 1) 93.4%
    ); */
    /* background-image: url('https://images.unsplash.com/photo-1525198104776-f6e8a873f9b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80');
    background-size: contain;
    background-repeat: no-repeat; */
  }
`;

// const JapaneseTitle = styled.div`
//   position: fixed;
//   left: 2rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: ${colors.light};
//   height: auto;
//   z-index: 9999;
//   writing-mode: vertical-rl;
//   font-size: 2rem;
// `;

const ContentWrapper = styled.main`
  min-height: calc(100vh - 100px);
  /* remove the header height */
`;

const HeaderHr = styled.hr`
  width: 100%;
  height: 1px;
  opacity: 0.075;
  border: 0;
  margin: 0;
  background-color: ${colors.black};
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  transition: background 0.4s linear, width 0.4s linear;

  &.whiteHr {
    background-color: ${colors.white};
    transition: background 0.4s linear, width 0.8s linear;
  }

  @media (min-width: 720px) {
    height: 2px;
    opacity: 0.8;
    max-width: 1470px;
    width: 93.3333333333%;
    margin-left: auto;
    margin-right: auto;

    &.whiteHr {
      max-width: 1470px;
      width: 93.3333333333%;
    }
  }
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/' ? true : false;
  return (
    <SiteWrapper className={isHome ? 'bgGradient' : ''}>
      <Reboot />
      <Global />
      {/* <CoverBackground>
        <Img fluid={coverImage.fluid} />
      </CoverBackground> */}
      <Header isHome={isHome} />
      <HeaderHr className={isHome ? 'whiteHr' : ''} />
      {/* <JapaneseTitle>空手道場ドゥヴィ館ブラチスラバ</JapaneseTitle> */}
      <ContentWrapper>{children}</ContentWrapper>
      {/* <Transition location={location}>{children}</Transition> */}
      <Footer />
    </SiteWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

export default Layout;
