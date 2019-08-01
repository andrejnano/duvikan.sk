import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerBlock = styled.div`
  max-width: 1470px;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 720px) {
    width: 93.3333333333%;
  }
`;

const Container = ({ children }) => {
  return <ContainerBlock>{children}</ContainerBlock>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
