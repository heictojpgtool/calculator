// app/privacy-policy/page.js
export const metadata = {
  title: "Privacy Policy | Calculatoz.com",
  description: "Read the Privacy Policy of Calculatoz.com to understand how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px", fontFamily: "Arial, sans-serif", color: "#222" }}>
      <h1 style={{ color: "#1a3c6e", fontSize: "2rem", marginBottom: "8px" }}>Privacy Policy</h1>
      <p style={{ color: "#888", fontSize: "13px", marginBottom: "8px" }}>Last updated: March 30, 2026</p>
      <hr style={{ borderColor: "#d0d8e8", marginBottom: "32px" }} />

      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Welcome to <strong>Calculatoz.com</strong>. Your privacy is important to us. This Privacy Policy explains what
        information we collect when you use our website, how we use it, and your rights regarding that information.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>1. Information We Collect</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "12px" }}>
        Calculatoz.com does not require users to register or log in. We do not collect personally identifiable information
        (such as name, email, or address) unless you voluntarily contact us.
      </p>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We may automatically collect non-personal information through standard server logs and analytics tools, including:
      </p>
      <ul style={{ lineHeight: "2", fontSize: "15px", paddingLeft: "24px", marginBottom: "20px" }}>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Pages visited and time spent</li>
        <li>Referring URLs</li>
        <li>IP address (anonymized)</li>
      </ul>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>2. How We Use Your Information</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        The non-personal information we collect is used solely to:
      </p>
      <ul style={{ lineHeight: "2", fontSize: "15px", paddingLeft: "24px", marginBottom: "20px" }}>
        <li>Improve website performance and user experience</li>
        <li>Analyze traffic patterns</li>
        <li>Fix bugs and technical issues</li>
        <li>Understand which calculators are most useful to our visitors</li>
      </ul>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We do <strong>not</strong> sell, trade, or rent your information to any third parties.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>3. Cookies</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Our website may use cookies to enhance your browsing experience. Cookies are small text files stored on your
        device. You can choose to disable cookies through your browser settings; however, some features of the website
        may not function properly as a result.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>4. Third-Party Services</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We may use third-party services such as Google Analytics to help us understand site usage. These services have
        their own privacy policies. We encourage you to review them. We do not share any personally identifiable
        information with these services.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>5. Children's Privacy</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Calculatoz.com does not knowingly collect any personal information from children under the age of 13. Our site
        is designed for general audiences and does not target children specifically.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>6. Data Security</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We take reasonable measures to protect the information we collect from unauthorized access, disclosure, or
        destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>7. Changes to This Policy</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We reserve the right to update this Privacy Policy at any time. Changes will be reflected by updating the
        "Last updated" date at the top of this page. We encourage you to review this page periodically.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>8. Contact Us</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
        <a href="mailto:contact@calculatoz.com" style={{ color: "#2563eb" }}>contact@calculatoz.com</a>
      </p>

      
    </div>
  );
}