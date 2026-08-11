export type PriorityTier = 'P0' | 'P1' | 'P2' | 'P3' | 'P4'

export type ActionFilter =
  | 'all'
  | 'critical'
  | 'expiring'
  | 'setup'
  | 'access'
  | 'offers'

export const TIER_RANK: Record<PriorityTier, number> = {
  P0: 0,
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
}

export const TIER_LABEL: Record<PriorityTier, string> = {
  P0: 'Critical',
  P1: 'Expiring',
  P2: 'Setup',
  P3: 'Access',
  P4: 'Offers',
}

export const FILTER_TO_TIERS: Record<ActionFilter, PriorityTier[] | null> = {
  all: null,
  critical: ['P0'],
  expiring: ['P1'],
  setup: ['P2'],
  access: ['P3'],
  offers: ['P4'],
}

/** Maps Hostinger nudge type keys → priority tier */
export const NUDGE_TIER_MAP: Record<string, PriorityTier> = {
  payment_unsuccessful: 'P0',
  payment_card_expired: 'P0',
  failed_preauthorization: 'P0',
  hosting_plan_cancelled: 'P0',
  domain_expired_redemption: 'P0',

  hosting_plan_expired: 'P1',
  hosting_plan_expiring: 'P1',
  cpanel_hosting_plan_expired: 'P1',
  cpanel_hosting_plan_expiring: 'P1',
  domain_expired_grace: 'P1',
  domain_expiring: 'P1',
  vps_plan_expired: 'P1',
  vps_plan_expiring: 'P1',
  email_plan_expired: 'P1',
  email_plan_expiring: 'P1',
  email_plan_trial_expiring: 'P1',
  google_workspace_plan_expired: 'P1',
  google_workspace_plan_expiring: 'P1',
  titan_mail_plan_expired: 'P1',
  titan_mail_plan_expiring: 'P1',
  reach_plan_expired: 'P1',
  reach_plan_expiring: 'P1',
  payment_card_expiring: 'P1',
  horizons_trial_expiring: 'P1',
  website_builder_free_trial_ended_upgrade: 'P1',
  hosting_plan_reached_limits: 'P1',
  hosting_plan_near_limits: 'P1',

  hosting_setup_in_progress: 'P2',
  hosting_horizons_setup_continue: 'P2',
  hosting_plan_setup_continue: 'P2',
  hosting_plan_setup_pending: 'P2',
  hosting_for_client_pending: 'P2',
  cpanel_setup_pending: 'P2',
  vps_setup_pending: 'P2',
  vps_for_client_pending: 'P2',
  email_setup_pending: 'P2',
  email_for_client_pending: 'P2',
  google_workspace_setup_pending: 'P2',
  google_workspace_for_client_pending: 'P2',
  titan_mail_setup_pending: 'P2',
  domain_registration_pending: 'P2',
  claim_your_free_domain: 'P2',
  claim_your_free_domain_vps: 'P2',
  domain_transfer_pending: 'P2',
  website_builder_free_trial_edit_website: 'P2',

  verify_your_email: 'P3',
  phone_number_added: 'P3',
  website_ownership_transfer_request: 'P3',
  requested_access: 'P3',
  requested_access_with_payments: 'P3',

  special_renewal_offer: 'P4',
  drp_monthly_to_yearly_offer: 'P4',
  whatsapp_notifications: 'P4',
}

export function tierForNudge(nudgeType: string): PriorityTier {
  return NUDGE_TIER_MAP[nudgeType] ?? 'P3'
}
