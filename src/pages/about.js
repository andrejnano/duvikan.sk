import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import SEO from '../components/SEO';
import Gallery from '../components/Gallery';
import Img from 'gatsby-image';
import { ScaleUp } from '../style/motion';
import { colors, boxShadow, colorScheme } from '../consts/style';

import {
  SectionSeparator,
  Cover,
  GridLayout,
} from '../components/common/LayoutParts';

const Title = styled.h1`
  grid-column: 2/-2;
  font-size: 3rem;
  margin-bottom: 3rem;
  font-weight: bold;
`;

const IntroHeadline = styled.section`
  grid-column: 2/-2;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 3rem;
  flex: 100%;
`;

const IntroContent = styled.section`
  grid-column: 2/-2;
  color: rgba(0, 0, 0, 0.84);
  background: #fff;
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: ${boxShadow};
  padding: 3rem;

  p {
    font-size: 16px;
    letter-spacing: -0.011em;
    line-height: 22px;
    margin-bottom: 35.596px;
  }

  ul {
    margin-bottom: 35.596px;

    li {
      margin-bottom: 17.798px;
    }
  }
`;

const GalleryWrap = styled.div`
  grid-column: 2/-2;
  margin-bottom: 3rem;
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

  const coverFluidImageStack = [
    cover.fluid,
    'radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.75) 90%)',
  ].reverse();

  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Cover>
        <BackgroundImage
          fluid={coverFluidImageStack}
          style={{
            // Defaults are overwrite-able by setting one or each of the following:
            backgroundSize: 'cover',
            backgroundPosition: '50% 20%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Cover>
      <GridLayout>
        <IntroHeadline>{title}</IntroHeadline>
        <IntroContent
          dangerouslySetInnerHTML={{
            __html: intro,
          }}
        />
      </GridLayout>
      <SectionSeparator />
      <GridLayout>
        <Title>Galéria</Title>
        <GalleryWrap>
          <Gallery itemsPerRow={3} images={imageGallery} />
        </GalleryWrap>
      </GridLayout>
    </ScaleUp>
  );
};

export default AboutPage;
