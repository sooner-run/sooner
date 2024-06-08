import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import React, { useState } from "react";
import { RiCopperDiamondLine } from "react-icons/ri";
import { HiMiniArrowLongRight } from "react-icons/hi2";

const Pricing = () => {
  const [interval, setInterval] = useState<"Monthly" | "Annually">("Annually");

  const devPlans = [
    {
      title: "Free",
      price: 0,
      benefits: [
        "30 days dashboard history",
        "3 goals",
        "Monthly email reports",
        "Private leaderboard for 2 devs",
        "3 days data and stats export",
        "Community support",
      ],
    },
    {
      title: "Pro",
      price: 12,
      benefits: [
        "Uncapped dashboard history",
        "Unlimited goals",
        "Daily, weekly and montly email reports",
        "Private leaderboard for 100 devs",
        "Uncapped data and stats export",
        "Priority support + Private discord server",
      ],
    },
    {
      title: "Basic",
      price: 5,
      benefits: [
        "1 year dashboard history",
        "20 goals",
        "Weekly email reports",
        "Private leaderboard for 20 devs",
        "2 weeeks data and stats export",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="lg:px-20 px-5 pb-20">
        <h1 className="text-5xl font-semibold mt-10 mb-6">Sooner Pricing</h1>

        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setInterval("Monthly")}
            className={`${interval === "Monthly" ? "border-accent" : "border-transparent"} border px-3 py-1 rounded-2xl transition-colors duration-700`}
          >
            Monthly
          </button>
          <button
            className={`${interval === "Annually" ? "" : ""} flex items-center gap-x-2`}
            onClick={() => setInterval("Annually")}
          >
            <span
              className={`${interval === "Annually" ? "border-accent" : "border-transparent"} border px-3 py-1 rounded-2xl transition-colors duration-700`}
            >
              Annually
            </span>
            <AnimatedShinyText className="font-semibold">
              2 months free
            </AnimatedShinyText>{" "}
          </button>
        </div>

        <div className="my-14">
          <h2 className="font-medium text-4xl">For individuals</h2>
          <div className="flex gap-5 mt-5 flex-wrap lg:flex-nowrap">
            {devPlans.map((plan, i) => (
              <div
                className="relative border border-white/5 rounded-3xl w-full p-5"
                key={i}
              >
                {plan.title === "Pro" && (
                  <BorderBeam
                    borderWidth={2}
                    size={100}
                    duration={5}
                    className="pointer-events-none"
                  />
                )}
                <h3 className="text-xl font-medium">{plan.title}</h3>
                <h2 className="text-3xl font-medium mt-2">
                  <span className="text-grey-100 text-lg">$</span>
                  {interval === "Monthly" ? plan.price : plan.price * 10}
                  <span className="text-grey-100 text-lg">
                    {" "}
                    per {interval === "Monthly" ? "month" : "year"}
                  </span>
                </h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent my-5"></div>
                <ul className="text-sm text-grey-100">
                  {plan.benefits.map((b, i) => (
                    <li key={i} className="flex items-center my-5">
                      <RiCopperDiamondLine size={20} className="mr-1" />
                      {b}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center justify-between w-full bg-accent/50 hover:bg-accent transition-colors px-4 py-3 mt-10 rounded-full">
                  Choose {plan.title}
                  <HiMiniArrowLongRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
