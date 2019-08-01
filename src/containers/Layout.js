import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Transition from '../components/Transition';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reboot from '../style/reboot';
import Global from '../style/global';

const SiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* -webkit-box-shadow: inset 0px 0px 2px 1px rgba(250, 250, 250, 0.5);
  -moz-box-shadow: inset 0px 0px 2px 1px rgba(250, 250, 250, 0.5);
  box-shadow: inset 0px 0px 2px 1px rgba(250, 250, 250, 0.5); */
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

const HeaderHr = styled.hr`
  width: 100%;
  height: 1px;
  opacity: 0.075;
  border: 0;
  margin: 0;
  background-color: #fff;

  @media (min-width: 720px) {
    height: 2px;
    opacity: 0.8;
    max-width: 1470px;
    width: 93.3333333333%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Layout = ({ children, location }) => {
  return (
    <SiteWrapper>
      <Reboot />
      <Global />
      <Header />
      <HeaderHr />
      {/* <JapaneseTitle>空手道場ドゥヴィ館ブラチスラバ</JapaneseTitle> */}
      <Transition location={location}>{children}</Transition>
      <Footer />
    </SiteWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

export default Layout;
