import { getCollection, type CollectionEntry } from "astro:content";

export type ResumeEntry = CollectionEntry<"resume">;

export const CONTACT_EMAIL = "hilmimukti@gmail.com";

export async function getResumeEntries() {
  return (await getCollection("resume")).sort((a, b) => a.data.order - b.data.order);
}

export function groupExperienceByOrganization(entries: ResumeEntry[]) {
  const groups: Array<{ organization: string; roles: ResumeEntry[] }> = [];

  for (const entry of entries) {
    const organization = entry.data.organization ?? "Independent work";
    const previous = groups.at(-1);

    if (previous?.organization === organization) {
      previous.roles.push(entry);
    } else {
      groups.push({ organization, roles: [entry] });
    }
  }

  return groups;
}
