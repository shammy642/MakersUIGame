//imports needed
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CopyToClipboardButton } from "../../src/components/CopyToClipboardButton";
import userEvent from "@testing-library/user-event";

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});
const setIsCopied = vi.fn();

describe("Avatar dropdown", () => {
  test("if is copied is true show copied svg", async () => {
    render(
      <CopyToClipboardButton
        content={"test content"}
        isCopied={true}
        setIsCopied={setIsCopied}
      />
    );
    const imgEl = screen.getByTestId("copied-svg");
    expect(imgEl).toBeDefined();
  });
  test("if is copied is false show clipbaord svg", async () => {
    render(
      <CopyToClipboardButton
        content={"test content"}
        isCopied={false}
        setIsCopied={setIsCopied}
      />
    );
    const imgEl = screen.getByTestId("clipboard-svg");
    expect(imgEl).toBeDefined();
  });
  test("when user clicks on copied", async () => {
    const user = userEvent.setup();
    render(
      <CopyToClipboardButton
        content={"test content"}
        isCopied={false}
        setIsCopied={setIsCopied}
      />
    );
    await user.click(screen.getByRole("button"));

    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toBe("test content");
    expect(setIsCopied).toHaveBeenCalledWith(true)
  });
});
