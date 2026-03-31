import db from './db.js';
import { MOCK_NEWS } from '../src/data/news.js'; // Ensure to use .js if TS output behaves like ESM in tsx

console.log('Seeding Database...');

const existingArticlesCount = db.prepare('SELECT COUNT(*) as count FROM articles').get() as { count: number };

if (existingArticlesCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO articles (id, title, excerpt, content, author, date, category, tags, imageUrl, readTime) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((articles) => {
    for (const article of articles) {
      insert.run(
        article.id,
        article.title,
        article.excerpt,
        article.content,
        article.author,
        article.date,
        article.category,
        JSON.stringify(article.tags || []),
        article.imageUrl,
        article.readTime
      );
    }
  });

  insertMany(MOCK_NEWS);
  console.log(`Successfully seeded ${MOCK_NEWS.length} articles!`);
} else {
  console.log('Database already has articles, skipping seed.');
}
