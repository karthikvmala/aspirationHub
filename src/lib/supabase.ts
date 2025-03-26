import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zmiczekgipmjzmvotobr.supabase.";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptaWN6ZWtnaXBtanptdm90b2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDEzMzcsImV4cCI6MjA1ODU3NzMzN30.W0qfQ3qyTlF2r5uIWZq-kAUBmKMdAH9DotBv_DWJUaw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);