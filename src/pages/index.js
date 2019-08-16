/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors, colors2 } from '../consts/style';
import Container from '../containers/Container';
import Logo from '../images/logo-black.svg';
import {
  GridLayout,
  SidePanel,
  MainPanel,
} from '../components/common/LayoutParts';
import Gallery from '../components/Gallery';

const HomePage = styled.article`
  color: ${colors.white};
  position: relative;
  /* margin-top: calc(-1 * (54px + 4rem)); */
  margin-top: -94px;

  .fullScreenBackground {
    height: 100vh;
  }
`;

const LangSwitch = styled.div`
  grid-column: 6/7;
  opacity: 0.5;

  > a {
    display: block;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const SocialIcons = styled.div`
  grid-column: 5/6;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2.5%;
  opacity: 0.8;
  > a {
    font-size: 3rem;
    padding-right: 1rem;

    &:hover {
      opacity: 0.8;
      color: rgb(238, 40, 53);
    }
  }
`;

const JapaneseSideText = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10%;
  line-height: 1;
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
  font-size: 175px;
  font-weight: 1000;
  opacity: 0.3;
  color: rgb(238, 40, 53);
  writing-mode: vertical-lr;
`;

const JapaneseBgText = styled.div`
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  left: 5%;
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
  font-size: 400px;
  font-weight: 1000;
  opacity: 0.075;
  display: none;
`;

