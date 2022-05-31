import React from 'react';
import ReactSVG from 'react-inlinesvg';

const SVG = (props) => {
  return (
    <ReactSVG
      preProcessor={(code) =>
        code.replace(/fill=".*?"/g, 'fill="currentColor"')
      }
      {...props}
    />
  );
};

export default SVG;
