import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colors } from '../consts/style';

import Container from '../containers/Container';

export const Wrapper = styled.footer`
  background: ${colors.black};
  padding: 2rem 0;
`;

const FooterSeparator = styled.hr`
  width: 100%;
  height: 1px;
  opacity: 0.175;
  border: 0;
  margin: 0;
  background-color: ${colors.black};
`;

const NavList = styled.ul`
  margin: 2rem 0;
  padding: 0;
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
        <FooterSeparator />
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M452 0H60C26.916 0 0 26.916 0 60v392c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60V60c0-33.084-26.916-60-60-60zm20 452c0 11.028-8.972 20-20 20H338V309h61.79L410 247h-72v-43c0-16.975 13.025-30 30-30h41v-62h-41c-50.923 0-91.978 41.25-91.978 92.174V247H216v62h60.022v163H60c-11.028 0-20-8.972-20-20V60c0-11.028 8.972-20 20-20h392c11.028 0 20 8.972 20 20v392z" />
              </svg>
            </a>
          </SocialIcons>
        </BottomRow>
      </Container>
    </Wrapper>
  );
};

export default Footer;
