import { useRouter } from "next/router"
import useSWR from "swr"
import { Code, Skeleton } from "@nextui-org/react"
import NextLink from "next/link"

export default function Rss() {
  const router = useRouter()
  const user = router.query.name || "maidang1"

  const { data, error, isLoading } = useSWR(
    ["/api/rsshub", user],
    async ([url, user]) => {
      const reqBody = {
        user,
      }
      const data = await fetch(url, {
        method: "POST",
        body: JSON.stringify(reqBody),
      })
      return data.json()
    }
  )

  if (error) return <div>error</div>
  if (isLoading)
    return (
      <div className="w-full flex flex-col gap-2 mt-6">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    )

  return (
    <main className="px-8 mx-auto mt-6">
      {data.map(({ tag, item, author }: any) => (
        <div
          key={tag}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6"
        >
          {item.map((feed: any) => {
            return (
              <NextLink
                href={feed.link}
                key={feed.link}
                className="rounded-lg border border-border bg-card text-card-foreground transition-transform hover:scale-[1.01] h-full"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="text-lg font-semibold leading-normal tracking-tight">
                    {feed.title}
                  </h3>
                  <p className="text-sm text-black opacity-70">{author}</p>
                  <p className="text-sm text-black opacity-70">
                    {feed.pubDate}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <p className="break-all text-ellipsis line-clamp-2">
                    {feed.description}
                  </p>
                </div>
                <div>
                  <Code color="secondary" className="m-3">
                    {tag}
                  </Code>
                </div>
              </NextLink>
            )
          })}
        </div>
      ))}
    </main>
  )
}
