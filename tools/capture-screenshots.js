// Cinematic promo capture v2 — chase-view combat, photo-mode compositions, video recording.
const { chromium } = require('@playwright/test');
const OUT = require('path').join(__dirname, '..', 'promo', 'assets');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    recordVideo: { dir: OUT + '/raw-video', size: { width: 1600, height: 900 } },
  });
  const page = await context.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', String(e).slice(0, 160)));

  await page.goto('https://game.boobank.com/irontide/', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof startGame === 'function' && typeof SHIPS === 'object');
  await page.evaluate(() => {
    const b = document.getElementById('storyBtn');
    const s = document.getElementById('story');
    if (b && s && s.style.display === 'flex') b.click();
    setLang('en');
    try { localStorage.setItem(TUT_DONE_KEY, '1'); } catch (e) {}
    try { localStorage.setItem(TUT_PLANE_KEY, '1'); } catch (e) {}
    try { localStorage.setItem(TUT_TANK_KEY, '1'); } catch (e) {}
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/screenshot-01-menu.png` });
  console.log('01 menu');

  await page.evaluate(() => {
    localStorage.setItem('ironTideDifficulty', 'normal');
    startGame('battleship');
  });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${OUT}/screenshot-02-briefing.png` });
  console.log('02 briefing');

  // Arm up, summon a proper engagement, switch to external chase view
  await page.evaluate(() => {
    skipBanner();
    if (typeof skipTutorial === 'function') skipTutorial();
    money = 99999;
    for (const w of ['deckgun', 'deckgun', 'twin', 'bofors', 'oerlikon', 'aa']) {
      selectedWeapon = w;
      try { tryPlace(); } catch (e) {}
    }
    selectedWeapon = null;
    for (let i = 0; i < 3; i++) { try { spawnEnemy(); } catch (e) {} }
    const h = player.heading;
    const f = { x: Math.sin(h), z: Math.cos(h) };
    const r = { x: Math.cos(h), z: -Math.sin(h) };
    const spread = [-38, -15, 8, 26, 44];
    enemies.forEach((e, i) => {
      const brg = (spread[i % spread.length] * Math.PI) / 180;
      const dist = 190 + (i % 3) * 45;
      const dir = {
        x: f.x * Math.cos(brg) + r.x * Math.sin(brg),
        z: f.z * Math.cos(brg) + r.z * Math.sin(brg),
      };
      e.pos.set(player.pos.x + dir.x * dist, 0, player.pos.z + dir.z * dist);
      e.heading = h + Math.PI + brg * 0.5; // roughly facing the player
      e.fireT = 0.5 + i * 0.6;
    });
    fpv = true; // external chase view while driving
    window._pan = setInterval(() => { camYaw.v += 0.0022; }, 33);
  });
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(6000);
  for (let i = 0; i < 6; i++) {
    await page.screenshot({ path: `${OUT}/combat-${'abcdef'[i]}.png` });
    await page.waitForTimeout(2500);
  }
  console.log('combat burst done');
  await page.evaluate(() => clearInterval(window._pan));
  await page.keyboard.up('KeyW');

  // Photo-mode compositions (HUD hidden, free camera)
  const compose = async (name, calc, tod) => {
    await page.evaluate(({ calc, tod }) => {
      photoMode = true;
      document.getElementById('hud').style.display = 'none';
      if (tod != null) {
        weather.tod = tod;
        if (window._MAP && window._MAP.tod != null) window._MAP.tod = tod;
      }
      const h = player.heading, p = player.pos;
      const f = { x: Math.sin(h), z: Math.cos(h) };
      const r = { x: Math.cos(h), z: -Math.sin(h) };
      const o = { broadside: { x: r.x * 95 + f.x * 10, y: 14, z: r.z * 95 + f.z * 10 },
                  bowlow:   { x: f.x * 70 + r.x * 28, y: 6,  z: f.z * 70 + r.z * 28 },
                  aerial:   { x: -f.x * 120 - r.x * 40, y: 55, z: -f.z * 120 - r.z * 40 } }[calc];
      photoPos.set(p.x + o.x, o.y, p.z + o.z);
      const dx = p.x - photoPos.x, dz = p.z - photoPos.z, dy = 6 - photoPos.y;
      camYaw.v = Math.atan2(dx, dz);
      camPitch.v = Math.atan2(dy, Math.hypot(dx, dz));
    }, { calc, tod });
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log(name);
  };
  await compose('photo-06-broadside', 'broadside', null);
  await compose('photo-07-bowlow', 'bowlow', null);
  await compose('photo-08-aerial', 'aerial', null);
  await compose('photo-09-golden', 'broadside', 0.85);

  // Back to normal, shop UI shot
  await page.evaluate(() => {
    weather.tod = 0.32;
    if (window._MAP && window._MAP.tod != null) window._MAP.tod = 0.32;
    photoMode = false;
    document.getElementById('hud').style.display = 'block';
    if (typeof updateMode === 'function') updateMode();
    toggleShop();
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/screenshot-05-shop.png` });
  console.log('05 shop');
  await page.evaluate(() => toggleShop());
  await page.waitForTimeout(400);

  await context.close(); // flushes video
  await browser.close();
  console.log('v2 capture complete');
})();
