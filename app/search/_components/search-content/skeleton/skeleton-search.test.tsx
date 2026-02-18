import { render, screen } from "@testing-library/react";
import { SkeletonSearch } from "./skeleton-search";

describe("SkeletonSearch", () => {
  it("renders 10 skeleton items", () => {
    render(<SkeletonSearch />);
    const skeletonItems = screen.getAllByRole("status");
    expect(skeletonItems).toHaveLength(10);
  });

  it("each skeleton has animate-pulse class for loading animation", () => {
    const { container } = render(<SkeletonSearch />);
    const skeletonItems = container.querySelectorAll('[role="status"]');
    skeletonItems.forEach((item) => {
      expect(item).toHaveClass("animate-pulse");
    });
  });
});
