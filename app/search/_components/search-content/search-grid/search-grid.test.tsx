import { render, screen } from "@testing-library/react";
import { SearchGrid } from "./search-grid";
import type { SearchItem } from "@/lib/api/types";
import { groupBySport } from "./utils/utils";

const TOTTENHAM_HOTSPUR_NAME = "Tottenham Hotspur";
const TOTTENHAM_HOTSPUR_ID = "tottenham-hotspur";
const MANCHESTER_UNITED_NAME = "Manchester United";
const MANCHESTER_UNITED_ID = "manchester-united";
const NEW_YORK_RANGERS_NAME = "New York Rangers";
const NEW_YORK_RANGERS_ID = "new-york-rangers";
const ROCKETS_NAME = "Rockets";
const ROCKETS_ID = "rockets";

const FOOTBALL_NAME = "Football";
const FOOTBALL_ID = 1;
const HOCKEY_NAME = "Hockey";
const HOCKEY_ID = 2;
const BASEBALL_NAME = "Baseball";
const BASEBALL_ID = 3;


function createMockItem(overrides: Partial<SearchItem> = {}): SearchItem {
  return {
    id: TOTTENHAM_HOTSPUR_ID,
    url: TOTTENHAM_HOTSPUR_ID,
    name: TOTTENHAM_HOTSPUR_NAME,
    type: { id: 1, name: "Competition" },
    sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME },
    images: [{ path: "logo.png", usageId: 1, variantTypeId: 1 }],
    defaultCountry: null,
    ...overrides,
  };
}

describe("SearchGrid", () => {
  it("renders empty list when no data", () => {
    const { container } = render(<SearchGrid data={[]} />);
    const sections = container.querySelectorAll("section");
    expect(sections).toHaveLength(0);
  });

  it("renders items grouped by sport", () => {
    const data: SearchItem[] = [
      createMockItem({ id: TOTTENHAM_HOTSPUR_ID, name: TOTTENHAM_HOTSPUR_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: NEW_YORK_RANGERS_ID, name: NEW_YORK_RANGERS_NAME, sport: { id: HOCKEY_ID, name: HOCKEY_NAME } }),
      createMockItem({ id: ROCKETS_ID, name: ROCKETS_NAME, sport: { id: BASEBALL_ID, name: BASEBALL_NAME } }),
    ];

    render(<SearchGrid data={data} />);

    expect(screen.getByRole("heading", { name: FOOTBALL_NAME })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: HOCKEY_NAME })).toBeInTheDocument();
    expect(screen.getByText(TOTTENHAM_HOTSPUR_NAME)).toBeInTheDocument();
    expect(screen.getByText(NEW_YORK_RANGERS_NAME)).toBeInTheDocument();
    expect(screen.getByText(ROCKETS_NAME)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: BASEBALL_NAME })).toBeInTheDocument();
  });

  it("groups multiple items of same sport together", () => {
    const data: SearchItem[] = [
      createMockItem({ id: TOTTENHAM_HOTSPUR_ID, name: TOTTENHAM_HOTSPUR_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: MANCHESTER_UNITED_ID, name: MANCHESTER_UNITED_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
    ];

    render(<SearchGrid data={data} />);

    const footballHeadings = screen.getAllByRole("heading", { name: /football/i });
    expect(footballHeadings).toHaveLength(1);
    expect(screen.getByText(TOTTENHAM_HOTSPUR_NAME)).toBeInTheDocument();
    expect(screen.getByText(MANCHESTER_UNITED_NAME)).toBeInTheDocument();
  });

  it("sorts sport groups by item count descending", () => {
    const data: SearchItem[] = [
      createMockItem({ id: TOTTENHAM_HOTSPUR_ID, name: TOTTENHAM_HOTSPUR_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: MANCHESTER_UNITED_ID, name: MANCHESTER_UNITED_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: NEW_YORK_RANGERS_ID, name: NEW_YORK_RANGERS_NAME, sport: { id: HOCKEY_ID, name: HOCKEY_NAME } }),
    ];

    const { container } = render(<SearchGrid data={data} />);
    const headings = container.querySelectorAll("h3");

    expect(headings[0].textContent).toBe(FOOTBALL_NAME);
    expect(headings[1].textContent).toBe(HOCKEY_NAME);
  });
});


describe("groupBySport", () => {
  it("groups items by sport", () => {
    const data: SearchItem[] = [
      createMockItem({ id: TOTTENHAM_HOTSPUR_ID, name: TOTTENHAM_HOTSPUR_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: MANCHESTER_UNITED_ID, name: MANCHESTER_UNITED_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: NEW_YORK_RANGERS_ID, name: NEW_YORK_RANGERS_NAME, sport: { id: HOCKEY_ID, name: HOCKEY_NAME } }),
    ];

    const result = groupBySport(data);
    expect(result[0].sport.name).toBe(FOOTBALL_NAME);
    expect(result[1].sport.name).toBe(HOCKEY_NAME);
    expect(result[0].items.length).toBe(2);
    expect(result[1].items.length).toBe(1);
  });

  it("sorts sport groups by item count descending", () => {
    const data: SearchItem[] = [
      createMockItem({ id: TOTTENHAM_HOTSPUR_ID, name: TOTTENHAM_HOTSPUR_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: MANCHESTER_UNITED_ID, name: MANCHESTER_UNITED_NAME, sport: { id: FOOTBALL_ID, name: FOOTBALL_NAME } }),
      createMockItem({ id: NEW_YORK_RANGERS_ID, name: NEW_YORK_RANGERS_NAME, sport: { id: HOCKEY_ID, name: HOCKEY_NAME } }),
      createMockItem({ id: ROCKETS_ID, name: ROCKETS_NAME, sport: { id: BASEBALL_ID, name: BASEBALL_NAME } }),
    ];

    const result = groupBySport(data);  
    expect(result[0].sport.name).toBe(FOOTBALL_NAME);
    expect(result[1].sport.name).toBe(HOCKEY_NAME);
    expect(result[2].sport.name).toBe(BASEBALL_NAME);
    expect(result[0].items.length).toBe(2);
    expect(result[1].items.length).toBe(1);
    expect(result[2].items.length).toBe(1);
  });
});