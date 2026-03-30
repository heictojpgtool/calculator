export const metadata = {
    title: "Calculator – Free Online Calculator Tools for Math & Finance",
    description: "Use free online calculators for mortgage, loan, BMI, tax, compound interest, and more. Fast, accurate, and easy to use. No signup needed.",
    openGraph: {
        title: "Calculator – Free Online Calculator Tools for Math & Finance",
        description: "Use free online calculators for mortgage, loan, BMI, tax, compound interest, and more. Fast, accurate, and easy to use. No signup needed.",
        url: "https://calculatoz.com",
        images: [
            {
                url: "https://calculatoz.com/images/og-home.jpg",
                width: 1200,
                height: 630,
                alt: "Free Online Calculators",
            },
        ],
    },
};

export default function Layout({ children }) {
    return <>{children}</>;
}