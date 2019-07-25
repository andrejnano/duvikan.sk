import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { colors } from '../consts/style';

const Wrapper = styled.div`
  /* background: ${colors.dark}; */
  color: ${colors.light};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const LogoTitle = styled.div`
  padding: 2rem;
  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    span {
      font-size: 2rem;
      padding-left: 0.6rem;
      font-weight: 600;
    }
  }

  a:hover {
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
  }
`;

const Image = styled(Img)`
  width: 40px;
`;

const Navigation = styled.nav`
  padding-left: 1rem;
  padding-right: 1rem;
  div {
    display: flex;
    flex-wrap: wrap;

    a {
      padding: 1rem;
      color: ${colors.light};
      font-size: 1.2rem;
      font-weight: 700;
    }

    a:hover {
      text-decoration: none;
      opacity: 0.8;
    }

    a.activePage {
      color: ${colors.red};
    }
  }
`;

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      logo: file(relativePath: { eq: "logo-white.png" }) {
        childImageSharp {
          fluid(maxWidth: 40) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Wrapper>
      <LogoTitle>
        <Link to="/" activeClassName="activePage">
          <Image fluid={data.logo.childImageSharp.fluid} />
          <span>Duvikan</span>
        </Link>
      </LogoTitle>
      <Navigation>
        <div>
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
        </div>
      </Navigation>
    </Wrapper>
  );
};

export default Header;
