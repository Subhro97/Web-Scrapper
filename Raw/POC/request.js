let request=require ("request");
let cheerio=require("cheerio");
console.log("Before");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary",cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        extractData(html);
    }
}
function extractData(html){
    let selTool=cheerio.load(html);
    let commenArr=selTool(".col-14.col-md-15.col-lg-14 .match-comment-long-text");
    console.log(commenArr.length);
    let elem=selTool(commenArr[0]).text();
    console.log(elem);
    console.log("f1");

}

console.log("After");

