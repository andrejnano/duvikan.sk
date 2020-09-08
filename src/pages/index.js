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
import { Draggable } from '../style/motion';

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

const JapaneseSideText = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10%;
  line-height: 1;
  width: auto;
  overflow: visible;
  white-space: nowrap;
  pointer-events: none;
  /* fking magic  */
  font-size: calc((90vh - 80px) / 4.5 / 1.618);
  font-weight: 500;
  opacity: 0.5;
  color: ${colorScheme.secondary};
  writing-mode: vertical-lr;
  display: none;
  @media (min-width: 950px) {
    display: block;
  }

  .part {
    margin: 1rem 0;
    position: relative;
    .label {
      position: absolute;
      right: -1rem;
      top: 1rem;
      color: #fff;
      font-size: 1rem;
      font-weight: 400;
    }
  }
`;

const BgPattern = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 100%;
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
  display: block;
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
      font-size: 40px;
      letter-spacing: -0.022em;
      line-height: 56px;
    }
    font-weight: 800;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.16);
  }
  p {
    @media (min-width: 950px) {
      font-size: 20px;
      letter-spacing: -0.017em;
      line-height: 28px;
    }
    /* line-height: 1.618; */
    font-weight: 500;
    max-width: 30em;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.16);
  }
`;

const HeroLinks = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: flex-start;
  margin: 3rem 0;

  .cta {
    /* display: inline-block; */
    margin: 0 2rem 0 0rem;
    padding: 1rem;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.011em;
    line-height: 22px;
    background: rgba(0, 0, 0, 0);
    color: #fff;
    border: 2px solid ${colorScheme.secondary};
    border-radius: 5px;
    opacity: 0.9;
    transition: border 150ms ease, color 150ms ease, background 150ms ease;

    &:hover {
      color: ${colorScheme.secondary};
      background: rgba(225,225,225,1);
      border-color: #fff;
      opacity: 1;
    }

    &:nth-of-type(2) {
      border-color: ${colors.lightBlue};
      &:hover {
        color: ${colors.lightBlue};
        border-color: #fff;
      }
    }

    &:nth-of-type(3) {
      border-color: ${colors.lightGreen};
      &:hover {
        color: ${colors.lightGreen};
        border-color: #fff;
      }
    }
    
  }
