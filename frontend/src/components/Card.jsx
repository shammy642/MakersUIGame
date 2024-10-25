export function Card({ children }) {
  return (
    <div className="block w-96 p-6 bg-gray-50 border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-400">
      {children}
    </div>
  );
}
