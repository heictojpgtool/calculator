import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

const seoData = {
  "/": {
    title: "Free Online Calculators – Fast & Accurate Tools",
    description: "Use free online calculators for finance, health, math, and more. Fast, accurate, and easy to use. No signup needed.",
  },
  "/mortgage-calculator": {
    title: "Mortgage Calculator – Monthly Payment Estimator",
    description: "Calculate your monthly mortgage payment, total interest, and amortization schedule. Free, instant, and accurate mortgage calculator.",
  },
  "/loan-calculator": {
    title: "Loan Calculator – Monthly Payment & Total Interest",
    description: "Find your monthly loan payment, total interest, and payoff date instantly. Free loan calculator for personal, student, and business loans.",
  },
  "/auto-loan-calculator": {
    title: "Auto Loan Calculator – Car Payment Estimator",
    description: "Estimate your monthly car payment, total interest, and payoff date. Includes trade-in value and sales tax. Free auto loan calculator.",
  },
  "/interest-calculator": {
    title: "Interest Calculator – Simple & Compound Interest",
    description: "Calculate simple or compound interest on any amount. Choose daily, monthly, or annual compounding. Free online interest calculator.",
  },
  "/payment-calculator": {
    title: "Payment Calculator – Find Your Monthly Payment",
    description: "Calculate monthly payments on any loan in seconds. Enter loan amount, term, and interest rate. Free payment calculator online.",
  },
  "/retirement-calculator": {
    title: "Retirement Calculator – How Much Will You Save?",
    description: "See how much you will have at retirement based on savings, contributions, and return rate. Free retirement savings calculator.",
  },
  "/amortization-calculator": {
    title: "Amortization Calculator – Full Payment Schedule",
    description: "Generate a complete loan amortization schedule with monthly principal and interest breakdown. Free amortization calculator.",
  },
  "/investment-calculator": {
    title: "Investment Calculator – Grow Your Money Over Time",
    description: "Calculate investment growth with monthly contributions and compound interest. See your end balance and total returns. Free tool.",
  },
  "/inflation-calculator": {
    title: "Inflation Calculator – Purchasing Power Over Time",
    description: "See how inflation affects the value of money over any time period. Calculate future value and purchasing power loss. Free tool.",
  },
  "/finance-calculator": {
    title: "Finance Calculator – PV, FV, Rate & Periods",
    description: "Solve for present value, future value, interest rate, or number of periods. Free online finance calculator for all TVM problems.",
  },
  "/income-tax-calculator": {
    title: "Income Tax Calculator – Federal Tax Estimator 2025",
    description: "Estimate your 2025 federal income tax, effective tax rate, and take-home pay. Supports all filing statuses. Free tax calculator.",
  },
  "/compound-interest-calculator": {
    title: "Compound Interest Calculator – Watch Money Grow",
    description: "Calculate compound interest with monthly additions. See total deposits, interest earned, and end balance. Free compound interest tool.",
  },
  "/salary-calculator": {
    title: "Salary Calculator – Annual, Monthly & Hourly Pay",
    description: "Convert salary between hourly, daily, weekly, monthly, and annual. Free salary calculator with bi-weekly pay breakdown.",
  },
  "/interest-rate-calculator": {
    title: "Interest Rate Calculator – Find Your Loan Rate",
    description: "Calculate the interest rate on any loan using your payment, term, and loan amount. Free online interest rate finder.",
  },
  "/sales-tax-calculator": {
    title: "Sales Tax Calculator – Add or Remove Tax Instantly",
    description: "Calculate sales tax on any purchase or reverse-calculate pre-tax price from total. Supports any tax rate. Free online tool.",
  },
  "/bmi-calculator": {
    title: "BMI Calculator – Check Your Body Mass Index",
    description: "Calculate your BMI instantly using height and weight. See your weight category and healthy weight range. Free BMI calculator.",
  },
  "/calorie-calculator": {
    title: "Calorie Calculator – Daily Calories to Lose Weight",
    description: "Find out how many calories you need per day to lose, maintain, or gain weight. Based on age, gender, and activity level.",
  },
  "/body-fat-calculator": {
    title: "Body Fat Calculator – Estimate Your Body Fat %",
    description: "Calculate your body fat percentage using the US Navy method. See your fitness category and fat weight. Free body fat calculator.",
  },
  "/bmr-calculator": {
    title: "BMR Calculator – Basal Metabolic Rate by Age",
    description: "Calculate your basal metabolic rate and daily calorie needs by activity level. Free BMR calculator using Mifflin-St Jeor formula.",
  },
  "/ideal-weight-calculator": {
    title: "Ideal Weight Calculator – What Should You Weigh?",
    description: "Find your ideal body weight based on height and gender using 4 proven formulas. Free ideal weight calculator.",
  },
  "/pace-calculator": {
    title: "Pace Calculator – Running Pace, Speed & Finish Time",
    description: "Calculate your running pace, finish time, or distance for any race. Works for km and miles. Free online pace calculator.",
  },
  "/pregnancy-calculator": {
    title: "Pregnancy Calculator – Due Date & Weekly Progress",
    description: "Calculate your due date, current week, trimester, and pregnancy milestones. Free pregnancy calculator by LMP or ultrasound.",
  },
  "/pregnancy-conception-calculator": {
    title: "Conception Calculator – When Did I Get Pregnant?",
    description: "Find your estimated conception date, fertile window, and all trimester milestones from your due date. Free conception calculator.",
  },
  "/due-date-calculator": {
    title: "Due Date Calculator – Estimate Your Baby's Due Date",
    description: "Calculate your pregnancy due date by LMP, ultrasound, or IVF transfer date. See weekly progress and key milestones. Free tool.",
  },
  "/scientific-calculator": {
    title: "Scientific Calculator – Free Online Advanced Calculator",
    description: "Use our free online scientific calculator with sin, cos, tan, log, square root, and more. No download needed.",
  },
  "/fraction-calculator": {
    title: "Fraction Calculator – Add, Subtract, Multiply Fractions",
    description: "Add, subtract, multiply, or divide fractions with instant simplified results. Shows mixed numbers and decimals. Free fraction calculator.",
  },
  "/percentage-calculator": {
    title: "Percentage Calculator – 3 Ways to Calculate %",
    description: "Calculate what percent of a number, what percent one number is of another, and percent change. Free percentage calculator.",
  },
  "/random-number-generator": {
    title: "Random Number Generator – Free Online Number Picker",
    description: "Generate random numbers between any range. Get multiple unique numbers instantly. Free random number generator with no duplicates option.",
  },
  "/triangle-calculator": {
    title: "Triangle Calculator – Area, Angles & Perimeter",
    description: "Calculate triangle area, all three angles, and perimeter from side lengths. Shows triangle type and diagram. Free calculator.",
  },
  "/standard-deviation-calculator": {
    title: "Standard Deviation Calculator – Mean, SD & Variance",
    description: "Calculate mean, median, mode, standard deviation, and variance from a data set. Free online statistics calculator.",
  },
  "/age-calculator": {
    title: "Age Calculator – Find Exact Age in Years & Days",
    description: "Calculate your exact age in years, months, days, hours, and weeks. See next birthday countdown. Free online age calculator.",
  },
  "/date-calculator": {
    title: "Date Calculator – Days Between Dates & Date Math",
    description: "Calculate the number of days between two dates or add and subtract days from a date. Free online date calculator.",
  },
  "/time-calculator": {
    title: "Time Calculator – Add or Subtract Time Easily",
    description: "Add or subtract hours, minutes, and seconds quickly. Get total time in seconds, minutes, and hours. Free online time calculator.",
  },
  "/hours-calculator": {
    title: "Hours Calculator – Track Work Hours & Total Pay",
    description: "Calculate total work hours and wages for the week. Enter start time, end time, and breaks. Free online hours calculator.",
  },
  "/gpa-calculator": {
    title: "GPA Calculator – Calculate Your Grade Point Average",
    description: "Calculate your GPA from course grades and credit hours. Supports A+ to F grading. Free online GPA calculator for students.",
  },
  "/grade-calculator": {
    title: "Grade Calculator – Weighted Final Grade Calculator",
    description: "Calculate your final grade using assignment scores and weights. Find out what you need to pass. Free weighted grade calculator.",
  },
  "/concrete-calculator": {
    title: "Concrete Calculator – Cubic Yards & Bags Needed",
    description: "Calculate concrete volume in cubic yards and number of bags needed for slabs, footings, and columns. Free concrete calculator.",
  },
  "/subnet-calculator": {
    title: "Subnet Calculator – IP, Mask & Usable Hosts",
    description: "Calculate network address, subnet mask, broadcast, usable IPs, and host count for any IP and prefix. Free subnet calculator.",
  },
  "/password-generator": {
    title: "Password Generator – Strong Random Passwords Free",
    description: "Generate strong, random passwords instantly. Choose length, uppercase, numbers, and symbols. Free secure password generator.",
  },
  "/conversion-calculator": {
    title: "Conversion Calculator – Length, Weight, Temp & More",
    description: "Convert between units of length, weight, temperature, area, volume, speed, and data storage. Free online unit converter.",
  },
};

const baseUrl = "https://calculatoz.com";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const seo = seoData[pathname] || seoData["/"];

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${baseUrl}${pathname}`,
      images: [
        {
          url: `${baseUrl}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    alternates: {
      canonical: `${baseUrl}${pathname}`,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.jpg" />
      </head>
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}