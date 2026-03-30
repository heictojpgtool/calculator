// app/terms-of-use/page.js
export const metadata = {
  title: "Terms of Use | Calculatoz.com",
  description: "Review the Terms of Use for Calculatoz.com — the rules and guidelines for using our free online calculators.",
};

export default function TermsOfUse() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px", fontFamily: "Arial, sans-serif", color: "#222" }}>
      <h1 style={{ color: "#1a3c6e", fontSize: "2rem", marginBottom: "8px" }}>Terms of Use</h1>
      <p style={{ color: "#888", fontSize: "13px", marginBottom: "8px" }}>Last updated: March 30, 2026</p>
      <hr style={{ borderColor: "#d0d8e8", marginBottom: "32px" }} />

      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        By accessing and using <strong>Calculatoz.com</strong>, you agree to be bound by the following Terms of Use.
        Please read them carefully. If you do not agree with any part of these terms, please do not use our website.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>1. General Use</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Calculatoz.com provides free online calculators for informational and educational purposes only. The tools
        and results provided are intended to serve as a general guide and should not be used as a substitute for
        professional financial, medical, legal, or other expert advice.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>2. Accuracy of Information</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        While we strive to ensure that all calculators on Calculatoz.com are accurate and up to date, we make no
        warranties or representations about the accuracy, completeness, or reliability of any results. Users should
        independently verify any calculations before making important decisions.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>3. No Professional Advice</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        The calculators and content on this website are for general informational purposes only. Nothing on
        Calculatoz.com constitutes financial, medical, legal, or professional advice. Always consult a qualified
        professional before making decisions based on calculator results.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>4. Intellectual Property</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        All content on Calculatoz.com — including but not limited to text, graphics, code, and calculator designs —
        is the intellectual property of Calculatoz.com and is protected under applicable copyright laws. You may not
        reproduce, distribute, or modify any content without prior written permission.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>5. Limitation of Liability</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Calculatoz.com shall not be liable for any direct, indirect, incidental, or consequential damages arising from
        the use or inability to use this website or its calculators. Use of this website is at your own risk.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>6. Third-Party Links</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        Our website may contain links to third-party websites. These links are provided for your convenience only.
        Calculatoz.com has no control over the content of those sites and accepts no responsibility for them or for
        any loss or damage that may arise from your use of them.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>7. Changes to Terms</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        We reserve the right to modify these Terms of Use at any time. Your continued use of the website after any
        changes constitutes your acceptance of the new terms. We encourage you to review this page periodically.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>8. Governing Law</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        These Terms of Use shall be governed by and construed in accordance with applicable international laws.
        Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the relevant courts.
      </p>

      <h2 style={{ color: "#1a3c6e", fontSize: "1.3rem", marginTop: "36px", marginBottom: "12px" }}>9. Contact</h2>
      <p style={{ lineHeight: "1.8", fontSize: "15px", marginBottom: "20px" }}>
        If you have any questions about these Terms of Use, please contact us at:{" "}
        <a href="mailto:contact@calculatoz.com" style={{ color: "#2563eb" }}>contact@calculatoz.com</a>
      </p>

      
    </div>
  );
}