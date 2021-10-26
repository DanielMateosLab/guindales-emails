import CheckingSession from "client/common/CheckingSession"
import { useSession } from "next-auth/react"

export default function Home() {
  const { status } = useSession({ required: false })

  if (status == "loading") return <CheckingSession />

  return <div className="app-container"></div>
}
