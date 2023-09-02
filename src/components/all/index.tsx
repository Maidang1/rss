import { Button, Card, CardFooter, Skeleton, Link } from "@nextui-org/react"
import useSWR from "swr"

export const FeedAll = () => {
  const { data, isLoading } = useSWR("/api/feed-all", async (args) => {
    const res = await fetch(args)
    return await res.json()
  })

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg mt-2" />
      </div>
    )
  }
  return (
    <ul className="h-full">
      {data.map((item: any) => (
        <li
          key={item.id}
          className="cursor-pointer flex px-3 py-2 mt-2 mr-2 rounded-md transition-colors decoration-none hover:bg-gray-100 dark:hover:bg-gray-50/10"
        >
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  )
}
