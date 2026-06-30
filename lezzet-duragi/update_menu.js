const fs = require('fs');
const file = 'src/shared/data/menu.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace Unsplash images with reliable Picsum seed URLs
content = content.replace(/image: 'https:\/\/images\.unsplash\.com\/photo-[^']+',/g, (match) => {
    const id = Math.floor(Math.random() * 1000);
    return `image: 'https://picsum.photos/seed/${id}/500/500',`;
});

// Inject rating and reviewCount
content = content.replace(/isAvailable: (true|false),/g, (match, val) => {
    const rating = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
    const reviews = Math.floor(Math.random() * 500) + 10;
    return `isAvailable: ${val},\n    rating: ${rating},\n    reviewCount: ${reviews},`;
});

fs.writeFileSync(file, content);
console.log('Menu updated successfully!');
