/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { chunk, sum } from 'lodash';
import Img from 'gatsby-image';

const GalleryGrid = styled.div`
  a:hover {
    .galleryImage {
      /* transform: scale(1.025); */
      opacity: 0.8;
    }
  }

  .galleryImage {
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    transition-duration: 0.3s;
    transition-property: transform, opacity;
    display: inline-block;
    vertical-align: middle;
    margin: 0rem;
    position: relative;
    box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
    border: 2px solid #e5e8ed;
    border-radius: 3px;
  }
`;

const Gallery = ({ images, itemsPerRow }) => {
  // split images into groups of the given size
  const rows = chunk(images, itemsPerRow);
  return (
    <GalleryGrid>
      {rows.map(row => {
        // sum aspect ratios of images in the given row
        const rowAspectRatioSum = sum(
          row.map(image => image.fluid.aspectRatio)
        );

        return row.map(image => (
          <a
            key={image.fluid.src}
            href={image.fluid.src}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img
              fluid={image.fluid}
              style={{
                width: `calc(${(image.fluid.aspectRatio / rowAspectRatioSum) *
                  100}%)`,
              }}
              className="galleryImage"
            />
          </a>
        ));
      })}
    </GalleryGrid>
  );
};

export default Gallery;
