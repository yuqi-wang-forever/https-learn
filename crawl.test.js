const {normalizeURL,getURLFromHtml} = require('./crawl')
const {test,expect} = require('@jest/globals')

test('normalizeURL strip protocol',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL trailing slash',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip http',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL capital',()=>{
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('getURLFromHtml absolute',()=>{
    
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">
                    boot.dev blog
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLFromHtml(inputHTMLBody,inputBaseURL)
    console.log(actual)
    const expected = ["https://blog.boot.dev/path/"]

    expect(actual).toEqual(expected)
})

test('getURLFromHtml relative',()=>{
    
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">
                    boot.dev blog relative
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHtml(inputHTMLBody,inputBaseURL)
    console.log(actual)
    const expected = ["https://blog.boot.dev/path/"]

    expect(actual).toEqual(expected)
})
test('getURLFromHtml both',()=>{
    
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path1/">
                    boot.dev blog relative path1
                </a>
                <a href="https://blog.boot.dev/path2/">
                    boot.dev blog absolute path2
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHtml(inputHTMLBody,inputBaseURL)
    console.log(actual)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]

    expect(actual).toEqual(expected)
})

test('getURLFromHtml invalid',()=>{
    
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path1/">
                    boot.dev blog relative path1
                </a>
                <a href="https://blog.boot.dev/path2/">
                    boot.dev blog absolute path2
                </a>
                <a href="invalid">
                    boot.dev blog invalid
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHtml(inputHTMLBody,inputBaseURL)
    //console.log(actual)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]

    expect(actual).toEqual(expected)
})