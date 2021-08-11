import theme from "../theme"
import MainBar from "./MainBar"
import SearchBar from "./SearchBar"

const Header: React.FC = () => (
  <header>
    <MainBar />
    <SearchBar />

    <style jsx>
      {`
        header {
          background-color: ${theme.palette.primary.light};
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1;
        }
      `}
    </style>
  </header>
)

export default Header
