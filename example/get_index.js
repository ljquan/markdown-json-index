const getIndex = require('../index');
const blogPath = __dirname + '/blog';
console.log(JSON.stringify(getIndex(blogPath), null, 2));
