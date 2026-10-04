import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/images',{recursive:true});
for(let i=1;i<=9;i++) for(const width of [640,1280]) await sharp(`assets/pic${i}.jpg`).resize({width,withoutEnlargement:true}).webp({quality:85}).toFile(`public/images/pic${i}-${width}.webp`);
