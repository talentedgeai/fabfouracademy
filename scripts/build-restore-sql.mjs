#!/usr/bin/env node
/**
 * Emit a SQL statement that restores ok_to_contact for every email in the CSV
 * whose "Email subscriber status" column is "Subscribed". Also sets ok_to_contact
 * for an additional email passed as the third argument (used to flag the test
 * recipient when running a safe trigger-wow send).
 *
 * Usage:
 *   node scripts/build-restore-sql.mjs <input.csv> <output.sql> [extra_email_to_subscribe]
 */
import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputPath, extra] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node build-restore-sql.mjs <csv> <sql> [extra_email]");
  process.exit(1);
}

const raw = fs.readFileSync(path.resolve(inputPath), "utf8").replace(/^﻿/, "");

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else {
      if (c === '"') q = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c !== "\r") field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const rows = parseCsv(raw);
const header = rows.shift();
const idxEmail = header.indexOf("Email 1");
const idxStatus = header.indexOf("Email subscriber status");

const subscribedEmails = new Set();
for (const r of rows) {
  if (!r || r.every((c) => c === "")) continue;
  const email = (r[idxEmail] || "").trim().toLowerCase();
  const status = (r[idxStatus] || "").trim();
  if (email && status === "Subscribed") subscribedEmails.add(email);
}

if (extra) subscribedEmails.add(extra.trim().toLowerCase());

const list = [...subscribedEmails]
  .map((e) => `'${e.replace(/'/g, "''")}'`)
  .join(",\n  ");

const sql = `-- Restore ok_to_contact = true for ${subscribedEmails.size} emails from CSV.
update public.people
   set ok_to_contact = true
 where email in (
  ${list}
);

select count(*) filter (where ok_to_contact) as subscribed,
       count(*) as total
from public.people;
`;

fs.writeFileSync(path.resolve(outputPath), sql);
console.error(`Wrote restore SQL for ${subscribedEmails.size} emails → ${outputPath}`);
