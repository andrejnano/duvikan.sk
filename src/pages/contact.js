import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import GoogleMapReact from 'google-map-react';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from '../containers/Container';
import {
  SectionWrapper,
  Cover,
  SidePanel,
  MainPanel,
} from '../components/common/LayoutParts';

import { colors } from '../consts/style';

const MapFrame = styled.iframe`
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  background-color: ${colors.white};
  border-radius: 3px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
  li {
    font-size: 2rem;
    padding-bottom: 1rem;
    a {
      .icon {
        margin-right: 1rem;
      }
      .linkText {
        font-weight: 400;
      }
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

const ContactCategory = styled.h2`
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

const ContactGrid = styled.ul`
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

const ContactCard = styled.li`
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

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query contactQuery {
      datoCmsContactPage {
        title
        intro
        email
        phoneNumber
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        location {
          latitude
          longitude
        }
      }
    }
  `);

  const {
    title,
    intro,
    email,
    phoneNumber,
    seoMetaTags,
    location,
  } = data.datoCmsContactPage;

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  return (
    <>
      <SEO meta={seoMetaTags} />
      <Container>
        <Cover>
          <MapFrame
            title="googlemaps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.009930354252!2d17.171393316373194!3d48.148613779224334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c88cc5a3ed855%3A0x106639c04174ad78!2sStrukov%C3%A1+2617%2F13%2C+821+05+Bratislava!5e0!3m2!1ssk!2ssk!4v1565188970902!5m2!1ssk!2ssk"
            width="1470"
            height="500"
            frameBorder="0"
            allowFullScreen
          ></MapFrame>
        </Cover>
        <SectionWrapper>
          <SidePanel>
            <Title>Kontakt</Title>
          </SidePanel>
          <MainPanel>
            <ContactCategory>Klub</ContactCategory>
            <ContactGrid>
              <ContactCard>
                <div className="innerBox">
                  <h3>Adresa</h3>
                  <p>Struková 13, 821 05 Bratislava</p>
                  <span className="linkText">Nájsť na mape</span>
                </div>
              </ContactCard>

              <ContactCard>
                <div className="innerBox">
                  <h3>
                    <FontAwesomeIcon
                      className="icon"
                      icon={['fab', 'facebook-square']}
                    />{' '}
                    Facebook
                  </h3>
                  <p>facebook.com/duvikanBratislava</p>
                  <span className="linkText">Otvoriť stránku</span>
                </div>
              </ContactCard>

              <ContactCard>
                <div className="innerBox">
                  <h3>
                    <FontAwesomeIcon
                      className="icon"
                      icon={['far', 'envelope']}
                    />{' '}
                    E-mail
                  </h3>
                  <p>{email}</p>
                  <span className="linkText">Napísať správu</span>
                </div>
              </ContactCard>
            </ContactGrid>

            <SectionSeparator />

            <ContactCategory>Vedenie klubu</ContactCategory>
            <ContactGrid>
              <ContactCard>
                <div className="innerBox">
                  <h3>Daniel Baran</h3>
                  <p>prezident klubu</p>
                  <span className="linkText">0903 919 943</span>
                </div>
              </ContactCard>
            </ContactGrid>

            <SectionSeparator />

            <ContactCategory>Platby</ContactCategory>
            <ContactGrid>
              <ContactCard>
                <div className="innerBox">
                  <h3>IBAN</h3>
                  <p>SK1211000000002635766523</p>
                </div>
              </ContactCard>
            </ContactGrid>
          </MainPanel>
        </SectionWrapper>
      </Container>
    </>
  );
};

export default ContactPage;
