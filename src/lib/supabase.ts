
import { createClient } from '@supabase/supabase-js';

// Configuration for Supabase
// You need to replace these with your actual Supabase URL and Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ecvhzfyrwstnkwwnknwp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjdmh6Znlyd3N0bmt3d25rbndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODYxMjAsImV4cCI6MjA4NTk2MjEyMH0.367y73qSgg0-i1TN4ROOyXyEH_75SGiNLgva6sZ0-Xw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
