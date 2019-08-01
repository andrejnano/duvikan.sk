import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import GoogleMapReact from 'google-map-react';
import SEO from '../components/SEO';

import { ScaleUp } from '../style/motion';

import Container from '../containers/Container';

const Wrapper = styled.div`
  background: transparent;
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
    <ScaleUp>
      <SEO meta={seoMetaTags} />
      <Wrapper>
        <Container>
          <h1>{title}</h1>
          <p>{intro}</p>
          <ul>
            <li>Email: {email}</li>
            <li>Tel č.: {phoneNumber}</li>
          </ul>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GMAPS_KEY }}
            defaultCenter={center}
            defaultZoom={14}
          ></GoogleMapReact>
        </Container>
      </Wrapper>
    </ScaleUp>
  );
};

export default ContactPage;
