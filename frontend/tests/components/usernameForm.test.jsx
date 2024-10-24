//tests for the username form component visible on landing

//imports needed 
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { UsernameForm } from "../../src/components/UsernameForm";
import userEvent from "@testing-library/user-event";

describe("Username Form", () => {

//avatar selection tests
  test("given an avatar link it is displayed", () => {
    render(<UsernameForm avatar={"./testroute"}/>)
    const imgEl = screen.getByTestId("avatar-img")
    expect(imgEl).toHaveProperty('src', 'http://localhost:3000/testroute')
  })

//avatar dropdown
  test("user clicks on icon and sees the dropdown", async () => {
    // user sees the username form
    const user = userEvent.setup()
    render(<UsernameForm />)
    //user clicks on the icon
    const buttonEl = screen.getByTestId("select-avatar")
    await user.click(buttonEl)
    //expect dropdown to appear
    const dropdownEl = screen.getByTestId("avatar-dropdown")
    expect(dropdownEl).toBeDefined()
  })

})


