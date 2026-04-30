/**
 * Admin shell — shared chrome (sidebar + main content area) for every page
 * under /admin/*. Auth is handled by middleware.ts (HTTP basic auth via
 * ADMIN_PASSWORD), so by the time we reach this layout the visitor is already
 * authenticated; the sidebar just navigates between admin views.
 *
 * Patterned after aio-website/src/app/admin/layout.tsx, translated from
 * Tailwind to fab-four's CSS-modules + brand-token style system.
 */

import AdminSidebar from '@/components/admin/AdminSidebar'
import styles from './layout.module.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
