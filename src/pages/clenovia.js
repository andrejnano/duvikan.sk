import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/SEO';
import { map } from 'lodash';
import { ScaleUp } from '../style/motion';
import Container from '../containers/Container';
import { colors, colorScheme, boxShadow } from '../consts/style';
import Img from 'gatsby-image';
import { GridLayout } from '../components/common/LayoutParts';

const Title = styled.h1`
  grid-column: 2/-2;
  font-size: 3rem;
  font-weight: bold;
  margin: 4rem 0rem 2rem;
  padding: 0;
`;

const Description = styled.div`
  grid-column: 2/-2;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #e5e8ed;
  box-shadow: ${boxShadow};
  padding: 3rem;
  margin-bottom: 2rem;

  p {
    font-size: 2rem;
    font-weight: 400;
  }

  a {
    color: ${colors.mediumBlue};
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MemberCategory = styled.h2`
  grid-column: 2/-2;
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0rem;
  padding: 0;
`;

const MemberGrid = styled.ul`
  grid-column: 2/-2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 4rem;
`;

const MemberCard = styled.li`
  position: relative;
  min-width: 250px;
  width: 100%;
  margin-bottom: 2rem;

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
    height: 100%;
    display: block;
    position: relative;
    margin: 0rem 1rem 1rem;
    padding: 2rem;
    border: 1px solid #e6ecf1;
    box-shadow: ${boxShadow};
    background-color: ${colors.white};
    transition: border 250ms ease;
    border-radius: 3px;
    display: block;

    .photo {
      margin-bottom: 1rem;
      border: 1px solid #e6ecf1;
      box-shadow: ${boxShadow};
    }

    h3 {
      color: ${colorScheme.main};
      font-size: 1.6rem;
      position: relative;
      margin: 0;
    }

    .description {
      color: ${colorScheme.secondary};
      font-size: 1.4rem;
      font-weight: bold;
      opacity: 0.75;
    }

    .bio {
      color: ${colorScheme.accent};
      font-size: 1.2rem;
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
          bio
          profilePhoto {
            fluid(maxWidth: 200) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
        members2 {
          name
          description
          bio
          profilePhoto {
            fluid(maxWidth: 200) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
        members3 {
          name
          description
          bio
        }
        members4 {
          name
          bio
        }
        members5 {
          name
          bio
        }
      }
    }
  `);

  const {
    seoMetaTags,
    description,
    members1,
    members2,
    members3,
    members4,
    members5,
  } = data.page;
  return (
    <>
      <SEO meta={seoMetaTags} />
      <GridLayout>
        <Title>Členovia klubu</Title>
        <Description>{description}</Description>
        <MemberCategory>Čestný prezident KK Duvikan</MemberCategory>
        <MemberGrid>
          {map(members1, member => (
            <MemberCard key={member.name}>
              <div className="innerBox">
                <Img className="photo" fluid={member.profilePhoto.fluid} />
                <h3>{member.name}</h3>
                <p className="description">{member.description}</p>
                <div
                  className="bio"
                  dangerouslySetInnerHTML={{
                    __html: member.bio,
                  }}
                />
              </div>
            </MemberCard>
          ))}
        </MemberGrid>

        <MemberCategory>Vedenie klubu</MemberCategory>
        <MemberGrid>
          {map(members2, member => (
            <MemberCard key={member.name}>
              <div className="innerBox">
                <Img className="photo" fluid={member.profilePhoto.fluid} />
                <h3>{member.name}</h3>
                <p className="description">{member.description}</p>
                <div
                  className="bio"
                  dangerouslySetInnerHTML={{
                    __html: member.bio,
                  }}
                />
              </div>
            </MemberCard>
          ))}
        </MemberGrid>

        <MemberCategory>Trénerská rada klubu</MemberCategory>
        <MemberGrid>
          {map(members3, member => (
            <MemberCard key={member.name}>
              <div className="innerBox">
                <h3>{member.name}</h3>
                <p className="description">{member.description}</p>
                <div
                  className="bio"
                  dangerouslySetInnerHTML={{
                    __html: member.bio,
                  }}
                />
              </div>
            </MemberCard>
          ))}
        </MemberGrid>

        <MemberCategory>Ostatní členovia klubu</MemberCategory>
        <MemberGrid>
          {map(members4, member => (
            <MemberCard key={member.name}>
              <div className="innerBox">
                <h3>{member.name}</h3>
                <p className="description">{member.description}</p>
                <div
                  className="bio"
                  dangerouslySetInnerHTML={{
                    __html: member.bio,
                  }}
                />
              </div>
            </MemberCard>
          ))}
        </MemberGrid>

        <MemberCategory>Čestní členovia klubu</MemberCategory>
        <MemberGrid>
          {map(members5, member => (
            <MemberCard key={member.name}>
              <div className="innerBox">
                <h3>{member.name}</h3>
                <p className="description">{member.description}</p>
                <div
                  className="bio"
                  dangerouslySetInnerHTML={{
                    __html: member.bio,
                  }}
                />
              </div>
            </MemberCard>
          ))}
        </MemberGrid>
      </GridLayout>
    </>
  );
};

export default ClenoviaPage;
