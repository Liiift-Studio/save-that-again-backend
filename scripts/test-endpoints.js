// Script to test new API endpoints
const https = require('https');

const BASE_URL = 'https://save-that-again-backend.vercel.app';

async function makeRequest(method, path, token = null, body = null) {
	return new Promise((resolve, reject) => {
		const url = new URL(path, BASE_URL);
		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			}
		};

		if (token) {
			options.headers['Authorization'] = `Bearer ${token}`;
		}

		const req = https.request(url, options, (res) => {
			let data = '';
			res.on('data', (chunk) => data += chunk);
			res.on('end', () => {
				try {
					resolve({
						status: res.statusCode,
						headers: res.headers,
						body: data ? JSON.parse(data) : null
					});
				} catch (e) {
					resolve({
						status: res.statusCode,
						headers: res.headers,
						body: data
					});
				}
			});
		});

		req.on('error', reject);

		if (body) {
			req.write(JSON.stringify(body));
		}

		req.end();
	});
}

async function testEndpoints() {
	console.log('Testing Save That Again API Endpoints');
	console.log('=====================================\n');

	// Test 1: Privacy API (should require auth)
	console.log('1. Testing GET /api/user/privacy (unauthenticated)');
	try {
		const response = await makeRequest('GET', '/api/user/privacy');
		console.log(`   Status: ${response.status}`);
		console.log(`   Expected: 401 Unauthorized`);
		console.log(`   Result: ${response.status === 401 ? '✓ PASS' : '✗ FAIL'}\n`);
	} catch (error) {
		console.log(`   Error: ${error.message}\n`);
	}

	// Test 2: Export API (should require auth)
	console.log('2. Testing GET /api/user/export (unauthenticated)');
	try {
		const response = await makeRequest('GET', '/api/user/export');
		console.log(`   Status: ${response.status}`);
		console.log(`   Expected: 401 Unauthorized`);
		console.log(`   Result: ${response.status === 401 ? '✓ PASS' : '✗ FAIL'}\n`);
	} catch (error) {
		console.log(`   Error: ${error.message}\n`);
	}

	// Test 3: Delete API (should require auth)
	console.log('3. Testing DELETE /api/user/delete (unauthenticated)');
	try {
		const response = await makeRequest('DELETE', '/api/user/delete');
		console.log(`   Status: ${response.status}`);
		console.log(`   Expected: 401 Unauthorized`);
		console.log(`   Result: ${response.status === 401 ? '✓ PASS' : '✗ FAIL'}\n`);
	} catch (error) {
		console.log(`   Error: ${error.message}\n`);
	}

	// Test 4: Settings page exists
	console.log('4. Testing GET /settings page');
	try {
		const response = await makeRequest('GET', '/settings');
		console.log(`   Status: ${response.status}`);
		console.log(`   Expected: 200 OK`);
		console.log(`   Result: ${response.status === 200 ? '✓ PASS' : '✗ FAIL'}\n`);
	} catch (error) {
		console.log(`   Error: ${error.message}\n`);
	}

	// Test 5: Cookie policy page exists
	console.log('5. Testing GET /cookies page');
	try {
		const response = await makeRequest('GET', '/cookies');
		console.log(`   Status: ${response.status}`);
		console.log(`   Expected: 200 OK`);
		console.log(`   Result: ${response.status === 200 ? '✓ PASS' : '✗ FAIL'}\n`);
	} catch (error) {
		console.log(`   Error: ${error.message}\n`);
	}

	console.log('=====================================');
	console.log('Testing Complete!');
	console.log('\nNote: To test authenticated endpoints, you need to:');
	console.log('1. Log in to the website at ' + BASE_URL);
	console.log('2. Get your JWT token from localStorage');
	console.log('3. Test endpoints manually with that token\n');
}

testEndpoints();
