const fs = require("fs");
const path = require("path");

const articlesDir = path.join(__dirname, "assets", "articles");
const outputFile = path.join(articlesDir, "articles.json");

const ALLOWED_CATEGORIES = [
  "Doctrine & Revelation",
  "Prophetic Scrolls",
  "Spiritual Growth",
  "Wisdom & Character",
  "Kingdom Living"
];

function validateCategories(categories, file) {
  if (!Array.isArray(categories)) return [];
  return categories.filter((cat) => {
    if (!ALLOWED_CATEGORIES.includes(cat)) {
      console.warn(`Invalid category "${cat}" in ${file}`);
      return false;
    }
    return true;
  });
}

function main() {
  const files = fs.readdirSync(articlesDir);

  const articles = files
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .map((pdf) => {
      const baseName = pdf.replace(/\.pdf$/i, "");
      const jsonPath = path.join(articlesDir, `${baseName}.json`);

      if (!fs.existsSync(jsonPath)) {
        console.warn(`Missing sidecar JSON for: ${pdf}`);
        return null;
      }

      const meta = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      const stat = fs.statSync(path.join(articlesDir, pdf));

      return {
        title: meta.title || baseName,
        file: pdf,
        description: meta.description || "",
        categories: validateCategories(meta.categories, pdf),
        cover: meta.cover || "",
        date: meta.date || new Date(stat.mtime).toISOString()
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
  console.log("articles.json generated successfully.");
}

main();