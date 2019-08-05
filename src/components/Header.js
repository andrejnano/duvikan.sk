/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { graphql, Link, StaticQuery } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from '../containers/Container';
import { colors } from '../consts/style';

const HeaderWrapper = styled.header`
  position: initial;
  z-index: 999;
  top: 0;
  padding-top: 54px;
  background: ${colors.white};
  color: ${colors.black};
  transition: background 0.4s linear, color 0.4s linear;

  &.isHome {
    background: transparent;
    transition: background 0.4s linear, color 0.4s linear;
    color: ${colors.white};
  }

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

  a.activePage {
    border-bottom: 3px solid ${colors.darkWash};
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
  width: 200px;
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
  width: 200px;
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

const ToggleButton = styled.div`
  svg {
    color: inherit;
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
      this.state.scrollPositionY > 5;

    // TODO: fix "scrolling up and back down again" glitch.. make it somehow smoother

    const { data } = this.props;

    // eslint-disable-next-line prettier/prettier
    const headerClasses = `${this.props.isHome ? 'isHome' : ''} ${isScrolling ? 'isScrolling' : ''}`;

    return (
      <HeaderWrapper className={headerClasses}>
        <Navigation>
          <Container>
            <InsideWrapper>
              <LeftWrapper>
                <Logo>
                  <Link to="/">
                    <Image fluid={this.props.isHome ? data.logoWhite.childImageSharp.fluid : data.logoBlack.childImageSharp.fluid} />
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
                  <Link to="/historia" activeClassName="activePage">
                    História
                  </Link>
                  <Link to="/contact" activeClassName="activePage">
                    Kontakt
                  </Link>
                </NavList>
                {/* <ToggleButton>
                  <FontAwesomeIcon icon={['far', 'bars']} />
                </ToggleButton> */}
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
