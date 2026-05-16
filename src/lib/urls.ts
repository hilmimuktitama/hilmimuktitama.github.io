export const LINKEDIN_URL = "https://www.linkedin.com/in/hilmimuktitama";
export const GITHUB_URL = "https://github.com/hilmimuktitama";

export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}
