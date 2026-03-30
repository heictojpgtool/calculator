"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function TriangleCalculator() {
  const [a, setA]       = useState(3);
  const [b, setB]       = useState(4);
  const [c, setC]       = useState(5);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  const deg = (r) => (r * 180) / Math.PI;

  const calculate = () => {
    const sa = parseFloat(a) || 0;
    const sb = parseFloat(b) || 0;
    const sc = parseFloat(c) || 0;

    if (sa + sb <= sc || sa + sc <= sb || sb + sc <= sa) {
      setResult({ error: "Invalid triangle — sum of any two sides must exceed the third." });
      return;
    }

    const A = deg(Math.acos((sb * sb + sc * sc - sa * sa) / (2 * sb * sc)));
    const B = deg(Math.acos((sa * sa + sc * sc - sb * sb) / (2 * sa * sc)));
    const C = 180 - A - B;
    const s = (sa + sb + sc) / 2;
    const area = Math.sqrt(s * (s - sa) * (s - sb) * (s - sc));
    const perimeter = sa + sb + sc;

    let type = "Scalene";
    if (sa === sb && sb === sc) type = "Equilateral";
    else if (sa === sb || sb === sc || sa === sc) type = "Isosceles";

    let angle = "Acute";
    if (A === 90 || B === 90 || C === 90) angle = "Right";
    else if (A > 90 || B > 90 || C > 90) angle = "Obtuse";

    setResult({
      A: A.toFixed(2), B: B.toFixed(2), C: C.toFixed(2),
      area: area.toFixed(4), perimeter: perimeter.toFixed(4),
      type, angle, sa, sb, sc,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || result.error || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pad = 20;
    const w   = canvas.width - pad * 2;
    const h   = canvas.height - pad * 2;

    const A  = (parseFloat(result.A) * Math.PI) / 180;
    const sc = parseFloat(result.sc);
    const sa = parseFloat(result.sa);

    const scale = w / sc;
    const x1 = pad, y1 = pad + h;
    const x2 = pad + sc * scale, y2 = pad + h;
    const x3 = pad + sa * Math.cos(A) * scale;
    const y3 = pad + h - sa * Math.sin(A) * scale;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle   = "rgba(74,144,217,0.15)";
    ctx.strokeStyle = "#4a90d9";
    ctx.lineWidth   = 2;
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#333";
    ctx.font      = "11px Arial";
    ctx.fillText("a=" + result.sa, (x2 + x3) / 2 + 4, (y2 + y3) / 2);
    ctx.fillText("b=" + result.sb, (x1 + x3) / 2 - 24, (y1 + y3) / 2);
    ctx.fillText("c=" + result.sc, (x1 + x2) / 2 - 8, y1 + 14);
  }, [result]);

  const clear = () => { setA(3); setB(4); setC(5); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">math</Link> / triangle calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Triangle Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Side a</label>
                <div className="mc-input-wrap">
                  <input type="number" value={a} onChange={(e) => setA(e.target.value)} style={{ width: "100px" }} />
                </div>
              </div>
              <div className="mc-row">
                <label>Side b</label>
                <div className="mc-input-wrap">
                  <input type="number" value={b} onChange={(e) => setB(e.target.value)} style={{ width: "100px" }} />
                </div>
              </div>
              <div className="mc-row">
                <label>Side c</label>
                <div className="mc-input-wrap">
                  <input type="number" value={c} onChange={(e) => setC(e.target.value)} style={{ width: "100px" }} />
                </div>
              </div>

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                {result.error ? (
                  <div style={{ color: "#e05c5c", padding: "12px", border: "1px solid #e05c5c" }}>{result.error}</div>
                ) : (
                  <>
                    <div className="mc-monthly-pay">
                      <span>Area:</span>
                      <strong>{result.area}</strong>
                    </div>

                    <table className="mc-table">
                      <thead>
                        <tr><th></th><th>Value</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Angle A</td><td>{result.A}°</td></tr>
                        <tr><td>Angle B</td><td>{result.B}°</td></tr>
                        <tr><td>Angle C</td><td>{result.C}°</td></tr>
                        <tr><td>Area</td><td>{result.area}</td></tr>
                        <tr className="mc-bold mc-total"><td>Perimeter</td><td>{result.perimeter}</td></tr>
                      </tbody>
                    </table>

                    <div className="mc-chart-wrap">
                      <canvas ref={canvasRef} width="180" height="140"></canvas>
                      <div className="mc-legend">
                        <div><strong>Type:</strong> {result.type}</div>
                        <div><strong>Angle:</strong> {result.angle}</div>
                        <div style={{ marginTop: "6px" }}>A={result.A}° B={result.B}° C={result.C}°</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mc-sidebar">
          <div className="mc-search">
            <input type="text" placeholder="" />
            <button>Search</button>
          </div>
          <div className="mc-sidebar-box">
            <div className="mc-sidebar-title">Math Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/scientific-calculator">Scientific</a><a href="/fraction-calculator">Fraction</a></div>
              <div><a href="/percentage-calculator">Percentage</a><a href="/random-number-generator">Random Number</a></div>
              <div><a href="/triangle-calculator">Triangle</a><a href="/standard-deviation-calculator">Std Deviation</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}