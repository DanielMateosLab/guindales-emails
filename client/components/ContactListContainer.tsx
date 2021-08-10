/**
 * Adds styles to the main element
 */
const ContactListContainer: React.FC = ({ children }) => (
  <main>
    {children}

    <style jsx>
      {`
        main {
          padding: 0.5rem 1rem 1rem 1rem;
        }

        @media screen and (min-width: 600px) {
          main {
            padding: 0.5rem 2rem 0;
          }
        }
      `}
    </style>
  </main>
)

export default ContactListContainer
