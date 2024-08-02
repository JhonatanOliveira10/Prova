"use client";

import { Layout } from "antd";
import FooterCustom from "./components/FooterCustom";
import HeaderCustom from "./components/HeaderCustom";
import LoadingSpinner from "./components/LoadingSpinner";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import "./globals.css";

const { Content } = Layout;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body>
        <LoadingProvider>
          <Layout className="layout">
            <HeaderCustom />
            <Content className="content">
              <ContentWithLoading>{children}</ContentWithLoading>
            </Content>
            <FooterCustom />
          </Layout>
        </LoadingProvider>
      </body>
    </html>
  );
}

function ContentWithLoading({ children }: { children: React.ReactNode }) {
  const { loading } = useLoading();

  return (
    <>
      {loading && <LoadingSpinner />}
      {children}
    </>
  );
}
