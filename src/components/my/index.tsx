import { userAtom } from "@/store/user"
import { AuthProvider } from "../auth"
import { useAtomValue } from "jotai"
import { Avatar, Select, User } from "@nextui-org/react"
import { SelectFeed } from "./components/select-feed"
export const My = () => {
  const user = useAtomValue(userAtom)
  return (
    <AuthProvider>
      <>
        <div className="flex my-4">
          <div className="flex-1">
            <div className="modify-info ">
              <dl className="form-group my-6">
                <dt>
                  <label htmlFor="user_profile_name" className="text-sm">
                    Name
                  </label>
                </dt>
                <dd>
                  <input
                    className="form-control"
                    type="text"
                    value={user.fullName}
                    name="user[profile_name]"
                    id="user_profile_name"
                    disabled
                  />
                  <div className="note text-xs max-h-4 my-1 text-notice">
                    Your login username
                  </div>
                </dd>
              </dl>
              <dl className="form-group my-6">
                <dt>
                  <label htmlFor="user_profile_name" className="text-sm">
                    Email
                  </label>
                </dt>
                <dd>
                  <input
                    className="form-control"
                    type="text"
                    value={user.email}
                    name="user[profile_name]"
                    id="user_profile_name"
                    disabled
                  />
                  <div className="note text-xs max-h-4 my-1 text-notice">
                    Your login account email
                  </div>
                </dd>
              </dl>
              <dl className="form-group my-6">
                <dt>
                  <label htmlFor="user_profile_name" className="text-sm">
                    Login Platform
                  </label>
                </dt>
                <dd>
                  <input
                    className="form-control"
                    type="text"
                    value={user.provider}
                    name="user[profile_name]"
                    id="user_profile_name"
                    disabled
                  />
                  <div className="note text-xs max-h-4 my-1 text-notice">
                    Your login Platform
                  </div>
                </dd>
              </dl>
              <dl className="form-group my-6">
                <dt>
                  <label htmlFor="user_profile_name" className="text-sm">
                    Select Your custom Rss
                  </label>
                </dt>
                <dd>
                  <SelectFeed />
                </dd>
              </dl>
            </div>
          </div>
          <Avatar src={user.avatarUrl} className="w-40 h-40 text-large" />
        </div>
      </>
    </AuthProvider>
  )
}
