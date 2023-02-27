// React
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Next
import Head from "next/head";

// Zustand
import { useStore, getEmail, setEmail } from "@/stores/userStore";

// Components
import LoginPage from "@/components/website/account/login/Login";
import ListGifts from "./listGifts/index";

// Styles
import styles from "@/styles/Home.module.css";

export default function Home() {
  const setGlobalEmail = useStore(setEmail);
  const getGlobalEmail = useStore(getEmail);

  const { user } = useAuth();

  console.log(
    "🚀 ~ file: index.tsx:13 ~ Home ~ getGlobalEmail",
    getGlobalEmail
  );

  useEffect(() => {
    setGlobalEmail("test@gmail.com");
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user && <LoginPage />}
      {user && <ListGifts />}
    </>
  );
}