const LogoBg = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.075;
`;

const HeroSection = styled.section`
  padding-top: 94px;
  height: calc(100% - 10vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroSectionContent = styled.div`
  grid-column: 2/4;
  background: transparent;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &::before {
    content: ' ';
    width: 250px;
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: -1rem;
    left: 0;
  }

  h1 {
    font-size: 5rem;
    font-weight: 800;
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.16);
  }
  p {
    font-size: 2.5rem;
    line-height: 1.618;
    font-weight: 400;
    max-width: 30em;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.16);
  }
  .cta {
    letter-spacing: 0.2em;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.4rem;
    color: rgb(238, 40, 53);
    position: relative;
    transition: padding 0.1s linear;

    &:hover {
      opacity: 0.6;
      padding-left: 0.4rem;
      transition: padding 0.1s linear;
    }

    svg {
      font-size: 1.6rem;
      vertical-align: middle;
      margin-top: -0.2rem;
    }
  }
`;

const NewsfeedSection = styled.div`
  position: absolute;
  bottom: 15vh;
  left: 5%;
  > div {
    display: flex;
    flex-direction: row;
    div {
      position: relative;
      margin-right: 4rem;
      opacity: 0.8;
      &::before {
        content: ' ';
        width: 100px;
        height: 3px;
        background: rgba(255, 255, 255, 0.5);
        position: absolute;
        top: -1rem;
        left: 0;
      }
      h3 {
        font-size: 3rem;
        font-weight: 400;
        color: rgb(238, 40, 53);
      }
      p {
        color: #fff;
      }
      &:first-child {
        grid-column: 2/3;
      }
    }
  }
`;

const PropositionSection = styled.div`
  background: rgba(26, 26, 26, 0.7);
  border-top: 3px solid #707070;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10vh;

  > .grid {
    height: 100%;

    .featuredLink {
      align-self: center;
      &:first-child {
        grid-column: 2/3;
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

const Image = styled(Img)`
  width: 0px;
`;

const MainPanelRow = styled.main`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 400;
`;

const SectionSeparator = styled.hr`
  width: 100%;
  height: 1px;
  opacity: 0.5;
  border: 0;
  margin: 0;
  background-color: #fff;
`;

const DarkSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${colors.black};
  opacity: 0.075;
  border: 0;
  margin: 0;
  overflow: visible;
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3rem 0;

  @media (min-width: 950px) {
    flex-direction: row;
  }
`;

const Main = styled.section`
  background: ${colors.lightWash};
  color: ${colors.black};
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  border-bottom: 1px solid #e5e8ed;

  @media (min-width: 950px) {
    padding-top: 50px;
  }
`;

const JapaneseTitle = styled.div`
  grid-column: 2/3;
  position: relative;
  writing-mode: vertical-lr;
  height: 100%;
  font-size: 4rem;
  display: none;

  @media (min-width: 950px) {
    display: block;
  }
`;

const CenteredTextBlock = styled.div`
  flex: 60%;
  font-size: 3rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;

  svg {
    color: #000;
    fill: currentColor;
  }
  .title {
    font-size: 6rem;
    text-transform: uppercase;
    font-weight: 1000;
    letter-spacing: 0.05em;
  }
  .japaneseTitle {
    font-weight: 400;
  }

  .subtitle {
    font-size: 2.4rem;
  }

  .bodyContent {
    font-size: 1.6rem;
    font-weight: 400;
    display: relative;
    margin-top: 3rem;
    text-align: justify;
    max-width: 575px;
    padding-right: 1rem;
    color: ${colors.black};
  }
`;

const SideGallery = styled.div`
  flex: 40%;
  align-self: center;
  padding: 2rem 0;
`;

const Newsfeed = styled.section`
  color: ${colors.white};
  background: ${colors.black};
  padding: 4rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const NewsfeedTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const BlogPostGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  padding: 2rem 0;
  margin: 0;
  position: relative;
  list-style-type: none;
  /* border: 1px solid #e5e8ed;
  background-color: ${colors.white};
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06); */
`;

const BlogPostItem = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  > a {
    position: relative;
    padding: 1rem;
    color: ${colors.white};
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .timePosted {
      font-size: 1.4rem;
      width: auto;
      margin-right: 2rem;

      @media (min-width: 950px) {
        width: 200px;
        margin: 0;
      }
    }

    .title {
      font-size: 1.6rem;
      font-weight: 400;
    }

    .linkText {
      margin-left: auto;
      color: ${colors.white};
      font-weight: 400;
      font-size: 1.4rem;
      display: none;
      svg {
        margin-left: 2px;
        font-size: 1.2em;
        vertical-align: middle;
        position: relative;
        top: -1px;
        color: ${colors.white};
      }
      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1px;
        background: ${colors.white};
        transition: opacity 0.25s linear;
      }

      @media (min-width: 950px) {
        display: block;
      }
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query indexQuery {
      logoWhite: file(relativePath: { eq: "logo-white.png" }) {
        childImageSharp {
          fluid(maxWidth: 60) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      page: datoCmsHomePage {
        description
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        quickLink1Title
        quickLink2Title
        quickLink3Title
        quickLink1Cover {
          fluid(maxWidth: 4000) {
            ...GatsbyDatoCmsFluid
          }
        }
        quickLink2Cover {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
        quickLink3Cover {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
        quickLink1Description
        quickLink1LinkText
        quickLink2Description
        quickLink2LinkText
        quickLink3Description
        quickLink3LinkText
        body
        firstImageGallery {
          fluid(maxWidth: 950) {
            ...GatsbyDatoCmsFluid
          }
        }
        secondImageGallery {
          fluid(maxWidth: 950) {
            ...GatsbyDatoCmsFluid
          }
        }
        backgroundImage {
          fluid(maxWidth: 4000) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
      posts: allDatoCmsBlogPost(
        filter: { locale: { eq: "sk" } }
        sort: { fields: [meta___createdAt], order: DESC }
        limit: 5
      ) {
        edges {
          node {
            id
            title
            featured
            slug
            cover {
              fluid(maxWidth: 720) {
                ...GatsbyDatoCmsFluid
              }
            }
            author {
              name
              photo {
                fluid(maxWidth: 200) {
                  src
                  srcSet
                  base64
                  aspectRatio
                  sizes
                }
              }
            }
            meta {
              createdAt
            }
            contentNode {
              childMarkdownRemark {
                timeToRead
              }
            }
          }
        }
      }
    }
  `);

  const {
    description,
    seoMetaTags,
    quickLink1Title,
    quickLink2Title,
    quickLink3Title,
    quickLink1Cover,
    quickLink2Cover,
    quickLink3Cover,
    quickLink1Description,
    quickLink1LinkText,
    quickLink2Description,
    quickLink2LinkText,
    quickLink3Description,
    quickLink3LinkText,
    body,
    firstImageGallery,
    secondImageGallery,
    backgroundImage,
  } = data.page;

  const backgroundFluidImageStack = [
    backgroundImage.fluid,
    // good one 'radial-gradient(circle, rgba(26,26,26, 0.7) 0%, rgba(26, 26, 26, 1) 90%)',
    // 'linear-gradient( 111.6deg,  rgba(73,235,221,0.2) -0%, rgba(83,222,219,0.2) 7.1%, rgba(105,191,217,0.2) 13.4%, rgba(127,157,214,0.2) 18%, rgba(155,113,208,0.2) 23.9%, rgba(178,73,201,0.2) 28.8%, rgba(200,45,192,0.2) 33.3%, rgba(213,42,180,0.2) 38%, rgba(232,44,145,0.2) 44.2%, rgba(239,45,128,0.2) 52.4%, rgba(249,66,107,0.2) 59.7%, rgba(252,105,98,0.2) 67.3%, rgba(252,105,98,0.2) 74.4%, rgba(254,145,92,0.2) 82.2%, rgba(255,189,86,0.2) 88.2%, rgba(254,227,80,0.2) 92.8%, rgba(254,248,75,0.2) 98.4% )',
    'radial-gradient(circle, rgba(26,26,26, 0.7) 0%, rgba(0, 0, 0, 1) 90%)',
    // 'radial-gradient( circle farthest-corner at 7.5% 24%,  rgba(237,161,193,0.1) 0%, rgba(250,178,172,0.1) 25.5%, rgba(190,228,210,0.1) 62.3%, rgba(215,248,247,0.1) 93.8% )',
  ].reverse();
  const { edges } = data.posts;

  return (
    <HomePage>
      <SEO meta={seoMetaTags} />
      <BackgroundImage
        className="fullScreenBackground"
        Tag="section"
        fluid={backgroundFluidImageStack}
      >
        <JapaneseSideText>空手道場</JapaneseSideText>
        <JapaneseBgText>空手道場</JapaneseBgText>
        <HeroSection>
          <GridLayout>
            <HeroSectionContent>
              <div dangerouslySetInnerHTML={{ __html: description }} />
              <Link className="cta" to="/about">
                Viac info{' '}
                <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
              </Link>
            </HeroSectionContent>
          </GridLayout>
        </HeroSection>
        <NewsfeedSection>
          <GridLayout>
            <div>
              <h3>Novy prispevok</h3>
              <p>História nášho klubu a ciest na Okinawu.</p>
            </div>
          </GridLayout>
        </NewsfeedSection>
        <PropositionSection>
          <GridLayout className="grid">
            <Link className="featuredLink" to="/about">
              <h3>Náš príbeh</h3>
              <p>História nášho klubu a ciest na Okinawu.</p>
            </Link>

            <Link className="featuredLink" to="/treningy">
              <h3>Rozpisy tréningov</h3>
              <p>Časový rozpis tréningov pre rok 2019.</p>
            </Link>

            <Link className="featuredLink" to="/historia">
              <h3>História okinawského karate</h3>
              <p>Tradičné okinawské karate a jeho vývoj.</p>
            </Link>

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
          </GridLayout>
        </PropositionSection>
      </BackgroundImage>
      <Main>
        <Container>
          <SectionWrapper>
            <MainPanel>
              <Gallery itemsPerRow={3} images={firstImageGallery} />
            </MainPanel>
          </SectionWrapper>
          <DarkSeparator />
          <SectionWrapper>
            <SidePanel>
              <JapaneseTitle>空手道場ドゥヴィ館ブラチスラバ</JapaneseTitle>
            </SidePanel>
            <MainPanelRow>
              <CenteredTextBlock>
                <Logo />
                <h4 className="japaneseTitle">
                  空手道場ドゥヴィ館ブラチスラバ
                </h4>
                <h3 className="title">Duvi-kan</h3>
                <div className="subtitle">
                  <strong>DUVI</strong> - okinawské meno šéftrénera MUDr.
                  Divinca
                </div>
                <div className="subtitle">
                  <strong>KAN</strong> - po japonsky škola
                </div>
                <div
                  className="bodyContent"
                  dangerouslySetInnerHTML={{
                    __html: body,
                  }}
                />
              </CenteredTextBlock>
              <SideGallery>
                <Gallery itemsPerRow={1} images={secondImageGallery} />
              </SideGallery>
            </MainPanelRow>
          </SectionWrapper>
          <SectionSeparator />
        </Container>
      </Main>
      <Newsfeed>
        <Container>
          <NewsfeedTitle>Najnovšie príspevky</NewsfeedTitle>
          <BlogPostGrid>
            {map(edges, post => (
              <BlogPostItem key={post.node.slug}>
                <SectionSeparator />
                <Link to={`/blog/${post.node.slug}/`}>
                  <div className="timePosted">
                    <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
                    <Moment format="DD.MM.YYYY">
                      {post.node.meta.createdAt}
                    </Moment>
                  </div>
                  <h3 className="title">{post.node.title}</h3>
                  <div className="linkText">
                    Otvoriť článok{' '}
                    <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />{' '}
                  </div>
                </Link>
              </BlogPostItem>
            ))}
          </BlogPostGrid>
        </Container>
      </Newsfeed>
    </HomePage>
  );
};

export default IndexPage;
