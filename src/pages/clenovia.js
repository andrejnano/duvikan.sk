import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import { map } from 'lodash';
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

const MemberCategory = styled.h2`
  font-weight: 500;
  margin-bottom: 2rem;
`;

const SectionSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${colors.black};
  opacity: 0.075;
  border: 0;
  margin: 0;
  margin-bottom: 3rem;
  overflow: visible;
`;

const MemberGrid = styled.ul`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 3rem;
`;

const MemberCard = styled.li`
  position: relative;
  min-width: 250px;
  width: 100%;

  @media (min-width: 720px) {
    max-width: 720px;
    width: 50%;
  }

  @media (min-width: 950px) {
    width: 33.333333%;
  }

  @media (min-width: 1470px) {
    width: 25%;
  }

  .innerBox {
    display: block;
    position: relative;
    margin: 0 1rem 1rem;
    padding: 2rem;
    color: ${colors.black};
    background: ${colors.white};
    border-radius: 3px;
    display: block;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
    border: 1px solid #e5e8ed;
    cursor: pointer;

    h3 {
      font-size: 1.6rem;
      position: relative;

      &::before {
        content: ' ';
        height: 1.6em;
        width: 3px;
        background-color: currentColor;
        position: absolute;
        left: -2rem;
        opacity: 0.5;
        border-top-right-radius: 1px;
        border-bottom-right-radius: 1px;
      }
    }

    p {
      color: ${colors.gray3};
      font-size: 1.4rem;
      padding-bottom: 3rem;
    }

    .linkText {
      position: absolute;
      display: inline-block;
      bottom: 2rem;
      left: 2rem;
      color: ${colors.mediumBlue};
      font-weight: bold;
      font-size: 1.4rem;
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
      .linkText {
        &:after {
          opacity: 1;
        }
      }
    }
  }
`;

const ClenoviaPage = () => {
  const data = useStaticQuery(graphql`
    query clenoviaQuery {
      page: datoCmsClenoviaPage {
        description
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        members1 {
          name
          description
        }
        members2 {
          name
          description
        }
      }
    }
  `);

  const { seoMetaTags, description, members1, members2 } = data.page;
  return (
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Container>
        <SectionWrapper>
          <SidePanel>
            <Title>Členovia klubu</Title>
            <p>{description}</p>
          </SidePanel>
          <MainPanel>
            <MemberCategory>Čestný prezident KK Duvikan</MemberCategory>
            <MemberGrid>
              {map(members1, member => (
                <MemberCard>
                  <div className="innerBox">
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                    <span className="linkText">Zobraziť profil</span>
                  </div>
                </MemberCard>
              ))}
            </MemberGrid>

            <SectionSeparator />

            <MemberCategory>Vedenie klubu</MemberCategory>
            <MemberGrid>
              {map(members2, member => (
                <MemberCard>
                  <div className="innerBox">
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                    <span className="linkText">Zobraziť profil</span>
                  </div>
                </MemberCard>
              ))}
            </MemberGrid>

            <SectionSeparator />

            <MemberCategory>Trénerská rada klubu</MemberCategory>
            <MemberGrid>
              {map(members2, member => (
                <MemberCard>
                  <div className="innerBox">
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                    <span className="linkText">Zobraziť profil</span>
                  </div>
                </MemberCard>
              ))}
            </MemberGrid>
          </MainPanel>
        </SectionWrapper>
      </Container>
    </ScaleUp>
  );
};

export default ClenoviaPage;
