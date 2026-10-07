// Serializes a JSON-LD payload for embedding in a <script> tag.
//
// JSON.stringify alone is not safe inside an inline script: a "</script>"
// substring anywhere in the data closes the tag early and the remainder is
// parsed as HTML, which turns any content-authored string into a script
// injection point. Escaping the three characters that can start a tag or an
// entity keeps the payload valid JSON while making that impossible.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
