//imports needed 
import { render, screen } from "@testing-library/react";
import { describe, expect, test,vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { AvatarDropdown } from "../../src/components/AvatarDropdown";
import { socket } from "../../src/socket";


vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});
const setAvatar = vi.fn()
const setAvatarOpen = vi.fn()
 
describe("Avatar dropdown", () => {
    test('user can select a specific avatar', async () => {
      const user = userEvent.setup()
    //user sees the avatar list
    render(<AvatarDropdown setAvatar={setAvatar} isOpen={true} setAvatarOpen={setAvatarOpen}/>)
    //user clicks on an avatar
    const avatarEl = screen.getByAltText("Avatar 0")
    await user.click(avatarEl)
    //handle click is called
    expect(setAvatar).toHaveBeenCalledWith("/src/assets/1.png")
    expect(socket.emit).toHaveBeenCalledWith("avatar-selected","/src/assets/1.png")
    expect(setAvatarOpen).toHaveBeenCalledWith(false)

    })
  })
  

