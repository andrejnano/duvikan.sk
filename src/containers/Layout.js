import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

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
  faTimes,
  faEnvelope,
  faEnvelopeSquare,
  faPhone,
} from '@fortawesome/pro-regular-svg-icons';

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
  background-color: ${colors.mediumWash};
`;

// /**
//  * This component wraps all other page components in a single block.
//  * @param {children} objects all underlying components
//  * @param {className} class property passed in from parent
//  * @param {homePageTest} boolean to test if the current page is Homepage, so backgroundImage component will be used
//  */
// const SiteWrapper = ({ children, className, homePageTest }) => (
//   <StaticQuery
//     query={graphql`
//       query {
//         homePage: datoCmsHomePage {
//           backgroundImage {
//             fluid(maxWidth: 4160) {
//               ...GatsbyDatoCmsFluid
//             }
//           }
//         }
//       }
//     `}
//     render={data => {
//       const imageData = data.homePage.backgroundImage.fluid;
//       if (homePageTest) {
//         // if the page is homepage, display fluid image component in the background
//         return (
//           <BackgroundImage
//             Tag="section"
//             className={className}
//             fluid={imageData}
//             backgroundColor={colors.mediumWash}
//           >
//             {children}
//           </BackgroundImage>
//         );
//       } else {
//         // for all other pages, use regular site wrapper with single color background
//         return <RegularSiteWrapper>{children}</RegularSiteWrapper>;
//       }
//     }}
//   />
// );

// const StyledSiteWrapper = styled(SiteWrapper)`
//   width: 100%;
//   min-height: 100vh;
//   background-size: auto;
//   background-color: transparent;
//   background-repeat: no-repeat, no-repeat, repeat;
//   &.showImageBg {
//     background-origin: content-box;
//     background-position: center top;
//     background-repeat: no-repeat;
//     background-size: 300px 100px;
//   }
// `;

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
      <Transition location={location}>
        <ContentWrapper>{children}</ContentWrapper>
      </Transition>
      <Footer />
    </SiteWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
};

export default Layout;
