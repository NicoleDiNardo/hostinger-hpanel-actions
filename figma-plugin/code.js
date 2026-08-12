// hPanel Actions — one-shot worksheet builder for the Hostinger take-home file
function solid(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return {
    type: 'SOLID',
    color: {
      r: ((n >> 16) & 255) / 255,
      g: ((n >> 8) & 255) / 255,
      b: (n & 255) / 255,
    },
  };
}

async function loadFonts() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
}

function text(chars, size, style, color) {
  const t = figma.createText();
  t.fontName = { family: 'Inter', style: style };
  t.characters = chars;
  t.fontSize = size;
  t.fills = [solid(color)];
  t.textAutoResize = 'HEIGHT';
  return t;
}

function card(title, bodyLines, width) {
  const frame = figma.createFrame();
  frame.name = title;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.resize(width, 100);
  frame.itemSpacing = 10;
  frame.paddingTop = 20;
  frame.paddingBottom = 20;
  frame.paddingLeft = 20;
  frame.paddingRight = 20;
  frame.cornerRadius = 12;
  frame.fills = [solid('#FFFFFF')];
  frame.strokes = [solid('#EAEAEF')];
  frame.strokeWeight = 1;

  const h = text(title, 16, 'Bold', '#1D1E20');
  h.layoutAlign = 'STRETCH';
  frame.appendChild(h);

  for (const line of bodyLines) {
    const p = text(line, 13, 'Regular', '#727586');
    p.layoutAlign = 'STRETCH';
    frame.appendChild(p);
  }
  return frame;
}

function board(name, x, y, width, childrenBuilder) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.x = x;
  frame.y = y;
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.resize(width, 100);
  frame.itemSpacing = 16;
  frame.paddingTop = 48;
  frame.paddingBottom = 48;
  frame.paddingLeft = 48;
  frame.paddingRight = 48;
  frame.cornerRadius = 16;
  frame.fills = [solid('#F7F7F8')];
  childrenBuilder(frame);
  return frame;
}

