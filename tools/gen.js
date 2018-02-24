
const https = require('https')
const fs = require('fs')

let d = fs.readFileSync('/Users/xing/.my_github_token', 'utf8')
d = d.slice(0, d.length - 1)
console.log(d)
/*
(err, data) => {
	if (err) {
		console.log(err);
	}
	console.log(data);
})
*/


const query = `query { viewer { login }}`

const body = JSON.stringify({query})

const options = {
	hostname: 'api.github.com',
	path: '/graphql',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `bearer ${d}`,
		'User-Agent': 'xingmarc',
		//'Content-Type': 'application/x-www-form-urlencoded',
    		//'Content-Length': Buffer.byteLength(body)
	},

}

console.log(options)

const req = https.request(options, (res) => {
	console.log(`STATUS: ${res.statusCode}`);
	console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	res.setEncoding('utf8');
	
	res.on('data', (chunk) => {
		console.log(`BODY: ${chunk}`);
	});
	res.on('end', () => {
		console.log('No more data in response.');
	});
})

req.on('error', (e) => {
	console.error(`problem with request: ${e.message}`);
});

req.write(body);

req.end();

console.log('hey')

