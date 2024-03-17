import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import DropdownMenu from "./DropdownMenu";

const ZERO = 0;

describe("Dropodown menu tests", () => {
  test("After pass props component render title and items", async () => {
    //ARRANGE
    const header = "Header";
    const menuItems = [{ title: "One" }, { title: "Two" }];
    render(<DropdownMenu buttonTitle={header} itemTitles={menuItems} />);
    //ACT
    const title = screen.getByText(header);
    await fireEvent.click(title);
    const el1 = screen.getByText(menuItems[ZERO].title); // Użycie stałej zamiast magicznej liczby 0

    const menuOnScreen = await screen.findAllByRole("menuitem");
    screen.debug();

    //ASSERT
    // expect(title).toBeInTheDocument()
    // expect(el1).toBeInTheDocument()
    expect(title).toBeTruthy();
    expect(el1).toBeTruthy();
    expect(menuOnScreen.length).toBe(menuItems.length);
    // expect(menuOnScreen.length).toBe(menuItems.length);
  });
});
