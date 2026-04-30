import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr';

// Browser-side Supabase client for auth operations.
// Uses @supabase/ssr so auth tokens are stored in cookies (readable by middleware).

export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Set them in .env.local.'
    );
  }

  return createSSRBrowserClient(url, publishableKey);
}
