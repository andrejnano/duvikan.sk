import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

import {
  SectionWrapper,
  Cover,
  SidePanel,
  MainPanel,
} from '../components/common/LayoutParts';

import Container from '../containers/Container';
import { colors } from '../consts/style';

const IntroHeadline = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;

const FirstParagraph = styled.div`
  flex: 70%;
  > div {
    padding-right: 2rem;
    p {
      max-width: 720px;
      text-align: justify;
      font-size: 2rem;
      font-weight: 400;
      color: ${colors.gray4};
      letter-spacing: -0.004em;
      line-height: 1.58;
    }
  }
`;

const FirstImage = styled.section`
  flex: 30%;
`;

const MainContent = styled.section`
  flex: 100%;

  ul {
    li {
      padding: 2rem 0;
      margin: 0;
      list-style-type: none;
      position: relative;

      &::before {
        content: ' ';
        height: 100%;
        width: 3px;
        background-color: currentColor;
        position: absolute;
        left: -2rem;
        top: 0;
        opacity: 0.5;
        border-top-right-radius: 1px;
        border-bottom-right-radius: 1px;
      }
      &::after {
        content: ' ';
        height: 10px;
        width: 10px;
        background-color: currentColor;
        position: absolute;
        left: -2.3rem;
        top: 50%;
        transform: translateY(-50%);
        opacity: 1;
        border-radius: 50%;
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const HistoriaPage = () => {
  const data = useStaticQuery(graphql`
    query HistoriaQuery {
      datoCmsHistoriaPage {
        title
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introHeadline
        firstParagraph
        firstImage {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
        content
      }
    }
  `);

  const {
    title,
    introHeadline,
    firstParagraph,
    firstImage,
    content,
    seoMetaTags,
  } = data.datoCmsHistoriaPage;
  return (
    <>
      <SEO meta={seoMetaTags} />
      <Container>
        <SectionWrapper>
          <SidePanel>
            <Title>{title}</Title>
          </SidePanel>
          <MainPanel>
            <IntroHeadline>{introHeadline}</IntroHeadline>
            <Row>
              <FirstParagraph>
                <div
                  dangerouslySetInnerHTML={{
                    __html: firstParagraph,
                  }}
                />
              </FirstParagraph>
              <FirstImage>
                <Img fluid={firstImage.fluid} />
              </FirstImage>
            </Row>
            <MainContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </MainContent>
          </MainPanel>
        </SectionWrapper>
      </Container>
    </>
  );
};

export default HistoriaPage;
