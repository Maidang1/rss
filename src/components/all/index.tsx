import { Button, Card, CardFooter, Skeleton, Link } from "@nextui-org/react"
import useSWR from "swr"
import { Chip } from "@nextui-org/react"
export const FeedAll = () => {
  const { data, isLoading, error } = useSWR("/api/feed-all", async (args) => {
    const res = await fetch(args)
    return await res.json()
  })
  console.log("feed-all", data)

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg mt-2" />
      </div>
    )
  }
  if (error) {
    return <div>{error?.message}</div>
  }
  const { data: realData = [] } = data
  return (
    <ul className="h-full">
      {realData.map(({ metaData, data: feedData, _id }: any) => (
        <div key={_id}>
          <Chip className="mt-6">form {metaData?.name || "internet"}</Chip>
          {feedData.map((feed: any) => (
            <li key={feed.url}>
              <a
                href={feed.link}
                className="cursor-pointer flex px-3 py-2 mt-2 mr-2 rounded-md transition-colors decoration-none hover:bg-gray-100 dark:hover:bg-gray-50/10"
              >
                {feed.title}
              </a>
            </li>
          ))}
        </div>
      ))}
    </ul>
  )
}
