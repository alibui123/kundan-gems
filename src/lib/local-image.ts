/** True for same-origin public assets (e.g. /catalogs/mehr/hero.jpg). */
export function isLocalPublicSrc(src: string) {
  return src.startsWith("/") && !src.startsWith("//");
}
