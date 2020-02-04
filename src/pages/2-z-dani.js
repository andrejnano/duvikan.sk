import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/SEO';
import { ScaleUp } from '../style/motion';
import { colors, boxShadow, colorScheme } from '../consts/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GridLayout } from '../components/common/LayoutParts';

const Title = styled.h1`
  margin: 3rem 0rem 2rem;
  grid-column: 2/-2;
  font-size: 3rem;
  font-weight: bold;
`;

const SideTitle = styled.h2`
  font-size: 1.8rem;
`;

const Content = styled.section`
  grid-column: 2/-2;
  /* @media (min-width: 950px) {
    grid-column: 2/4;
    margin-right: 3rem;
  } */
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
`;

const Intro = styled.div`
  margin-bottom: 2rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 1rem 0rem 3rem 1rem;
  padding: 0;

  li {
    margin: 0;
    padding: 0;

    a {
      .icon {
        color: ${colorScheme.secondary};
      }
      font-weight: 400;

      &:hover {
        color: ${colorScheme.secondary};
      }

      /* &:hover {
        opacity: 0.6;
      } */
    }
  }
`;

const PercentaPage = () => {
  const data = useStaticQuery(graphql`
    query percentaQuery {
      datoCmsPercentaPage {
        title
        body
        potvrdenieDokument {
          url
          title
        }
        vyhlasenieDokument {
          url
          title
        }
      }
    }
  `);

  const {
    title,
    body,
    potvrdenieDokument,
    vyhlasenieDokument,
  } = data.datoCmsPercentaPage;

  return (
    <ScaleUp>
      <GridLayout>
        <Title>{title}</Title>
        <Content>
          <Intro
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
          <SideTitle>Tlačivá pre darovanie 2%</SideTitle>
          <List>
            <li>
              <a
                href={potvrdenieDokument.url}
                title={'Otvoriť PDF dokument: ' + potvrdenieDokument.title}
              >
                <FontAwesomeIcon className="icon" icon={['far', 'file-pdf']} />{' '}
                {potvrdenieDokument.title}
              </a>
            </li>
            <li>
              <a
                href={vyhlasenieDokument.url}
                title={'Otvoriť PDF dokument: ' + vyhlasenieDokument.title}
              >
                <FontAwesomeIcon className="icon" icon={['far', 'file-pdf']} />{' '}
                {vyhlasenieDokument.title}
              </a>
            </li>
          </List>
          <SideTitle>Údaje</SideTitle>
          <List>
            <li>Karate klub Duvikan Bratislava, občianske združenie</li>
            <li>Lietavská 13</li>
            <li>851 06 Bratislava</li>
            <li><strong>IČO</strong>: 31820719</li>
            <li><strong>DIČ</strong>: 2022615870</li>
            <li><strong>Číslo účtu</strong>: SK1211000000002625766523</li>
          </List>
        </Content>
      </GridLayout>
    </ScaleUp>
  );
};

export default PercentaPage;
