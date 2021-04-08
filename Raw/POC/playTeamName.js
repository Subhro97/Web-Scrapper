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
/*function extractData(html){
    let selTool=cheerio.load(html);
    let batsTable=selTool(".table.batsman");
    let teamName=selTool(".teams .name-detail");
    let presentTeam=[teamName[20],teamName[21]];
    for(let i=0;i<batsTable.length;i++){
        let playersRow=selTool(batsTable[i]).find("tbody tr");
        for(let j=0;j<playersRow.length-1;j+=2){
            let playerIdx=selTool(playersRow[j]).find("td");
            console.log(selTool(playerIdx[0]).text()+"plays for:"+selTool(presentTeam[i]).text());
        }
        
        console.log("``````````````````````");
    }
    
}*/

function extractData(html){
    let selTool=cheerio.load(html);
    let batsTable=selTool(".table.batsman");
    let teamNameArrElem=selTool(".Collapsible h5.header-title.label");
    let teamNameArr=[];
    
    for(let idx=0;idx<teamNameArrElem.length;idx++){
        let teamName=selTool(teamNameArrElem[idx]).text();
        teamName=teamName.split("INNINGS")[0];
        teamNameArr.push(teamName);
    }
    for(let i=0;i<batsTable.length;i++){
        let playersRow=selTool(batsTable[i]).find("tbody tr .batsman-cell");
        for(let j=0;j<playersRow.length;j++){
            let playerIdx=selTool(playersRow[j]).text();
            console.log(playerIdx+"plays for:",teamNameArr[i]);
        }
        
        console.log("``````````````````````");
    }
    
}
