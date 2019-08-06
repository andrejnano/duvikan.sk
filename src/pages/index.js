/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors, colors2 } from '../consts/style';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import Logo from '../images/logo-black.svg';

const HomePage = styled.article`
  color: ${colors.white};
`;

const Section = styled.section`
  margin-top: 3rem;
  padding: 3rem 0;
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SectionInfo = styled.div`
  background: transparent;
  width: 200px;
`;

const SectionContent = styled.div`
  background: transparent;
  padding-top: 0.2em;
  flex: 1;
  p {
    font-size: 2.4rem;
    max-width: 720px;
  }
  .cta {
    letter-spacing: 0.2em;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.2rem;

    &:hover {
      opacity: 0.6;
    }

    svg {
      font-size: 1.6rem;
      vertical-align: middle;
      margin-top: -0.2rem;
    }
  }
`;

const SectionSeparator = styled.hr`
  width: 100%;
  height: 1px;
  opacity: 0.175;
  border: 0;
  margin: 0;
  background-color: #fff;
`;

const Main = styled.section`
  padding-top: 400px;
  background: ${colors.lightWash};
  color: ${colors.black};
`;

const CenteredTextBlock = styled.div`
  font-size: 3rem;
  padding-top: 3rem;
  padding-bottom: 6rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    color: #000;
    fill: currentColor;
  }
  .title {
    font-size: 6rem;
    text-transform: uppercase;
    font-weight: 800;
  }
  .japaneseTitle {
    font-weight: 400;
  }

  .subtitle {
    font-size: 2.4rem;
  }

  .bodyContent {
    font-size: 2rem;
    font-weight: 400;
    display: relative;
    margin-top: 3rem;
    text-align: justify;
    max-width: 720px;
    color: #5b6987;
  }
`;

const Newsfeed = styled.section`
  background: ${colors.mediumWash};
  color: ${colors.black};
  padding: 6rem 0;
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
  padding: 0;
  margin: 0;
  position: relative;
  list-style-type: none;
`;

const BlogPostItem = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  > a {
    position: relative;
    border: 1px solid #e5e8ed;
    background-color: ${colors.white};
    border-radius: 3px;
    padding: 3rem;
    color: ${colors.black};
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .cover {
      flex: 100%;
    }

    .title {
      margin-left: 1rem;
      font-size: 2rem;
      font-weight: 400;
    }

    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 400;
      padding: 1.2rem 0;
      opacity: 0.75;

      > * {
        margin-right: 1rem;
      }

      .authorName {
        color: ${colors.mediumBlue};
        font-weight: 500;
      }

      .authorPhoto {
        width: 25px;
        height: 25px;
        img {
          border-radius: 50%;
        }
      }
    }

    .linkText {
      position: absolute;
      display: inline-block;
      bottom: 2rem;
      right: 2rem;
      color: ${colors.mediumBlue};
      font-weight: 400;
      font-size: 2rem;
      svg {
        margin-left: 2px;
        font-size: 1.2em;
        vertical-align: middle;
        position: relative;
        top: -1px;
        color: ${colors.mediumBlue};
      }
      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1px;
        background: ${colors.mediumBlue};
        transition: opacity 0.25s linear;
        opacity: 0;
      }
    }
  }
`;

const QuickLinkGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  position: relative;
  list-style-type: none;
  margin: 0;
  margin-bottom: -50%;
  padding: 0;
  width: 100%;
`;

const QuickLinkCard = styled.li`
  position: relative;
  min-width: 250px;
  width: 100%;
  @media (min-width: 720px) {
    max-width: 720px;
  }
  @media (min-width: 1470px) {
    width: 33.33333%;
  }

  &:first-child {
    a.card {
      margin-left: 0;
    }
  }

  a.card {
    display: block;
    position: relative;
    margin: 0 2rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
    border-radius: 3px;
    background: ${colors.white};
    transition: box-shadow 0.25s linear, -webkit-box-shadow 0.25s linear;
    color: ${colors.black};
    overflow: hidden;
    height: 100%;
    border-bottom: 1px solid #e5e8ed;

    .photo {
      position: relative;
      max-width: 720px;
      border-bottom: 1px solid #e5e8ed;
    }

    .title {
      font-size: 2.4rem;
      padding: 2rem;
      padding-bottom: 0.4rem;
    }

    .description {
      color: #5b6987;
      font-size: 1.8rem;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-bottom: 4rem;
    }

    .linkText {
      position: absolute;
      display: inline-block;
      bottom: 2rem;
      left: 2rem;
      color: ${colors.mediumBlue};
      font-weight: bold;
      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1px;
        background: ${colors.mediumBlue};
        transition: opacity 0.25s linear;
        opacity: 0;
      }
    }

    &:hover {
      box-shadow: 0 10px 20px rgba(3, 27, 78, 0.1);
      .linkText {
        &:after {
          opacity: 1;
        }
      }
    }
  }
