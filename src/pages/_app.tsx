import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { LayoutHeader } from "@/components/header"
import { Providers } from "@/components/provider"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <LayoutHeader />
      <Component {...pageProps} />
    </Providers>
  )
}
