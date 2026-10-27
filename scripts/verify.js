// Verification checks for the Free Resources Directory for Seniors.
// Runs with plain Node.js (no dependencies): `npm test`.
"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");
let failures = 0;

function fail(msg) {
  console.error("FAIL: " + msg);
  failures += 1;
}

function ok(msg) {
  console.log("ok: " + msg);
}

// 1. data/resources.json is valid JSON
let data;
try {
  data = JSON.parse(fs.readFileSync(path.join(root, "data/resources.json"), "utf8"));
  ok("data/resources.json is valid JSON");
} catch (err) {
  fail("data/resources.json is not valid JSON: " + err.message);
  process.exit(1);
}

const resources = data.resources || [];
assert(Array.isArray(resources), "resources must be an array");

// Required fields per resource
const required = [
  "id", "name", "category", "cost", "costDetail", "description",
  "whoItHelps", "howToAccess", "link", "tags"
];

const validCategories = new Set((data.categories || []).map(function (c) { return c.id; }));

const idSet = new Set();
for (const resource of resources) {
  for (const field of required) {
    if (!(field in resource)) {
      fail("resource " + (resource.id || "(unknown)") + ': missing field "' + field + '"');
    }
  }
  if (resource.id && typeof resource.id !== "string") fail("resource: id must be a string");
  if (resource.name && typeof resource.name !== "string") fail("resource " + resource.id + ": name must be a string");
  if (resource.category && !validCategories.has(resource.category)) {
    fail("resource " + resource.id + ': unknown category "' + resource.category + '"');
  }
  if (!Array.isArray(resource.tags) || resource.tags.length === 0) {
    fail("resource " + resource.id + ": tags must be a non-empty array");
  }
  if (resource.link) {
    try {
      new URL(resource.link);
    } catch (err) {
      fail("resource " + resource.id + ': invalid link "' + resource.link + '"');
    }
    // No affiliate links
    const lowLink = resource.link.toLowerCase();
    if (
      lowLink.includes("amazon") ||
      lowLink.includes("amzn.") ||
      lowLink.includes("tag=") ||
      lowLink.includes("affiliate")
    ) {
      fail("resource " + resource.id + ': possible affiliate link "' + resource.link + '"');
    }
  }
  if (resource.id) {
    if (idSet.has(resource.id)) fail('duplicate resource id "' + resource.id + '"');
    idSet.add(resource.id);
  }
}
ok("all " + resources.length + " resources have required fields, valid non-affiliate links");

// 2. Groups consistency: every group toolId references an existing resource
const groups = data.groups || {};
const allCatIds = new Set();

for (const g of groups.byCategory || []) {
  if (!g.id || !g.label || !Array.isArray(g.toolIds)) {
    fail("category group missing id/label/toolIds: " + JSON.stringify(g));
    continue;
  }
  if (!validCategories.has(g.id)) {
    fail('category group "' + g.id + '": not a defined category');
  }
  for (const id of g.toolIds) {
    if (!idSet.has(id)) fail('category group "' + g.id + '": unknown resource id "' + id + '"');
    allCatIds.add(id);
  }
}
ok("all category group toolIds reference existing resources (" + (groups.byCategory || []).length + " category groups)");

// 3. Every resource appears in at least one category group
for (const resource of resources) {
  if (!allCatIds.has(resource.id)) fail('resource "' + resource.id + '": not in any category group');
}
ok("every resource is assigned to at least one category group");

// 4. index.html references its assets; app.js loads the data file
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
for (const asset of ["css/style.css", "js/app.js"]) {
  if (!html.includes(asset)) fail('index.html does not reference "' + asset + '"');
}
if (!appJs.includes("data/resources.json")) fail('js/app.js does not load "data/resources.json"');
ok("index.html references CSS and JS; js/app.js loads the data file");

// 5. resources.md exists and mentions every resource by name
const mdPath = path.join(root, "resources.md");
if (!fs.existsSync(mdPath)) {
  fail("resources.md is missing (index.html links to it)");
} else {
  const md = fs.readFileSync(mdPath, "utf8");
  for (const resource of resources) {
    if (!md.includes(resource.name)) fail('resources.md does not mention resource "' + resource.name + '"');
  }
  ok("resources.md mentions every resource (" + resources.length + " resources)");
}

if (failures > 0) {
  console.error("\n" + failures + " verification failure(s)");
  process.exit(1);
}

console.log(
  "\nVerification passed: " +
  resources.length + " resources, " +
  (groups.byCategory || []).length + " category groups"
);
process.exit(0);
