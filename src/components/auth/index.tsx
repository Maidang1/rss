import { useState } from "react"
import { Session, createClient } from "@supabase/supabase-js"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useEffectOnce, useSet } from "react-use"
import Cookies from "js-cookie"
import { userStore, userAtom, User, userLoadingAtom } from "@/store/user"
import { useAtom, useSetAtom } from "jotai"

const anonKey = ""
const supabaseUrl = ""

const supabase = createClient(supabaseUrl, anonKey, {
  auth: {
    storageKey: "leaf-user",
    persistSession: true,
  },
})

interface AuthProviderProps {
  children: React.ReactElement
}
export const AuthProvider = (props: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)
  const [userLoading, setUserLoading] = useAtom(userLoadingAtom)
  const setUser = useSetAtom(userAtom)
  const { children } = props
  useEffectOnce(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        if (!session) return
        const { access_token, user } = session
        Cookies.set("userToken", access_token)
        const { app_metadata, user_metadata } = user
        const { provider } = app_metadata
        const {
          avatar_url = "",
          email = "",
          email_verified = false,
          full_name = "",
        } = user_metadata
        const userInfo = {
          avatarUrl: avatar_url,
          email,
          emailVerified: email_verified,
          fullName: full_name,
          provider,
        } as unknown as User
        setUser(userInfo)
      })
      .finally(() => {
        setUserLoading(false)
      })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  })

  if (userLoading) {
    return <div>Loading...</div>
  }
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  }

  return <div>{children}</div>
}
