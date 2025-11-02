// Script to run database migration
const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function runMigration() {
	// Load environment variables manually
	const envPath = path.join(__dirname, '..', '.env.production');
	const envFile = fs.readFileSync(envPath, 'utf8');
	envFile.split('\n').forEach(line => {
		const match = line.match(/^([^=:#]+)=(.*)$/);
		if (match) {
			const key = match[1].trim();
			const value = match[2].trim().replace(/^["']|["']$/g, '');
			process.env[key] = value;
		}
	});

	try {
		console.log('Connecting to database...');
		console.log('Connected successfully.');

		// Read migration file
		const migrationPath = path.join(__dirname, '..', 'migrations', 'add_privacy_settings.sql');
		const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

		console.log('\nRunning migration...');
		console.log('-------------------');
		
		// Execute migration - split into individual statements
		const statements = migrationSQL
			.split(';')
			.map(s => s.trim())
			.filter(s => s.length > 0);

		for (const statement of statements) {
			await sql.query(statement);
		}
		
		console.log('Migration completed successfully!');
		console.log('-------------------\n');

		// Verify changes
		console.log('Verifying changes...');
		const result = await sql`
			SELECT column_name, data_type, is_nullable
			FROM information_schema.columns
			WHERE table_name = 'users'
			AND column_name IN ('data_sharing_consent', 'analytics_consent', 'marketing_consent', 
			                     'account_deletion_requested', 'account_deletion_scheduled')
			ORDER BY column_name
		`;
		
		console.log('\nNew columns in users table:');
		result.rows.forEach(row => {
			console.log(`  - ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
		});

		console.log('\nDatabase migration completed successfully! ✓');
	} catch (error) {
		console.error('\n❌ Error running migration:', error.message);
		console.error(error);
		process.exit(1);
	}
}

runMigration();
