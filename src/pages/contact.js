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
            <h1>{title}</h1>
            <p>{intro}</p>
            <ContactList>
              <li>
                <a href="https://facebook.com/duvikanBratislava">
                  <FontAwesomeIcon
                    className="icon"
                    icon={['fab', 'facebook-square']}
                  />
                  <span className="linkText">
                    facebook.com/duvikanBratislava
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`}>
                  <FontAwesomeIcon
                    className="icon"
                    icon={['far', 'envelope']}
                  />
                  <span className="linkText">{email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${phoneNumber}`}>
                  <FontAwesomeIcon className="icon" icon={['far', 'phone']} />
                  <span className="linkText">{phoneNumber}</span>
                </a>
              </li>
            </ContactList>
          </MainPanel>
        </SectionWrapper>
      </Container>
    </>
  );
};

export default ContactPage;
