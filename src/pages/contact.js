import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from 'gatsby';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cover, GridLayout } from '../components/common/LayoutParts';
import { colors, colorScheme, boxShadow } from '../consts/style';

const MapFrame = styled.iframe`
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  background-color: ${colors.white};
  border-radius: 3px;
  max-height: 40vh;
`;

const Title = styled.h1`
  grid-column: 2/-2;
  font-size: 3rem;
  font-weight: bold;
  margin: 4rem 0rem;
  padding: 0;
`;

const ContactCategory = styled.h2`
  grid-column: 2/-2;
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0rem;
  padding: 0;
`;

const ContactGrid = styled.ul`
  grid-column: 2/-2;
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
    border: 1px solid #e6ecf1;
    box-shadow: ${boxShadow};
    background-color: ${colors.white};
    transition: border 250ms ease;

    h3 {
      font-size: 1.6rem;
      position: relative;

      svg {
        margin-right: 1rem;
      }
    }

    p {
      color: ${colors.gray3};
      font-size: 1.4rem;
      padding-bottom: 1rem;
      cursor: text;
    }

    .link {
      position: relative;
      color: ${colorScheme.main};
      font-weight: bold;
      font-size: 1.4rem;

      &:hover {
        color: ${colorScheme.secondary};
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
      <Cover>
        <MapFrame
          title="googlemaps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.009930354252!2d17.171393316373194!3d48.148613779224334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c88cc5a3ed855%3A0x106639c04174ad78!2sStrukov%C3%A1+2617%2F13%2C+821+05+Bratislava!5e0!3m2!1ssk!2ssk!4v1565188970902!5m2!1ssk!2ssk"
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
        ></MapFrame>
      </Cover>
      <GridLayout>
        <Title>{title}</Title>
        <ContactCategory>Klub</ContactCategory>
        <ContactGrid>
          <ContactCard>
            <div className="innerBox">
              <h3>Adresa</h3>
              <p>Struková 13, 821 05 Bratislava</p>
              <Link to="/contact" className="link">
                Nájsť na mape
              </Link>
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
              <a
                href="https://www.facebook.com/duvikanBratislava"
                className="link"
              >
                Otvoriť stránku
              </a>
            </div>
          </ContactCard>

          <ContactCard>
            <div className="innerBox">
              <h3>
                <FontAwesomeIcon className="icon" icon={['far', 'envelope']} />{' '}
                E-mail
              </h3>
              <p>{email}</p>
              <a href={`mailto:${email}`} className="link">
                Napísať správu
              </a>
            </div>
          </ContactCard>
        </ContactGrid>

        <ContactCategory>Vedenie klubu</ContactCategory>
        <ContactGrid>
          <ContactCard>
            <div className="innerBox">
              <h3>Daniel Baran</h3>
              <p>{phoneNumber}</p>
            </div>
          </ContactCard>
        </ContactGrid>

        <ContactCategory>Platby</ContactCategory>
        <ContactGrid>
          <ContactCard>
            <div className="innerBox">
              <h3>IBAN</h3>
              <p>SK1211000000002635766523</p>
              <h3>Trénujúci do 17 rokov</h3>
              <p>30€/mesačne</p>
              <h3>Trénujúci nad 18 rokov</h3>
              <p>35€/mesačne</p>
              <h3>Špecifikácia platby</h3>
              <ul>
                <li>Platbu je potrebné uskutočniť vždy mesiac vopred</li>
                <li>
                  Do poznámky sa píše <strong>meno cvičiaceho</strong> a{' '}
                  <strong>mesiac</strong>, za ktorý sa uhrádza.
                </li>
              </ul>
            </div>
          </ContactCard>
        </ContactGrid>
      </GridLayout>
    </>
  );
};

export default ContactPage;
