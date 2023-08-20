import { peoplesConfig } from "@/config/user"
import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react"
import {
  AiFillGithub,
  AiFillZhihuCircle,
  AiFillTwitterCircle,
} from "react-icons/ai"
import NextLink from "next/link"

export default function People() {
  return (
    <div className="flex max-w-[700px] m-auto px-8 text-black dark:text-white mt-6">
      {Object.keys(peoplesConfig).map((user) => {
        const content = peoplesConfig[user as keyof typeof peoplesConfig]
        const { name, github, images, zhihu } = content
        return (
          <NextLink href={`/rss/${user}`} key={user}>
            <Card className="w-[200px] cursor-pointer">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height="40"
                  radius="sm"
                  src={images}
                  width="40"
                />
                <div className="flex flex-col">
                  <p className="text-md">{name}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex">
                  <span>{github && <AiFillGithub />}</span>
                  <span className="ml-1">
                    {github && <AiFillZhihuCircle />}
                  </span>
                  <span className="ml-1">
                    {github && <AiFillTwitterCircle />}
                  </span>
                </div>
              </CardBody>
            </Card>
          </NextLink>
        )
      })}
    </div>
  )
}
