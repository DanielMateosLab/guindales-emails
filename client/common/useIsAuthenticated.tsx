import { useSession } from "next-auth/react"

export default function useIsAuthenticated() {
  const { status } = useSession({ required: false })

  return status == "authenticated"
}
