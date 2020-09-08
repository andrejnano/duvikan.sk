import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Transition from '../components/Transition';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reboot from '../style/reboot';
import Global from '../style/global';

import { colors, gradients, colorScheme } from '../consts/style';

// FontAwesome Icons
import { library, config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '@fortawesome/fontawesome-svg-core/styles.css';

import {
  faInstagram,
  faFacebookSquare,
  faFacebook,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import {
  // faBars,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faClock,
  faCalendarAlt,
  faEnvelope,
  faEnvelopeSquare,
  faPhone,
  faFilePdf,
  faPercent,
  faPercentage,
  faCalendar,
  faInfo,
  faInfoCircle,
} from '@fortawesome/pro-regular-svg-icons';

import { faBars, faTimes, faAt } from '@fortawesome/pro-duotone-svg-icons';

library.add(
  faInstagram,
  faFacebookSquare,
  faFacebook,
  faFacebookF,
  faBars,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faClock,
  faCalendarAlt,
  faTimes,
  faEnvelope,
  faEnvelopeSquare,
  faPhone,
  faFilePdf,
  faPercent,
  faPercentage,
  faCalendar,
  faInfo,
  faInfoCircle,
  faAt
);

const SiteWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  /* background-color: ${colors.lightWash}; */
  /* background: linear-gradient(to right, #ffd89b, #19547b); */
  /* background: linear-gradient(to right, #f85032, #e73827); */
  /* background: linear-gradient(to right, #000428, #004e92); */
  /* background: linear-gradient(to right, #e0eafc, #cfdef3); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const ContentWrapper = styled.main`
  min-height: calc(100vh - (54px + 2rem));
  margin-top: calc(54px + 2rem);

  @media (min-width: 950px) {
    margin-top: 0;
  }
  /* remove the header height */
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/' ? true : false;
  return (
    <SiteWrapper>
      <Reboot />
      <Global />
      <Header isHome={isHome} />
      {/* <Transition location={location}> */}
      <ContentWrapper>{children}</ContentWrapper>
      {/* </Transition> */}
      {/* <ContentWrapper>{children}</ContentWrapper> */}
      <Footer />
    </SiteWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

export default Layout;
