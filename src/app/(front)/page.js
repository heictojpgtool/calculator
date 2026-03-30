"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./home.css";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [isDeg, setIsDeg] = useState(true);
  const [ans, setAns] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const allCalculators = [
    { name: "Mortgage Calculator", url: "/mortgage-calculator" },
    { name: "Loan Calculator", url: "/loan-calculator" },
    { name: "Auto Loan Calculator", url: "/auto-loan-calculator" },
    { name: "Interest Calculator", url: "/interest-calculator" },
    { name: "Payment Calculator", url: "/payment-calculator" },
    { name: "Retirement Calculator", url: "/retirement-calculator" },
    { name: "Amortization Calculator", url: "/amortization-calculator" },
    { name: "Investment Calculator", url: "/investment-calculator" },
    { name: "Inflation Calculator", url: "/inflation-calculator" },
    { name: "Finance Calculator", url: "/finance-calculator" },
    { name: "Income Tax Calculator", url: "/income-tax-calculator" },
    { name: "Compound Interest Calculator", url: "/compound-interest-calculator" },
    { name: "Salary Calculator", url: "/salary-calculator" },
    { name: "Interest Rate Calculator", url: "/interest-rate-calculator" },
    { name: "Sales Tax Calculator", url: "/sales-tax-calculator" },
    { name: "BMI Calculator", url: "/bmi-calculator" },
    { name: "Calorie Calculator", url: "/calorie-calculator" },
    { name: "Body Fat Calculator", url: "/body-fat-calculator" },
    { name: "BMR Calculator", url: "/bmr-calculator" },
    { name: "Ideal Weight Calculator", url: "/ideal-weight-calculator" },
    { name: "Pace Calculator", url: "/pace-calculator" },
    { name: "Pregnancy Calculator", url: "/pregnancy-calculator" },
    { name: "Pregnancy Conception Calculator", url: "/pregnancy-conception-calculator" },
    { name: "Due Date Calculator", url: "/due-date-calculator" },
    { name: "Scientific Calculator", url: "/scientific-calculator" },
    { name: "Fraction Calculator", url: "/fraction-calculator" },
    { name: "Percentage Calculator", url: "/percentage-calculator" },
    { name: "Random Number Generator", url: "/random-number-generator" },
    { name: "Triangle Calculator", url: "/triangle-calculator" },
    { name: "Standard Deviation Calculator", url: "/standard-deviation-calculator" },
    { name: "Age Calculator", url: "/age-calculator" },
    { name: "Date Calculator", url: "/date-calculator" },
    { name: "Time Calculator", url: "/time-calculator" },
    { name: "Hours Calculator", url: "/hours-calculator" },
    { name: "GPA Calculator", url: "/gpa-calculator" },
    { name: "Grade Calculator", url: "/grade-calculator" },
    { name: "Concrete Calculator", url: "/concrete-calculator" },
    { name: "Subnet Calculator", url: "/subnet-calculator" },
    { name: "Password Generator", url: "/password-generator" },
    { name: "Conversion Calculator", url: "/conversion-calculator" },
  ];

  const handleSearch = (val) => {
    setSearchQuery(val);
    if (val.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const filtered = allCalculators.filter((c) =>
      c.name.toLowerCase().includes(val.toLowerCase())
    );
    setSearchResults(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (url) => {
    setShowDropdown(false);
    setSearchQuery("");
    router.push(url);
  };

  const handleSearchBtn = () => {
    if (searchResults.length > 0) {
      handleSelect(searchResults[0].url);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSelect(searchResults[0].url);
    }
  };

  const toRad = (x) => (isDeg ? (x * Math.PI) / 180 : x);

  const press = (val) => {
    if (val === "AC")   return setDisplay("0");
    if (val === "Back") return setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    if (val === "MR")   return setDisplay(String(memory));
    if (val === "Ans")  return setDisplay(String(ans));

    if (val === "=") {
      try {
        let expr = display
          .replace(/×/g, "*").replace(/−/g, "-")
          .replace(/π/g, String(Math.PI))
          .replace(/e(?![0-9])/g, String(Math.E));
        const result = Function('"use strict"; return (' + expr + ')')();
        setAns(result);
        setDisplay(String(result));
      } catch { setDisplay("Error"); }
      return;
    }

    const mathFns = {
      sin:     () => String(parseFloat(Math.sin(toRad(parseFloat(display))).toFixed(10))),
      cos:     () => String(parseFloat(Math.cos(toRad(parseFloat(display))).toFixed(10))),
      tan:     () => String(parseFloat(Math.tan(toRad(parseFloat(display))).toFixed(10))),
      "sin⁻¹": () => String(Math.asin(parseFloat(display)) * (isDeg ? 180/Math.PI : 1)),
      "cos⁻¹": () => String(Math.acos(parseFloat(display)) * (isDeg ? 180/Math.PI : 1)),
      "tan⁻¹": () => String(Math.atan(parseFloat(display)) * (isDeg ? 180/Math.PI : 1)),
      ln:      () => String(Math.log(parseFloat(display))),
      log:     () => String(Math.log10(parseFloat(display))),
      "√x":    () => String(Math.sqrt(parseFloat(display))),
      "x²":    () => String(Math.pow(parseFloat(display), 2)),
      "x³":    () => String(Math.pow(parseFloat(display), 3)),
      "10ˣ":   () => String(Math.pow(10, parseFloat(display))),
      "eˣ":    () => String(Math.exp(parseFloat(display))),
      "1/x":   () => String(1 / parseFloat(display)),
      "n!":    () => { let n=parseInt(display),r=1; for(let i=2;i<=n;i++) r*=i; return String(r); },
      "%":     () => String(parseFloat(display) / 100),
      "±":     () => String(-parseFloat(display)),
      RND:     () => String(Math.round(parseFloat(display))),
      "M+":    () => { setMemory(memory + parseFloat(display)); return null; },
      "M-":    () => { setMemory(memory - parseFloat(display)); return null; },
      π:       () => String(Math.PI),
      e:       () => String(Math.E),
      EXP:     () => display + "e",
      "xʸ":    () => display + "**",
      "³√x":   () => String(Math.cbrt(parseFloat(display))),
    };

    if (mathFns[val]) {
      const res = mathFns[val]();
      if (res !== null) setDisplay(res);
      return;
    }

    if (display === "0" && !["+","−","×","/","("].includes(val)) setDisplay(val);
    else setDisplay(display + val);
  };

  const rows = [
    ["sin","cos","tan","DEG_RAD","7","8","9","+","Back","EMPTY"],
    ["sin⁻¹","cos⁻¹","tan⁻¹","π","e","4","5","6","−","Ans"],
    ["xʸ","x³","x²","eˣ","10ˣ","1","2","3","×","M+"],
    ["y√x","³√x","√x","ln","log","0",".","EXP","/","M-"],
    ["(",")" ,"1/x","%","n!","±","RND","AC","=","MR"],
  ];

  const numBtns  = ["7","8","9","4","5","6","1","2","3","0","."];
  const eqBtns   = ["="];
  const blueBtns = ["Back","Ans","M+","M-","MR","AC","RND","±"];

  const categories = [
    {
      label: "Financial Calculators",
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&q=80",
      links: [
        ["Mortgage Calculator","/mortgage-calculator"],
        ["Loan Calculator","/loan-calculator"],
        ["Auto Loan Calculator","/auto-loan-calculator"],
        ["Interest Calculator","/interest-calculator"],
        ["Payment Calculator","/payment-calculator"],
        ["Retirement Calculator","/retirement-calculator"],
        ["Amortization Calculator","/amortization-calculator"],
        ["Investment Calculator","/investment-calculator"],
        ["Inflation Calculator","/inflation-calculator"],
        ["Finance Calculator","/finance-calculator"],
        ["Income Tax Calculator","/income-tax-calculator"],
        ["Compound Interest Calculator","/compound-interest-calculator"],
        ["Salary Calculator","/salary-calculator"],
        ["Interest Rate Calculator","/interest-rate-calculator"],
        ["Sales Tax Calculator","/sales-tax-calculator"],
      ],
    },
    {
      label: "Fitness & Health Calculators",
      img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&q=80",
      links: [
        ["BMI Calculator","/bmi-calculator"],
        ["Calorie Calculator","/calorie-calculator"],
        ["Body Fat Calculator","/body-fat-calculator"],
        ["BMR Calculator","/bmr-calculator"],
        ["Ideal Weight Calculator","/ideal-weight-calculator"],
        ["Pace Calculator","/pace-calculator"],
        ["Pregnancy Calculator","/pregnancy-calculator"],
        ["Pregnancy Conception Calculator","/pregnancy-conception-calculator"],
        ["Due Date Calculator","/due-date-calculator"],
      ],
    },
    {
      label: "Math Calculators",
      img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&q=80",
      links: [
        ["Scientific Calculator","/scientific-calculator"],
        ["Fraction Calculator","/fraction-calculator"],
        ["Percentage Calculator","/percentage-calculator"],
        ["Random Number Generator","/random-number-generator"],
        ["Triangle Calculator","/triangle-calculator"],
        ["Standard Deviation Calculator","/standard-deviation-calculator"],
      ],
    },
    {
      label: "Other Calculators",
      img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&q=80",
      links: [
        ["Age Calculator","/age-calculator"],
        ["Date Calculator","/date-calculator"],
        ["Time Calculator","/time-calculator"],
        ["Hours Calculator","/hours-calculator"],
        ["GPA Calculator","/gpa-calculator"],
        ["Grade Calculator","/grade-calculator"],
        ["Concrete Calculator","/concrete-calculator"],
        ["Subnet Calculator","/subnet-calculator"],
        ["Password Generator","/password-generator"],
        ["Conversion Calculator","/conversion-calculator"],
      ],
    },
  ];

  return (
    <div>
      <div className="calc-wrapper">
        <div className="calc-box">
          <div className="display">{display}</div>
          <div className="grid">
            {rows.flat().map((btn, i) => {
              if (btn === "EMPTY") return (
                <div key={i} style={{
                  borderRight:"1px solid #c0c8d8",
                  borderBottom:"1px solid #c0c8d8",
                  background:"#e8eef5",
                  minHeight:"36px"
                }}></div>
              );

              if (btn === "DEG_RAD") return (
                <div key={i} className="deg-rad-cell">
                  <span className={isDeg ? "mode-active":"mode-inactive"} onClick={()=>setIsDeg(true)}>
                    <span className="radio-dot">{isDeg?"●":"○"}</span>Deg
                  </span>
                  <span className={!isDeg?"mode-active":"mode-inactive"} onClick={()=>setIsDeg(false)}>
                    <span className="radio-dot">{!isDeg?"●":"○"}</span>Rad
                  </span>
                </div>
              );

              const cls = eqBtns.includes(btn)   ? "eq"
                        : numBtns.includes(btn)  ? "num"
                        : blueBtns.includes(btn) ? "blue"
                        : "";
              return (
                <button key={i} className={cls} onClick={()=>press(btn)}>{btn}</button>
              );
            })}
          </div>
        </div>

        <div className="right">
          <h1>Free Online Calculators</h1>
          <div className="search" style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search calculator..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onFocus={() => searchQuery && setShowDropdown(true)}
            />
            <button onClick={handleSearchBtn}>Search</button>

            {showDropdown && searchResults.length > 0 && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #ccc",
                borderTop: "none",
                zIndex: 999,
                maxHeight: "260px",
                overflowY: "auto",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}>
                {searchResults.map((item, i) => (
                  <div
                    key={i}
                    onMouseDown={() => handleSelect(item.url)}
                    style={{
                      padding: "9px 14px",
                      cursor: "pointer",
                      fontSize: "13px",
                      borderBottom: "1px solid #f0f0f0",
                      color: "#1e3f6e",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f5f8ff"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}

            {showDropdown && searchResults.length === 0 && searchQuery.trim() !== "" && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #ccc",
                borderTop: "none",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#999",
                zIndex: 999,
              }}>
                No calculator found
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="categories">
        <div className="lists">
          {categories.map((cat, i) => (
            <div key={i}>
              <div className="circle-img">
                <img src={cat.img} alt={cat.label} />
              </div>
              <h3>{cat.label}</h3>
              {cat.links.map(([name, href], j) => (
                <a href={href} key={j}>{name}</a>
              ))}
            </div>
          ))}
        </div>

        {/* ✅ SIRF YAHAN CHANGE HUA — button ab /sitemap pe jata hai */}
        <div className="all-btn-wrap">
          <a href="/sitemap" style={{ textDecoration: "none" }}>
            <button>All Calculators <span className="arrow">▶</span></button>
          </a>
        </div>

      </div>
    </div>
  );
}