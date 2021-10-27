import { Done } from "@material-ui/icons"

const ListItem: React.FC = ({ children }) => (
  <li>
    <Done />
    {children}

    <style jsx>
      {`
        li {
          list-style-type: none;
          padding-left: 1rem;
          margin: 1rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      `}
    </style>
  </li>
)

export default ListItem
