# L1veSp0rt

## Spuštění

```bash
npm install
npm run dev
```


## Popis projektu:

Aplikace splňuje všechny podmínky zadaného úkolu. Pro svůj projekt jsem zvolil jako základ NextJS, protože se domnívám, že SSR má své místo v některých částech aplikace, které nijak nesouvisí s okamžitým získáním výsledků a mám rád AppRouter :), proto pro stránku spouštíme prefetch nejlepších výsledků (přidal jsem to sám pro konzistenci) a poskytujeme uživateli HTML stránku. Caching je také vhodny při vyhledávání, protože ani zde nejsou data, která by vyžadovala okamžitou aktualizaci. 

Ve vyhledávání je samozřejmě použít debounce, který neumožňuje klientovi odesílat zbytečné požadavky. K tomu jsem si jednoduše stáhl hook, který tento problém řeší za mě. Jako loading stav byl také vybrán skeleton, vyvedl jsem to do samostatné komponenty a staticky zobrazuji 10 prvků při state in debouncting. 

Komponenta Detail byla implementována tak, že data získáváme pomocí React Query, jako klíč se použije název týmu/hráče, protože předpokládáme pozitivní scénář, kdy vyhledávání vždy najde požadovanou hodnotu (V našem úkolu nemáme API pro získání týmu, kdybychom ho měli, udělal bych to jednoduše na SSR bez cache, protože právě v takových datech mohou být ty samé výsledky a okamžité změny, ale to vše musí říct business – moje práce je pouze předpokládat). 

Query jsem implementoval pomocí objektu, který obsahuje konstanty a funkce, což nám umožňuje znovu použít klíč v jakémkoli bodě aplikace a provést invalidaci. 

Snažil jsem se logiku skládat do vlastních hooků, ale bez fanatismu, protože v komponentách s 50 řádky to nemá smysl. Překlady jsem nijak neřešil, zdá se mi to příliš banální pro testovací úkol. V celém projektu jsem se snažil nepoužívat BarelImports. Navíc jsem přidal nějaké testy co taky by měli splňovat tohle zadání.

Taky stojí za to zmínit, že tlačítko search v aplikaci není, podle mě v debouced inputSearch je jiná logika


Aplikace poběží na [http://localhost:3000](http://localhost:3000).

## Příkazy

| Příkaz | Popis |
|--------|------|
| `npm run dev` | Spustí vývojový server |
| `npm test` | Spustí unit testy |

## Konfigurace

Pro práci s API je potřeba nastavit proměnné prostředí v souboru `.env`: (Z ukolu)

- `NEXT_PUBLIC_API_BASE` — základní URL API (search, top-search endpointy)
- `NEXT_PUBLIC_IMAGE_BASE` — základní URL pro obrázky

## Funkce

- **Vyhledávání** — debounced vyhledávání sportovních entit s filtrováním podle typu (Vše, Soutěže, Účastníci)
- **Top výsledky** — zobrazení populárních výsledků při prvním načtení
- **Detail** — stránka s detailem entity (tým, soutěž)
- **Skeleton loading** — animované placeholdery během načítání

## Technologie

- **Next.js 16**
- **React 19**
- **TanStack Query** — správa cache a SSR
- **Tailwind CSS**
- **TypeScript**
- **Jest + React Testing Library** — testování

## Struktura projektu

```
app/
  search/          # Stránka vyhledávání
  detail/          # Stránka detailu entity
lib/
  api/             # API klient a typy
components/        # Sdílené komponenty
```
