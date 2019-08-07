import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import SEO from '../components/SEO';
import Gallery from '../components/Gallery';
import Img from 'gatsby-image';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import { colors } from '../consts/style';

import {
  SectionWrapper,
  Cover,
  SidePanel,
  MainPanel,
} from '../components/common/LayoutParts';

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const IntroHeadline = styled.section`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  flex: 100%;
`;

const IntroContent = styled.section`
  color: ${colors.black};
  background: ${colors.white};
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  padding: 2rem;
`;

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query aboutQuery {
      datoCmsAboutPage {
        title
        intro
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        cover {
          fluid(maxWidth: 1470) {
            ...GatsbyDatoCmsFluid
          }
        }
        imageGallery {
          fluid(maxWidth: 720) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  `);

  const {
    title,
    cover,
    intro,
    seoMetaTags,
    imageGallery,
  } = data.datoCmsAboutPage;

  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <Cover>
          <Img fluid={cover.fluid} />
        </Cover>
        <SectionWrapper>
          <SidePanel>
            <Title>O nás</Title>
          </SidePanel>
          <MainPanel>
            <IntroHeadline>{title}</IntroHeadline>
            <IntroContent
              dangerouslySetInnerHTML={{
                __html: intro,
              }}
            />
          </MainPanel>
        </SectionWrapper>
        <SectionWrapper>
          <SidePanel>
            <Title>Galéria</Title>
          </SidePanel>
          <MainPanel>
            <Gallery itemsPerRow={3} images={imageGallery} />
          </MainPanel>
        </SectionWrapper>
      </Container>
    </ScaleUp>
  );
};

export default AboutPage;
