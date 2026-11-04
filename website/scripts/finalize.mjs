import {readFile,writeFile} from 'node:fs/promises';
let html=await readFile('index.html','utf8');
html=html.replace('<a id="contact-email"></a>','<a id="contact-email">hello@justaura.example</a>').replace('<span id="contact-phone"></span>','<span id="contact-phone">+233 00 000 0000</span>').replace('<form id="booking-form">','<form id="booking-form"><noscript><p>The enquiry preview requires JavaScript. Please use the live contact details when available; these contacts are samples.</p></noscript>');
await writeFile('index.html',html);
