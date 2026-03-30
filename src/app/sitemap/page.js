"use client";

import Link from "next/link";
import "./sitemap.css";

export default function SitemapPage() {
  const categories = [
    {
      label: "Financial Calculators",
      links: [
        ["Mortgage Calculator", "/mortgage-calculator"],
        ["Loan Calculator", "/loan-calculator"],
        ["Auto Loan Calculator", "/auto-loan-calculator"],
        ["Interest Calculator", "/interest-calculator"],
        ["Payment Calculator", "/payment-calculator"],
        ["Retirement Calculator", "/retirement-calculator"],
        ["Amortization Calculator", "/amortization-calculator"],
        ["Investment Calculator", "/investment-calculator"],
        ["Inflation Calculator", "/inflation-calculator"],
        ["Finance Calculator", "/finance-calculator"],
        ["Income Tax Calculator", "/income-tax-calculator"],
        ["Compound Interest Calculator", "/compound-interest-calculator"],
        ["Salary Calculator", "/salary-calculator"],
        ["Interest Rate Calculator", "/interest-rate-calculator"],
        ["Sales Tax Calculator", "/sales-tax-calculator"],
      ],
    },
    {
      label: "Fitness & Health Calculators",
      links: [
        ["BMI Calculator", "/bmi-calculator"],
        ["Calorie Calculator", "/calorie-calculator"],
        ["Body Fat Calculator", "/body-fat-calculator"],
        ["BMR Calculator", "/bmr-calculator"],
        ["Ideal Weight Calculator", "/ideal-weight-calculator"],
        ["Pace Calculator", "/pace-calculator"],
        ["Pregnancy Calculator", "/pregnancy-calculator"],
        ["Pregnancy Conception Calculator", "/pregnancy-conception-calculator"],
        ["Due Date Calculator", "/due-date-calculator"],
      ],
    },
    {
      label: "Math Calculators",
      links: [
        ["Scientific Calculator", "/scientific-calculator"],
        ["Fraction Calculator", "/fraction-calculator"],
        ["Percentage Calculator", "/percentage-calculator"],
        ["Random Number Generator", "/random-number-generator"],
        ["Triangle Calculator", "/triangle-calculator"],
        ["Standard Deviation Calculator", "/standard-deviation-calculator"],
      ],
    },
    {
      label: "Other Calculators",
      links: [
        ["Age Calculator", "/age-calculator"],
        ["Date Calculator", "/date-calculator"],
        ["Time Calculator", "/time-calculator"],
        ["Hours Calculator", "/hours-calculator"],
        ["GPA Calculator", "/gpa-calculator"],
        ["Grade Calculator", "/grade-calculator"],
        ["Concrete Calculator", "/concrete-calculator"],
        ["Subnet Calculator", "/subnet-calculator"],
        ["Password Generator", "/password-generator"],
        ["Conversion Calculator", "/conversion-calculator"],
      ],
    },
  ];

  return (
    <div className="sitemap-wrapper">

      {/* Breadcrumb */}
      <div className="sitemap-breadcrumb">
        <a href="/">home</a>
        <span> / </span>
        <span>sitemap</span>
      </div>

      {/* Page Title */}
      <h1 className="sitemap-title">Sitemap</h1>

      {/* Categories */}
      {categories.map((cat, i) => (
        <div key={i} className="sitemap-category">
          <h2 className="sitemap-cat-heading">{cat.label}</h2>
          <div className="sitemap-links-grid">
            {cat.links.map(([name, href], j) => (
              <a key={j} href={href} className="sitemap-link">
                {name}
              </a>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}