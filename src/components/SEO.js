import React from 'react';
import PropTypes from 'prop-types';
import { HelmetDatoCms } from 'gatsby-source-datocms';

// todo: add dynamic lang attr setup
const SEO = ({ meta }) => {
  return (
    <HelmetDatoCms seo={meta}>
      <html lang="sk" />
    </HelmetDatoCms>
  );
};

SEO.propTypes = {
  meta: PropTypes.object.isRequired,
};

export default SEO;
