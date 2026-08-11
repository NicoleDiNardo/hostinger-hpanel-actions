import { useActions } from '../../context/ActionsContext'
import styles from './Topbar.module.css'

interface Props {
  menuOpen?: boolean
  onMenuToggle?: () => void
}

export function Topbar({ menuOpen = false, onMenuToggle }: Props) {
  const { resetDemo, badgeCount } = useActions()

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
        <button type="button" className={styles.ghost} onClick={resetDemo}>
          Reset demo
        </button>
        <button type="button" className={styles.refer}>
          Refer &amp; earn up to $200
        </button>
        <button type="button" className={styles.ai}>
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
