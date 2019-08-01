import React from 'react';
import styled from 'styled-components';

const GalleryWrapper = styled.div`
  background: red;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0.4rem;
`;

const Gallery = () => {
  return <GalleryWrapper>Gallery is going to be here</GalleryWrapper>;
};

export default Gallery;
