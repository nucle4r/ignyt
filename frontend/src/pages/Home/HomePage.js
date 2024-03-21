// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import classes from './homePage.module.css';



export default function HomePage() {
    const slideImages = [
        {
          url: 'https://res.cloudinary.com/captionizr/image/upload/v1710921350/wczvrsoqmit9p2kv8yrw.png',
          caption: 'Welcome to IGNYT!'
        },
        {
          url: 'https://res.cloudinary.com/captionizr/image/upload/v1710923276/xfa0ixuu6cept97ylvfp.png',
          caption: 'Experience Fine Dining'
        },
        {
          url: 'https://res.cloudinary.com/captionizr/image/upload/v1710923422/snejyy0jg2umsclzhuj9.png',
          caption: 'Delicious Food & Drinks Await'
        },
      ];
      const navigate = useNavigate();
  return (
    <div>
      <div className="slide-container">
        <Slide duration={3000} transitionDuration={500} easing="ease">
          {slideImages.map((slideImage, index) => (
            <div key={index} className={classes.hero}>
              <div className={classes.overlay}></div>
              <div className={classes.content}>
                <h1 className={classes.title}>{slideImage.caption}</h1>
                <div className={classes.buttons}>
                  <button className={classes.button}>Book a Table</button>
                  <button className={classes.button} onClick={()=> navigate('/menu')}>Our Menu</button>
                </div>
              </div>
              <img className={classes.slideImage} src={slideImage.url} alt={slideImage.caption} />
            </div>
          ))}
        </Slide>
      </div>
      <div id="about" className={classes.aboutSection}>
        <h2>About Us</h2>
        <div className={classes.aboutContent}>
          <div className={classes.aboutItem}>
            <h3>Location</h3>
            <p>123 Restaurant St, City, Country</p>
          </div>
          <div className={classes.aboutItem}>
            <h3>Contact</h3>
            <p>Phone: +123456789</p>
            <p>Email: info@example.com</p>
          </div>
          <div className={classes.aboutItem}>
            <h3>Opening Hours</h3>
            <p>Monday - Friday: 10am - 10pm</p>
            <p>Saturday - Sunday: 12pm - 12am</p>
          </div>
        </div>
      </div>
    </div>
  );
}
