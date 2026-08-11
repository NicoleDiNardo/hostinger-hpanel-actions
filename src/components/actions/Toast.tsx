import { useEffect } from 'react'
import { useActions } from '../../context/ActionsContext'
import styles from './Toast.module.css'

export function Toast() {
  const { toast, clearToast } = useActions()

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(clearToast, 2800)
    return () => window.clearTimeout(t)
  }, [toast, clearToast])

  if (!toast) return null

  return (
    <div className={styles.toast} role="status">
      {toast}
    </div>
  )
}
