/**
 * Adds styles to the main element
 */
const ContactListContainer: React.FC = ({ children }) => (
  <main className="contact-list-container">
    {children}

    <style jsx>
      {`
          .contact-list-container {
            padding: .5rem 1rem 1rem 1rem}
          }

          @media screen and (min-width: 600px) {
           .contact-list-container {
            padding: .5rem 2rem 0}
          } 
          }
        `}
    </style>
  </main>
)

export default ContactListContainer