`;

const QuickLink = props => {
  return (
    <QuickLinkCard>
      <Link className="card" to={props.url}>
        <Img className="photo" fluid={props.imgFluid} />
        <h3 className="title">{props.title}</h3>
        <p className="description">{props.description}</p>
        <span className="linkText">{props.linkText}</span>
      </Link>
    </QuickLinkCard>
  );
};

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query indexQuery {
      page: datoCmsHomePage {
        description
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        quickLink1Title
        quickLink2Title
        quickLink3Title
        quickLink1Cover {
          fluid(maxWidth: 720) {
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
      }
      posts: allDatoCmsBlogPost(
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
  } = data.page;

  const { edges } = data.posts;

  return (
    <HomePage>
      <SEO meta={seoMetaTags} />
      <ScaleUp>
        <Container>
          <Section>
            <SectionInfo>O nás</SectionInfo>
            <SectionContent>
              <p>{description}</p>
              <Link className="cta" to="/about">
                Viac info{' '}
                <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />
              </Link>
            </SectionContent>
          </Section>
          <SectionSeparator />
          <Section>
            <SectionContent>
              <QuickLinkGrid>
                <QuickLink
                  url="/treningy"
                  title={quickLink1Title}
                  imgFluid={quickLink1Cover.fluid}
                  description={quickLink1Description}
                  linkText={quickLink1LinkText}
                />
                <QuickLink
                  url="/dojo"
                  title={quickLink2Title}
                  imgFluid={quickLink2Cover.fluid}
                  description={quickLink2Description}
                  linkText={quickLink2LinkText}
                />
                <QuickLink
                  url="/historia"
                  title={quickLink3Title}
                  imgFluid={quickLink3Cover.fluid}
                  description={quickLink3Description}
                  linkText={quickLink3LinkText}
                />
              </QuickLinkGrid>
            </SectionContent>
          </Section>
        </Container>
      </ScaleUp>
      <Main>
        <Container>
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
          <SectionSeparator />
        </Container>
      </Main>
      <Newsfeed>
        <Container>
          <CenteredTextBlock>
            <NewsfeedTitle>Najnovšie príspevky</NewsfeedTitle>
            <BlogPostGrid>
              {map(edges, post => (
                <BlogPostItem key={post.node.slug}>
                  <Link to={`/blog/${post.node.slug}/`}>
                    <Img className="cover" fluid={post.node.cover.fluid} />
                    <h3 className="title">{post.node.title}</h3>
                    <div className="meta">
                      <Img
                        className="authorPhoto"
                        fluid={post.node.author.photo.fluid}
                      />
                      <div className="authorName">
                        {post.node.author.name} ・{' '}
                      </div>
                      <FontAwesomeIcon icon={['far', 'calendar-alt']} />{' '}
                      <Moment format="DD.MM.YYYY">
                        {post.node.meta.createdAt}
                      </Moment>
                      <FontAwesomeIcon icon={['far', 'clock']} />{' '}
                      {post.node.contentNode.childMarkdownRemark.timeToRead}{' '}
                      min.
                    </div>
                    <span className="linkText">
                      Otvoriť článok{' '}
                      <FontAwesomeIcon icon={['far', 'long-arrow-alt-right']} />{' '}
                    </span>
                  </Link>
                </BlogPostItem>
              ))}
            </BlogPostGrid>
          </CenteredTextBlock>
        </Container>
      </Newsfeed>
    </HomePage>
  );
};

export default IndexPage;
