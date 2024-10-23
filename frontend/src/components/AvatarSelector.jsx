import { useEffect, useState} from "react";
import { socket } from "../socket";

const avatars = import.meta.glob("/src/assets/*.png", { eager: true });

export function AvatarDropdown({ setAvatar, isOpen, setAvatarOpen}) {
    const [avatarOptions, setAvatarOptions] = useState([]);

    useEffect(() => {
        const avatarUrls = Object.keys(avatars).map((key) => avatars[key].default || avatars[key]);
        setAvatarOptions(avatarUrls);
    }, []);

    const handleAvatarClick = (newAvatar) => {
        setAvatar(newAvatar);
        socket.emit("avatar-selected", newAvatar);
        setAvatarOpen(false);
    };

    return (
        <>
        {isOpen && (
            <div
            id="dropdownUsers"
            className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
            >
            <ul
                className="h-48 py-2 overflow-y-auto grid grid-cols-3 gap-4 p-4"
                aria-labelledby="dropdownUsersButton"
            >
                {avatarOptions.length > 0 ? (
                avatarOptions.map((avatar, index) => (
                    <li key={index} className="flex justify-center">
                    <div
                        onClick={() => handleAvatarClick(avatar)}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <img
                        className="w-6 h-6 me-2 rounded-full"
                        src={avatar}
                        alt={`Avatar ${index}`}
                        />
                    </div>
                    </li>
                ))
                ) : (
                <li>No avatars found</li>
                )}
            </ul>
            </div>
        )}
        </>
    );
}
