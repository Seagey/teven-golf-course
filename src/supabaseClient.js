import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pknkcdrtnesakxbskruy.supabase.co';
const supabaseAnonKey = 'sb_publishable_ZEov4rZpNqcjXmSqhg5tRA_mz2G4rWt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
