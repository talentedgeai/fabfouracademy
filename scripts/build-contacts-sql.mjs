#!/usr/bin/env node
/**
 * Reads a Wix-exported contacts CSV and emits a SQL upsert script
 * targeting public.people. On conflict (email) we update name, company
 * and ok_to_contact only — created_at and unsubscribe_token are preserved.
 *
 * Usage:
 *   node scripts/build-contacts-sql.mjs <input.csv> <output.sql>
 */
import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node build-contacts-sql.mjs <input.csv> <output.sql>");
  process.exit(1);
}

const raw = fs.readFileSync(path.resolve(inputPath), "utf8").replace(/^﻿/, "");

// RFC4180-ish CSV parser (handles quoted fields with commas)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        // ignore
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const rows = parseCsv(raw);
const header = rows.shift();
const col = (name) => header.indexOf(name);
const idxFirst = col("First Name");
const idxLast = col("Last Name");
const idxEmail = col("Email 1");
const idxCompany = col("Company");
const idxCreated = col("Created At (UTC+0)");
const idxStatus = col("Email subscriber status");

if ([idxFirst, idxLast, idxEmail, idxCompany, idxCreated, idxStatus].some((i) => i < 0)) {
  console.error("Missing expected column in CSV header:", header);
  process.exit(1);
}

function sqlString(v) {
  if (v === null || v === undefined) return "NULL";
  const s = String(v).trim();
  if (s === "") return "NULL";
  return `'${s.replace(/'/g, "''")}'`;
}

const seenEmail = new Set();
const records = [];
let skipped = 0;

for (const r of rows) {
  if (!r || r.length === 0 || r.every((c) => c === "")) continue;
  const email = (r[idxEmail] || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    skipped++;
    continue;
  }
  if (seenEmail.has(email)) {
    skipped++;
    continue;
  }
  seenEmail.add(email);

  const first = (r[idxFirst] || "").trim();
  const last = (r[idxLast] || "").trim();
  const name = [first, last].filter(Boolean).join(" ").trim() || null;
  const company = (r[idxCompany] || "").trim() || null;
  const createdRaw = (r[idxCreated] || "").trim();
  // CSV format: "2026-05-24 02:35"  → treat as UTC
  const created = createdRaw ? `${createdRaw.replace(" ", "T")}:00Z` : null;
  const status = (r[idxStatus] || "").trim();
  const okToContact = status === "Subscribed";

  records.push({ email, name, company, created, okToContact });
}

const valuesSql = records
  .map(
    (r) =>
      `  (${sqlString(r.email)}, ${sqlString(r.name)}, ${sqlString(r.company)}, ${
        r.created ? sqlString(r.created) + "::timestamptz" : "now()"
      }, ${r.okToContact ? "true" : "false"})`
  )
  .join(",\n");

const sql = `-- Generated from ${path.basename(inputPath)} on ${new Date().toISOString()}
-- ${records.length} rows (skipped ${skipped})
-- On conflict (email): updates name/company/ok_to_contact only.
-- created_at and unsubscribe_token are preserved for existing rows.

begin;

insert into public.people (email, name, company, created_at, ok_to_contact) values
${valuesSql}
on conflict (email) do update set
  name = coalesce(excluded.name, public.people.name),
  company = coalesce(excluded.company, public.people.company),
  ok_to_contact = excluded.ok_to_contact;

commit;

-- Sanity check
select count(*) as total_people, count(*) filter (where ok_to_contact) as subscribed
from public.people;
`;

fs.writeFileSync(path.resolve(outputPath), sql);
console.error(`Wrote ${records.length} upserts (${skipped} skipped) → ${outputPath}`);
