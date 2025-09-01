import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nlhjuscebquwslzqtsva.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saGp1c2NlYnF1d3NsenF0c3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MjE0OTIsImV4cCI6MjA3MjI5NzQ5Mn0.cLau2vN4ZmrzxOrqmr2p9iGtBj5EROQ_-D2FRctB37k"
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
