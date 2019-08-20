/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql, Link, StaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GridLayout } from '../components/common/LayoutParts';
import { boxShadow, colorScheme, colors, colors2 } from '../consts/style';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: auto;
  padding: 10px 0;
  @media (min-width: 950px) {
    padding: 20px 0;
  }
  background: ${colors.white};
  color: ${colors.black};
  border-bottom: 1px solid ${colorScheme.neutral};
  margin-top: -1px;
  z-index: 999;
  transition: background 0.4s ease, color 0.4s ease;
  box-shadow: ${boxShadow};

  .logoBlack {
    display: block;
  }

  .logoWhite {
    display: none;
  }

  @media (min-width: 950px) {
    position: relative;
    &.isHome {
      background: transparent;
      color: #fff;
      transition: background 0.4s linear, color 0.4s linear;
      .logoWhite {
        display: block;
      }
      .logoBlack {
        display: none;
      }
    }
  }
`;

const PageMeta = styled.div`
  grid-column: 2/5;
  @media (min-width: 950px) {
    grid-column: 2/4;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.div`
  background: transparent;
  margin-right: 2rem;
`;

const PageTitle = styled.div`
  background: transparent;

  > a {
    display: flex;
    flex-direction: column;
  }
  .headerTitle {
    font-weight: bold;
    font-size: 1.2rem;
    @media (min-width: 950px) {
      font-size: 2rem;
    }
  }
  .headerSubtitle {
    font-weight: 200;
    display: none;

    @media (min-width: 950px) {
      display: inline-block;
    }
  }
`;

const NavList = styled.div`
  grid-column: 4/6;
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  a {
    letter-spacing: 0.2em;
    font-weight: 600;
    color: inherit;
    text-transform: uppercase;
    font-size: 1.2rem;
    &:not(:last-of-type) {
      margin-right: 2em;
    }
    &:hover {
      opacity: 0.75;
      color: ${colorScheme.secondary};
    }
  }
  a.activePage {
    color: ${colorScheme.secondary};
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
    color: ${colorScheme.secondary};
  }
`;

const MobileNavOverlay = styled.div`
  position: fixed;
  top: calc(50px + 20px);
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: ${colors.white};
  padding: 2rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease;

  &::before {
    content: ' ';
    position: absolute;
    top: -20px;
    right: calc(2.2rem);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 20px 15px;
    border-color: transparent transparent #000000 transparent;
  }

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
`;

const Image = styled(Img)`
  width: 50px;
`;

const ToggleButton = styled.div`
  grid-column: 5 / -2;
  display: inline-block;
  align-self: center;
  text-align: right;
  padding: 1rem;
  cursor: pointer;
  svg {
    font-size: 2.4rem;
    color: inherit;
  }

  @media (min-width: 1200px) {
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
        <GridLayout>
          <PageMeta>
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
          </PageMeta>
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
              <FontAwesomeIcon icon={['fad', 'bars']} />
            )}
            {this.state.mobileNavOpen && (
              <FontAwesomeIcon icon={['fad', 'times']} />
            )}
          </ToggleButton>
        </GridLayout>
        {/* <HeaderHr className={this.props.isHome ? 'whiteHr' : ''} /> */}
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
