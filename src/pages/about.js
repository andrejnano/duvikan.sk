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

const TitleWrap = styled.div`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/-2;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3rem 0 1rem;
`;

const Title = styled.h1`
  font-size: 40px;
  letter-spacing: -0.022em;
  line-height: 56px;
  padding: 0;
  margin: 0;
  width: 63rem;
  max-width: 90vw;
`;

const PostCover = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* height: 50vh; */
  margin: 3rem 0 3rem;
  > div {
    width: 63rem;
    max-width: 100vw;
    box-shadow: ${boxShadow};
  }
`;

const ContentWrap = styled.section`
  grid-column: 2/-2;
  @media (min-width: 950px) {
    grid-column: 2/-2;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Content = styled.article`

  color: ${colorScheme.main};
  /* background: ${colors.white}; */
  /* border-radius: 3px; */
  /* border: 1px solid #e5e8ed; */
  /* box-shadow: ${boxShadow}; */

  /* to keep character count aroun 2.31*alphabet or  50 - 90 chars per line*/
  width: 63rem;
  max-width: 90vw;


  p {
    color: rgba(0, 0, 0, 1);

    font-size: 20px;
    letter-spacing: -0.017em;
    line-height: 28px;

    margin-bottom: 35.596px;
    white-space: pre-line;
    text-align: justify;
    hyphens: auto;

    /* to keep character count aroun 2.31*alphabet or  50 - 90 chars per line*/
    width: 63rem;
    max-width: 90vw;
  }

  ul {
    margin-bottom: 37px;
    list-style-type: none;

    li {
      margin-bottom: 1rem;
    }
  }

  a {
    color: ${colorScheme.secondary};
    font-weight: 400;
    &:hover {
      /* text-decoration: underline; */
      opacity: 0.75;
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
          fluid(maxWidth: 2000) {
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

  const coverFluidImageStack = [cover.fluid].reverse();

  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <GridLayout>
        <TitleWrap>
          <Title>{title}</Title>
        </TitleWrap>
      </GridLayout>
      <PostCover>
        <Img
          fluid={coverFluidImageStack}
          style={{
            // Defaults are overwrite-able by setting one or each of the following:
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </PostCover>
      <GridLayout>
        <ContentWrap>
          <Content
            dangerouslySetInnerHTML={{
              __html: intro,
            }}
          />
        </ContentWrap>
      </GridLayout>
      <GridLayout>
        <TitleWrap>
          <Title>Galéria</Title>
        </TitleWrap>
        <GalleryWrap>
          <Gallery itemsPerRow={3} images={imageGallery} />
        </GalleryWrap>
      </GridLayout>
    </ScaleUp>
  );
};

export default AboutPage;
