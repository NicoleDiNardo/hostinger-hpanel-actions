import type { PanelAction } from '../../data/actions'
import { useActions } from '../../context/ActionsContext'
import { ActionAvatar } from './ActionIcon'
import styles from './ActionCard.module.css'

interface Props {
  action: PanelAction
}

function Description({ action }: { action: PanelAction }) {
  if (action.boldPhrase && action.description.includes(action.boldPhrase)) {
    const [before, after] = action.description.split(action.boldPhrase)
    return (
      <p className={styles.desc}>
        {before}
        <strong>{action.boldPhrase}</strong>
        {after}
      </p>
    )
  }
  return <p className={styles.desc}>{action.description}</p>
}

export function ActionCard({ action }: Props) {
  const { dismiss, runCta, snooze } = useActions()
  const solid = action.tier === 'P0'
  const isEmail = action.nudgeType === 'email_plan_expiring'

  return (
    <article className={styles.card}>
      <div className={styles.main}>
        <ActionAvatar
          icon={action.icon}
          tier={action.tier}
          showWarningBadge={action.showWarningBadge}
        />
        <div className={styles.body}>
          <h3 className={styles.title}>{action.title}</h3>
          <Description action={action} />
        </div>
      </div>

      <div className={styles.actions}>
        {action.secondaryCtaLabel === 'View more' ? (
          <button
            type="button"
            className={styles.link}
            onClick={() => runCta({ ...action, ctaLabel: 'View more' })}
          >
            View more
          </button>
        ) : null}
        <button
          type="button"
          className={solid ? styles.primarySolid : styles.primaryOutline}
          onClick={() => runCta(action)}
        >
          {action.ctaLabel}
        </button>
        <button
          type="button"
          className={styles.dismiss}
          aria-label={isEmail ? 'Snooze for 7 days' : 'Dismiss'}
          data-tooltip={isEmail ? 'Snooze for 7 days' : 'Dismiss'}
          onClick={() => (isEmail ? snooze(action.id) : dismiss(action.id))}
        >
          <img src="/icons/cross.svg" alt="" width={16} height={16} />
        </button>
      </div>
    </article>
  )
}
