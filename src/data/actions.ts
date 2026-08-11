import type { PriorityTier } from '../lib/priority'
import { tierForNudge } from '../lib/priority'

export type ActionStatus = 'active' | 'dismissed' | 'snoozed'

export type ActionIcon =
  | 'servers'
  | 'globe'
  | 'envelope'
  | 'globe-setup'
  | 'user-double'
  | 'offer'

export interface PanelAction {
  id: string
  nudgeType: string
  tier: PriorityTier
  title: string
  /** Body copy on Action Centre cards */
  description: string
  /** Body copy on Home critical strips (includes “Affects …”) */
  homeDescription: string
  site: string
  /** Visual group key — Offers is separate from site groups */
  group: string
  product: string
  ctaLabel: string
  secondaryCtaLabel?: string
  icon: ActionIcon
  showWarningBadge?: boolean
  boldPhrase?: string
  daysLeft?: number
  status: ActionStatus
}

const raw: Omit<PanelAction, 'tier' | 'status'>[] = [
  {
    id: '1',
    nudgeType: 'hosting_plan_cancelled',
    title: 'Your Premium Web Hosting was cancelled',
    description: 'You have 10 days to restore before files are deleted.',
    homeDescription:
      'Affects rocketman.xyz · You have 10 days to restore before files are deleted.',
    site: 'rocketman.xyz',
    group: 'rocketman.xyz',
    product: 'Hosting',
    ctaLabel: 'Restore',
    icon: 'servers',
    showWarningBadge: true,
    daysLeft: 10,
  },
  {
    id: '2',
    nudgeType: 'domain_expired_redemption',
    title: 'Your domain rocketman.xyz expired on 12 Aug 2026',
    description: 'Renew now to keep this domain yours.',
    homeDescription:
      'Affects rocketman.xyz · Renew now to keep this domain yours.',
    site: 'rocketman.xyz',
    group: 'rocketman.xyz',
    product: 'Domain',
    ctaLabel: 'Renew',
    icon: 'globe',
    showWarningBadge: true,
    daysLeft: 18,
  },
  {
    id: '3',
    nudgeType: 'email_plan_expiring',
    title: 'Your Business Starter Email will expire soon',
    description:
      'You have 10 days to renew it if you want to continue sending and receiving emails.',
    homeDescription:
      'Affects studio-bloom.com · You have 10 days to renew it if you want to continue sending and receiving emails.',
    site: 'studio-bloom.com',
    group: 'studio-bloom.com',
    product: 'Email',
    ctaLabel: 'Renew',
    icon: 'envelope',
    boldPhrase: '10 days',
    daysLeft: 10,
  },
  {
    id: '4',
    nudgeType: 'domain_transfer_pending',
    title: 'Your domain transfer for studio-bloom.com isn’t finished yet',
    description: 'Finish your domain transfer request to initiate the transfer.',
    homeDescription:
      'Affects studio-bloom.com · Finish your domain transfer request to initiate the transfer.',
    site: 'studio-bloom.com',
    group: 'studio-bloom.com',
    product: 'Domain',
    ctaLabel: 'Initiate transfer',
    icon: 'globe-setup',
  },
  {
    id: '5',
    nudgeType: 'requested_access',
    title: 'justina@gmail.com has requested access to your account',
    description: 'Grant them access so they can set up and manage your services.',
    homeDescription:
      'Grant them access so they can set up and manage your services.',
    site: 'Account',
    group: 'Account',
    product: 'Account sharing',
    ctaLabel: 'Grant access',
    secondaryCtaLabel: 'View more',
    icon: 'user-double',
  },
  {
    id: '6',
    nudgeType: 'special_renewal_offer',
    title: 'Special renewal offer',
    description: 'Save on your next renew cycle.',
    homeDescription: 'Save on your next renew cycle.',
    site: 'rocketman.xyz',
    group: 'Offers',
    product: 'Hosting',
    ctaLabel: 'View offer',
    icon: 'offer',
  },
]

export const INITIAL_ACTIONS: PanelAction[] = raw.map((item) => ({
  ...item,
  tier: tierForNudge(item.nudgeType),
  status: 'active',
}))

export const GROUP_ORDER = [
  'rocketman.xyz',
  'studio-bloom.com',
  'Account',
  'Offers',
]

export const SITES = ['All sites', 'rocketman.xyz', 'studio-bloom.com', 'Account']
