import { AppProps } from "next/app";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { LogSnagProvider } from "@logsnag/next";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <LogSnagProvider
      token={process.env.NEXT_PUBLIC_LOGSNAG_TOKEN!}
      project="sooner"
    >
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </LogSnagProvider>
  );
}
