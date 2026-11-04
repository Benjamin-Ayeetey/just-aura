# Just Aura projects

Two independent applications live in this repository:

| Folder | Application | Start command inside folder | Local address |
| --- | --- | --- | --- |
| `website/` | Public beauty website | `npm run dev` | http://127.0.0.1:5173/ |
| `billing/` | Private invoice and receipt tool | `npm run dev` | http://127.0.0.1:5174/ |

Each application has its own package.json, package-lock.json, node_modules, source, public assets, and build output. Run `npm ci` in the relevant folder to install it independently.

From the repository root, `npm run website` and `npm run billing` are convenient shortcuts. Run them in separate terminals to view both at once. `npm run build` builds only the website; `npm run billing:build` builds the tool; `npm run billing:test` runs its tests.

`brand/` holds shared original brand-reference materials. `website/assets/` holds original website photographs. `docs/previews/` contains local preview evidence. Generated dependencies and builds are ignored by Git.

Vercel's root configuration explicitly installs and builds `website/` and serves `website/dist`. The billing tool is not included in that deployment.

Billing records stay in this browser's storage. Continue using http://127.0.0.1:5174/ to retain access to existing records; changing browser, hostname or port creates a different storage location. Export backups regularly.
