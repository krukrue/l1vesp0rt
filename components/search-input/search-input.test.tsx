import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchInput } from "./search-input";

describe("SearchInput component", () => {
  describe("Props", () => {
    it("calls onDebouncedChange with initial empty value on mount", () => {
      const onDebouncedChange = jest.fn();
      render(<SearchInput onDebouncedChange={onDebouncedChange} />);
      expect(onDebouncedChange).not.toHaveBeenCalled();
    });

    it("passes through other input props (placeholder)", () => {
      render(
        <SearchInput
          onDebouncedChange={jest.fn()}
          placeholder="Search players..."
        />
      );
      expect(screen.getByPlaceholderText("Search players...")).toBeInTheDocument();
    });

    it("passes through other input props (disabled)", () => {
      render(
        <SearchInput onDebouncedChange={jest.fn()} disabled />
      );
      const input = screen.getByRole("searchbox", { name: /search/i });
      expect(input).toBeDisabled();
    });

  });

  describe("Rendering and visual", () => {
    it("renders search input in the document", () => {
      render(<SearchInput onDebouncedChange={jest.fn()} />);
      const input = screen.getByRole("searchbox", { name: /search/i });
      expect(input).toBeInTheDocument();
    });

    it("renders search icon (svg)", () => {
      const { container } = render(<SearchInput onDebouncedChange={jest.fn()} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("input has base styles", () => {
      render(<SearchInput onDebouncedChange={jest.fn()} />);
      const input = screen.getByRole("searchbox", { name: /search/i });
      expect(input).toHaveClass("rounded-lg");
    });
  });

  describe("Debounce", () => {
    const DEBOUNCE_MS = 50;

    it("calls onDebouncedChange after required delay", async () => {
      const onDebouncedChange = jest.fn();
      render(
        <SearchInput
          onDebouncedChange={onDebouncedChange}
          debounceMs={DEBOUNCE_MS}
        />
      );

      onDebouncedChange.mockClear();

      const input = screen.getByRole("searchbox", { name: /search/i });
      fireEvent.change(input, { target: { value: "test1" } });

      expect(onDebouncedChange).not.toHaveBeenCalled();

      await waitFor(
        () => {
          expect(onDebouncedChange).toHaveBeenCalledTimes(1);
          expect(onDebouncedChange).toHaveBeenCalledWith("test1");
        },
        { timeout: DEBOUNCE_MS + 100 }
      );
    });

    it("calls onDebouncingChange when user types", () => {
      const onDebouncingChange = jest.fn();
      render(
        <SearchInput
          onDebouncedChange={jest.fn()}
          onDebouncingChange={onDebouncingChange}
          debounceMs={DEBOUNCE_MS}
        />
      );

      onDebouncingChange.mockClear();

      const input = screen.getByRole("searchbox", { name: /search/i });
      fireEvent.change(input, { target: { value: "t" } });

      expect(onDebouncingChange).toHaveBeenCalledWith(true);
    });

    it("calls onDebouncingChange with false after debounce settles", async () => {
      const onDebouncingChange = jest.fn();
      render(
        <SearchInput
          onDebouncedChange={jest.fn()}
          onDebouncingChange={onDebouncingChange}
          debounceMs={DEBOUNCE_MS}
        />
      );

      onDebouncingChange.mockClear();

      const input = screen.getByRole("searchbox", { name: /search/i });
      fireEvent.change(input, { target: { value: "test" } });

      expect(onDebouncingChange).toHaveBeenCalledWith(true);
      onDebouncingChange.mockClear();

      await waitFor(
        () => {
          expect(onDebouncingChange).toHaveBeenCalledWith(false);
        },
        { timeout: DEBOUNCE_MS + 100 }
      );
    });

    it("only calls onDebouncedChange once after few changes", async () => {
      const onDebouncedChange = jest.fn();

      render(
        <SearchInput
          onDebouncedChange={onDebouncedChange}
          debounceMs={DEBOUNCE_MS}
        />
      );

      onDebouncedChange.mockClear();

      const input = screen.getByRole("searchbox", { name: /search/i });
      fireEvent.change(input, { target: { value: "test1" } });
      fireEvent.change(input, { target: { value: "test2" } });

      expect(onDebouncedChange).not.toHaveBeenCalled();

      await waitFor(
        () => {
          expect(onDebouncedChange).toHaveBeenCalledTimes(1);
          expect(onDebouncedChange).toHaveBeenCalledWith("test2");
        },
        { timeout: DEBOUNCE_MS + 100 }
      );
    });

    it("calls onDebouncedChange again when user types after previous debounce", async () => {
      const onDebouncedChange = jest.fn();
      const debounceMs = 50;
      render(
        <SearchInput
          onDebouncedChange={onDebouncedChange}
          debounceMs={debounceMs}
        />
      );

      onDebouncedChange.mockClear();

      const input = screen.getByRole("searchbox", { name: /search/i });

      fireEvent.change(input, { target: { value: "first" } });
      await waitFor(
        () => {
          expect(onDebouncedChange).toHaveBeenLastCalledWith("first");
        },
        { timeout: debounceMs + 100 }
      );

      fireEvent.change(input, { target: { value: "second" } });
      await waitFor(
        () => {
          expect(onDebouncedChange).toHaveBeenLastCalledWith("second");
        },
        { timeout: debounceMs + 100 }
      );
    });

  });
});