`;

const HighPriorityArticle = styled.div`
  grid-column: 2/-2;
  transform: translateY(-100%);
  background: transparent;
  overflow: hidden;

  .alertbox {
    background:  #3b5998;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 1rem 1.5rem;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    font-size: 2.5rem;
    color: #fff;
    font-weight: 700;
    transition: color 250ms ease, background 250ms ease;

    &:hover {
      background: #fff;
      color: #3b5998;
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
  background: #fafafa;
  /* background: ${colorScheme.secondary}; */
  z-index: 10;

  @media (min-width: 950px) {
    margin-top: calc(-10vh);
    /* padding-top: 10vh; */
  }
`;

const NewsfeedTitle = styled.h2`
  grid-column: 2/-2;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;


const BlogPostGrid = styled.div`
  grid-column: 2/-2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0;
  list-style-type: none;
`;

const BlogPostItem = styled.li`

  width: 100%;
  
  @media (min-width: 750px) {
    width: 33.333333%;
  }

  padding: 1rem;
  height: 100%;

  > a {
    display: block;
    overflow: hidden;
    border-radius: 5px;
    border: 2px solid #eeeeee;
    background: #fff;
    width: 100%;
    height: 100%;

    .cover {
      max-height: 150px;
      height: 100%;

      img {
        object-position: center;
        object-fit: cover;
        width: 100%;
        max-width: 100%;
        height: auto;
        /* filter: sepia(.3) opacity(.9) grayscale(.1); */
      }
    }

    .content {
      height: 100%;
      padding: 1.5rem;
      
      .timePosted {
        font-size: 1.2rem;
        font-weight: 400;
        width: auto;
        margin: 0;
        font-feature-settings: 'zero' 0;
        font-feature-settings: 'tnum' 1;
      }

      .title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0;
      }
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;

const ViewMoreLink = styled.div`
  grid-column: 2/-2;
  padding: 1rem 1rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  > a {
    font-size: 1.4rem;
    font-weight: 600;
    color: ${colorScheme.main};

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

const FeaturedLinks = styled.div`
  grid-column: 2/-2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .featuredLink {
    margin: 0;
    margin-bottom: 1rem;
    background-color: #fff;
    box-shadow: ${boxShadow};
    padding: 2rem 3rem 1rem;

    h3 {
      font-size: 18px;
      letter-spacing: -0.011em;
      line-height: 22px;
      margin-bottom: 1rem;
    }

    p {
      font-size: 14px;
      letter-spacing: 0em;
      line-height: 17px;
    }

    &:hover {
      h3 {
        color: ${colorScheme.secondary};
      }
      p {
        opacity: 0.75;
      }
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
        highPriorityArticle {
          title
        }
      }
      posts: allDatoCmsBlogPost(
        filter: { locale: { eq: "sk" } }
        sort: { fields: [publicationDate], order: DESC }
        limit: 3
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
            publicationDate
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
    body,
    backgroundImage,
    highPriorityArticle,
  } = data.page;

  const backgroundFluidImageStack = [
    backgroundImage.fluid,
    'radial-gradient(circle, rgba(26,26,26, 0.7) 0%, rgba(0, 0, 0, 1) 90%)',
  ].reverse();

  const posts = data.posts.edges;

  return (
    <HomePage>
      <SEO meta={seoMetaTags} />
      <BackgroundImage
        className="fullScreenBackground"
        Tag="section"
        fluid={backgroundFluidImageStack}
      >
        <JapaneseSideText>
          <span className="part">尚道館</span>
          <span className="part">剛柔流</span>
        </JapaneseSideText>
        <BgPattern>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ee2835"
              fillOpacity="0.2"
              d="M0,256L80,234.7C160,213,320,171,480,176C640,181,800,235,960,224C1120,213,1280,139,1360,101.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </BgPattern>
        <HeroSection>
          <GridLayout>
            <HeroSectionContent>
              <div dangerouslySetInnerHTML={{ __html: description }} />
              <HeroLinks>
                <Link className="cta" to="/about">
                  Viac o našom klube
                </Link>
                <Link className="cta" to="/treningy">
                  Rozpis tréningov
                </Link>
                <Link className="cta" to="/udalosti">
                  Kalendár akcií
                </Link>
              </HeroLinks>
            </HeroSectionContent>
          </GridLayout>
        </HeroSection>
      </BackgroundImage>

      <Newsfeed>
        <GridLayout>
          <HighPriorityArticle>
            <a className="alertbox" title="Otvoriť našu Facebook stránku" href="https://facebook.com/duvikanBratislava">
              <FontAwesomeIcon icon={['fab', 'facebook']} />
            </a>
          </HighPriorityArticle>

          <NewsfeedTitle>Novinky</NewsfeedTitle>

          <BlogPostGrid>
            { posts.map( (post) => {
              return (
                <BlogPostItem key={post.node.slug}>
                  <Link to={`/blog/${post.node.slug}/`}>
                    <Img className="cover" fluid={post.node.cover.fluid} />
                    <div className="content">
                      <h3 className="title">{post.node.title}</h3>
                      <div className="timePosted">
                        <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
                        <Moment format="DD.MM.YYYY">
                          {post.node.publicationDate}
                        </Moment>
                      </div>
                    </div>
                  </Link>
                </BlogPostItem>
              )})
            }
          </BlogPostGrid>

          <ViewMoreLink>
            <Link to="/blog">
              Zobraziť všetky príspevky{' '}
              <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />{' '}
            </Link>
          </ViewMoreLink>

          
          {/* 
          <NewsfeedTitle>Dôležité odkazy</NewsfeedTitle>
          <FeaturedLinks>
            <Link className="featuredLink" to="/about">
              <h3>Náš príbeh</h3>
              <p>História nášho klubu a ciest na Okinawu.</p>
            </Link>

            <Link className="featuredLink" to="/treningy">
              <h3>Rozpisy tréningov</h3>
              <p>Časový rozpis tréningov pre rok 2019.</p>
            </Link>

            <Link className="featuredLink" to="/udalosti">
              <h3>Udalosti a akcie</h3>
              <p>Kalendár udalostí - sezóna 2019/2020.</p>
            </Link>
          </FeaturedLinks> */}
      
        </GridLayout>
      </Newsfeed>
      <Main>
        <DarkSeparator></DarkSeparator>
        <GridLayout>
          <CenteredTextBlock>
            <Draggable>
              <Logo />
            </Draggable>
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
