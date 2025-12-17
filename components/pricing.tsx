"use client";

import { Check, Star, Crown } from "lucide-react";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    name: "Gold Batch",
    price: 60,
    description: "Institutional-grade strategies for disciplined traders",
    features: [
      "15 professional trading strategies",
      "Structured learning path",
      "Weekly market outlook",
      "Risk management framework",
      "Private discussion access",
    ],
  },
  {
    name: "Inner Circle Trading",
    price: 50,
    description: "Advanced execution & smart money concepts",
    features: [
      "20 ICT-based strategies",
      "Market structure mastery",
      "Entry & exit models",
      "Trade journaling system",
      "Live Q&A recordings",
    ],
  },
  {
    name: "MACRO & CRT",
    price: 50,
    description: "High speed Time based Model ",
    features: [
      "Central bank behavior",
      "Liquidity cycles",
      "Market correlations",
      "Monthly macro breakdowns",
      "Economic calendar mastery",
    ],
  },
  {
    name: "Advanced Concepts",
    price: 50,
    description: "High-level concepts for advanced traders",
    features: [
      "Algorithmic thinking",
      "Market microstructure",
      "Advanced price action",
      "Quantitative mindset",
      "Professional trade models",
    ],
  },
  {
    name: "Psychology",
    price: 10,
    description: "Mental discipline & consistency systems",
    features: [
      "Trader mindset framework",
      "Emotional control techniques",
      "Confidence & discipline",
      "Risk tolerance mastery",
      "Performance optimization",
    ],
  },
];

const premiumPackage = {
  name: "Complete Trading Mastery",
  price: 200,
  originalPrice: 260,
  features: [
    "All 5 professional programs",
    "55+ structured trading lessons",
    "Lifetime access",
    "Private members community",
    "Priority support",
    "Bonus risk management guide",
    "Bonus professional trading journal",
  ],
};

export default function Pricing() {
  return (
    <section className="bg-white px-4 py-16 sm:py-20 border-t border-gray-500">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Pricing & Programs
          </h1>
          <p className="mt-4 text-gray-600 text-lg sm:text-xl">
            Carefully structured trading education designed for serious learners.
          </p>
        </div>

        {/* INDIVIDUAL PLANS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="group rounded-2xl border border-gray-400 bg-gray-30 p-7
                         shadow-lg transition-transform duration-300 ease-out
                         hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-1 w-12 rounded-full bg-black mb-5" />

              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>

              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-sm text-gray-500">one-time</span>
              </div>

              <ul className="space-y-3 mt-6 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-1 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full rounded-xl bg-white border-1 border-black py-3 text-black font-bold text-sm
                           transition-all duration-300 ease-out
                           hover:bg-black hover:text-white hover:-translate-y-[1px]"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>

        {/* PREMIUM PACKAGE */}
        <div className="relative rounded-3xl border-2 border-yellow-400 bg-white p-10 sm:p-14
                        shadow-2xl transform transition-transform duration-300 hover:-translate-y-2">
          {/* badge */}
          <span className="absolute -top-5 left-6 rounded-full bg-yellow-400 text-black px-5 py-2
                           text-sm font-bold shadow-md">
            MOST POPULAR
          </span>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Crown className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  {premiumPackage.name}
                </h2>
              </div>

              <p className="text-gray-800 mb-8">
                A complete professional trading education system — everything in one place.
              </p>

              <div className="flex items-center gap-5 mb-8">
                <span className="text-6xl font-extrabold text-gray-900">
                  ${premiumPackage.price}
                </span>
                <span className="line-through text-xl text-gray-400">
                  ${premiumPackage.originalPrice}
                </span>
              </div>

              {/* UPDATED PREMIUM BUTTON */}
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl
                 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:text-white"
              >
                <Crown className="w-6 h-6" />
                <span>Get Full Access</span>
              </a>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {premiumPackage.features.map((feature, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <Check className="w-6 h-6 text-yellow-500 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRUST SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
            <Star className="w-7 h-7 mx-auto text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Professional Content</p>
            <p className="text-sm text-gray-600 mt-1">
              Structured & institutional-grade
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
            <Crown className="w-7 h-7 mx-auto text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Lifetime Access</p>
            <p className="text-sm text-gray-600 mt-1">One payment, full access</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
            <Check className="w-7 h-7 mx-auto text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Trusted System</p>
            <p className="text-sm text-gray-600 mt-1">Built for serious traders</p>
          </div>
        </div>
      </div>
    </section>
  );
}
