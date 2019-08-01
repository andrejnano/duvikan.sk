import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';

import { font, colors } from '../consts/style';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';

const Section = styled.section`
  margin-top: 3rem;
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SectionInfo = styled.div`
  background: transparent;
  width: 150px;
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

    &::after {
      content: '>';
      vertical-align: middle;
      line-height: 0;
      position: relative;
      font-size: 1.8rem;
      font-weight: 300;
      top: -0.11em;
      left: 0.2em;
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

const QuickLinkGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: -0.75rem;
  margin-right: -1.75rem;
  a {
    flex: 0 0 33.3333333333%;
    max-width: 33%;
    padding: 0.75rem;
  }
`;

const QuickLink = styled.figure`
  background-color: ${colors.lightWash};
  box-shadow: 0 0 25px rgba(5, 5, 38, 0.1);
  padding: 5%;
  .title {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${colors.black};
    margin-bottom: 1em;
  }
  .coverImg {
    background: red;
    max-width: 100%;
  }
`;

const Main = styled.section`
  padding-top: 3rem;
  background: ${colors.lightWash};
  color: ${colors.black};
`;

const CenteredTextBlock = styled.div`
  font-size: 3rem;
  font-weight: 200;
  max-width: 720px;
  padding-top: 3rem;
  padding-bottom: 6rem;
  margin-left: auto;
  margin-right: auto;
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

const PostGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const PostLink = styled.div`
  max-width: 720px;
  margin-bottom: 1rem;
  a {
    > div {
      border-top: 1px solid ${colors.gray1};
      padding: 1rem;

      h3 {
        color: ${colors.gray2};
        font-size: 1.8rem;
        font-weight: 400;
      }
    }

    &:hover {
      > div {
        h3 {
          color: ${colors.gray3};
        }
      }
    }
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #ccc;
  font-size: 1.3rem;
`;

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
            meta {
              updatedAt
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
  } = data.page;

  const { edges } = data.posts;

  return (
    <>
      <SEO meta={seoMetaTags} />
      <ScaleUp>
        <Container>
          <Section>
            <SectionInfo>O nás</SectionInfo>
            <SectionContent>
              <p>{description}</p>
              <Link className="cta" to="/about">
                Viac info
              </Link>
            </SectionContent>
          </Section>
          <SectionSeparator />
          <Section>
            {/* <SectionInfo>Najdôležitejšie informácie</SectionInfo> */}
            <SectionContent>
              <QuickLinkGrid>
                <Link to="/historia">
                  <QuickLink>
                    <div className="title">{quickLink1Title}</div>
                    <Img fluid={quickLink1Cover.fluid} />
                  </QuickLink>
                </Link>

                <Link to="/historia">
                  <QuickLink>
                    <div className="title">{quickLink2Title}</div>
                    <Img fluid={quickLink2Cover.fluid} />
                  </QuickLink>
                </Link>

                <Link to="/historia">
                  <QuickLink>
                    <div className="title">{quickLink3Title}</div>
                    <Img fluid={quickLink3Cover.fluid} />
                  </QuickLink>
                </Link>
              </QuickLinkGrid>
            </SectionContent>
          </Section>
        </Container>
      </ScaleUp>
      <Main>
        <Container>
          <CenteredTextBlock>{description}</CenteredTextBlock>
          <SectionSeparator />
        </Container>
      </Main>
      <Newsfeed>
        <Container>
          <CenteredTextBlock>
            <NewsfeedTitle>Najnovšie príspevky</NewsfeedTitle>
            <PostGrid>
              {map(edges, post => (
                <PostLink key={post.node.slug}>
                  <Link to={`/blog/${post.node.slug}/`}>
                    {/* <img></img> */}
                    <div>
                      <h3>{post.node.title}</h3>
                      <PostInfo>
                        <time>
                          <Moment format="DD.MM.YYYY">
                            {post.node.meta.updatedAt}
                          </Moment>
                        </time>
                        <div>
                          {post.node.contentNode.childMarkdownRemark.timeToRead}{' '}
                          min read
                        </div>
                      </PostInfo>
                    </div>
                  </Link>
                </PostLink>
              ))}
            </PostGrid>
          </CenteredTextBlock>
        </Container>
      </Newsfeed>
    </>
  );
};

export default IndexPage;
