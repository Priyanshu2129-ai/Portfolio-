import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    // Return null or placeholder client to prevent runtime crash when credentials not configured yet
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}

