const fs = require('fs');
const https = require('https');
const vm = require('vm');

function getBabel() {
  return new Promise((resolve, reject) => {
    https.get('https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.10/babel.min.js', (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const context = { window: {}, self: {}, global: {} };
        vm.createContext(context);
        vm.runInContext(data, context);
        const Babel = context.Babel || context.window.Babel || global.Babel;
        resolve(Babel);
      });
    }).on('error', reject);
  });
}

async function build() {
  console.log('Reading app.js JSX source...');
  const jsxCode = fs.readFileSync('app.js', 'utf8');
  
  console.log('Fetching Babel compiler...');
  const Babel = await getBabel();
  
  console.log('Compiling JSX to pure ES5/ES6 JavaScript...');
  const transformed = Babel.transform(jsxCode, {
    presets: ['react', 'env']
  }).code;
  
  fs.writeFileSync('app.compiled.js', transformed, 'utf8');
  console.log('✓ Successfully compiled app.js -> app.compiled.js (' + (transformed.length / 1024).toFixed(1) + ' KB)');
}

build().catch(console.error);
