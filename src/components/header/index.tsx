import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react"
import NextLink from "next/link"

export const LayoutHeader = () => {
  return (
    <Navbar isBordered className="flex justify-start">
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem isActive>
          <Link href="/" color="primary" isBlock as={NextLink}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/people" color="foreground" isBlock as={NextLink}>
            People
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
