export function cn(...args: (string | null | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}
