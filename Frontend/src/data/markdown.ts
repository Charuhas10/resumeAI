import { unified } from "unified";
import remark from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

import { Resume } from "./resume";
import { resumeToMarkdown } from "./template";

export function markdownToHtml(markdown: string): string {
  return unified()
    .use(remark)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
}

const wrap = (html: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Resume</title>
    <style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

  html {
      padding: 0;
      margin: 0;
  }
  
  body {
      display: block;
      max-width: 700px;
      margin: 0 auto;
      padding: 0;
      font-family: "Inter", sans-serif;
      font-size: 14px;
  }
  
  .name {
      font-size: 150%;
      line-height: 150%;
      font-weight: bold;
      display: block;
      text-align: center;
  }
  
  h1 {
      border: none;
      text-align: center;
      font-weight: bold;
      padding: 0;
      margin: 1rem 0;
  }
  
  h2 {
      font-size: 1.2em;
      font-weight: bold;
      border-bottom: 2px solid black;
      color: #0D47A1;
      margin: 10px 0 5px 0;
      padding: 0 0 2px 0;
  }
  
  h3 {
      font-size: 1em;
      font-weight: bold;
      margin: 5px 0 0 0;
  }
  
  h4 {
      font-size: 1em;
      font-weight: bold;
      margin: 0;
  }
  
  p, ul {
      font-size: 100%;
      margin: 0;
  }
  
  ul, ol {
      padding: 0 0 0 1.5rem;
      margin: 0;
  }
  
  li {
      line-height: 150%;
      /* change this for tighter spacing */
      /* default 150% */
  }
  
  /* assume images are icons */
  /* icons for skills/tools */
  .info img {
      width: 15px;
  }
  
  /* assume images are icons */
  /* icons for contact info */
  .info a img {
      width: 12px;
  }
  
  a {
      color: #0D47A1;
  }
  
  code {
      color: black;
  }
  
  time {
      float: right;
      font-size: inherit;
      font-weight: bold;
  }
  
  location {
      font-weight: normal;
      font-style: italic;
  }
  
  .info {
      display: block;
      text-align: center;
  }
    </style>
   
  </head>
  <body>
    ${html}
  </body>`;

export function resumeToHtml(resume: Resume): string {
  const markdown = resumeToMarkdown(resume);
  const html = markdownToHtml(markdown);
  return wrap(html);
}

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/markdown.css">
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/highlight.css">
