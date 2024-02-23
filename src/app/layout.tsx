'use client'

import { Provider } from "react-redux";
import MainLayout from "@/client/components/MainLayout";
import { store } from "./store";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <MainLayout>
            {children}
          </MainLayout>
        </Provider>
      </body>
    </html>
  );
}
