const fs = require('fs');
const file = 'src/shared/data/menu.ts';
let content = fs.readFileSync(file, 'utf8');

const imageMap = {
  "'1'": "'/images/corba.png'",
  "'2'": "'/images/ana_yemek.png'",
  "'3'": "'/images/kebap.png'",
  "'4'": "'/images/burger.png'",
  "'5'": "'/images/pizza.png'",
  "'6'": "'/images/salata.png'",
  "'7'": "'/images/tatli.png'",
  "'8'": "'/images/icecek.png'"
};

content = content.replace(/categoryId:\s*('[1-8]'),[\s\S]*?image:\s*'[^']+',/g, (match, catId) => {
    const newImage = imageMap[catId];
    return match.replace(/image:\s*'[^']+',/, `image: ${newImage},`);
});

fs.writeFileSync(file, content);
console.log('Images updated to AI generated local paths!');
