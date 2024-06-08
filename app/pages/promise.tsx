import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import React from "react";

const Promise = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="lg:px-52 px-5 pb-20 text-lg">
        <h1 className="text-5xl font-semibold mt-10 mb-6">Forever Promise</h1>

        <p className="font-semibold text-3xl">
          It sucks when services we use and love shut down. So Sooner comes with
          a promise: it will remain online forever.
        </p>
        <br />
        <p className="my-2">
          Apps and services shut down too often, and our data/content tends to
          either get lost completely or we are forced to tediously transition it
          to yet another service of questionable longevity. I built Sooner to
          solve my own problems, so I feel a great obligation to users. This
          platform must stay alive.
        </p>

        <hr className="my-10" />
        <p>So these are a few promises from me to you:</p>
        <br />
        <ol className="list-decimal flex flex-col gap-y-10 list-inside">
          <li>
            I promise to do everything in my power to ensure that all your
            tracked coding activities on the platform will continue to be
            available on the web as long as you want it there. Even if you
            cancel your subscription.
          </li>
          <li>
            Your coding activity will be available forever, nothing gets deleted
            even on the free plan. As long as you have an active subscription
            you will be able to view and export your coding activities through
            any interval. This essentially means that I promise to never shut
            down the platform.
          </li>
          <li>
            If Sooner ever gets acquired, purchased, or taken majority control
            of by a third party in a way that would negatively impact the
            service, I will do everything in my power to ensure that the above
            two promises are kept as part of any legal agreements we enter into.
          </li>
        </ol>
        <p className="mt-10">This is my promise.</p>

        <div className="">
          <p className="text-xs mt-10">
            Inspired by{" "}
            <a href="https://svbtle.com/promise" target="_blank">
              Svbtle
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Promise;
