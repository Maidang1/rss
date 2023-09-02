import { CLIENT_ID, WEBSITE_URL } from "@/config/user"
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarBrand,
  Skeleton,
  Avatar,
  User,
} from "@nextui-org/react"
import useSWR from "swr"
import NextLink from "next/link"

export const LayoutHeader = () => {
  const { data, isLoading } = useSWR("api/user", async (args) => {
    const res = await fetch(args)
    return await res.json()
  })
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
        {isLoading ? (
          <>
            <Skeleton className="flex rounded-full w-8 h-8" />
            <Skeleton className="rounded w-[60px] h-[20px]" />
          </>
        ) : (
          <>
            {data?.id ? (
              <User
                name={data.name}
                avatarProps={{
                  src: data.avatar_url,
                  size: "sm",
                }}
              />
            ) : (
              <Button
                className="rounded-full w-10 h-10"
                as={Link}
                onClick={(e) => {
                  e.preventDefault()
                  window.open(
                    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${WEBSITE_URL}/api/login`
                  )
                }}
                variant="flat"
              >
                Login
              </Button>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
