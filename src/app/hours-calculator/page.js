"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function TimeCalculator() {
  const [mode, setMode]   = useState("add");
  const [h1, setH1]       = useState(2);
  const [m1, setM1]       = useState(30);
  const [s1, setS1]       = useState(0);
  const [h2, setH2]       = useState(1);
  const [m2, setM2]       = useState(45);
  const [s2, setS2]       = useState(0);
  const [result, setResult] = useState(null);

  const fmtTime = (totalSec) => {
    const h = Math.floor(Math.abs(totalSec) / 3600);
    const m = Math.floor((Math.abs(totalSec) % 3600) / 60);
    const s = Math.abs(totalSec) % 60;
    const sign = totalSec < 0 ? "-" : "";
    return `${sign}${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  };

  const calculate = () => {
    const t1 = (parseInt(h1)||0)*3600 + (parseInt(m1)||0)*60 + (parseInt(s1)||0);
    const t2 = (parseInt(h2)||0)*3600 + (parseInt(m2)||0)*60 + (parseInt(s2)||0);
    let res  = mode === "add" ? t1 + t2 : t1 - t2;
    setResult({ time: fmtTime(res), totalSec: Math.abs(res), totalMin: Math.floor(Math.abs(res)/60), totalHrs: (Math.abs(res)/3600).toFixed(4) });
  };

  useEffect(() => { calculate(); }, []);

  const clear = () => { setH1(2); setM1(30); setS1(0); setH2(1); setM2(45); setS2(0); setResult(null); };

  const timeInput = (h, setH, m, setM, s, setS) => (
    <div className="mc-input-wrap">
      <input type="number" value={h} onChange={(e)=>setH(e.target.value)} style={{width:"50px"}} /><span className="mc-suffix">h</span>
      <input type="number" value={m} onChange={(e)=>setM(e.target.value)} style={{width:"50px"}} /><span className="mc-suffix">m</span>
      <input type="number" value={s} onChange={(e)=>setS(e.target.value)} style={{width:"50px"}} /><span className="mc-suffix">s</span>
    </div>
  );

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb"><Link href="/">home</Link> / <Link href="/">other</Link> / time calculator</div>
      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Time Calculator</h1>
          <div className="mc-infobar"><span className="mc-arrow">▼</span>Modify the values and click the Calculate button to use</div>
          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row"><label>Operation</label>
                <div className="mc-input-wrap">
                  <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                    <option value="add">Add Times</option>
                    <option value="sub">Subtract Times</option>
                  </select>
                </div>
              </div>
              <div className="mc-row"><label>First Time</label>{timeInput(h1,setH1,m1,setM1,s1,setS1)}</div>
              <div className="mc-row"><label>Second Time</label>{timeInput(h2,setH2,m2,setM2,s2,setS2)}</div>
              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>
            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay"><span>Result:</span><strong>{result.time}</strong></div>
                <table className="mc-table">
                  <thead><tr><th></th><th>Value</th></tr></thead>
                  <tbody>
                    <tr className="mc-bold mc-total"><td>Result</td><td>{result.time}</td></tr>
                    <tr><td>Total Seconds</td><td>{result.totalSec}</td></tr>
                    <tr><td>Total Minutes</td><td>{result.totalMin}</td></tr>
                    <tr><td>Total Hours</td><td>{result.totalHrs}</td></tr>
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