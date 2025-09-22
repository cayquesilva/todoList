import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Task = {
  id: string
  title: string
  is_complete: boolean
  user_id: string
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  created_at: string
}