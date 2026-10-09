/** Joins truthy class names. */
export default function clsx(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}
