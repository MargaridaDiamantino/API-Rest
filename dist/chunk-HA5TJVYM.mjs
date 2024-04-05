// src/util/generateSlug.ts
function generateSlug(text) {
  return text.normalize("NFD").toLowerCase().replace(/[\u0300-\u036F]/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export {
  generateSlug
};
