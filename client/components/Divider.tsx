const Divider: React.FC = () => (
  <>
    <hr className="divider" />

    <style jsx>
      {`
        :global(article:last-child .divider) {
          display: none;
        }
        .divider {
          width: calc(100vw - 1rem);
        }

        @media screen and (min-width: 600px) {
          .divider {
            display: none;
          }
        }
      `}
    </style>
  </>
)

export default Divider
