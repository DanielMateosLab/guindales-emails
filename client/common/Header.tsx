import theme from "client/app/theme"
import SearchBar from "client/features/contacts/SearchBar"
import MainBar from "./MainBar"

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
