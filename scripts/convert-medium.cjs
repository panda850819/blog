const fs = require('fs');
const path = require('path');

const MEDIUM_DIR = '/Users/panda/Downloads/medium-export-0771568d11e7db18d8d4fcaf8ffe29c0c90febe306c0f19db26fb65842087952/posts';
const OUTPUT_DIR = '/Users/panda/site/blog/src/content/blog';

// Tag mapping based on content keywords
const tagRules = [
  { keywords: ['區塊鏈', 'blockchain', 'Blockchain'], tag: 'Blockchain' },
  { keywords: ['NFT', 'nft'], tag: 'NFT' },
  { keywords: ['DeFi', 'defi', 'DEFI'], tag: 'DeFi' },
  { keywords: ['React', 'react'], tag: 'React' },
  { keywords: ['JavaScript', 'javascript', 'JS', 'js'], tag: 'JavaScript' },
  { keywords: ['Matrixport'], tag: 'Matrixport' },
  { keywords: ['Pionex', '派網'], tag: 'Pionex' },
  { keywords: ['BSC', 'Binance'], tag: 'BSC' },
  { keywords: ['以太坊', 'Ethereum', 'ETH', 'ERC'], tag: 'Ethereum' },
  { keywords: ['IPFS', 'ipfs'], tag: 'IPFS' },
  { keywords: ['Docker', 'docker'], tag: 'Docker' },
  { keywords: ['投資', '理財', '套利'], tag: 'Investment' },
  { keywords: ['錢包', 'Wallet', 'wallet'], tag: 'Wallet' },
  { keywords: ['教學', '入門', '新手', 'Hello World', 'From Zero'], tag: 'Tutorial' },
  { keywords: ['Laravel', 'laravel'], tag: 'Laravel' },
  { keywords: ['Go', 'Golang'], tag: 'Go' },
  { keywords: ['DEXON', 'Dexon', 'dexon'], tag: 'DEXON' },
  { keywords: ['空投', 'airdrop'], tag: 'Airdrop' },
  { keywords: ['論文', '研究'], tag: 'Research' },
  { keywords: ['心得', '經歷', '歷程'], tag: 'Experience' },
];

function getTags(title, content) {
  const tags = new Set();
  const text = title + ' ' + content;

  for (const rule of tagRules) {
    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) {
        tags.add(rule.tag);
        break;
      }
    }
  }

  return Array.from(tags);
}

function htmlToMarkdown(html) {
  return html
    // Remove style tags
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Headers
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')
    // Paragraphs
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    // Bold
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
    // Italic
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*')
    // Links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    // Images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
    // Lists
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '$1\n')
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '$1\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    // Code blocks
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    // Blockquote
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n')
    // Line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Horizontal rule
    .replace(/<hr[^>]*\/?>/gi, '---\n\n')
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Decode HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractContent(html) {
  // Extract title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled';

  // Extract date from footer
  const dateMatch = html.match(/datetime="([^"]+)"/);
  let date = '2020-01-01';
  if (dateMatch) {
    date = dateMatch[1].split('T')[0];
  }

  // Extract body content
  const bodyMatch = html.match(/<section data-field="body"[^>]*>([\s\S]*?)<\/section>\s*<footer/);
  let content = '';
  if (bodyMatch) {
    content = htmlToMarkdown(bodyMatch[1]);
  }

  // Generate description (first 150 chars of content)
  const description = content.replace(/[#*`>\[\]()!-]/g, '').substring(0, 150).trim() + '...';

  return { title, date, content, description };
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
    .replace(/-+$/, '');
}

function processFiles() {
  const files = fs.readdirSync(MEDIUM_DIR)
    .filter(f => f.endsWith('.html') && !f.startsWith('draft'));

  let count = 0;
  const processed = [];

  for (const file of files) {
    const filePath = path.join(MEDIUM_DIR, file);
    const stats = fs.statSync(filePath);

    // Skip small files (likely comments)
    if (stats.size < 3000) continue;

    const html = fs.readFileSync(filePath, 'utf8');
    const { title, date, content, description } = extractContent(html);

    // Skip if no meaningful content
    if (content.length < 100) continue;

    const tags = getTags(title, content);
    const slug = slugify(title) || `post-${date}`;
    const outputFile = `${slug}.md`;

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
publishedAt: ${date}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---

${content}`;

    const outputPath = path.join(OUTPUT_DIR, outputFile);

    // Avoid overwriting
    if (!fs.existsSync(outputPath)) {
      fs.writeFileSync(outputPath, frontmatter);
      count++;
      processed.push({ title, date, tags, file: outputFile });
    }
  }

  console.log(`Converted ${count} articles`);
  console.log('\nProcessed articles:');
  processed.forEach(p => {
    console.log(`- ${p.date}: ${p.title} [${p.tags.join(', ')}]`);
  });
}

processFiles();
