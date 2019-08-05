/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { colors } from '../consts/style';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';

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
  padding-top: 3rem;
  background: ${colors.lightWash};
  color: ${colors.black};
`;

const CenteredTextBlock = styled.div`
  font-size: 3rem;
  font-weight: 200;
  padding-top: 3rem;
  padding-bottom: 6rem;
  margin-left: 150px;
  margin-right: auto;
  .subtitle {
    font-size: 2rem;
  }
  .bodyContent {
    font-size: 2rem;
    margin-top: 3rem;
    text-align: left;
    max-width: 720px;
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

const QuickLinkGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const QuickLinkCard = styled.li`
  position: relative;
  min-width: 250px;
  width: 100%;
  @media (min-width: 720px) {
    max-width: 300px;
  }
  @media (min-width: 1040px) {
    width: 33.33333%;
  }

  a.card {
    display: block;
    position: relative;
    margin: 15px;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
    border-radius: 3px;
    background: ${colors.white};
    transition: box-shadow 0.25s linear, -webkit-box-shadow 0.25s linear;
    color: ${colors.black};
    overflow: hidden;
    height: 100%;

    &:first-child {
      margin-left: 0;
    }

    .photo {
      position: relative;
      max-width: 720px;
    }
    .title {
      font-size: 3rem;
      padding: 2rem;
    }
  }
`;

const QuickLink = props => {
  return (
    <QuickLinkCard>
      <Link className="card" to={props.url}>
        <Img className="photo" fluid={props.imgFluid} />
        <h3 className="title">{props.title}</h3>
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
            <SectionInfo>Najdôležitejšie<br/>informácie</SectionInfo>
            <SectionContent>
              <QuickLinkGrid>
                <QuickLink
                  url="/treningy"
                  title={quickLink1Title}
                  imgFluid={quickLink1Cover.fluid}
                />
                <QuickLink
                  url="/dojo"
                  title={quickLink2Title}
                  imgFluid={quickLink2Cover.fluid}
                />
                <QuickLink
                  url="/historia"
                  title={quickLink3Title}
                  imgFluid={quickLink3Cover.fluid}
                />
              </QuickLinkGrid>
            </SectionContent>
          </Section>
        </Container>
      </ScaleUp>
      <Main>
        <Container>
          <CenteredTextBlock>
            <h3>Duvi-kan</h3>
            <div className="subtitle">DUVI - okinawské meno šéftrénera MUDr. Divinca</div>
            <div className="subtitle">KAN - po japonsky škola</div>
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
            <PostGrid>
              {map(edges, post => (
                <PostLink key={post.node.slug}>
                  <Link to={`/blog/${post.node.slug}/`}>
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
    </HomePage>
  );
};

export default IndexPage;
