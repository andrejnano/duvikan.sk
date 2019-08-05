import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { colors } from '../consts/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Img } from 'gatsby-image';
import Container from '../containers/Container';

// webpack import image path
import logoImage from '../images/logo.svg';

const Wrapper = styled.footer`
  color: ${colors.white};
  background-image: url(${logoImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const NavList = styled.ul`
  margin: 6rem 0;
  a {
    letter-spacing: 0.2em;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.2rem;
    &:not(:last-of-type) {
      margin-right: 2em;
    }
  }
`;

const BottomRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Copyright = styled.div`
  font-size: 1.4rem;
  a {
    margin-left: 0.7rem;
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }
`;

const SocialIcons = styled.div`
  padding: 1rem;
  a {
    &:hover {
      opacity: 0.8;
    }
    svg {
      color: ${colors.white};
      height: 2rem;
      fill: currentColor;
    }
  }
`;

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <Wrapper>
      <Container>
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
        <BottomRow>
          <Copyright>
            Duvikan {year} <a href="https://anano.dev">@andrejnano</a>
          </Copyright>
          <SocialIcons>
            <a href="https://facebook.com/duvikanBratislava">
              <FontAwesomeIcon icon={['fab', 'facebook-square']} />
            </a>
          </SocialIcons>
        </BottomRow>
      </Container>
    </Wrapper>
  );
};

export default Footer;
