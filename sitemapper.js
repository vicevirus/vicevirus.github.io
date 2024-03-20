// If `sitemap-generator` supports ESM, you can do something like this:
import SitemapGenerator from 'sitemap-generator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// To handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create generator
const generator = SitemapGenerator('https://vicevirus.github.io', {
  stripQuerystring: false
});

// Register event listeners
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

// Start the crawler
generator.start();
