/**
 * Admin shell: shared chrome (sidebar + main content area) for every page
 * under /admin/*. Auth is handled by middleware.ts (Supabase Auth session
 * with app_metadata.role = 'admin'), so by the time we reach this layout the
 * visitor is already authenticated; the sidebar just navigates between admin
 * views. /admin/login is the one unauthenticated page under this layout.
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
