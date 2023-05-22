const {crawlPage} = require('./crawl')
async function main(){

    if(process.argv.length < 3){
        console.log('no website provied')
        process.exit(1)
    }   
    
    if(process.argv.length > 3){
        console.log('website is too many')
        process.exit(1)
    }
    const baseURL = process.argv[2]
    console.log(`start crawling: ${baseURL}`)
    const pages =await crawlPage(baseURL,baseURL,{})
    for(const page of Object.entries(pages)){
        console.log(page)
    }
}

main()