const SitemapGenerator = require('sitemap-generator');
const fs = require('fs');
const path = require('path');

// create generator
const generator = SitemapGenerator('https://vicevirus.github.io', {
  stripQuerystring: false
});

// register event listeners
generator.on('done', () => {
  // Assuming the sitemap is generated in the current directory; adjust as necessary
  const generatedSitemapPath = path.join(__dirname, 'sitemap.xml');
  const targetPath = path.join(__dirname, 'public', 'sitemap.xml');

  fs.rename(generatedSitemapPath, targetPath, (err) => {
    if (err) {
      console.error('Error moving sitemap:', err);
      return;
    }
    console.log('Sitemap successfully moved to public folder.');
  });
});

// start the crawler
generator.start();
