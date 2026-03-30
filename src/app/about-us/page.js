// app/about-us/page.js
export const metadata = {
  title: "About Us | Calculatoz.com",
  description: "Learn about Calculatoz.com — your free, fast, and comprehensive online calculator hub for finance, health, math, and more.",
};

export default function AboutUs() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px", fontFamily: "Arial, sans-serif", color: "#222" }}>
      <h1 style={{ color: "#1a3c6e", fontSize: "2rem", marginBottom: "8px" }}>About Us</h1>
      <hr style={{ borderColor: "#d0d8e8", marginBottom: "32px" }} />

      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        <strong>Calculatoz.com</strong> is a free online calculator platform built for everyone — students, professionals,
        homeowners, fitness enthusiasts, and anyone who needs quick, accurate calculations. Our sole focus is to provide
        fast, comprehensive, and convenient calculators across a wide range of areas including finance, health, math, and more.
      </p>

      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We currently offer <strong>40+ free online calculators</strong> and are continuously developing more. Our goal is
        to become the one-stop destination for people who need to make quick, reliable calculations — without any registration,
        subscription, or hidden fees.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>Our Mission</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We believe the internet should be a source of free, accurate, and accessible information. That's why every tool
        on Calculatoz.com is <strong>completely free</strong> — no login required, no paywalls, no ads interrupting your work.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>How We Build Our Calculators</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Each calculator on Calculatoz.com is individually coded and put through strict, comprehensive testing before being
        published. We use well-established mathematical formulas and industry-standard methodologies to ensure accuracy.
        If you ever notice an error, please contact us — your feedback is extremely valuable to us.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>Global Reach</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Most of our calculators are designed to be universally applicable for worldwide usage. However, some tools —
        such as the Income Tax Calculator — are tailored for specific countries. We are always working to expand our
        coverage and add more region-specific tools.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>Contact Us</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Have a question, suggestion, or found a bug? We'd love to hear from you. Reach out at:{" "}
        <a href="mailto:contact@calculatoz.com" style={{ color: "#2563eb" }}>contact@calculatoz.com</a>
      </p>

    
    </div>
  );
}