import { AuthContextProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/layouts";
import "@/styles/globals.css";
import theme from "@/theme/themeConfig";
import { AppPropsWithLayout } from "@/types/common";
import { ConfigProvider } from "antd";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayout;
  return (
    <>
      <Head>
        <title>Club Network</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider theme={theme}>
        <ThemeProvider theme={{ antd: theme.token }}>
          <AuthContextProvider>
            <SessionProvider session={pageProps.session}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
}
