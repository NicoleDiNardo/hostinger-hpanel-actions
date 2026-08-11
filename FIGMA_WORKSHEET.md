# Figma worksheet copy deck

Duplicate the Hostinger brief file, then create five boards to the right of the task frames. Paste the text below (or screenshot the in-app `/worksheet` routes).

---

## 01 Framing — hPanel Actions

**Deck:** Replace the always-on to-do wall with a priority-aware Action Centre so Home can serve websites again — and only true blockers interrupt.

**Problem**
- Renewals, setup, and account requests share one undifferentiated list
- Users scroll past; CTA conversion stays low
- Key home content is buried below the fold
- Everything feels urgent → nothing feels urgent
- Product growth makes the list unscalable

**Goals**
- Reclaim Home fold for products & sites
- Earn urgency with a clear severity model
- Improve focus on the highest-value CTAs
- Scale across many products & multi-site users
- Stay usable for non-technical customers

**Non-goals**
- Pixel-perfect coverage of all 53 nudge types
- A passive “notification inbox” metaphor
- Marketing offers competing with billing blockers

**Principles**
1. Urgency is earned — only P0 blockers interrupt Home (max one strip)
2. Home is for products — Actions collapse to summary + topbar badge
3. One primary next step — recommend, don’t dump
4. Triage over dump — filter by severity and site
5. User control — dismiss and snooze

---

## 02 Priority model

| Tier | Label | Home treatment | Count |
|------|-------|----------------|-------|
| P0 | Critical | All Critical actions on Home + badge | 5 |
| P1 | Expiring | Action Centre (default weight) | 22 |
| P2 | Setup | Action Centre · Setup filter | 18 |
| P3 | Access | Action Centre · Access · never Home Critical | 5 |
| P4 | Offers | Offers only — never Home · excluded from badge | 3 |

**P0 Critical (5)**  
`payment_unsuccessful` · `payment_card_expired` · `failed_preauthorization` · `hosting_plan_cancelled` · `domain_expired_redemption`

**P1 Expiring (22)**  
`horizons_trial_expiring` · `hosting_plan_expired` · `hosting_plan_expiring` · `website_builder_free_trial_ended_upgrade` · `cpanel_hosting_plan_expired` · `cpanel_hosting_plan_expiring` · `domain_expired_grace` · `domain_expiring` · `vps_plan_expired` · `vps_plan_expiring` · `email_plan_expired` · `email_plan_expiring` · `email_plan_trial_expiring` · `google_workspace_plan_expired` · `google_workspace_plan_expiring` · `titan_mail_plan_expired` · `titan_mail_plan_expiring` · `reach_plan_expired` · `reach_plan_expiring` · `payment_card_expiring` · `hosting_plan_reached_limits` · `hosting_plan_near_limits`

**P2 Setup (18)**  
`hosting_setup_in_progress` · `website_builder_free_trial_edit_website` · `hosting_horizons_setup_continue` · `hosting_plan_setup_continue` · `hosting_plan_setup_pending` · `hosting_for_client_pending` · `cpanel_setup_pending` · `vps_setup_pending` · `vps_for_client_pending` · `email_setup_pending` · `email_for_client_pending` · `google_workspace_setup_pending` · `google_workspace_for_client_pending` · `titan_mail_setup_pending` · `domain_registration_pending` · `claim_your_free_domain` · `claim_your_free_domain_vps` · `domain_transfer_pending`

**P3 Access (5)**  
`requested_access` · `requested_access_with_payments` · `verify_your_email` · `phone_number_added` · `website_ownership_transfer_request`

**P4 Offers (3)**  
`special_renewal_offer` · `drp_monthly_to_yearly_offer` · `whatsapp_notifications`

**Multi-site:** group by site; Home Criticals always name the affected property.

---

## 03 Flows

**A · Home → Action Centre → resolve**
1. Land on Home (sites + optional P0)
2. Open Actions via chip or badge
3. Filter / pick site
4. CTA / dismiss / snooze
5. Badge + strip update

**B · Access request** — P3 Access never interrupts Home; open Actions → Access filter → Grant / Reject

**C · Empty** — calm empty state; Home shows products only

---

## 04 UI

**Before:** five equal to-do cards bury websites.  
**After:** greeting + Actions entry + ≤1 critical strip + website cards above the fold.

Hi-fi: screenshot `/` and `/actions` from the prototype. Tokens: DM Sans, `#673DE6`, severity pink / yellow / blue.

---

## 05 Rationale

Why Actions ≠ notification centre: tasks with outcomes, not inbox mail.

**Tradeoffs:** full page over drawer; Actions naming; hard P0 cap; offers quarantined.  
**Cut:** mobile polish, all 53 bespoke layouts, real APIs.  
**AI:** accelerated scaffolding; defend the product calls above in interview.
