import React from 'react';

const ImagePair: React.FC<{ imageA: string; imageB: string }> = ({ imageA, imageB }) => (
  <div className="d-flex">
    <img src={`${process.env.REACT_APP_API_URL}/images/${imageA}`} alt="A" className="img-fluid" style={{ maxWidth: '48%', marginRight: '4%' }} />
    <img src={`${process.env.REACT_APP_API_URL}/images/${imageB}`} alt="B" className="img-fluid" style={{ maxWidth: '48%' }} />
  </div>
);

export default ImagePair;