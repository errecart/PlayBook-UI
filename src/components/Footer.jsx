import React from "react";
import Link from "next/link";
import "./css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_links">
        <Link href="/PlayBook">Library</Link>
        <span className="footer_sep">·</span>
        <Link href="/#faq">FAQ</Link>
        <span className="footer_sep">·</span>
        <Link href="/#about">About</Link>
        <span className="footer_sep">·</span>
        <a href="https://github.com/errecart" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="footer_sep">·</span>
        <a href="https://www.linkedin.com/in/juan-ignacio-errecart" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <i className="footer_text">© 2026 PlayBook UI. All rights reserved.</i>
    </footer>
  );
};

export default Footer;
