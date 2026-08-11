import type { ActionIcon as IconName } from '../../data/actions'
import type { PriorityTier } from '../../lib/priority'
import styles from './ActionIcon.module.css'

const SRC: Record<IconName, string> = {
  servers: '/icons/servers.svg',
  globe: '/icons/globe.svg',
  envelope: '/icons/envelope.svg',
  'globe-setup': '/icons/globe-setup.svg',
  'user-double': '/icons/user-double.svg',
  offer: '/icons/offer.svg',
}

const TIER_CLASS: Record<PriorityTier, string> = {
  P0: styles.p0,
  P1: styles.p1,
  P2: styles.p2,
  P3: styles.p3,
  P4: styles.p4,
}

interface Props {
  icon: IconName
  tier: PriorityTier
  showWarningBadge?: boolean
}

export function ActionAvatar({ icon, tier, showWarningBadge }: Props) {
  return (
    <div className={`${styles.avatar} ${TIER_CLASS[tier]}`}>
      <img
        className={styles.glyph}
        src={SRC[icon]}
        alt=""
        width={24}
        height={24}
      />
      {showWarningBadge ? (
        <img
          className={styles.badge}
          src="/icons/warning-badge.svg"
          alt=""
          width={16}
          height={16}
        />
      ) : null}
    </div>
  )
}
