/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql, Link, StaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from '../containers/Container';
import { colors, colors2 } from '../consts/style';

const HeaderWrapper = styled.header`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  background: ${colors.white};
  color: ${colors.black};
  transition: background 0.4s linear, color 0.4s linear;
  padding-top: calc(54px + 2rem);
  box-shadow: rgba(46, 41, 51, 0.08) 0px 1px 2px,
    rgba(71, 63, 79, 0.08) 0px 2px 4px;

  .logoBlack {
    display: block;
  }

  .logoWhite {
    display: none;
  }

  @media (min-width: 950px) {
    position: initial;
    padding-top: calc(54px + 4rem);
    box-shadow: none;
    background: transparent;
    &.isHome {
      background: transparent;
      color: ${colors.white};
      transition: background 0.4s linear, color 0.4s linear;
      .logoWhite {
        display: block;
      }
      .logoBlack {
        display: none;
      }
    }

    &.isScrolling {
      transition: background 0.2s linear;
      position: sticky;
      background: ${colors.black};
      color: ${colors.white};
      .logoWhite {
        display: block;
      }
      .logoBlack {
        display: none;
      }
    }
  }
`;

const Navigation = styled.nav`
  position: absolute;
  top: 1rem;
  width: 100%;
  @media (min-width: 950px) {
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
  width: auto;

  @media (min-width: 950px) {
    width: 200px;
  }
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
  width: auto;
  margin-right: 1rem;
  @media (min-width: 950px) {
    width: 200px;
    margin: 0;
  }
`;

const PageTitle = styled.div`
  background: transparent;
  .headerTitle {
    font-weight: bold;
    font-size: 2rem;
    display: inline-block;

    @media (min-width: 950px) {
      &::after {
        content: '・';
        margin-left: 1rem;
      }
    }
  }
  .headerSubtitle {
    margin-left: 1rem;
    font-weight: 200;
    display: none;

    @media (min-width: 950px) {
      display: inline-block;
    }
  }
`;

const NavList = styled.ul`
  display: none;
  @media (min-width: 950px) {
    display: block;
  }
  margin-top: 1rem;
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
  a.activePage {
    border-bottom: 3px solid ${colors.darkWash};
  }
`;

const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 4rem;

  a {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1rem;

    &:hover {
      opacity: 0.5;
    }
  }

  a.activePage {
    color: ${colors2.red};
  }
`;

const MobileNavOverlay = styled.div`
  position: fixed;
  top: calc(54px + 2rem);
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${colors.black};
  color: ${colors.white};
  padding: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s linear;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
`;

const Image = styled(Img)`
  width: 50px;
`;

const ToggleButton = styled.div`
  display: block;
  padding: 1rem;
  cursor: pointer;
  svg {
    font-size: 2.4rem;
    color: inherit;
  }

  @media (min-width: 950px) {
    display: none;
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
      mobileNavOpen: false,
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

  toggleMobileNav() {
    this.setState({ mobileNavOpen: !this.state.mobileNavOpen });
  }

  render() {
    const isScrolling =
      this.state.scrollPositionY < this.state.scrollPositionYOld &&
      this.state.scrollPositionY > 5;

    // TODO: fix "scrolling up and back down again" glitch.. make it somehow smoother

    const { data } = this.props;

    // eslint-disable-next-line prettier/prettier
    const headerClasses = `${this.props.isHome ? 'isHome' : ''} ${
      isScrolling ? 'isScrolling' : ''
    }`;

    return (
      <HeaderWrapper className={headerClasses}>
        <Navigation>
          <Container>
            <InsideWrapper>
              <LeftWrapper>
                <Logo>
                  <Link to="/">
                    <Image
                      className="logoWhite"
                      fluid={data.logoWhite.childImageSharp.fluid}
                    />
                    <Image
                      className="logoBlack"
                      fluid={data.logoBlack.childImageSharp.fluid}
                    />
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
                  <Link to="/blog" activeClassName="activePage">
                    Novinky
                  </Link>
                  <Link to="/treningy" activeClassName="activePage">
                    Tréningy
                  </Link>
                  <Link to="/about" activeClassName="activePage">
                    O nás
                  </Link>
                  <Link to="/clenovia" activeClassName="activePage">
                    Členovia
                  </Link>
                  <Link to="/historia" activeClassName="activePage">
                    História
                  </Link>
                  <Link to="/contact" activeClassName="activePage">
                    Kontakt
                  </Link>
                </NavList>
                <ToggleButton onClick={() => this.toggleMobileNav()}>
                  {!this.state.mobileNavOpen && (
                    <FontAwesomeIcon icon={['far', 'bars']} />
                  )}
                  {this.state.mobileNavOpen && (
                    <FontAwesomeIcon icon={['far', 'times']} />
                  )}
                </ToggleButton>
              </RightWrapper>
            </InsideWrapper>
          </Container>
        </Navigation>
        <MobileNavOverlay className={this.state.mobileNavOpen && 'visible'}>
          <MobileNavList onClick={() => this.toggleMobileNav()}>
            <Link to="/blog" activeClassName="activePage">
              Novinky
            </Link>
            <Link to="/treningy" activeClassName="activePage">
              Tréningy
            </Link>
            <Link to="/about" activeClassName="activePage">
              O nás
            </Link>
            <Link to="/clenovia" activeClassName="activePage">
              Členovia
            </Link>
            <Link to="/historia" activeClassName="activePage">
              História
            </Link>
            <Link to="/contact" activeClassName="activePage">
              Kontakt
            </Link>
          </MobileNavList>
        </MobileNavOverlay>
      </HeaderWrapper>
    );
  }
}

// eslint-disable-next-line react/display-name
export default props => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        logoWhite: file(relativePath: { eq: "logo-white.png" }) {
          childImageSharp {
            fluid(maxWidth: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        logoBlack: file(relativePath: { eq: "logo-black.png" }) {
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
