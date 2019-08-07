import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { colors, colors2 } from '../consts/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Img } from 'gatsby-image';
import Container from '../containers/Container';

// webpack import image path
import logoImage from '../images/logo.svg';

import { SidePanel, MainPanel } from '../components/common/LayoutParts';

const FooterOutsideWrapper = styled.footer`
  width: 100%;
  background: ${colors.lightWash};
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
  padding: 3rem 0;

  @media (min-width: 950px) {
    flex-direction: row;
  }
`;

const SectionSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${colors.black};
  opacity: 0.075;
  border: 0;
  margin: 0;
  margin-bottom: 3rem;
  overflow: visible;
`;

const NavList = styled.nav`
  a {
    letter-spacing: 0.2em;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.2rem;
    &:not(:last-of-type) {
      margin-right: 2em;
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;

const Copyright = styled.div`
  font-size: 1.4rem;
  margin-top: 1rem;
  a {
    margin-left: 0.7rem;
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }
`;

const SocialIcons = styled.div`
  a {
    margin-right: 1rem;
    &:hover {
      opacity: 0.5;
    }
    svg {
      color: ${colors.black};
      font-size: 2rem;
      fill: currentColor;
    }
  }
`;

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <FooterOutsideWrapper>
      <Container>
        <SectionSeparator />
        <FooterWrapper>
          <SidePanel>
            <SocialIcons>
              <a href="https://facebook.com/duvikanBratislava">
                <FontAwesomeIcon icon={['fab', 'facebook-square']} />
              </a>
              <a href="https://facebook.com/duvikanBratislava">
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </a>
              <a href="mailto:duvikan@gmail.com">
                <FontAwesomeIcon icon={['far', 'envelope']} />
              </a>
            </SocialIcons>
          </SidePanel>
          <MainPanel>
            <NavList>
              <Link to="/" activeClassName="activePage">
                Domov
              </Link>
              <Link to="/blog" activeClassName="activePage">
                Novinky
              </Link>
              <Link to="/treningy" activeClassName="activePage">
                Tréningy
              </Link>
              <Link to="/about" activeClassName="activePage">
                O nás
              </Link>
              <Link to="/historia" activeClassName="activePage">
                História
              </Link>
              <Link to="/contact" activeClassName="activePage">
                Kontakt
              </Link>
            </NavList>
            <Copyright>
              Duvikan {year} <a href="https://anano.dev">@andrejnano</a>
            </Copyright>
          </MainPanel>
        </FooterWrapper>
      </Container>
    </FooterOutsideWrapper>
  );
};

export default Footer;
