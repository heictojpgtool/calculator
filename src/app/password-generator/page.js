"use client";
import { useState } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function PasswordGenerator() {
  const [length, setLength]   = useState(16);
  const [upper, setUpper]     = useState(true);
  const [lower, setLower]     = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [count, setCount]     = useState(5);
  const [result, setResult]   = useState([]);
  const [copied, setCopied]   = useState("");

  const generate = () => {
    let chars = "";
    if (upper)   chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower)   chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars)  return;

    const passwords = [];
    for (let p = 0; p < (parseInt(count) || 1); p++) {
      let pwd = "";
      for (let i = 0; i < (parseInt(length) || 16); i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      passwords.push(pwd);
    }
    setResult(passwords);
  };

  const copy = (pwd) => {
    navigator.clipboard.writeText(pwd);
    setCopied(pwd);
    setTimeout(() => setCopied(""), 2000);
  };

  const strength = () => {
    let s = 0;
    if (upper)   s++;
    if (lower)   s++;
    if (numbers) s++;
    if (symbols) s++;
    const l = parseInt(length) || 0;
    if (l >= 12) s++;
    if (l >= 20) s++;
    if (s <= 2) return { label: "Weak", color: "#e05c5c" };
    if (s <= 4) return { label: "Medium", color: "#f0ad4e" };
    return { label: "Strong", color: "#4a7c3f" };
  };

  const s = strength();

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb"><Link href="/">home</Link> / <Link href="/">other</Link> / password generator</div>
      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Password Generator</h1>
          <div className="mc-infobar"><span className="mc-arrow">▼</span>Configure options and click Generate</div>
          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row"><label>Length</label>
                <div className="mc-input-wrap">
                  <input type="number" value={length} onChange={(e) => setLength(e.target.value)} style={{ width: "80px" }} min="4" max="128" />
                  <span className="mc-suffix">characters</span>
                </div>
              </div>
              <div className="mc-row"><label>How Many</label>
                <div className="mc-input-wrap">
                  <input type="number" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: "80px" }} min="1" max="20" />
                </div>
              </div>

              <div className="mc-checkbox-row"><input type="checkbox" id="upper" checked={upper} onChange={(e) => setUpper(e.target.checked)} /><label htmlFor="upper">Uppercase (A–Z)</label></div>
              <div className="mc-checkbox-row"><input type="checkbox" id="lower" checked={lower} onChange={(e) => setLower(e.target.checked)} /><label htmlFor="lower">Lowercase (a–z)</label></div>
              <div className="mc-checkbox-row"><input type="checkbox" id="nums" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /><label htmlFor="nums">Numbers (0–9)</label></div>
              <div className="mc-checkbox-row"><input type="checkbox" id="syms" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /><label htmlFor="syms">Symbols (!@#$...)</label></div>

              <div style={{ margin: "10px 0 6px 10px", fontSize: "13px" }}>
                Strength: <strong style={{ color: s.color }}>{s.label}</strong>
              </div>

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={generate}>Generate ▶</button>
              </div>
            </div>

            {result.length > 0 && (
              <div className="mc-results">
                <div className="mc-monthly-pay"><span>Generated Passwords</span><strong>{result.length}</strong></div>
                {result.map((pwd, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", padding: "6px 10px", background: "#f5f5f5", border: "1px solid #ddd" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "13px", flex: 1, wordBreak: "break-all" }}>{pwd}</span>
                    <button onClick={() => copy(pwd)} style={{ background: copied === pwd ? "#4a7c3f" : "#1e3f6e", color: "#fff", border: "none", padding: "4px 10px", cursor: "pointer", fontSize: "12px", borderRadius: "2px", whiteSpace: "nowrap" }}>
                      {copied === pwd ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mc-sidebar">
          <div className="mc-search"><input type="text" placeholder="" /><button>Search</button></div>
          <div className="mc-sidebar-box">
            <div className="mc-sidebar-title">Other Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/age-calculator">Age</a><a href="/date-calculator">Date</a></div>
              <div><a href="/time-calculator">Time</a><a href="/hours-calculator">Hours</a></div>
              <div><a href="/gpa-calculator">GPA</a><a href="/grade-calculator">Grade</a></div>
              <div><a href="/concrete-calculator">Concrete</a><a href="/subnet-calculator">Subnet</a></div>
              <div><a href="/password-generator">Password</a><a href="/conversion-calculator">Conversion</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}