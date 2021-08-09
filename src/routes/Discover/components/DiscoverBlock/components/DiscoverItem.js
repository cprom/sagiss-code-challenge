import React from 'react';
import '../styles/_discover-item.scss';


export default function DiscoverItem({ images, name, link }) {
  return (
    <div className="discover-item animate__animated animate__fadeIn">
      <a href={`${link}`}><div
        className="discover-item__art"
        style={{ backgroundImage: `url(${images})` }}
      /></a>
      <p className="discover-item__title">{name}</p>
    </div>
  );
}
