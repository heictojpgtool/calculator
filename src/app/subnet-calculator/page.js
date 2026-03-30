"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function SubnetCalculator() {
  const [ip, setIp]       = useState("192.168.1.0");
  const [prefix, setPrefix] = useState(24);
  const [result, setResult] = useState(null);

  const ipToInt = (addr) => addr.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0;
  const intToIp = (n) => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".");

  const calculate = () => {
    const pref  = parseInt(prefix) || 24;
    const mask  = pref === 0 ? 0 : (0xffffffff << (32 - pref)) >>> 0;
    const ipInt = ipToInt(ip);
    const net   = (ipInt & mask) >>> 0;
    const bcast = (net | ~mask) >>> 0;
    const hosts = pref < 31 ? Math.pow(2, 32 - pref) - 2 : pref === 31 ? 2 : 1;
    const first = pref < 31 ? intToIp(net + 1) : intToIp(net);
    const last  = pref < 31 ? intToIp(bcast - 1) : intToIp(bcast);

    setResult({
      network:   intToIp(net),
      broadcast: intToIp(bcast),
      mask:      intToIp(mask),
      first, last,
      hosts: hosts.toLocaleString(),
      wildcard: intToIp(~mask >>> 0),
      ipClass: ip.split(".")[0] < 128 ? "A" : ip.split(".")[0] < 192 ? "B" : "C",
    });
  };

  useEffect(() => { calculate(); }, []);
  const clear = () => { setIp("192.168.1.0"); setPrefix(24); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb"><Link href="/">home</Link> / <Link href="/">other</Link> / subnet calculator</div>
      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Subnet Calculator</h1>
          <div className="mc-infobar"><span className="mc-arrow">▼</span>Enter an IP address and prefix length to calculate subnet details</div>
          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row"><label>IP Address</label>
                <div className="mc-input-wrap">
                  <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} style={{ width: "140px" }} placeholder="192.168.1.0" />
                </div>
              </div>
              <div className="mc-row"><label>Prefix Length</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">/</span>
                  <input type="number" value={prefix} onChange={(e) => setPrefix(e.target.value)} style={{ width: "60px" }} min="0" max="32" />
                </div>
              </div>
              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay"><span>Network:</span><strong>{result.network}/{prefix}</strong></div>
                <table className="mc-table">
                  <thead><tr><th></th><th>Value</th></tr></thead>
                  <tbody>
                    <tr><td>Network Address</td><td style={{fontFamily:"monospace"}}>{result.network}</td></tr>
                    <tr><td>Subnet Mask</td><td style={{fontFamily:"monospace"}}>{result.mask}</td></tr>
                    <tr><td>Wildcard Mask</td><td style={{fontFamily:"monospace"}}>{result.wildcard}</td></tr>
                    <tr><td>Broadcast</td><td style={{fontFamily:"monospace"}}>{result.broadcast}</td></tr>
                    <tr><td>First Usable IP</td><td style={{fontFamily:"monospace"}}>{result.first}</td></tr>
                    <tr><td>Last Usable IP</td><td style={{fontFamily:"monospace"}}>{result.last}</td></tr>
                    <tr className="mc-bold mc-total"><td>Usable Hosts</td><td>{result.hosts}</td></tr>
                    <tr><td>IP Class</td><td>Class {result.ipClass}</td></tr>
                  </tbody>
                </table>
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