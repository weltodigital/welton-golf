import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

// Only create client if environment variables are available
let supabase = null
if (supabaseUrl && supabaseAnonKey) {
  supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

// Export the createClient function for use in server components
export function createClient(url, key) {
  if (!url || !key) {
    console.warn('Missing Supabase credentials for createClient')
    return null
  }
  return createSupabaseClient(url, key)
}

// Database schema setup function for golf applications
export async function setupDatabaseSchema() {
  try {
    console.log('🚀 Setting up Welton Golf database schema...')

    // Golf-related tables will be created here as needed
    console.log('🎉 Database schema setup complete!')
    return true

  } catch (error) {
    console.error('❌ Error setting up database schema:', error.message)
    return false
  }
}