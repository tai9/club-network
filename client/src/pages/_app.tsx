import { MainLayout } from "@/layouts";
import "@/styles/globals.css";
import theme from "@/theme/themeConfig";
import { AppPropsWithLayout } from "@/types/common";
import { ConfigProvider } from "antd";
import Head from "next/head";

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </>
  );
}
