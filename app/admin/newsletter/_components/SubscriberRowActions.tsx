/**
 * Inline opt-out / re-opt-in toggle for a subscriber row.
 * Calls the setContactConsent server action and shows pending state.
 */

'use client'

import { useTransition } from 'react'
import { setContactConsent } from '../actions'
import styles from './SubscriberRowActions.module.css'

export default function SubscriberRowActions({
  personId,
  okToContact,
}: {
  personId: string
  okToContact: boolean
}) {
  const [pending, startTransition] = useTransition()

  function toggle() {
    startTransition(async () => {
      await setContactConsent(personId, !okToContact)
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className={`${styles.btn} ${okToContact ? styles.optOut : styles.optIn}`}
    >
      {pending
        ? '…'
        : okToContact
          ? 'Opt out'
          : 'Re-subscribe'}
    </button>
  )
}
