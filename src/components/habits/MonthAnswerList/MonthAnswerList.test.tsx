import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { MonthAnswersProvider } from "../../../context/MonthAnswersContext";

import MonthAnswersList from "./MonthAnswerList";

describe("Testowanie wyświetlania listy odpowiedzi:", () => {
  test("Sprawdzenie czy lista odpowiedzi jest renderowana poprawnie dla pustej listy", () => {
    render(
      <MonthAnswersProvider>
        <MonthAnswersList />
      </MonthAnswersProvider>
    );
    const toBeLength = 0;
    const listElement = screen.getByRole("list");
    const answerItems = screen.queryAllByRole("listitem");

    expect(listElement).toBeInTheDocument();
    expect(answerItems.length).toBe(toBeLength);
  });

  test("Sprawdzenie czy dodanie odpowiedzi do listy działa poprawnie", async () => {
    render(
      <MonthAnswersProvider>
        <MonthAnswersList />
      </MonthAnswersProvider>
    );

    const inputElement = screen.getByPlaceholderText("Enter your answer");
    const addButton = screen.getByRole("button", { name: "Add Answer" });

    fireEvent.change(inputElement, { target: { value: "New answer" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      const answerItem = screen.queryByText(/New answer/); // używamy wyrażenia regularnego
      expect(answerItem).toBeInTheDocument();
    });
  });
});
// import { render, screen } from "@testing-library/react";
// import { describe, expect, test } from "vitest";

// import MonthAnswersList from "./MonthAnswerList";
// import { MonthAnswersProvider } from "../../../context/MonthAnswersContext";

// describe("Testowanie wyświetlania listy odpowiedzi:", () => {
//   test("Sprawdzenie czy lista odpowiedzi jest renderowana poprawnie", async () => {
//     render(
//       <MonthAnswersProvider>
//         <MonthAnswersList />
//       </MonthAnswersProvider>
//     );

//     const listElement = screen.getByRole("list");
//     const answerItems = await screen.findByRole("listitem");

//     const expectedAnswers = [
//       "Sample answer 1",
//       "Sample answer 2",
//       "Sample answer 3",
//     ];
//     expect(listElement).toBeInTheDocument();
//     expect(answerItems).toBeInTheDocument();
//     expectedAnswers.forEach((answer) => {
//       expect(answerItems).toHaveTextContent(answer);
//     });
//   });
// });
