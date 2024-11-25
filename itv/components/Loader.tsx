import React from 'react';
import './loader.module.css';

export default function Loader() {
  return (
    <div className="skeleton-container">
      <header className="skeleton-header">
        <div className="skeleton-title">
          <div className="skeleton-circle skeleton-pulse" aria-hidden="true"></div>
          <div className="skeleton-rectangle skeleton-pulse" aria-hidden="true"></div>
        </div>
        <div className="skeleton-rectangle skeleton-filter skeleton-pulse" aria-hidden="true"></div>
      </header>
      <main className="skeleton-list">
        {[...Array(15)].map((_, index) => (
          <div key={index} className="skeleton-item">
            <div className="skeleton-rank skeleton-pulse" aria-hidden="true"></div>
            <div className="skeleton-team">
              <div className="skeleton-logo skeleton-pulse" aria-hidden="true"></div>
              <div className="skeleton-info">
                <div className="skeleton-text skeleton-pulse" aria-hidden="true"></div>
                <div className="skeleton-text skeleton-pulse" aria-hidden="true"></div>
              </div>
            </div>
            <div className="skeleton-stats">
              <div className="skeleton-stat skeleton-pulse" aria-hidden="true"></div>
              <div className="skeleton-stat skeleton-pulse" aria-hidden="true"></div>
              <div className="skeleton-stat skeleton-pulse" aria-hidden="true"></div>
            </div>
          </div>
        ))}
      </main>
      <footer className="skeleton-footer">
        <div className="skeleton-button skeleton-pulse" aria-hidden="true"></div>
      </footer>
    </div>
  );
}