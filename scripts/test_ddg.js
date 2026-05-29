const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
  // Test Wayback Machine CDX API
  const query = 'techcrunch.com 2026 Spotify AI music';
  const url = `https://web.archive.org/cdx/search/cdx?url=techcrunch.com/*Spotify*AI*&output=json&limit=5&fl=original,timestamp`;
  console.log('Testing Wayback CDX API...');
  try {
    const res = await axios.get(url, { timeout: 10000 });
    console.log('Results:', JSON.stringify(res.data).substring(0, 300));
  } catch (e) {
    console.error('Error:', e.message.slice(0, 100));
  }

  // Test direct scrape of TechCrunch archive
  console.log('\nTesting direct TechCrunch archive scrape...');
  try {
    const tcUrl = 'https://techcrunch.com/2026/05/';
    const res = await axios.get(tcUrl, {
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const $ = cheerio.load(res.data);
    const links = [];
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || '';
      if (href.includes('techcrunch.com/2026') && href.includes('Spotify')) {
        links.push(href);
      }
    });
    console.log('Found:', links.length);
    links.slice(0, 3).forEach(l => console.log('  ', l));
  } catch (e) {
    console.error('Error:', e.message.slice(0, 100));
  }

  process.exit(0);
})();
