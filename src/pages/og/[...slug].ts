import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

// Remove emoji from text for cleaner OG images
const removeEmoji = (text: string) =>
  text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23F3}]|[\u{23F8}-\u{23FA}]|[\u{25AA}-\u{25AB}]|[\u{25B6}]|[\u{25C0}]|[\u{25FB}-\u{25FE}]|[\u{2614}-\u{2615}]|[\u{2648}-\u{2653}]|[\u{267F}]|[\u{2693}]|[\u{26A1}]|[\u{26AA}-\u{26AB}]|[\u{26BD}-\u{26BE}]|[\u{26C4}-\u{26C5}]|[\u{26CE}]|[\u{26D4}]|[\u{26EA}]|[\u{26F2}-\u{26F3}]|[\u{26F5}]|[\u{26FA}]|[\u{26FD}]|[\u{2702}]|[\u{2705}]|[\u{2708}-\u{270D}]|[\u{270F}]|[\u{2712}]|[\u{2714}]|[\u{2716}]|[\u{271D}]|[\u{2721}]|[\u{2728}]|[\u{2733}-\u{2734}]|[\u{2744}]|[\u{2747}]|[\u{274C}]|[\u{274E}]|[\u{2753}-\u{2755}]|[\u{2757}]|[\u{2763}-\u{2764}]|[\u{2795}-\u{2797}]|[\u{27A1}]|[\u{27B0}]|[\u{27BF}]|[\u{2934}-\u{2935}]|[\u{2B05}-\u{2B07}]|[\u{2B1B}-\u{2B1C}]|[\u{2B50}]|[\u{2B55}]|[\u{3030}]|[\u{303D}]|[\u{3297}]|[\u{3299}]|[\u{00A9}]|[\u{00AE}]|[\u{203C}]|[\u{2049}]|[\u{20E3}]|[\u{2122}]|[\u{2139}]|[\u{2194}-\u{2199}]|[\u{21A9}-\u{21AA}]|[\u{23CF}]|[\u{24C2}]|❌|✅|🔥|💰|📈|📉|🚀|💡|⚡|🎯|🏆|💪|👆|👇|👈|👉|✨|⭐|🌟|💎|🎉|🎊|📝|📊|💼|🔒|🔓|🔑|⚠️|❗|❓|‼️|⁉️/gu, '').trim();

const blogEntries = await getCollection('blog');
const noteEntries = await getCollection('notes');

// Combine blog and notes entries
const pages = Object.fromEntries([
  ...blogEntries.map(({ id, data }) => [`blog/${id}`, { ...data, type: 'blog' }]),
  ...noteEntries.map(({ id, data }) => [`notes/${id}`, { ...data, type: 'notes' }]),
]);

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'slug',
  pages,
  getImageOptions: (_path, page) => ({
    title: removeEmoji(page.title),
    description: removeEmoji(page.description),
    bgGradient: [[24, 24, 27], [39, 39, 42]], // zinc-900 to zinc-800
    border: {
      color: [113, 113, 122], // zinc-500
      width: 20,
    },
    padding: 80,
    font: {
      title: {
        size: 72,
        families: ['Noto Sans TC', 'Noto Sans'],
        weight: 'Bold',
        color: [255, 255, 255],
        lineHeight: 1.3,
      },
      description: {
        size: 36,
        families: ['Noto Sans TC', 'Noto Sans'],
        weight: 'Normal',
        color: [161, 161, 170], // zinc-400
        lineHeight: 1.4,
      },
    },
    fonts: [
      'https://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cy_CpOtma3uNQ.ttf',
    ],
  }),
});
