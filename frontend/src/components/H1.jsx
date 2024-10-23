export const H1 = ({ children }) => {
    return (
        <h1 data-testid="game-name" className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            { children }
        </h1>
    )
}