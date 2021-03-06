const fs = require('fs')
let reg = /\.md$/;
//遍历读取文件
const createIndex = (path) => fs.readdirSync(path).map(file => {
   let filePath = path + '/' + file;
   let fileStat = fs.statSync(filePath);
   let ret = {
     path: filePath,
     mtime: new Date(fileStat.mtime).getTime()
   };
   if(fileStat.isDirectory()){
     ret.child = createIndex(filePath);
   }
   return ret;
 }).filter(o => {
   if(o.child){
     return true;
   }else if(reg.test(o.path)){
     return true;
   }
});

module.exports = function(path, ext){
  if(ext){
    reg = new RegExp('\.'+ ext +'$');
  }
  let runningPath = process.cwd()+'/';
  return createIndex(path.replace(runningPath, ''));
};
