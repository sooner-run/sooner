import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const dashboardRoutes = ["/dashboard", "/projects", "/settings", "/insights"];
  const isDashboardRoute = dashboardRoutes.includes(router.pathname);

  return (
    <AnimatePresence mode="wait">
      {isDashboardRoute ? (
        <DashboardLayout key={router.route}>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <MainLayout key={router.route}>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </AnimatePresence>
  );
}
