import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { ResumeEntry } from "./resume";
import { CONTACT_EMAIL, groupExperienceByOrganization } from "./resume";
import { GITHUB_URL, LINKEDIN_URL } from "./urls";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 52;
const MARGIN_TOP = 48;
const MARGIN_BOTTOM = 46;
const BODY_SIZE = 9.7;
const BODY_LEADING = 13.2;
const INK = rgb(0.1, 0.1, 0.1);
const MUTED = rgb(0.35, 0.35, 0.35);
const ACCENT = rgb(0.45, 0.2, 0.08);
const RULE = rgb(0.78, 0.78, 0.78);

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (!line || font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
      continue;
    }
    lines.push(line);
    line = word;
  }

  if (line) lines.push(line);
  return lines;
}

function safePdfText(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/…/g, "...");
}

class ResumePdfWriter {
  private readonly doc: PDFDocument;
  private readonly fonts: { body: PDFFont; bold: PDFFont; italic: PDFFont };
  private readonly pages: PDFPage[] = [];
  private page: PDFPage;
  private y: number;

  constructor(doc: PDFDocument, fonts: { body: PDFFont; bold: PDFFont; italic: PDFFont }) {
    this.doc = doc;
    this.fonts = fonts;
    this.page = this.newPage();
    this.y = PAGE_HEIGHT - MARGIN_TOP;
  }

  private newPage() {
    const page = this.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    this.pages.push(page);
    return page;
  }

  private continueOnNewPage() {
    this.page = this.newPage();
    this.y = PAGE_HEIGHT - MARGIN_TOP;
  }

  private ensureSpace(height: number) {
    if (this.y - height < MARGIN_BOTTOM + 18) this.continueOnNewPage();
  }

  rule() {
    this.page.drawLine({
      start: { x: MARGIN_X, y: this.y },
      end: { x: PAGE_WIDTH - MARGIN_X, y: this.y },
      thickness: 0.7,
      color: RULE
    });
    this.y -= 16;
  }

  private writeLines(lines: string[], font: PDFFont, size: number, leading: number, x = MARGIN_X) {
    for (const line of lines) {
      this.ensureSpace(leading);
      this.page.drawText(safePdfText(line), { x, y: this.y, size, font, color: INK });
      this.y -= leading;
    }
  }

  text(value: string, options: { font?: PDFFont; size?: number; leading?: number; color?: typeof INK; gapAfter?: number; x?: number; maxWidth?: number } = {}) {
    const font = options.font ?? this.fonts.body;
    const size = options.size ?? BODY_SIZE;
    const leading = options.leading ?? BODY_LEADING;
    const x = options.x ?? MARGIN_X;
    const maxWidth = options.maxWidth ?? PAGE_WIDTH - MARGIN_X - x;
    const lines = wrapText(safePdfText(value), font, size, maxWidth);

    for (const line of lines) {
      this.ensureSpace(leading);
      this.page.drawText(line, { x, y: this.y, size, font, color: options.color ?? INK });
      this.y -= leading;
    }
    this.y -= options.gapAfter ?? 0;
  }

  bullet(value: string) {
    const x = MARGIN_X + 12;
    const lines = wrapText(`- ${value}`, this.fonts.body, BODY_SIZE, PAGE_WIDTH - MARGIN_X - x);
    this.writeLines(lines, this.fonts.body, BODY_SIZE, BODY_LEADING, x);
    this.y -= 2;
  }

  section(title: string) {
    this.ensureSpace(90);
    this.y -= 7;
    this.text(title.toUpperCase(), { font: this.fonts.bold, size: 9, leading: 12, color: ACCENT, gapAfter: 3 });
  }

  employer(name: string) {
    // Reserve room for the employer label and the first role heading so the
    // progression marker never lands alone at the bottom of a page.
    this.ensureSpace(120);
    this.text(name, { font: this.fonts.bold, size: 13, leading: 17, gapAfter: 3 });
  }

  role(entry: ResumeEntry) {
    this.ensureSpace(72);
    this.text(entry.data.title, { font: this.fonts.bold, size: 11.5, leading: 15, gapAfter: 1 });
    const meta = [entry.data.period, entry.data.location].filter(Boolean).join("  |  ");
    if (meta) this.text(meta, { size: 8.5, leading: 11, color: MUTED, gapAfter: 3 });
    this.text(entry.data.summary, { gapAfter: 2 });
    for (const item of entry.data.items) this.bullet(item);
    this.y -= 7;
  }

  credentials(entries: ResumeEntry[], sectionTitle: string) {
    this.section(sectionTitle);
    for (const entry of entries) {
      this.ensureSpace(30);
      if (entry.data.title !== sectionTitle) {
        this.text(entry.data.title, { font: this.fonts.bold, size: 10.5, leading: 14, gapAfter: 2 });
      }
      const meta = [entry.data.organization, entry.data.period].filter(Boolean).join("  |  ");
      if (meta) this.text(meta, { size: 8.5, leading: 11, color: MUTED, gapAfter: 3 });
      if (entry.data.summary) this.text(entry.data.summary, { color: MUTED, gapAfter: 1 });
      for (const item of entry.data.items) this.bullet(item);
      this.y -= 5;
    }
  }

  finish() {
    this.pages.forEach((page, index) => {
      page.drawText(`Hilmi Muktitama  |  ${index + 1} / ${this.pages.length}`, {
        x: MARGIN_X,
        y: 24,
        size: 7.5,
        font: this.fonts.body,
        color: MUTED
      });
    });
  }
}

export async function buildResumePdf(entries: ResumeEntry[]) {
  const doc = await PDFDocument.create();
  doc.setTitle("Hilmi Muktitama - Resume");
  doc.setAuthor("Hilmi Muktitama");
  doc.setSubject("Professional resume");
  doc.setKeywords(["resume", "technical program management", "software delivery"]);

  const [body, bold, italic] = await Promise.all([
    doc.embedFont(StandardFonts.Helvetica),
    doc.embedFont(StandardFonts.HelveticaBold),
    doc.embedFont(StandardFonts.HelveticaOblique)
  ]);
  const writer = new ResumePdfWriter(doc, { body, bold, italic });

  writer.text("Hilmi Muktitama", { font: bold, size: 25, leading: 29, color: ACCENT, gapAfter: 1 });
  writer.text("Senior Technical Program Manager", { font: italic, size: 13.5, leading: 18, gapAfter: 3 });
  writer.text(`${CONTACT_EMAIL}  |  ${LINKEDIN_URL}  |  ${GITHUB_URL}`, { size: 8.5, leading: 12, color: MUTED, gapAfter: 9 });
  writer.text("I work across program, product, and technical delivery, helping teams plan and ship complex platform and automation work.", { gapAfter: 2 });
  writer.rule();

  const experience = entries.filter((entry) => entry.data.section === "experience");
  writer.section("Experience");
  for (const group of groupExperienceByOrganization(experience)) {
    writer.employer(group.organization);
    for (const role of group.roles) writer.role(role);
  }

  const skills = entries.filter((entry) => entry.data.section === "skill");
  writer.section("Skills");
  for (const entry of skills) {
    writer.text(entry.data.title, { font: bold, size: 10.5, leading: 14, gapAfter: 1 });
    writer.text(entry.data.items.join("  |  "), { gapAfter: 5 });
  }

  writer.credentials(entries.filter((entry) => entry.data.section === "education"), "Education");
  writer.credentials(entries.filter((entry) => entry.data.section === "certification"), "Certifications");
  writer.finish();
  return doc.save();
}
