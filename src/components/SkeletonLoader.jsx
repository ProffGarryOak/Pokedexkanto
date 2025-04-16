import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header"></div>
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-name"></div>
        <div className="skeleton-types">
          <div className="skeleton-type"></div>
          <div className="skeleton-type"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;