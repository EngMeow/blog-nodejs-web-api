// node index.js add title=" enter a title" body="enter a body"
// node index.js edit title=" enter a title" body="enter a body"
// node index.js delete title=" enter a title" body="enter a body"
const helpers = require("./helpers")


function main(args){
    // console.log(args);
    const [ , , operation , ...data] = args;
    //["title : entered title" , "body : entered title"]

    const dataObi = data.reduce((acc , elm) => {
        const [key, value] = elm.split("=")
        acc[key] = value
        return acc
    }, {} )

    console.log(dataObi);
    switch(operation){
        case "add" :
            helpers.add(data);
            break;
        case "edit" :
            helpers.edit(data);
            break;
        case "remove" :
            helpers.remove(data);
            break;
        case "edit" :
            helpers.edit(data);
            break;
        case "check" :
            helpers.check(data);
            break;
        case "uncheck" :
            helpers.uncheck(data);
            break;
        default:
            break;
    }
}

main(process.argv)