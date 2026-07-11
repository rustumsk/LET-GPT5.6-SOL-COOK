import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Calculator } from "@/components/calculator";

Object.assign(navigator, { clipboard: { writeText: vi.fn() } });

describe("calculator journey", () => {
  it("updates the estimate and reveals a change-order preview", () => {
    render(<Calculator />);
    fireEvent.change(screen.getByLabelText("Hours per ‘small’ request"), {
      target: { value: "4" },
    });
    expect(screen.getByText("$18,720")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /turn the next request/i }),
    );
    expect(screen.getByText("Client-ready preview")).toBeInTheDocument();
  });
});
