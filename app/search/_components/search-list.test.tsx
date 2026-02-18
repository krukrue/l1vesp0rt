import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchList } from "./search-list";

jest.mock("../_hooks/use-search-input", () => ({
  useSearchInput: jest.fn(),
}));

jest.mock("../_hooks/use-search-list", () => ({
  useSearchDataList: jest.fn(() => ({
    data: [],
    error: null,
    refetch: jest.fn(),
  })),
}));

const useSearchInput = jest.requireMock("../_hooks/use-search-input")
  .useSearchInput as jest.Mock;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("SearchList", () => {
  it("shows skeleton when debouncing", () => {
    useSearchInput.mockReturnValue({
      searchValue: "test",
      isDebouncing: true,
      onDebouncingChange: jest.fn(),
      onDebouncedChange: jest.fn(),
    });

    render(<SearchList />, { wrapper });

    const skeletonItems = screen.getAllByRole("status");
    expect(skeletonItems.length).toBeGreaterThan(0);
  });

  it("does not show skeleton when not debouncing", () => {
    useSearchInput.mockReturnValue({
      searchValue: "",
      isDebouncing: false,
      onDebouncingChange: jest.fn(),
      onDebouncedChange: jest.fn(),
    });

    render(<SearchList />, { wrapper });

    const skeletonItems = screen.queryAllByRole("status");
    expect(skeletonItems).toHaveLength(0);
  });
});
