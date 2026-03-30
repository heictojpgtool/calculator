"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function ConversionCalculator() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit]     = useState("foot");
  const [value, setValue]       = useState(1);
  const [result, setResult]     = useState(null);

  const units = {
    length:      { meter:1, kilometer:0.001, centimeter:100, millimeter:1000, mile:0.000621371, yard:1.09361, foot:3.28084, inch:39.3701 },
    weight:      { kilogram:1, gram:1000, milligram:1e6, pound:2.20462, ounce:35.274, ton:0.001 },
    temperature: { celsius:1, fahrenheit:1, kelvin:1 },
    area:        { "sq meter":1, "sq kilometer":1e-6, "sq mile":3.861e-7, "sq yard":1.19599, "sq foot":10.7639, "sq inch":1550.0031, hectare:1e-4, acre:0.000247105 },
    volume:      { liter:1, milliliter:1000, "cubic meter":0.001, gallon:0.264172, quart:1.05669, pint:2.11338, cup:4.22675, "fluid oz":33.814 },
    speed:       { "m/s":1, "km/h":3.6, mph:2.23694, knot:1.94384 },
    data:        { byte:1, kilobyte:0.001, megabyte:1e-6, gigabyte:1e-9, terabyte:1e-12, bit:8 },
  };

  const convertTemp = (val, from, to) => {
    let celsius = val;
    if (from === "fahrenheit") celsius = (val - 32) * 5 / 9;
    if (from === "kelvin")     celsius = val - 273.15;
    if (to === "celsius")     return celsius;
    if (to === "fahrenheit")  return celsius * 9 / 5 + 32;
    if (to === "kelvin")      return celsius + 273.15;
    return celsius;
  };

  const calculate = () => {
    const v = parseFloat(value) || 0;
    let res = 0;

    if (category === "temperature") {
      res = convertTemp(v, fromUnit, toUnit);
    } else {
      const map = units[category];
      res = (v / map[fromUnit]) * map[toUnit];
    }

    setResult(res.toFixed(6).replace(/\.?0+$/, ""));
  };

  const categoryUnits = Object.keys(units[category] || {});

  useEffect(() => {
    const u = Object.keys(units[category]);
    setFromUnit(u[0]);
    setToUnit(u[1]);
  }, [category]);

  useEffect(() => { calculate(); }, [value, fromUnit, toUnit, category]);

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb"><Link href="/">home</Link> / <Link href="/">other</Link> / conversion calculator</div>
      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Conversion Calculator</h1>
          <div className="mc-infobar"><span className="mc-arrow">▼</span>Select category, units and enter a value to convert</div>
          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row"><label>Category</label>
                <div className="mc-input-wrap">
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="length">Length</option>
                    <option value="weight">Weight / Mass</option>
                    <option value="temperature">Temperature</option>
                    <option value="area">Area</option>
                    <option value="volume">Volume</option>
                    <option value="speed">Speed</option>
                    <option value="data">Digital Storage</option>
                  </select>
                </div>
              </div>
              <div className="mc-row"><label>Value</label>
                <div className="mc-input-wrap">
                  <input type="number" value={value} onChange={(e) => setValue(e.target.value)} style={{ width: "120px" }} />
                </div>
              </div>
              <div className="mc-row"><label>From</label>
                <div className="mc-input-wrap">
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                    {categoryUnits.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="mc-row"><label>To</label>
                <div className="mc-input-wrap">
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                    {categoryUnits.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {result !== null && (
              <div className="mc-results">
                <div className="mc-monthly-pay">
                  <span>{value} {fromUnit} =</span>
                  <strong>{result} {toUnit}</strong>
                </div>
                <table className="mc-summary">
                  <tbody>
                    <tr><td>Input</td><td>{value} {fromUnit}</td></tr>
                    <tr><td>Output</td><td>{result} {toUnit}</td></tr>
                    <tr><td>Category</td><td style={{ textTransform: "capitalize" }}>{category}</td></tr>
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