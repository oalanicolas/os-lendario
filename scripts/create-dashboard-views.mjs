#!/usr/bin/env node
/**
 * Create dashboard views via Supabase Management API
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(appDir, '..');

dotenv.config({ path: path.join(rootDir, '.env.local') });
dotenv.config({ path: path.join(rootDir, '.env') });

// Get database password from env
const DB_PASSWORD = process.env.SUPABASE_PASSWORD;
const PROJECT_REF = 'uvoikabnkjfvcccjeypi';

if (!DB_PASSWORD) {
  console.error('❌ SUPABASE_PASSWORD not found in .env');
  process.exit(1);
}

// Read the SQL file
const sqlFile = path.join(rootDir, 'supabase/migrations/20251211170000_content_counts_view.sql');
const sql = fs.readFileSync(sqlFile, 'utf-8');

console.log('📋 SQL to execute:\n');
console.log(sql);
console.log('\n' + '='.repeat(60));
console.log('\n⚠️  Cannot execute DDL via REST API.');
console.log('\n✅ Please run this SQL in Supabase Dashboard > SQL Editor:');
console.log(`   https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new`);
console.log('\n📋 Or copy the SQL above.');
