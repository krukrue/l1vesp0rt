export interface SearchImage {
  path: string;
  usageId: number;
  variantTypeId: number;
}

export interface SearchCountryImage {
  path: string;
  usageId: number;
  variantTypeId: number;
}

export interface SearchCountry {
  id: number;
  name: string;
  images: SearchCountryImage[];
}

export interface SearchItem {
  id: string;
  url: string;
  name: string;
  type: { id: number; name: string };
  sport: { id: number; name: string };
  images: SearchImage[];
  defaultCountry: SearchCountry | null;
}
