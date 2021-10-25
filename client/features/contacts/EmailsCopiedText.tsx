import { Typography } from "@material-ui/core"
import { Done } from "@material-ui/icons"
import theme from "client/app/theme"

const EmailsCopiedText: React.FC = () => (
  <div className="root">
    <Done style={{ color: theme.palette.success.dark }} />
    <Typography>¡Emails copiados!</Typography>

    <style jsx>
      {`
        .root {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }
      `}
    </style>
  </div>
)

export default EmailsCopiedText
