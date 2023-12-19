import AppModals from "@/components/common/AppModals";
import queryClient from "@/configs/queryClient";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ClubNetworkProvider } from "@/hooks/useClubNetwork";
import { MainLayout } from "@/layouts";
import "@/styles/globals.css";
import theme from "@/theme/themeConfig";
import { AppPropsWithLayout } from "@/types/common";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayout;
  return (
    <>
      <Head>
        <title>Club Network</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          <ThemeProvider theme={{ antd: theme.token }}>
            <AuthContextProvider>
              <SessionProvider session={pageProps.session}>
                <ClubNetworkProvider>
                  <Layout>
                    <Component {...pageProps} />
                    <AppModals />
                  </Layout>
                </ClubNetworkProvider>
              </SessionProvider>
            </AuthContextProvider>
          </ThemeProvider>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
