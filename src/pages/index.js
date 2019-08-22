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

import { colors, colorScheme, boxShadow } from '../consts/style';
import Logo from '../images/logo.svg';
import { GridLayout } from '../components/common/LayoutParts';

const HomePage = styled.article`
  color: ${colors.white};
  position: relative;
  /* margin-top: calc(-1 * (54px + 4rem)); */
  /* TODO: fix this margin, should be dependent on the header height */
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
  grid-column: 2/-2;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media (min-width: 950px) {
    grid-column: 5/6;
    justify-content: flex-end;
  }

  align-items: center;
  padding: 0 2.5%;
  opacity: 0.8;
  > a {
    font-size: 3rem;
    padding-right: 1rem;

    &:hover {
      opacity: 0.8;
      color: ${colorScheme.secondary};
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
  /* fking magic  */
  font-size: calc((90vh - 80px) / 4 / 1.618);
  font-weight: 1000;
  opacity: 0.3;
  color: ${colorScheme.secondary};
  writing-mode: vertical-lr;

  display: none;
  @media (min-width: 950px) {
    display: block;
  }
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

const HeroSection = styled.section`
  padding-top: 94px;
  height: calc(100% - 10vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroSectionContent = styled.div`
  grid-column: 2/-2;
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
    font-size: 2.4rem;
    @media (min-width: 950px) {
      font-size: 5rem;
      font-size: 40px;
      letter-spacing: -0.022em;
      line-height: 56px;
    }
    font-weight: 800;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.16);
  }
  p {
    font-size: 2rem;
    @media (min-width: 950px) {
      font-size: 24px;
      letter-spacing: -0.019em;
      line-height: 34px;
    }
    line-height: 1.618;
    font-weight: 400;
    max-width: 30em;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.16);
  }
  .cta {
    letter-spacing: 0.2em;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 1rem;
    @media (min-width: 950px) {
      font-size: 1.2rem;
    }
    color: ${colorScheme.secondary};
    position: relative;
    padding: 1rem 0;
    border-bottom: 1px solid transparent;
    transition: border 250ms ease;

    &:hover {
      border-color: ${colorScheme.secondary};
    }

    svg {
      font-size: 2rem;
      vertical-align: middle;
      margin-top: -0.2rem;
      margin-left: 0.2rem;
    }
  }
`;

const PropositionSection = styled.div`
  border-top: 1px solid #707070;
  background: #000;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 4rem 0;

  @media (min-width: 950px) {
    padding: 1rem 0;
    height: 10vh;
    transform: translateY(-100%);
    background: rgba(26, 26, 26, 0.7);
  }

  > .grid {
    height: 100%;

    .featuredLink {
      align-self: center;
      padding-right: 1rem;
      grid-column: 2/-2;

      @media (min-width: 950px) {
        grid-column: initial;
        &:first-child {
          grid-column: 2/3;
        }
      }

      h3 {
        font-size: 1.6rem;
      }

      p {
        font-size: 1.4rem;
      }

      &:hover {
        opacity: 0.75;
        h3 {
          color: ${colorScheme.secondary};
        }
        p {
          opacity: 0.75;
        }
      }
    }
  }
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

const Main = styled.section`
  background: #000;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  border-bottom: 1px solid #e5e8ed;
  margin: 0;
  padding: 6rem 0;
`;

const JapaneseTitle = styled.div`
  grid-column: 4/6;
  align-self: center;
  justify-self: center;
  line-height: 1;
  /* writing-mode: vertical-lr; */
  text-align: center;
  font-size: 5rem;
  color: ${colorScheme.secondary};
  display: none;

  @media (min-width: 950px) {
    display: block;
  }
`;

const CenteredTextBlock = styled.div`
  grid-column: 2/-2;
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;

  svg {
    color: #000;
    fill: currentColor;
    width: 200px;
    height: 300px;
  }
  .title {
    font-size: 6rem;
    text-transform: uppercase;
    font-weight: 1000;
    letter-spacing: 0.05em;
  }
  .japaneseTitle {
    font-weight: 400;
    color: ${colorScheme.secondary};
  }

  .subtitle {
    font-size: 2.4rem;
  }

  .bodyContent {
    text-align: center;
    font-size: 2rem;
    display: relative;
    margin-top: 3rem;
    line-height: 1.618;
    font-weight: 400;
    max-width: 30em;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.16);
  }
`;

const Newsfeed = styled.section`
  position: relative;
  color: #000;
  background: rgba(255, 255, 255, 0.9);

  @media (min-width: 950px) {
    margin-top: -10vh;
  }
`;

const NewsfeedTitle = styled.h2`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/4;
  }
  font-size: 2rem;
  font-weight: bold;
  margin: 4rem 0 2rem;
`;

const FbFeed = styled.div`
  display: none;
  grid-column: 4/6;

  > iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const BlogPostGrid = styled.div`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/4;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  margin-bottom: 4rem;
  position: relative;
  list-style-type: none;
  /* background: ${colors.mediumWash}; */

  .viewMoreLink {
    padding: 1rem 0;
    font-weight: bold;

    svg {
      margin-left: 2px;
      font-size: 1.2em;
      vertical-align: middle;
      position: relative;
      top: -1px;
      color: inherit;
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;

const BlogPostItem = styled.li`
  position: relative;
  width: 100%;
  > a {
    position: relative;
    padding: 1rem 0;
    color: inherit;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;

    .timePosted {
      font-size: 1rem;
      @media (min-width: 950px) {
        font-size: 1.6rem;
      }
      width: auto;
      margin: 0;
    }

    .title {
      font-size: 1.2rem;
      @media (min-width: 950px) {
        font-size: 2rem;
      }
      font-weight: 600;
      margin: 0;
      margin-left: 2rem;
    }

    .linkText {
      margin-left: auto;
      color: inherit;
      font-weight: 400;
      font-size: 1.4rem;
      display: none;
      svg {
        margin-left: 2px;
        font-size: 1.2em;
        vertical-align: middle;
        position: relative;
        top: -1px;
        color: inherit;
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
                Viac o našom klube{' '}
                <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
              </Link>
            </HeroSectionContent>
          </GridLayout>
        </HeroSection>
      </BackgroundImage>
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
      <Newsfeed>
        <GridLayout>
          <NewsfeedTitle>Najnovšie príspevky</NewsfeedTitle>
        </GridLayout>
        <GridLayout>
          <BlogPostGrid>
            {map(edges, post => (
              <BlogPostItem key={post.node.slug}>
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
            <Link className="viewMoreLink" to="/blog">
              Zobraziť všetky príspevky{' '}
              <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />{' '}
            </Link>
          </BlogPostGrid>
          <FbFeed>
            <iframe
              title="fbfeedembed"
              src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FduvikanBratislava/&width=600&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=300"
              scrolling="yes"
              allowTransparency="true"
              frameBorder="0"
            ></iframe>
          </FbFeed>
          {/* <SideGallery>
            <Gallery itemsPerRow={2} images={secondImageGallery} />
          </SideGallery> */}
        </GridLayout>
      </Newsfeed>
      <Main>
        <DarkSeparator></DarkSeparator>
        <GridLayout>
          <CenteredTextBlock>
            <Logo />
            <h4 className="japaneseTitle">空手道場ドゥヴィ館ブラチスラバ</h4>
            <h3 className="title">Duvi-kan</h3>
            <div className="subtitle">
              <strong>DUVI</strong> - okinawské meno šéftrénera MUDr. Divinca
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
        </GridLayout>
      </Main>
    </HomePage>
  );
};

export default IndexPage;
