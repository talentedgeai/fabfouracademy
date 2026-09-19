/**
 * Admin sidebar nav. Mirrors aio-website's admin-sidebar.tsx but trimmed to
 * the routes that exist on fab-four today (no Members / Orders / Affiliates
 * / Retreat - those land in Phase 3 once their schema exists).
 *
 * Sign out ends the Supabase Auth session that middleware.ts checks. The
 * sidebar hides itself on /admin/login, which shares the admin layout.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase-browser'
import styles from './AdminSidebar.module.css'

type NavItem = {
  href: string
  label: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin',            label: 'Dashboard',  icon: '◈' },
  { href: '/admin/people',     label: 'People',     icon: '◉' },
  { href: '/admin/inquiries',  label: 'Inquiries',  icon: '☰' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: '✉' },
  { href: '/admin/emails',     label: 'Emails',     icon: '➤' },
  { href: '/admin/content',    label: 'Content',    icon: '❏' },
  { href: '/admin/analytics',  label: 'Analytics',  icon: '▲' },
  { href: '/admin/account',    label: 'Account',    icon: '⚙' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  if (pathname.startsWith('/admin/login')) return null

  const signOut = async () => {
    await createBrowserClient().auth.signOut()
    router.replace('/admin/login')
  }

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin' && pathname.startsWith(href))

  return (
    <>
      {/* Mobile top bar */}
      <div className={styles.mobileBar}>
        <span className={styles.brand}>FAB FOUR ADMIN</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={styles.toggle}
          aria-label="Toggle navigation"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.brandRow}>
          <span className={styles.brand}>FAB FOUR ADMIN</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`${styles.navItem} ${
                isActive(item.href) ? styles.navItemActive : ''
              }`}
            >
              <span className={styles.icon} aria-hidden="true">{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <Link href="/" className={styles.exitLink}>
            ← Exit to site
          </Link>
          <button type="button" onClick={signOut} className={styles.exitLink}>
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
