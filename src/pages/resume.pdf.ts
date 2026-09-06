import type { APIRoute } from "astro";
import { getResumeEntries } from "../lib/resume";
import { buildResumePdf } from "../lib/resume-pdf";

export const prerender = true;

export const GET: APIRoute = async () => {
  const pdf = await buildResumePdf(await getResumeEntries());
  const body = pdf.slice().buffer as ArrayBuffer;

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="hilmi-muktitama-resume.pdf"',
      "Cache-Control": "public, max-age=3600"
    }
  });
};
