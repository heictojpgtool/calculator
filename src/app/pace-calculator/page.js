"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function PaceCalculator() {
  const [solveFor, setSolveFor]   = useState("pace");
  const [distVal, setDistVal]     = useState(5);
  const [distUnit, setDistUnit]   = useState("km");
  const [hours, setHours]         = useState(0);
  const [minutes, setMinutes]     = useState(25);
  const [seconds, setSeconds]     = useState(0);
  const [paceMin, setPaceMin]     = useState(5);
  const [paceSec, setPaceSec]     = useState(0);
  const [result, setResult]       = useState(null);
  const canvasRef = useRef(null);

  const fmtTime = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = Math.round(totalSec % 60);
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${m}:${String(s).padStart(2, "0")}`;
  };

  const calculate = () => {
    const dist      = parseFloat(distVal) || 0;
    const totalTime = (parseFloat(hours) || 0) * 3600 + (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
    const paceSecs  = (parseFloat(paceMin) || 0) * 60 + (parseFloat(paceSec) || 0);

    if (solveFor === "pace") {
      if (dist <= 0 || totalTime <= 0) return;
      const pace     = totalTime / dist;
      const speed    = distUnit === "km" ? (dist / totalTime) * 3600 : (dist / totalTime) * 3600;
      setResult({ label: "Pace", value: fmtTime(pace) + " /" + distUnit, speed: speed.toFixed(2) + " " + distUnit + "/h", totalTime: fmtTime(totalTime), dist });
    } else if (solveFor === "time") {
      if (dist <= 0 || paceSecs <= 0) return;
      const total = dist * paceSecs;
      setResult({ label: "Finish Time", value: fmtTime(total), pace: fmtTime(paceSecs) + " /" + distUnit, dist });
    } else {
      if (totalTime <= 0 || paceSecs <= 0) return;
      const d = totalTime / paceSecs;
      setResult({ label: "Distance", value: d.toFixed(2) + " " + distUnit, pace: fmtTime(paceSecs) + " /" + distUnit, totalTime: fmtTime(totalTime) });
    }
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#4a90d9";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.fillStyle = "#333";
    ctx.font      = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(result.label, cx, cy + 4);
  }, [result]);

  const clear = () => {
    setDistVal(5); setHours(0); setMinutes(25); setSeconds(0);
    setPaceMin(5); setPaceSec(0); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / pace calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Pace Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Solve For</label>
                <div className="mc-input-wrap">
                  <select value={solveFor} onChange={(e) => setSolveFor(e.target.value)}>
                    <option value="pace">Pace</option>
                    <option value="time">Finish Time</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>

              <div className="mc-row">
                <label>Distance Unit</label>
                <div className="mc-input-wrap">
                  <select value={distUnit} onChange={(e) => setDistUnit(e.target.value)}>
                    <option value="km">Kilometers</option>
                    <option value="mi">Miles</option>
                  </select>
                </div>
              </div>

              {solveFor !== "distance" && (
                <div className="mc-row">
                  <label>Distance</label>
                  <div className="mc-input-wrap">
                    <input type="number" value={distVal} onChange={(e) => setDistVal(e.target.value)} style={{ width: "80px" }} />
                    <span className="mc-suffix">{distUnit}</span>
                  </div>
                </div>
              )}

              {solveFor !== "time" && (
                <div className="mc-row">
                  <label>Finish Time</label>
                  <div className="mc-input-wrap">
                    <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} style={{ width: "50px" }} placeholder="h" />
                    <span className="mc-suffix">h</span>
                    <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} style={{ width: "50px" }} placeholder="m" />
                    <span className="mc-suffix">m</span>
                    <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} style={{ width: "50px" }} placeholder="s" />
                    <span className="mc-suffix">s</span>
                  </div>
                </div>
              )}

              {solveFor !== "pace" && (
                <div className="mc-row">
                  <label>Pace</label>
                  <div className="mc-input-wrap">
                    <input type="number" value={paceMin} onChange={(e) => setPaceMin(e.target.value)} style={{ width: "60px" }} />
                    <span className="mc-suffix">min</span>
                    <input type="number" value={paceSec} onChange={(e) => setPaceSec(e.target.value)} style={{ width: "60px" }} />
                    <span className="mc-suffix">sec /{distUnit}</span>
                  </div>
                </div>
              )}

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay">
                  <span>{result.label}:</span>
                  <strong>{result.value}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold mc-total"><td>{result.label}</td><td>{result.value}</td></tr>
                    {result.speed    && <tr><td>Speed</td><td>{result.speed}</td></tr>}
                    {result.pace     && <tr><td>Pace</td><td>{result.pace}</td></tr>}
                    {result.totalTime && <tr><td>Finish Time</td><td>{result.totalTime}</td></tr>}
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> {result.label}: {result.value}</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Distance Unit</td><td>{distUnit}</td></tr>
                    {result.dist && <tr><td>Distance</td><td>{result.dist} {distUnit}</td></tr>}
                    <tr><td>{result.label}</td><td>{result.value}</td></tr>
                  </tbody>
                </table>
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
            <div className="mc-sidebar-title">Fitness Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/bmi-calculator">BMI</a><a href="/calorie-calculator">Calorie</a></div>
              <div><a href="/body-fat-calculator">Body Fat</a><a href="/bmr-calculator">BMR</a></div>
              <div><a href="/ideal-weight-calculator">Ideal Weight</a><a href="/pace-calculator">Pace</a></div>
              <div><a href="/pregnancy-calculator">Pregnancy</a><a href="/pregnancy-conception-calculator">Conception</a></div>
              <div><a href="/due-date-calculator">Due Date</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}