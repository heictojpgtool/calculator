"use client";

import './footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">

      {/* Description paragraphs */}
      <div className="footer-desc">
        <p>
          Calculatoz.com's sole focus is to provide fast, comprehensive, convenient, free online
          calculators in a plethora of areas. Currently, we have around 200 calculators to help
          you "do the math" quickly in areas such as finance, fitness, health, math, and others,
          and we are still developing more. Our goal is to become the one-stop, go-to site for
          people who need to make quick calculations. Additionally, we believe the internet should
          be a source of free information. Therefore, all of our tools and services are completely
          free, with no registration required.
        </p>
        <p>
          We coded and developed each calculator individually and put each one through strict,
          comprehensive testing. However, please inform us if you notice even the slightest error
          – your input is extremely valuable to us. While most calculators on Calculatoz.com are
          designed to be universally applicable for worldwide usage, some are for specific
          countries only. For example, the <em>Income Tax Calculator</em> is for United States
          residents only.
        </p>
      </div>

      {/* Bottom links + copyright */}
      <div className="footer-links">
        <a href="/about-us">about us</a>
        <span>|</span>
        <a href="/sitemap">sitemap</a>
        <span>|</span>
        <a href="/terms-of-use">terms of use</a>
        <span>|</span>
        <a href="/privacy-policy">privacy policy</a>
        &nbsp;&nbsp;© 2008 - {year} <a href="https://www.calculatoz.com">calculatoz.com</a>
      </div>

    </footer>
  );
}