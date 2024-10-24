// A component for the HTML footer to use on all pages
export function Footer() {
  return (
      <footer className="bg-gray-800 text-white w-screen">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
          {/* Bottom left */}
          <div className="text-left">
            <p>
              Built using React and the{" "}
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:underline"
              >
                PokeAPI
              </a>{" "}
            </p>
          </div>

          {/* Center */}
          <div className="text-center">
            <p>
              Created with{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="inline-block text-red-500 mx-1"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>{" "}
              by{" "}
              <a
                href="https://github.com/Alexia-May"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Alexia
              </a>
              ,{" "}
              <a
                href="https://github.com/shammy642"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Sam
              </a>
              ,{" "}
              <a
                href="https://github.com/JHLincoln"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                James
              </a>
              ,{" "}
              <a
                href="https://github.com/lucfercas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Lucy
              </a>
              , and{" "}
              <a
                href="https://github.com/aulus-plautius"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Joe
              </a>{" "}
              in 8 days!
            </p>
          </div>

          {/* Bottom right */}
          <div className="text-right">
            <a
              href="https://github.com/shammy642/MakersUIGame"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                width="24"
                height="24"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.014 8.014 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
  );
}
