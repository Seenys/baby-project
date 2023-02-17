//React
import Layout from "@/components/layout/Layout";
import { AuthContextProvider } from "@/context/AuthContext";
//Styles
import "@/styles/globals.css";
//Next
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
