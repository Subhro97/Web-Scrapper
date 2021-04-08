
//input modules
let request=require ("request");
let cheerio=require("cheerio");
let path=require("path");
let fs=require("fs");
let PDFDocument=require("pdfkit");


//input path
let input=process.argv.slice(2);
let curr=input[0];

//Getting the html code of the page and extracting the link of repositories
request("https://github.com/topics",cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        extractData(html);
    }
}

function extractData(html){
    let selTool=cheerio.load(html);
    let repo=selTool(".no-underline.d-flex.flex-column.flex-justify-center");
     for(let i=0;i<repo.length;i++){
         let name=selTool(repo[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
         let link=selTool(repo[i]).attr("href");
         let realLink="https://github.com"+link;
         processrepoPage(realLink);
     
        }
    }

//Getting the html code of the repositories and extracting the issues links
function processrepoPage(url){
    request(url,cb);
    function cb(err, resp, html){
        if(err){
            console.log(err);
        }else{
            getRepoLink(html);
        }
    }
}

function getRepoLink(html){
    let selTool=cheerio.load(html);
    let topicElem=selTool(".h1-mktg");

    let repoLinks=selTool("a.text-bold");
    let topicName=topicElem.text().trim();
    dirCreator(topicName);
    for(let i=0;i<8;i++){
        let repoPagelink=selTool(repoLinks[i]).attr("href");
        let fullRepoLinks="https://github.com/"+repoPagelink+"/issues";
        let repoName=repoPagelink.split("/").pop();
        repoName=repoName.trim();
        createFile(repoName,topicName);
        getIssues(repoName,topicName,fullRepoLinks);
    }
 }


 //Getting the issues html code and extracting the issues
 function getIssues(repoName,topicName,fullRepoLink){
     request(fullRepoLink,function (err,resp,html){
         if(err){
             if(resp.statusCode==404){
                 console.log("Page not found");
             }else{
                 console.log(err);
             }
         }else{
             extractIssues(repoName,topicName,html);
         }
     })
 }
 function extractIssues(repoName,topicName,html){
     let selTool=cheerio.load(html);
     let IssueAnchArr=selTool("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
     let arr=[];
     for(let i=0;i<IssueAnchArr.length;i++){
         let name=selTool(IssueAnchArr[i]).text();
         let link=selTool(IssueAnchArr[i]).attr("href");
         arr.push({
             "name":name,
             "link":"https://github.com/"+link
         })
     }
     let filePath1=path.join(curr,topicName,repoName+".pdf");
          let pdfDoc=new PDFDocument;
     pdfDoc.pipe(fs.createWriteStream(filePath1));
     pdfDoc.text(JSON.stringify(arr));
     pdfDoc.end();

    let pathofFile=path.join(curr,topicName,repoName+".json");
    if(!fs.existsSync(pathofFile)){
        let createStream = fs.createWriteStream(pathofFile);
         createStream.end();
    }
     fs.writeFileSync(pathofFile,JSON.stringify(arr));

 }

  //Creating repository directory
function dirCreator(topicName){
    let pathOfFolder=path.join(curr,topicName);
        if(!fs.existsSync(pathOfFolder)){
        fs.mkdirSync(pathOfFolder);
    }
}




