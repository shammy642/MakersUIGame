// A paragraph to use in a card for text compatible with dark/light mode
export function CardText({children}) {
    return (
      <>
        <div className="font-normal text-gray-700 dark:text-gray-400">
            {children}
        </div>
      </>
    )
  }