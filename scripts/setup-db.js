const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const password = process.env.SUPABASE_DB_PASSWORD || process.argv[2];
const projectRef = 'godwvqxsswltgmbzlrdr';
const region = 'ap-northeast-1';

if (!password) {
  console.error('Error: Supabase database password is required.');
  console.log('Usage: node scripts/setup-db.js <SUPABASE_DB_PASSWORD>');
  console.log('Or set SUPABASE_DB_PASSWORD in .env.local');
  process.exit(1);
}

const sqlPath = path.join(__dirname, '..', 'supabase-schema.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

async function run() {
  console.log(`Connecting to Supabase PostgreSQL (${region})...`);
  
  // Try transaction pooler first
  const connectionStrings = [
    `postgresql://postgres.${projectRef}:${encodeURIComponent(password)}@aws-0-${region}.pooler.supabase.com:6543/postgres?sslmode=require`,
    `postgresql://postgres.${projectRef}:${encodeURIComponent(password)}@aws-0-${region}.pooler.supabase.com:5432/postgres?sslmode=require`,
    `postgresql://postgres:${encodeURIComponent(password)}@db.${projectRef}.supabase.co:5432/postgres?sslmode=require`
  ];

  let client = null;
  let connected = false;

  for (const connStr of connectionStrings) {
    try {
      console.log(`Trying connection...`);
      client = new Client({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false }
      });
      await client.connect();
      console.log('Connected successfully!');
      connected = true;
      break;
    } catch (err) {
      console.warn('Connection failed:', err.message);
      if (client) {
        try { await client.end(); } catch (_) {}
      }
    }
  }

  if (!connected) {
    console.error('\n❌ Could not connect with provided password.');
    process.exit(1);
  }

  try {
    console.log('Executing supabase-schema.sql...');
    await client.query(sql);
    console.log('✅ Tables, RLS policies, and seed data created successfully in Supabase!');
  } catch (err) {
    console.error('❌ SQL execution failed:', err.message);
  } finally {
    await client.end();
  }
}

run();
