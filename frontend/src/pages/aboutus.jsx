import React from "react";
// Using shared marketing/motion styles; page-specific CSS removed
import Sidebar from '../components/sidebar';
import logo from '../assets/SonGoku.png';

const About = () => {
  return (
    <>
  <Sidebar />
      <div className="section">
        <div className="card scale-in" style={{maxWidth:'900px', margin:'0 auto'}}>
          <h1 className="reveal-fade in" style={{textAlign:'center'}}>About Us</h1>

          <p className="reveal-up in">
            Welcome to our <strong>Billing System</strong> — a thoughtfully crafted software solution built to simplify and modernize how retail businesses manage sales, stock, and customer data.
          </p>

          <p className="reveal-up in">
            Headquartered in <strong>Anand</strong>, we bring together intuitive design with powerful functionality. Our platform is especially popular with clothing and garment retailers due to its ease of use, lightning-fast performance, and reliable operation.
          </p>

          <p className="reveal-up in">
            <strong>Design Philosophy:</strong><br />
            We believe that great software should feel effortless. That’s why our system features a clean, clutter-free interface designed around real user workflows — not just pretty screens. Every screen, button, and interaction is created to reduce friction and enhance speed.
          </p>

          <p className="reveal-up in">
            <strong>User Experience (UX):</strong><br />
            Our billing system uses large, legible fonts, smart layout spacing, and soft color palettes to reduce eye strain during long usage. Even non-technical staff can use the system confidently within minutes.
          </p>

          <p className="reveal-up in">
            <strong>Responsive Interface:</strong><br />
            Designed with modern businesses in mind, the interface adapts to different screen sizes — from desktops to tablets.
          </p>

          <p className="reveal-up in">
            <strong>Why Choose Us:</strong><br />
            We continuously listen to our customers and evolve the product. Our commitment to quality, simplicity, and performance makes us a preferred partner for growing retail businesses.
          </p>

          <p className="reveal-up in">
            Thank you for trusting us. We look forward to supporting your journey with technology that empowers, not overwhelms.
          </p>

          <div className="cta-panel lift" style={{marginTop:'24px'}}>
            <div>
              <div className="title">Ready to Experience It Yourself?</div>
              <div className="desc">Discover how our intuitive billing system can transform your business operations today.</div>
            </div>
            <button className="btn cta">Get Started</button>
          </div>

          <div className="section">
            <h2>Meet Our Team</h2>
            <div className="metric-grid">
              <div className="card lift reveal-up in" style={{textAlign:'center'}}>
                <img src={logo} alt="Chirag Chandratre" />
                <h4>Chirag Chandratre</h4>
                <span>Lead Developer</span>
              </div>
              <div className="card lift reveal-up in" style={{textAlign:'center'}}>
                <img src={logo} alt="Nikul Panchal" />
                <h4>Nikul Panchal</h4>
                <span>-</span>
              </div>
              <div className="card lift reveal-up in" style={{textAlign:'center'}}>
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
