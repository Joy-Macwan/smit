import React from "react";
import "../styles/aboutus.css";
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import logo from '../assets/SonGoku.png';

const About = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="about-wrapper">
        <div className="about-container">
          <h1>About Us</h1>

          <p>
            Welcome to our <strong>Billing System</strong> — a thoughtfully crafted software solution built to simplify and modernize how retail businesses manage sales, stock, and customer data.
          </p>

          <p>
            Headquartered in <strong>Anand</strong>, we bring together intuitive design with powerful functionality. Our platform is especially popular with clothing and garment retailers due to its ease of use, lightning-fast performance, and reliable operation.
          </p>

          <p>
            <strong>Design Philosophy:</strong><br />
            We believe that great software should feel effortless. That’s why our system features a clean, clutter-free interface designed around real user workflows — not just pretty screens. Every screen, button, and interaction is created to reduce friction and enhance speed.
          </p>

          <p>
            <strong>User Experience (UX):</strong><br />
            Our billing system uses large, legible fonts, smart layout spacing, and soft color palettes to reduce eye strain during long usage. Even non-technical staff can use the system confidently within minutes.
          </p>

          <p>
            <strong>Responsive Interface:</strong><br />
            Designed with modern businesses in mind, the interface adapts to different screen sizes — from desktops to tablets.
          </p>

          <p>
            <strong>Why Choose Us:</strong><br />
            We continuously listen to our customers and evolve the product. Our commitment to quality, simplicity, and performance makes us a preferred partner for growing retail businesses.
          </p>

          <p>
            Thank you for trusting us. We look forward to supporting your journey with technology that empowers, not overwhelms.
          </p>

          <div className="call-to-action">
            <h2>Ready to Experience It Yourself?</h2>
            <p>Discover how our intuitive billing system can transform your business operations today.</p>
            <button>Get Started</button>
          </div>

          <div className="team-section">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <img src={logo} alt="Chirag Chandratre" />
                <h4>Chirag Chandratre</h4>
                <span>Lead Developer</span>
              </div>
              <div className="team-member">
                <img src={logo} alt="Nikul Panchal" />
                <h4>Nikul Panchal</h4>
                <span>-</span>
              </div>
              <div className="team-member">
                <img src={logo} alt="Smitkumar Bhoi" />
                <h4>Smitkumar Bhoi</h4>
                <span>UI/UX Designer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
