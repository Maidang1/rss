import { useEffect, useState } from "react"
import { Session, createClient } from "@supabase/supabase-js"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useEffectOnce } from "react-use"
import { Button } from "@nextui-org/react"

const anonKey = process.env.SUPABASE_ANON_KEY as string
const supabaseUrl = process.env.SUPABASE_URL as string

const supabase = createClient(supabaseUrl, anonKey, {
  auth: {
    persistSession: true,
  },
})

interface AuthProviderProps {
  children: React.ReactElement
}
export const AuthProvider = (props: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)
  const { children } = props
  useEffectOnce(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  })

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
  }

  return (
    <div>
      {JSON.stringify(session)}
      <Button onClick={() => supabase.auth.signOut()}>logout</Button>
    </div>
  )
}
