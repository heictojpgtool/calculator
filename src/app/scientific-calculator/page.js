"use client";
import { useState } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr]       = useState("");
  const [newNum, setNewNum]   = useState(true);

  const press = (val) => {
    if (newNum && !isNaN(val) || val === ".") {
      setDisplay(val === "." ? "0." : String(val));
      setNewNum(false);
    } else if (!isNaN(val) || val === ".") {
      setDisplay(display === "0" ? String(val) : display + val);
    }
  };

  const op = (o) => {
    setExpr(display + " " + o + " ");
    setNewNum(true);
  };

  const calc = () => {
    try {
      const full = expr + display;
      const res  = Function('"use strict"; return (' + full + ')')();
      setDisplay(String(parseFloat(res.toFixed(10))));
      setExpr("");
      setNewNum(true);
    } catch { setDisplay("Error"); }
  };

  const sci = (fn) => {
    const n = parseFloat(display);
    let res = 0;
    if (fn === "sin")   res = Math.sin((n * Math.PI) / 180);
    if (fn === "cos")   res = Math.cos((n * Math.PI) / 180);
    if (fn === "tan")   res = Math.tan((n * Math.PI) / 180);
    if (fn === "log")   res = Math.log10(n);
    if (fn === "ln")    res = Math.log(n);
    if (fn === "sqrt")  res = Math.sqrt(n);
    if (fn === "sq")    res = n * n;
    if (fn === "inv")   res = 1 / n;
    if (fn === "pi")  { setDisplay(String(Math.PI)); setNewNum(true); return; }
    if (fn === "e")   { setDisplay(String(Math.E));  setNewNum(true); return; }
    if (fn === "fact") {
      let f = 1;
      for (let i = 2; i <= n; i++) f *= i;
      res = f;
    }
    setDisplay(String(parseFloat(res.toFixed(10))));
    setNewNum(true);
  };

  const clear = () => { setDisplay("0"); setExpr(""); setNewNum(true); };
  const del   = () => {
    if (display.length > 1) setDisplay(display.slice(0, -1));
    else setDisplay("0");
  };
  const neg   = () => setDisplay(String(parseFloat(display) * -1));

  const btn = (label, action, color = "#f0f0f0") => (
    <button
      onClick={action}
      style={{
        padding: "10px 6px", fontSize: "13px", border: "1px solid #bbb",
        background: color, cursor: "pointer", borderRadius: "2px", width: "100%",
      }}
    >{label}</button>
  );

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">math</Link> / scientific calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Scientific Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Click buttons or type values to calculate
          </div>

          <div style={{ border: "1px solid #ccc", padding: "16px", background: "#fff" }}>
            <div style={{ background: "#1e3f6e", color: "#fff", padding: "8px 12px", fontSize: "12px", marginBottom: "4px", minHeight: "20px" }}>
              {expr}
            </div>
            <div style={{ background: "#f9f9f9", border: "1px solid #ddd", padding: "10px 12px", fontSize: "22px", fontWeight: "bold", textAlign: "right", marginBottom: "10px", letterSpacing: "1px" }}>
              {display}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" }}>
              {btn("sin",  () => sci("sin"),  "#e8f0fe")}
              {btn("cos",  () => sci("cos"),  "#e8f0fe")}
              {btn("tan",  () => sci("tan"),  "#e8f0fe")}
              {btn("log",  () => sci("log"),  "#e8f0fe")}
              {btn("ln",   () => sci("ln"),   "#e8f0fe")}

              {btn("x²",   () => sci("sq"),   "#e8f0fe")}
              {btn("√x",   () => sci("sqrt"), "#e8f0fe")}
              {btn("1/x",  () => sci("inv"),  "#e8f0fe")}
              {btn("π",    () => sci("pi"),   "#e8f0fe")}
              {btn("e",    () => sci("e"),    "#e8f0fe")}

              {btn("n!",   () => sci("fact"), "#e8f0fe")}
              {btn("(",    () => { setExpr(expr + display + " * ("); setNewNum(true); }, "#e8f0fe")}
              {btn(")",    () => { setExpr(expr + ")"); setNewNum(true); },             "#e8f0fe")}
              {btn("AC",   clear, "#fde8e8")}
              {btn("DEL",  del,   "#fde8e8")}

              {btn("7", () => press("7"))}
              {btn("8", () => press("8"))}
              {btn("9", () => press("9"))}
              {btn("÷", () => op("/"), "#fff3cd")}
              {btn("+/-", neg)}

              {btn("4", () => press("4"))}
              {btn("5", () => press("5"))}
              {btn("6", () => press("6"))}
              {btn("×", () => op("*"), "#fff3cd")}
              {btn("%", () => setDisplay(String(parseFloat(display) / 100)))}

              {btn("1", () => press("1"))}
              {btn("2", () => press("2"))}
              {btn("3", () => press("3"))}
              {btn("−", () => op("-"), "#fff3cd")}
              {btn("", () => {})}

              {btn("0", () => press("0"))}
              {btn(".", () => press("."))}
              <button
                onClick={calc}
                style={{
                  gridColumn: "span 2", padding: "10px", fontSize: "16px",
                  background: "#4a7c3f", color: "#fff", border: "none",
                  cursor: "pointer", borderRadius: "2px", fontWeight: "bold",
                }}
              >=</button>
              {btn("+", () => op("+"), "#fff3cd")}
            </div>
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