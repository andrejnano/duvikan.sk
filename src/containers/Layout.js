import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';
import Transition from '../components/Transition';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reboot from '../style/reboot';
import Global from '../style/global';

import { colors, gradients, colorScheme } from '../consts/style';

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  // faBars,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faClock,
  faCalendarAlt,
  faEnvelope,
  faEnvelopeSquare,
  faPhone,
} from '@fortawesome/pro-regular-svg-icons';

import { faBars, faTimes } from '@fortawesome/pro-duotone-svg-icons';

library.add(
  fab,
  faBars,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faClock,
  faCalendarAlt,
  faTimes,
  faEnvelope,
  faEnvelopeSquare,
  faPhone
);

const SiteWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background-color: ${colors.lightWash};
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
      {/* <Transition location={location}>
        <ContentWrapper>{children}</ContentWrapper>
      </Transition> */}
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </SiteWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

export default Layout;
