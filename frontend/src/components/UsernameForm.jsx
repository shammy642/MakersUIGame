// A form that allows a user to input tet and numbers
import { useState } from "react";
import { AvatarDropdown } from "./AvatarSelector";

export function UsernameForm({ input, setInput, avatar, setAvatar, error }) {
  const [avatarOpen, setAvatarOpen] = useState(false);
  //const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <>
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <div className="flex">
        <span
            className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 cursor-pointer"
            onClick={() => setAvatarOpen(!avatarOpen)}  // Toggle avatar dropdown on click
          >
            {avatar ? (
              <img className="w-8 h-8 rounded-full" src={avatar} alt="Selected Avatar" />
            ) : (
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            )}
          </span>
          <input
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            id="website-admin"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
          ></input>
            {error && <p data-testid='username-error'>{error}</p>}
        </div>
        {avatarOpen && (
          <div className="absolute z-10">
            <AvatarDropdown setAvatar={setAvatar} isOpen={avatarOpen} />
          </div>
        )}
      </form>
    </>
  );
}
