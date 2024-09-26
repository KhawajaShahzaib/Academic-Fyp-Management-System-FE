import React from 'react';
import './HeaderMe.css';

const Announcements = () => {
  return (
    <section className="centered-content announcements">
      <h1>Announcements</h1>
      <div className="announcement">
        <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto Lorem Ipsum es simp texto de relleno de las imprentas y archivos de texto.</p>
        <div className="button-container">
          <button className='right'>Set Deadline</button>
          <button className='right'>Post...</button>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
