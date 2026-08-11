import { useNavigate } from 'react-router-dom'
import {
  useActions,
  type DemoJourney,
} from '../../context/ActionsContext'
import styles from './Topbar.module.css'

interface Props {
  menuOpen?: boolean
  onMenuToggle?: () => void
}

const JOURNEYS: { id: DemoJourney; label: string; title: string }[] = [
  { id: 'A', label: 'A', title: 'Journey A · Clear Criticals (Home full inventory)' },
  { id: 'B', label: 'B', title: 'Journey B · Access pending (Home, badge 1)' },
  { id: 'C', label: 'C', title: 'Journey C · After snooze (Action Centre)' },
]

export function Topbar({ menuOpen = false, onMenuToggle }: Props) {
  const { loadJourney, journey, badgeCount } = useActions()
  const navigate = useNavigate()

  const goJourney = (next: DemoJourney) => {
    loadJourney(next)
    navigate(next === 'C' ? '/actions' : '/')
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuBtn}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="app-sidebar"
          onClick={onMenuToggle}
        >
          <img src="/icons/menu.svg" alt="" width={24} height={24} />
          {badgeCount > 0 ? (
            <span className={styles.menuBadge}>{badgeCount}</span>
          ) : null}
        </button>
        <div className={styles.brand}>
          <img
            src="/icons/logo-mark.svg"
            alt=""
            width={26}
            height={30}
          />
          <img
            src="/icons/logo-type.svg"
            alt="Hostinger"
            width={112}
            height={13}
          />
        </div>
      </div>

      <div className={styles.search}>
        <img
          className={styles.searchIcon}
          src="/icons/search.svg"
          alt=""
          width={24}
          height={24}
        />
        <span className={styles.searchPlaceholder}>Search</span>
        <kbd className={styles.kbd}>⌘</kbd>
        <kbd className={styles.kbd}>K</kbd>
      </div>

      <div className={styles.right}>
        <div
          className={styles.journeys}
          role="group"
          aria-label="Demo journey"
        >
          {JOURNEYS.map((j) => (
            <button
              key={j.id}
              type="button"
              className={
                journey === j.id
                  ? `${styles.journeyBtn} ${styles.journeyBtnActive}`
                  : styles.journeyBtn
              }
              title={j.title}
              aria-pressed={journey === j.id}
              onClick={() => goJourney(j.id)}
            >
              {j.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.ghost}
          onClick={() => goJourney('A')}
        >
          Reset demo
        </button>
        <button type="button" className={styles.refer}>
          <img
            className={styles.referIcon}
            src="/icons/refer.svg"
            alt=""
            width={16}
            height={16}
          />
          Refer &amp; earn up to $200
        </button>
        <button type="button" className={styles.ai}>
          <img
            className={styles.aiIcon}
            src="/icons/ask-ai.svg"
            alt=""
            width={20}
            height={20}
          />
          <span className={styles.aiLabel}>Ask AI</span>
        </button>
        <button type="button" className={styles.avatarBtn} aria-label="Account">
          <img
            src="/icons/user-circle.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
    </header>
  )
}
