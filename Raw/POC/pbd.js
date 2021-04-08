let request=require ("request");
let cheerio=require("cheerio");
console.log("Before");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        extractData(html);
    }
}
function extractData(html){
    let selTool=cheerio.load(html);
    let bothBatsmanTable=selTool(".table.batsman");
    for(let i=0;i<bothBatsmanTable.length;i++){
        let BatsmanName=selTool(bothBatsmanTable[i]).find("tbody tr .batsman-cell a");
        //console.log(BatsmanName);
        for(let j=0;j<BatsmanName.length;j++){
            let link=selTool(BatsmanName[j]).attr("href");
            let name=selTool(BatsmanName[j]).text()
            printBirthday(link,name);
        }
        console.log("``````````````````````");
    }

}

function printBirthday(link,name){
    request(link,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }else{
            extractBirthday(html,name);
        }
    }
}

function extractBirthday(html,name){
    let selTool=cheerio.load(html);
    let birthElemArr=selTool(".ciPlayerinformationtxt span");
    let birthday=selTool(birthElemArr[1]).text();
    console.log(name+"was born on:"+birthday);
}