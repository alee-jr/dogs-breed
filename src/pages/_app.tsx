import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
