import useIsAuthenticated from "client/common/useIsAuthenticated"
import CheckingSession from "client/features/authentication/CheckingSession"

export default function Home() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) return <div className="app-container"></div>

  return <CheckingSession redirectAuthenticated />
}
