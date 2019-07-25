import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Transition from '../components/Transition';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reboot from '../style/reboot';
import Global from '../style/global';
import { colors } from '../consts/style';

const SiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${colors.dark};
  color: ${colors.light};
  -webkit-box-shadow: inset 0px 0px 2px 1px rgba(250,250,250,0.5);
  -moz-box-shadow: inset 0px 0px 2px 1px rgba(250,250,250,0.5);
  box-shadow: inset 0px 0px 2px 1px rgba(250, 250, 250, 0.5);
  /* background-image: radial-gradient( circle farthest-corner at 85.4% 50.8%,  rgba(14,72,222,1) 0%, rgba(3,22,65,1) 74.2% ); */
`;

const JapaneseTitle = styled.div`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.light};
  height: auto;
  z-index: 9999;
  writing-mode: vertical-rl;
  font-size: 2rem;
`;

const Layout = ({ children, location }) => {
  return (
    <SiteWrapper>
      <Reboot />
      <Global />
      <Header />
      <JapaneseTitle>空手道場ドゥヴィ館ブラチスラバ</JapaneseTitle>
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
