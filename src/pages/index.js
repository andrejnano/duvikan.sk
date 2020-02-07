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
    justify-content: center;
  }

  /* align-items: center; */
  padding: 0 2.5%;
  /* opacity: 0.8; */
  > a {
    font-size: 3rem;
    padding-right: 1rem;
    font-size: 2rem;
    font-weight: bold;
    margin: 4rem 0 2rem;

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
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 3rem 0;

  .cta {
    display: inline-block;
    margin: 0 2rem 0 0rem;

    font-weight: 700;
    /* text-transform: uppercase; */
    font-size: 16px;
    letter-spacing: -0.011em;
    line-height: 22px;

    /* font-size: 20px;
    letter-spacing: -0.017em;
    line-height: 28px; */

    /* color: ${colorScheme.secondary}; */
    background: rgba(0, 0, 0, 0);
    color: #fff;
    border: 2px solid ${colorScheme.secondary};
    /* border-radius: 1px; */

    opacity: 0.9;

    &:hover {
      color: ${colorScheme.secondary};
      background: rgba(255, 255, 255, 0.95);
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

    padding: 1rem;
    /* border-bottom: 2px solid transparent; */
    transition: border 250ms ease, color 250ms ease, background 250ms ease;

    svg {
      display: none;
      font-size: 20px;
      vertical-align: middle;
      margin: 0rem 0.4rem;
    }
  }
`;

const HighPriorityArticle = styled.div`
  grid-column: 2/-2;
  transform: translateY(-100%);
  background: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .alertbox {
    background: ${colorScheme.secondary};
    /* border: 4px solid ${colorScheme.secondary}; */
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 1.5rem 3rem;
    display: inline-flex;
    flex-direction: row;
    align-items: center;

    font-size: 14px;
    letter-spacing: -0.011em;
    line-height: 22px;

    color: #fff;
    font-weight: 700;
    /* box-shadow: ${boxShadow}; */
    transition: color 250ms ease, background 250ms ease;
    /* box-shadow: inset 0 -3px 3px -3px #000000; */
    box-shadow: inset 0 -4px 8px -4px rgba(116, 129, 141, 1);
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.10);

    > svg {
      font-weight: 800;
      font-size: 20px;
      margin-right: 0.75em;
      position: relative;
    }


    &:hover {
      background: #fff;
      color: ${colorScheme.secondary};
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
    padding: 3rem 0;
    height: auto;
    transform: translateY(-100%);
    background: rgba(26, 26, 26, 0.5);
    /* temp */
    background: #fff;
    color: #000;
  }

  > .grid {
    height: 100%;

    .featuredLink {
      padding-right: 2rem;
      grid-column: 2/-2;
      transition: color 125ms ease;

      @media (min-width: 950px) {
        grid-column: initial;
        &:first-child {
          grid-column: 2/3;
        }
      }

      h3 {
        font-size: 16px;
        letter-spacing: -0.011em;
        line-height: 22px;
      }

      p {
        font-size: 12px;
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
  background: rgba(255, 255, 255, 1);
  background: #fafafa;
  /* background: ${colorScheme.secondary}; */
  box-shadow: 3px 3px 3px #ddd;
  z-index: 10;

  @media (min-width: 950px) {
    margin-top: calc(-10vh);
    /* padding-top: 10vh; */
  }
`;

const NewsfeedTitle = styled.h2`
  /* grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/4;
  } */
  font-size: 2rem;
  font-weight: bold;
  margin: -2rem 0 2rem;
  /* color: #fff; */
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
    grid-column: 2/3;
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
    margin-bottom: 0.8rem;
    background-color: #fff;
    box-shadow: ${boxShadow};
    color: inherit;
    overflow: hidden;
    display: inline-flex;
    min-width: 300px;
    flex-direction: row;
    align-items: center;

    .timePosted {
      font-size: 1rem;
      font-weight: 300;
      opacity: 0.8;
      @media (min-width: 950px) {
        font-size: 1.2rem;
      }
      width: auto;
      margin: 0;
      margin-left: 1rem;
      padding-top: 0.25rem;
      font-feature-settings: 'zero' 0;
      font-feature-settings: 'tnum' 1;
    }

    .title {
      font-size: 1rem;
      @media (min-width: 950px) {
        font-size: 1.4rem;
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

const FeaturedLinks = styled.div`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 3/5;
    margin-left: 4rem;
  }
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
    highPriorityArticle,
  } = data.page;

  const backgroundFluidImageStack = [
    backgroundImage.fluid,
    // 'radial-gradient(circle, rgba(26,26,26, 0.7) 0%, rgba(26, 26, 26, 1) 90%)',
    'radial-gradient(circle, rgba(26,26,26, 0.7) 0%, rgba(0, 0, 0, 1) 90%)',
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
                  Viac o našom klube{' '}
                  <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
                </Link>
                <Link className="cta" to="/treningy">
                  Rozpis tréningov{' '}
                  <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
                </Link>
                <Link className="cta" to="/udalosti">
                  Kalendár akcií{' '}
                  <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
                </Link>
              </HeroLinks>
            </HeroSectionContent>
          </GridLayout>
        </HeroSection>
      </BackgroundImage>
      {/* <PropositionSection>
        <GridLayout className="grid">

        </GridLayout>
      </PropositionSection> */}
      <Newsfeed>
        <GridLayout>
          <HighPriorityArticle>
            <Link to="/2-z-dani" className="alertbox">
              <FontAwesomeIcon icon={['far', 'info-circle']} />{' '}
              {highPriorityArticle.title}
              {/* <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} /> */}
            </Link>
          </HighPriorityArticle>
          <BlogPostGrid>
            <NewsfeedTitle>Najnovšie príspevky</NewsfeedTitle>
            {map(edges, post => (
              <BlogPostItem key={post.node.slug}>
                <Link to={`/blog/${post.node.slug}/`}>
                  <div className="timePosted">
                    <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
                    <Moment format="DD.MM.YYYY">
                      {post.node.publicationDate}
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
          <FeaturedLinks>
            <NewsfeedTitle>Dôležité odkazy</NewsfeedTitle>

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
          </FeaturedLinks>
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
          <FbFeed>
            {/* <iframe
              title="fbfeedembed"
              src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FduvikanBratislava/&width=600&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=300"
              scrolling="yes"
              allowTransparency="true"
              frameBorder="0"
            ></iframe> */}
          </FbFeed>
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
