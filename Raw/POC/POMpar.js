let request=require ("request");
let cheerio=require("cheerio");
console.log("Before");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results",cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        extractData(html);
    }
}

function extractData(html){
    let selTool=cheerio.load(html);
    let matchCard=selTool(".col-md-8.col-16");
    let allLinks=[];
    for(let i=0;i<matchCard.length;i++){
        let cardBtns=selTool(matchCard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let linkofMatch=selTool(cardBtns[2]).attr("href");
        let realLink="https://www.espncricinfo.com/"+linkofMatch;
        //console.log(realLink);
         allLinks.push(realLink);
        }
        players(allLinks,0);
    }

function extractPlayer(html){
    let selTool=cheerio.load(html);
    let nameArr=selTool(".best-player-name");
    let name=selTool(nameArr[0]).text();
    console.log(name+" is player of match");
}

function players(arr,n){
    if(arr.length==n){
        return;
    }
       request(arr[n],function (err,resp,html){
           if(err){
               console.log(err);
           }else{
               extractPlayer(html);
               players(arr,n+1);
           }
       })
}
