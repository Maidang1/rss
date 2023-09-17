import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { LayoutHeader } from "@/components/header"
import { Providers } from "@/components/provider"
import { AuthProvider } from "@/components/auth"
import { useRouter } from "next/router"
import { AUTH_ROUTER } from "@/constance"
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { route } = router
  const isAuthPath = AUTH_ROUTER.has(route)
  return (
    <Providers>
      <LayoutHeader />
      <div className="max-w-[1024px] w-full h-full overflow-auto mx-auto">
        {isAuthPath ? (
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        ) : (
          <>
            <Component {...pageProps} />
          </>
        )}
      </div>
    </Providers>
  )
}
