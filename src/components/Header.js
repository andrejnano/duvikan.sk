/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql, Link, StaticQuery } from 'gatsby';

import Container from '../containers/Container';
import { colors } from '../consts/style';

const HeaderWrapper = styled.header`
  position: initial;
  z-index: 999;
  top: 0;
  padding-top: 54px;
  transition: background 0.4s linear;
  &.isScrolling {
    transition: background 0.2s linear;
    position: sticky;
    background: ${colors.black};
    color: ${colors.white};
  }

  @media (min-width: 720px) {
    padding-top: calc(54px + 4rem);
  }

  a {
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Navigation = styled.nav`
  position: absolute;
  top: 0px;
  width: 100%;

  @media (min-width: 720px) {
    top: 2rem;
  }
`;

const InsideWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeftWrapper = styled.div`
  width: 150px;
`;

const RightWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  background: transparent;
  width: 150px;
`;

const PageTitle = styled.div`
  background: transparent;
  .headerTitle {
    font-weight: bold;
    font-size: 2rem;
    display: inline-block;

    &::after {
      content: '・';
      margin-left: 1rem;
    }
  }
  .headerSubtitle {
    margin-left: 1rem;
    font-weight: 200;
    display: none;

    @media (min-width: 720px) {
      display: inline-block;
    }
  }
`;

const NavList = styled.ul`
  margin-top: 1rem;
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

const Image = styled(Img)`
  width: 50px;
`;

const ToggleButton = styled.button`
  display: none;
  cursor: pointer;
  user-select: none;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  padding: 8px;
  position: relative;
  right: -9px;
  background-color: transparent;
  border: 0;
  color: inherit;
  outline: none;

  svg {
    fill: currentColor;
    display: block;
    width: 100%;
    height: auto;
  }
`;

/**
 * This utility function allows function calls to be debounced.
 * @param {Function} func Function that requires debouncing
 * @param {Number} wait Wait time in milliseconds between successive invocations
 */
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// inspired by https://gist.github.com/Tybi/0c8ffb3d54df8a1c8966
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPositionY: 0,
      scrollPositionYOld: 0,
    };
  }

  componentDidMount() {
    return window.addEventListener('scroll', debounce(this.handleScroll, 16));
  }

  componentWillUnmount() {
    return window.removeEventListener(
      'scroll',
      debounce(this.handleScroll, 16)
    );
  }

  handleScroll = () => {
    const scrollPositionYOld = this.state.scrollPositionY;
    const scrollPositionY = +window.scrollY;
    return this.setState({ scrollPositionYOld, scrollPositionY });
  };

  render() {
    const isScrolling =
      this.state.scrollPositionY < this.state.scrollPositionYOld &&
      this.state.scrollPositionY > 50;

    const { data } = this.props;
    return (
      <HeaderWrapper className={isScrolling ? 'isScrolling' : null}>
        <Navigation>
          <Container>
            <InsideWrapper>
              <LeftWrapper>
                <Logo>
                  <Link to="/">
                    <Image fluid={data.logo.childImageSharp.fluid} />
                  </Link>
                </Logo>
              </LeftWrapper>
              <RightWrapper>
                <PageTitle>
                  <Link to="/">
                    <span className="headerTitle">
                      {data.globalSite.headerTitle}
                    </span>
                    <span className="headerSubtitle">
                      {data.globalSite.headerSubtitle}
                    </span>
                  </Link>
                </PageTitle>
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
                <ToggleButton>
                  <svg
                    id="mobile-nav-open"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22,13H2a1,1,0,0,1,0-2H22a1,1,0,0,1,0,2Z"></path>
                    <path d="M22,6H2A1,1,0,0,1,2,4H22a1,1,0,0,1,0,2Z"></path>
                    <path d="M22,20H2a1,1,0,0,1,0-2H22a1,1,0,0,1,0,2Z"></path>
                  </svg>
                </ToggleButton>
              </RightWrapper>
            </InsideWrapper>
          </Container>
        </Navigation>
      </HeaderWrapper>
    );
  }
}

// eslint-disable-next-line react/display-name
export default props => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        logo: file(relativePath: { eq: "logo-white.png" }) {
          childImageSharp {
            fluid(maxWidth: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        globalSite: datoCmsGlobalSite {
          headerSubtitle
          headerTitle
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
);
