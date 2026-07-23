// Builds portal distribution zips from the live repo source.
//   itch  : full game, SW registration stripped (itch serves games from a sandboxed CDN origin)
//   portal: itch build + multiplayer entry hidden (CrazyGames/Newgrounds submit as single-player)
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const REPO = path.join(__dirname, '..');
const STAGE = path.join(REPO, 'promo', 'builds', '.stage');
const OUT = path.join(REPO, 'promo', 'builds');

function reset(d) { fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d, { recursive: true }); }
function copy(src, dst) { fs.cpSync(src, dst, { recursive: true }); }

fs.mkdirSync(OUT, { recursive: true });
reset(STAGE);
const html = fs.readFileSync(path.join(REPO, 'index.html'), 'utf8');

// --- shared transform: no service worker inside a third-party iframe origin
let itch = html.replace(
  /if\('serviceWorker' in navigator && location\.protocol\.startsWith\('http'\)\)\{[\s\S]{0,200}?\n\}/,
  "/* service worker disabled in portal builds (sandboxed iframe origin) */"
);
if (itch === html) { console.error('FAIL: service-worker strip did not match'); process.exit(1); }

// --- portal transform: hide the multiplayer entry point in the radio-log footer
const MP_ANCHOR = "log.querySelector('#mpBtn').onclick=openMultiplayer;";
let portal = itch;
if (!portal.includes(MP_ANCHOR)) { console.error('FAIL: mp anchor not found'); process.exit(1); }
portal = portal.replace(MP_ANCHOR,
  "{const _mp=log.querySelector('#mpBtn'); if(_mp) _mp.style.display='none';}  /* portal build: single-player submission */");

const variants = [
  { name: 'irontide-itch', src: itch },
  { name: 'irontide-portal-singleplayer', src: portal },
];
for (const v of variants) {
  const dir = path.join(STAGE, v.name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), v.src);
  for (const asset of ['vendor', 'js', 'icons', 'manifest.json']) copy(path.join(REPO, asset), path.join(dir, asset));
  if (v.name === 'irontide-itch') copy(path.join(REPO, 'sw.js'), path.join(dir, 'sw.js'));
  execSync(`cd "${dir}" && zip -qr "${OUT}/${v.name}.zip" . -x '.*'`);
  const mb = (fs.statSync(`${OUT}/${v.name}.zip`).size / 1048576).toFixed(1);
  console.log(`${v.name}.zip  ${mb} MB`);
}
console.log('builds done');
