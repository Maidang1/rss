import { CLIENT_ID, WEBSITE_URL } from "@/config/user"
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  Skeleton,
  Avatar,
  User,
} from "@nextui-org/react"
import useSWR from "swr"
import NextLink from "next/link"
import { useAtomValue } from "jotai"
import { userLoadingAtom, userAtom } from "@/store/user"
import { useRouter } from "next/router"
import { AUTH_ROUTER } from "@/constance"

export const LayoutHeader = () => {
  const router = useRouter()
  const { route } = router
  const isAuthPath = AUTH_ROUTER.has(route)
  const loading = useAtomValue(userLoadingAtom)
  const user = useAtomValue(userAtom)
  return (
    <Navbar isBordered className="flex w-full">
      <NavbarContent justify="start">
        <NavbarBrand>
          <NextLink className="font-bold text-inherit cursor-pointer" href="/">
            MaiDang Rss
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {loading && isAuthPath ? (
          <>
            <Skeleton className="flex rounded-full w-8 h-8" />
            <Skeleton className="rounded w-[60px] h-[20px]" />
          </>
        ) : (
          <>
            {user?.fullName ? (
              <User
                name={user.fullName}
                avatarProps={{
                  src: user.avatarUrl,
                  size: "sm",
                }}
              />
            ) : (
              <Avatar name="" />
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
