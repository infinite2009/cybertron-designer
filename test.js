console.log("测试脚本命令")
const path = require('path')
const fs = require("fs")
// const json = fs.readFileSync(targetPath,"utf-8")
// const pageIDs =[1,2,,3]
// console.log(json);

const glob = require("glob")
const ejs = require('ejs')
const reg = /DuLangPageId:([\s\S]*),/
glob("**", {
    cwd: path.join(process.cwd(), "src"),
    ignore: ["**/node_modules/**", ".less"],
    nodir: true
}, function (err, files) {
    files.forEach(file => {
        const targetPath = path.join(process.cwd(), "src", file)
        ejs.renderFile(targetPath, { version: "1.0.0" }, {}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
            // console.log(result);
            const res=  result.match(reg)
            console.log(RegExp.$1);
            if(res&&res.length){
                const version= '\n  version: "1.0.0", \n' 
                let str = res[0] + version
                result=result.replace(reg,str)
                console.log(result);
            }
      
                //   fse.writeFileSync(filePath, result);
            }
        })
    });
})