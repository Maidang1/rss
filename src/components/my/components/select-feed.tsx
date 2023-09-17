import { Select, SelectItem } from "@nextui-org/react"
import { useState } from "react"
import useSWR from "swr"
import React from "react"
import { userAtom } from "@/store/user"
import { useAtomValue } from "jotai"

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
]

export function SelectFeed() {
  const [values, setValues] = useState([])
  const user = useAtomValue(userAtom)
  const { isLoading, data: feedLinkData } = useSWR(
    `/api/user-feed-link?name=${user.fullName}&email=${user.email}`,
    async (args) => {
      const data = await fetch(args, {
        method: "GET",
      })
      return data.json()
    }
  )
  if (isLoading) {
    return <div>loading</div>
  }
  const { subscribeRss = [] } = feedLinkData.data
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Favorite Animal"
        selectionMode="multiple"
        placeholder="Select an animal"
        selectedKeys={values}
        className="max-w-xs"
        defaultValue={subscribeRss.map(({ name }: any) => name)}
        onSelectionChange={(values) => {
          setValues(values as any)
        }}
      >
        {subscribeRss.map(({ name, url }: any) => (
          <SelectItem key={url} value={url}>
            {name}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
