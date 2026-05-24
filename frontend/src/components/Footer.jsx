import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--white)',
    padding: '60px 0 20px',
    marginTop: '60px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  };

  const headingStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: 'var(--white)',
  };

  const linkListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const linkStyle = {
    color: '#bbbbbb',
    transition: 'var(--transition)',
    fontSize: '0.95rem',
  };

  const socialStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '20px',
  };

  const socialIconStyle = {
    color: 'var(--white)',
    fontSize: '1.5rem',
    transition: 'var(--transition)',
  };

  const bottomStyle = {
    borderTop: '1px solid #444',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#bbbbbb',
    fontSize: '0.9rem',
  };

  return (
    <footer style={footerStyle}>
      <style>
        {`
          .footer-link:hover {
            color: var(--primary-color) !important;
            padding-left: 5px;
          }
          .social-icon:hover {
            color: var(--primary-color) !important;
            transform: translateY(-3px);
          }
        `}
      </style>
      <div className="container">
        <div style={gridStyle}>
          <div>
            <h2 style={{ ...headingStyle, fontSize: '1.8rem', color: 'var(--primary-color)' }}>FoodieHub</h2>
            <p style={{ color: '#bbbbbb', lineHeight: '1.6', marginTop: '16px' }}>
              Delivering happiness to your doorsteps. The best food from top restaurants.
            </p>
            <div style={socialStyle}>
              <a href="#" className="social-icon" style={socialIconStyle}><FaFacebook /></a>
              <a href="#" className="social-icon" style={socialIconStyle}><FaTwitter /></a>
              <a href="#" className="social-icon" style={socialIconStyle}><FaInstagram /></a>
              <a href="#" className="social-icon" style={socialIconStyle}><FaLinkedin /></a>
            </div>
          </div>
          
          <div>
            <h3 style={headingStyle}>Company</h3>
            <div style={linkListStyle}>
              <a href="#" className="footer-link" style={linkStyle}>About Us</a>
              <a href="#" className="footer-link" style={linkStyle}>Careers</a>
              <a href="#" className="footer-link" style={linkStyle}>Team</a>
              <a href="#" className="footer-link" style={linkStyle}>FoodieHub Blog</a>
            </div>
          </div>

          <div>
            <h3 style={headingStyle}>Contact</h3>
            <div style={linkListStyle}>
              <a href="#" className="footer-link" style={linkStyle}>Help & Support</a>
              <a href="#" className="footer-link" style={linkStyle}>Partner with us</a>
              <a href="#" className="footer-link" style={linkStyle}>Ride with us</a>
            </div>
          </div>

          <div>
            <h3 style={headingStyle}>Legal</h3>
            <div style={linkListStyle}>
              <a href="#" className="footer-link" style={linkStyle}>Terms & Conditions</a>
              <a href="#" className="footer-link" style={linkStyle}>Refund & Cancellation</a>
              <a href="#" className="footer-link" style={linkStyle}>Privacy Policy</a>
              <a href="#" className="footer-link" style={linkStyle}>Cookie Policy</a>
            </div>
          </div>
        </div>
        
        <div style={bottomStyle}>
          &copy; {new Date().getFullYear()} FoodieHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
