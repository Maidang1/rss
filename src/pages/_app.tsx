import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { LayoutHeader } from "@/components/header"
import { Providers } from "@/components/provider"
import { AuthProvider } from "@/components/auth"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <LayoutHeader />
      <div className="max-w-[1024px] w-full h-full overflow-auto mx-auto">
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
    </Providers>
  )
}
