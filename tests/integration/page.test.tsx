import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Calculator } from "@/components/calculator";

const writeText = vi.fn().mockResolvedValue(undefined);
Object.assign(navigator, { clipboard: { writeText } });

describe("calculator journey", () => {
  beforeEach(() => writeText.mockClear());
  afterEach(cleanup);
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

  it("offers transparent starting examples", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole("button", { name: "Solo studio" }));
    expect(screen.getByLabelText("Typical project value")).toHaveValue(6000);
    expect(
      screen.getByText("Examples, not industry benchmarks."),
    ).toBeInTheDocument();
  });

  it("keeps partial input stable and disables the result action", () => {
    render(<Calculator />);
    fireEvent.change(screen.getByLabelText("Typical project value"), {
      target: { value: "" },
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /turn the next request/i }),
    ).toBeDisabled();
  });

  it("shares only the public calculator link", async () => {
    render(<Calculator />);
    fireEvent.click(
      screen.getByRole("button", { name: /share this free calculator/i }),
    );
    expect(writeText).toHaveBeenCalledWith(
      expect.stringMatching(/#calculator$/),
    );
    expect(await screen.findByText("Link copied ✓")).toBeInTheDocument();
    expect(
      screen.getByText(/never your calculator inputs/i),
    ).toBeInTheDocument();
  });
});
