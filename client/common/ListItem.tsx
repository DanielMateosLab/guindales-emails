import { Done } from "@material-ui/icons"

const ListItem: React.FC = ({ children }) => (
  <div>
    <Done />
    {children}

    <style jsx>
      {`
        div {
          list-style-type: none;
          margin: 1rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      `}
    </style>
  </div>
)

export default ListItem
