"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function ConcreteCalculator() {
  const [shape, setShape]   = useState("slab");
  const [length, setLength] = useState(10);
  const [width, setWidth]   = useState(10);
  const [depth, setDepth]   = useState(4);
  const [diameter, setDiam] = useState(6);
  const [unit, setUnit]     = useState("ft");
  const [result, setResult] = useState(null);

  const calculate = () => {
    let vol = 0;
    const l = parseFloat(length) || 0;
    const w = parseFloat(width)  || 0;
    const d = parseFloat(depth)  || 0;
    const di= parseFloat(diameter) || 0;

    if (shape === "slab")     vol = l * w * (d / 12);
    if (shape === "footing")  vol = l * w * (d / 12);
    if (shape === "column")   vol = Math.PI * Math.pow(di / 2 / 12, 2) * l;
    if (shape === "tube")     vol = Math.PI * Math.pow(di / 2 / 12, 2) * (d / 12);

    if (unit === "m") vol = vol * 0.0283168;
    const bags60  = Math.ceil(vol * 45);
    const bags80  = Math.ceil(vol * 34);
    const costEst = (bags60 * 5.5).toFixed(2);

    setResult({
      cubicYards: vol.toFixed(2),
      cubicFeet: (vol * 27).toFixed(2),
      bags60, bags80, costEst,
    });
  };

  useEffect(() => { calculate(); }, []);
  const clear = () => { setLength(10); setWidth(10); setDepth(4); setDiam(6); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb"><Link href="/">home</Link> / <Link href="/">other</Link> / concrete calculator</div>
      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Concrete Calculator</h1>
          <div className="mc-infobar"><span className="mc-arrow">▼</span>Modify the values and click the Calculate button to use</div>
          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row"><label>Shape</label>
                <div className="mc-input-wrap">
                  <select value={shape} onChange={(e) => setShape(e.target.value)}>
                    <option value="slab">Slab / Square</option>
                    <option value="footing">Footing</option>
                    <option value="column">Column (Round)</option>
                    <option value="tube">Tube</option>
                  </select>
                </div>
              </div>

              {(shape === "slab" || shape === "footing") && (
                <>
                  <div className="mc-row"><label>Length</label><div className="mc-input-wrap"><input type="number" value={length} onChange={(e) => setLength(e.target.value)} style={{width:"80px"}} /><span className="mc-suffix">ft</span></div></div>
                  <div className="mc-row"><label>Width</label><div className="mc-input-wrap"><input type="number" value={width} onChange={(e) => setWidth(e.target.value)} style={{width:"80px"}} /><span className="mc-suffix">ft</span></div></div>
                  <div className="mc-row"><label>Depth / Thickness</label><div className="mc-input-wrap"><input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} style={{width:"80px"}} /><span className="mc-suffix">in</span></div></div>
                </>
              )}

              {shape === "column" && (
                <>
                  <div className="mc-row"><label>Height</label><div className="mc-input-wrap"><input type="number" value={length} onChange={(e) => setLength(e.target.value)} style={{width:"80px"}} /><span className="mc-suffix">ft</span></div></div>
                  <div className="mc-row"><label>Diameter</label><div className="mc-input-wrap"><input type="number" value={diameter} onChange={(e) => setDiam(e.target.value)} style={{width:"80px"}} /><span className="mc-suffix">in</span></div></div>
                </>
              )}

              {shape === "tube" && (
                <>
                  <div className="mc-row"><label>Diameter</label><div className="mc-input-wrap"><input type="number" value={diameter} onChange={(e) => setDiam(e.target.value)} style={{width:"80px"}} /><span className="mc-suffix">in</span></div></div>
                  <div className="mc-row"><label>Depth</label><div className="mc-input-wrap"><input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} style={{width:"80px"}} /><span className="mc-suffix">in</span></div></div>
                </>
              )}

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay"><span>Cubic Yards:</span><strong>{result.cubicYards} yd³</strong></div>
                <table className="mc-table">
                  <thead><tr><th></th><th>Value</th></tr></thead>
                  <tbody>
                    <tr className="mc-bold"><td>Volume (Cubic Yards)</td><td>{result.cubicYards} yd³</td></tr>
                    <tr><td>Volume (Cubic Feet)</td><td>{result.cubicFeet} ft³</td></tr>
                    <tr><td>60 lb Bags Needed</td><td>{result.bags60} bags</td></tr>
                    <tr><td>80 lb Bags Needed</td><td>{result.bags80} bags</td></tr>
                    <tr className="mc-bold mc-total"><td>Estimated Cost (60lb bags)</td><td>${result.costEst}</td></tr>
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