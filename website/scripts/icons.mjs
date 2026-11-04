import { readFile, writeFile } from 'node:fs/promises';
const source=JSON.parse(await readFile('node_modules/@iconify-json/solar/icons.json','utf8'));
const html=await readFile('index.html','utf8');
const names=[...new Set([...html.matchAll(/data-icon="([^"]+)"/g)].map(x=>x[1]))];
const icons=Object.fromEntries(names.map(name=>{if(!source.icons[name])throw new Error(`Missing icon: ${name}`);return[name,source.icons[name]];}));
await writeFile('src/icons.js',`// Solar icons, MIT licensed; selected from @iconify-json/solar.\nexport default ${JSON.stringify({width:24,height:24,icons})};\n`);
