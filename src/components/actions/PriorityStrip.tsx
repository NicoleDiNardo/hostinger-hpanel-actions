import type { PanelAction } from '../../data/actions'
import { useActions } from '../../context/ActionsContext'
import { ActionAvatar } from './ActionIcon'
import styles from './PriorityStrip.module.css'

interface Props {
  action: PanelAction
}

export function PriorityStrip({ action }: Props) {
  const { runCta, dismiss } = useActions()

  return (
    <section className={styles.strip} aria-label="Critical action">
      <div className={styles.main}>
        <ActionAvatar
          icon={action.icon}
          tier={action.tier}
          showWarningBadge={action.showWarningBadge}
        />
        <div className={styles.body}>
          <h2 className={styles.title}>{action.title}</h2>
          <p className={styles.desc}>{action.homeDescription}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cta}
          onClick={() => runCta(action)}
        >
          {action.ctaLabel}
        </button>
        <button
          type="button"
          className={styles.dismiss}
          aria-label="Dismiss"
          data-tooltip="Dismiss"
          onClick={() => dismiss(action.id)}
        >
          <img src="/icons/cross.svg" alt="" width={16} height={16} />
        </button>
      </div>
    </section>
  )
}
