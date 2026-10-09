import styles from "./AppTile.module.css";

type TileSpec = { bg: string; ink: string; d: string };

/**
 * Generic category tiles (mail, maps, music…) standing in for "your apps".
 * Deliberately brand-free: simple one-path pictograms on flat colours.
 */
export const APP_TILES: Record<string, TileSpec> = {
  mail: { bg: "#ffffff", ink: "#3d8cf0", d: "M10 15h28v18H10zM10 15l14 11 14-11" },
  calendar: { bg: "#ffffff", ink: "#ec5f4a", d: "M12 14h24v22H12zM12 20h24M18 10v6M30 10v6" },
  map: { bg: "#e8f4e4", ink: "#5fa47a", d: "M24 38s-10-9-10-16a10 10 0 0 1 20 0c0 7-10 16-10 16zM24 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6" },
  music: { bg: "#1f2225", ink: "#9fe6c4", d: "M20 33V14l14-3v19M20 33a4 4 0 1 1-4-4 4 4 0 0 1 4 4zM34 30a4 4 0 1 1-4-4 4 4 0 0 1 4 4" },
  camera: { bg: "#2d2926", ink: "#f5eee1", d: "M10 18h7l3-4h8l3 4h7v16H10zM24 31a5 5 0 1 0 0-10 5 5 0 0 0 0 10" },
  chat: { bg: "#5fc27a", ink: "#ffffff", d: "M12 14h24v15H22l-6 5v-5h-4z" },
  play: { bg: "#ec5f4a", ink: "#ffffff", d: "M20 16v16l13-8z" },
  photo: { bg: "#ffffff", ink: "#f29b38", d: "M10 14h28v20H10zM12 32l8-9 6 6 4-4 6 7" },
  notes: { bg: "#ffd27a", ink: "#6b4a33", d: "M14 12h20v24H14zM18 18h12M18 23h12M18 28h8" },
  cart: { bg: "#ffffff", ink: "#7f6cc9", d: "M10 13h5l4 16h15l3-11H17M21 35a2 2 0 1 0 0-.1M32 35a2 2 0 1 0 0-.1" },
  cloud: { bg: "#a8dcf5", ink: "#ffffff", d: "M16 32a7 7 0 0 1 1-14 9 9 0 0 1 17 2 6 6 0 0 1-1 12z" },
  card: { bg: "#36507a", ink: "#ffd27a", d: "M10 16h28v17H10zM10 21h28M14 29h8" },
  phone: { bg: "#5fc27a", ink: "#ffffff", d: "M17 11l4 7-3 3a16 16 0 0 0 9 9l3-3 7 4-2 5c-12 0-22-10-22-22z" },
  clock: { bg: "#2d2926", ink: "#ffffff", d: "M24 37a13 13 0 1 0 0-26 13 13 0 0 0 0 26zM24 17v7l5 3" },
  weather: { bg: "#5ab3e3", ink: "#ffffff", d: "M20 22a6 6 0 1 1 6 6h-10a5 5 0 0 1 0-10" },
  book: { bg: "#f29b38", ink: "#ffffff", d: "M12 13h10a2 2 0 0 1 2 2v20a3 3 0 0 0-3-3h-9zM36 13H26a2 2 0 0 0-2 2v20a3 3 0 0 1 3-3h9z" },
  game: { bg: "#7f6cc9", ink: "#ffffff", d: "M14 18h20a5 5 0 0 1 5 6l-2 7a3 3 0 0 1-5 1l-3-3h-10l-3 3a3 3 0 0 1-5-1l-2-7a5 5 0 0 1 5-6zM17 24h6M20 21v6" },
  health: { bg: "#ffffff", ink: "#ec5f4a", d: "M24 36s-12-7-12-15a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 15-12 15z" },
  folder: { bg: "#3d8cf0", ink: "#ffffff", d: "M10 15h10l3 3h15v16H10z" },
  news: { bg: "#ffffff", ink: "#2d2926", d: "M11 13h22v22H14a3 3 0 0 1-3-3zM33 19h4v13a3 3 0 0 1-3 3M15 18h14M15 23h14M15 28h9" },
  mic: { bg: "#c7b8f0", ink: "#ffffff", d: "M24 28a5 5 0 0 0 5-5v-7a5 5 0 0 0-10 0v7a5 5 0 0 0 5 5zM16 23a8 8 0 0 0 16 0M24 31v6" },
  car: { bg: "#ffffff", ink: "#2d2926", d: "M11 29v-5l4-8h18l4 8v5zM11 29v4h5v-4M32 29v4h5v-4M15 24h18" },
  plane: { bg: "#a8dcf5", ink: "#1d2d4a", d: "M10 26l28-12-8 22-5-8zM25 28l5-8" },
  bag: { bg: "#a9b86a", ink: "#ffffff", d: "M13 18h22l-2 18H15zM19 18a5 5 0 0 1 10 0" },
};

export const APP_TILE_IDS = Object.keys(APP_TILES);

export function AppTile({ id, className }: { id: string; className?: string }) {
  const tile = APP_TILES[id] ?? APP_TILES.folder;
  return (
    <span className={`${styles.tile} ${className ?? ""}`} style={{ background: tile.bg }} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d={tile.d} fill="none" stroke={tile.ink} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
