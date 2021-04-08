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
    let bowlTable=selTool(".table.bowler");
    for(let i=0;i<bowlTable.length;i++){
        let playersRow=selTool(bowlTable[i]).find("tbody tr");
        for(let j=0;j<playersRow.length;j++){
            let playerIdx=selTool(playersRow[j]).find("td");
            console.log("Name :"+ selTool(playerIdx[0]).text(),"Wickets:"+ selTool(playerIdx[4]).text());
        }
        console.log("``````````````````````");
    }
   

}



