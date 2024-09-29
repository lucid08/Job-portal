import React from 'react';

const Footer = () => {
  // Define inline styles
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center'
  };

  const footerContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const footerLinksStyle = {
    listStyle: 'none',
    padding: '0'
  };

  const footerLinkItemStyle = {
    display: 'inline',
    margin: '0 10px'
  };

  const footerLinkStyle = {
    color: '#fff',
    textDecoration: 'none'
  };

  const footerLinkHoverStyle = {
    textDecoration: 'underline'
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <ul style={footerLinksStyle}>
          <li style={footerLinkItemStyle}><a href="/about" style={footerLinkStyle} onMouseOver={e => e.target.style.textDecoration = footerLinkHoverStyle.textDecoration} onMouseOut={e => e.target.style.textDecoration = footerLinkStyle.textDecoration}>About Us</a></li>
          <li style={footerLinkItemStyle}><a href="/services" style={footerLinkStyle} onMouseOver={e => e.target.style.textDecoration = footerLinkHoverStyle.textDecoration} onMouseOut={e => e.target.style.textDecoration = footerLinkStyle.textDecoration}>Services</a></li>
          <li style={footerLinkItemStyle}><a href="/contact" style={footerLinkStyle} onMouseOver={e => e.target.style.textDecoration = footerLinkHoverStyle.textDecoration} onMouseOut={e => e.target.style.textDecoration = footerLinkStyle.textDecoration}>Contact</a></li>
          <li style={footerLinkItemStyle}><a href="/privacy" style={footerLinkStyle} onMouseOver={e => e.target.style.textDecoration = footerLinkHoverStyle.textDecoration} onMouseOut={e => e.target.style.textDecoration = footerLinkStyle.textDecoration}>Privacy Policy</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