async function main() {
  await loadFonts();
  const page = figma.currentPage;
  page.name = page.name || 'Task';

  // Place to the right of existing content
  let maxX = 0;
  for (const node of page.children) {
    maxX = Math.max(maxX, node.x + node.width);
  }
  const originX = maxX + 200;
  const originY = 0;
  const created = [];

  // 01 Framing
  const b1 = board('01 Framing — hPanel Actions', originX, originY, 1100, (f) => {
    const k = text('01 · FRAMING', 12, 'Bold', '#673DE6');
    f.appendChild(k);
    const h = text('hPanel Actions', 36, 'Bold', '#1D1E20');
    h.layoutAlign = 'STRETCH';
    f.appendChild(h);
    const d = text(
      'Replace the always-on to-do wall with a priority-aware Action Centre so Home can serve websites again — and only true blockers interrupt.',
      16,
      'Regular',
      '#727586'
    );
    d.layoutAlign = 'STRETCH';
    f.appendChild(d);

    const row = figma.createFrame();
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(1004, 10);
    row.itemSpacing = 16;
    row.fills = [];
    row.layoutAlign = 'STRETCH';

    const c1 = card('Problem', [
      '• Renewals, setup, and account requests share one undifferentiated list',
      '• Users scroll past; CTA conversion stays low',
      '• Key home content is buried below the fold',
      '• Everything feels urgent → nothing feels urgent',
      '• Product growth makes the list unscalable',
    ], 324);
    const c2 = card('Goals', [
      '• Reclaim Home fold for products & sites',
      '• Earn urgency with a clear severity model',
      '• Improve focus on the highest-value CTAs',
      '• Scale across many products & multi-site users',
      '• Stay usable for non-technical customers',
    ], 324);
    const c3 = card('Non-goals', [
      '• Pixel-perfect coverage of all 53 nudge types',
      '• A passive “notification inbox” metaphor',
      '• Marketing offers competing with billing blockers',
      '• Solving every edge case in 4–6 hours',
    ], 324);
    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    f.appendChild(row);

    const principles = card('Principles', [
      '1. Urgency is earned — only P0 blockers interrupt Home (max one strip).',
      '2. Home is for products — Actions collapse to a summary entry + topbar badge.',
      '3. One primary next step — recommend, don’t dump.',
      '4. Triage over dump — filter by severity and site in Action Centre.',
      '5. User control — dismiss and snooze so the system doesn’t become another wall.',
    ], 1004);
    principles.layoutAlign = 'STRETCH';
    f.appendChild(principles);
  });
  page.appendChild(b1);
  created.push(b1.id);

  // 02 Model
  const tiers = [
    ['P0 Critical', '#FC5185', 'Max 1 strip on Home + badge', 'payment_unsuccessful · payment_card_expired · hosting_plan_cancelled · domain_expired_redemption · requested_access*'],
    ['P1 Expiring', '#F0AD00', 'Action Centre (default weight)', '*_expiring · *_expired · trial ending · card expiring · near/reached limits'],
    ['P2 Setup', '#007EEA', 'Action Centre · Setup filter', '*_setup_pending · *_setup_continue · claim_your_free_domain · transfer pending'],
    ['P3 Access', '#673DE6', 'Action Centre · Access filter', 'verify_your_email · phone_number_added · ownership transfer'],
    ['P4 Offers', '#8F93A2', 'Offers only — never on Home', 'special_renewal_offer · drp_monthly_to_yearly_offer · whatsapp_notifications'],
  ];

  const b2 = board('02 Priority model', originX, originY + 900, 1100, (f) => {
    f.appendChild(text('02 · PRIORITY MODEL', 12, 'Bold', '#673DE6'));
    const h = text('How nudges earn a place', 36, 'Bold', '#1D1E20');
    h.layoutAlign = 'STRETCH';
    f.appendChild(h);
    const d = text(
      'The brief’s nudge list is inspiration. Map each type into P0–P4 so Home, badge, and Action Centre stay coherent as products grow.',
      16,
      'Regular',
      '#727586'
    );
    d.layoutAlign = 'STRETCH';
    f.appendChild(d);

    for (const [label, color, home, examples] of tiers) {
      const row = figma.createFrame();
      row.layoutMode = 'VERTICAL';
      row.primaryAxisSizingMode = 'AUTO';
      row.counterAxisSizingMode = 'FIXED';
      row.resize(1004, 10);
      row.itemSpacing = 6;
      row.paddingTop = 16;
      row.paddingBottom = 16;
      row.paddingLeft = 16;
      row.paddingRight = 16;
      row.cornerRadius = 12;
      row.fills = [solid('#FFFFFF')];
      row.strokes = [solid('#EAEAEF')];
      row.strokeWeight = 1;
      row.layoutAlign = 'STRETCH';

      const title = text(label + '  —  ' + home, 14, 'Bold', color);
      title.layoutAlign = 'STRETCH';
      row.appendChild(title);
      const ex = text(examples, 12, 'Regular', '#727586');
      ex.layoutAlign = 'STRETCH';
      row.appendChild(ex);
      f.appendChild(row);
    }

    const multi = card('Multi-site rule', [
      'Group Action Centre rows by site/product. Home lists all Critical (P0) actions across sites and always names the affected property (“Affects rocketman.xyz”).',
    ], 1004);
    multi.layoutAlign = 'STRETCH';
    f.appendChild(multi);
  });
  page.appendChild(b2);
  created.push(b2.id);

  // 03 Flows
  const b3 = board('03 Flows', originX + 1200, originY, 1100, (f) => {
    f.appendChild(text('03 · FLOWS', 12, 'Bold', '#673DE6'));
    const h = text('Core journeys', 36, 'Bold', '#1D1E20');
    h.layoutAlign = 'STRETCH';
    f.appendChild(h);

    const row = figma.createFrame();
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(1004, 10);
    row.itemSpacing = 16;
    row.fills = [];
    row.layoutAlign = 'STRETCH';

    row.appendChild(
      card('A · Home → Action Centre → resolve', [
        '1. Land on Home; sites first + optional P0 strip',
        '2. Open Actions via summary card or topbar badge',
        '3. Filter by Critical / Expiring / Setup / site',
        '4. Complete primary CTA (or dismiss / snooze)',
        '5. Badge and Home strip update immediately',
      ], 324)
    );
    row.appendChild(
      card('B · Access request', [
        '1. P0 access request can own Home strip when no worse billing blocker exists',
        '2. Review in Action Centre with Grant / Reject',
        '3. Reject dismisses; Grant opens permissions',
      ], 324)
    );
    row.appendChild(
      card('C · Empty / all clear', [
        '1. User clears remaining actions',
        '2. Action Centre shows calm empty state',
        '3. Home shows sites only — no phantom to-do wall',
      ], 324)
    );
    f.appendChild(row);
  });
  page.appendChild(b3);
  created.push(b3.id);

  // 04 UI
  const b4 = board('04 UI — Before → After', originX + 1200, originY + 700, 1100, (f) => {
    f.appendChild(text('04 · UI', 12, 'Bold', '#673DE6'));
    const h = text('Before → after', 36, 'Bold', '#1D1E20');
    h.layoutAlign = 'STRETCH';
    f.appendChild(h);
    const d = text(
      'Visual language follows the Hostinger stepping-stone: DM Sans / Inter, purple #673DE6, severity pink / yellow / blue. Hi-fi screens: screenshot the live prototype at localhost:5173 (/ and /actions).',
      16,
      'Regular',
      '#727586'
    );
    d.layoutAlign = 'STRETCH';
    f.appendChild(d);

    const row = figma.createFrame();
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(1004, 10);
    row.itemSpacing = 16;
    row.fills = [];
    row.layoutAlign = 'STRETCH';

    row.appendChild(
      card('Before', [
        '• Greeting then five equal-weight to-do cards',
        '• Websites pushed below the fold',
        '• “Show less” still keeps the system always-on',
        '• Offers and restore share the same hierarchy',
      ], 494)
    );
    row.appendChild(
      card('After', [
        '• Greeting + Actions summary entry',
        '• ≤1 critical strip when needed',
        '• Websites reclaim the fold',
        '• Full triage lives in Action Centre',
      ], 494)
    );
    f.appendChild(row);

    const states = card('States covered in prototype', [
      'Mixed severities · multi-site grouping · empty/all-clear · toast feedback · topbar badge live updates',
    ], 1004);
    states.layoutAlign = 'STRETCH';
    f.appendChild(states);
  });
  page.appendChild(b4);
  created.push(b4.id);

  // 05 Rationale
  const b5 = board('05 Rationale', originX + 2400, originY, 1100, (f) => {
    f.appendChild(text('05 · RATIONALE', 12, 'Bold', '#673DE6'));
    const h = text('Why Actions — not a notification centre', 32, 'Bold', '#1D1E20');
    h.layoutAlign = 'STRETCH';
    f.appendChild(h);
    const d = text(
      'The brief hypothesizes a notification centre. I kept a dedicated centre, but rejected the inbox metaphor because most items are tasks with outcomes.',
      16,
      'Regular',
      '#727586'
    );
    d.layoutAlign = 'STRETCH';
    f.appendChild(d);

    const row = figma.createFrame();
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(1004, 10);
    row.itemSpacing = 16;
    row.fills = [];
    row.layoutAlign = 'STRETCH';

    row.appendChild(
      card('Tradeoffs', [
        '• Page over drawer — multi-site triage needs room',
        '• “Actions” over “Notifications” — renew / restore / grant',
        '• All Criticals on Home — no artificial 1-item cap',
        '• Offers quarantined — never on Home or Critical',
      ], 494)
    );
    row.appendChild(
      card('What I cut', [
        '• Mobile-first layouts (desktop proof first)',
        '• Per-nudge bespoke layouts for all 53 types',
        '• Real billing / auth integrations',
        '• Complex digest preference settings',
      ], 494)
    );
    f.appendChild(row);

    const ai = card('AI in the process', [
      'Used AI to accelerate structure, priority mapping, and prototype scaffolding. Decisions to defend in interview: naming (“Actions”), listing all Criticals on Home (no 1-item cap), multi-site grouping, and excluding offers from Home.',
    ], 1004);
    ai.layoutAlign = 'STRETCH';
    f.appendChild(ai);
  });
  page.appendChild(b5);
  created.push(b5.id);

  figma.currentPage.selection = [b1, b2, b3, b4, b5];
  figma.viewport.scrollAndZoomIntoView([b1, b2, b3, b4, b5]);
  figma.closePlugin('Created 01–05 hPanel Actions worksheet boards.');
}

main().catch((err) => {
  figma.closePlugin(String(err && err.message ? err.message : err));
});
