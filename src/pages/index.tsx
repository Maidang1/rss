import React from "react"
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react"
import { FeedAll } from "@/components/all"
import { useRouter } from "next/router"
import { My } from "@/components/my"

const tabs = [
  {
    id: "ALL",
    label: "ALL",
    component: <FeedAll />,
  },
  {
    id: "Subscription",
    label: "Subscription",
    component: <div>Subscription</div>,
  },
  {
    id: "More",
    label: "More",
    component: <div>More</div>,
  },
  {
    id: "my",
    label: "MY",
    component: <My />,
  },
]
export default function Home() {
  return (
    <div className="flex w-full flex-col mt-6">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.component}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
