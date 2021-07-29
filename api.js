const TorrentSearchApi = require('torrent-search-api');
const express = require('express');
const { json } = require('express');
const app = express();
const port = 3000;
process.on('unhandledRejection', (err, p) => {
    console.log('unhandledRejection');
    console.log(`Rejected Promise: ${p}`);
    console.log(`Rejection: ${err}`);
  });

 TorrentSearchApi.enableProvider('ThePirateBay');
 //TorrentSearchApi.enableProvider('Torrent9');
 //TorrentSearchApi.enableProvider('Torrentz2');
 //TorrentSearchApi.enableProvider('KickassTorrents');
 TorrentSearchApi.enableProvider('Rarbg');
 TorrentSearchApi.enableProvider('TorrentProject');
 TorrentSearchApi.enableProvider('Yts');
 TorrentSearchApi.enableProvider('Limetorrents');
TorrentSearchApi.enableProvider('Eztv');
TorrentSearchApi.enableProvider('1337x');

let torrsearch = async function(q,l,p) {
    

// Search '1080' in 'Movies' category and limit to 20 results
try {
    const torrents = await TorrentSearchApi.search(p,q, "All", l);
    return torrents;
} catch (error) {
    return error;
}



}
let magnetSearch = async function(p) {
    // Search '1080' in 'Movies' category and limit to 20 results
    try {
        //const torrents = await TorrentSearchApi.search(p,q, "All", l).catch(error => {throw error}); 
       // console.log(torrents);
        const m = await TorrentSearchApi.getMagnet(p);
        //await TorrentSearchApi.downloadTorrent(torrents[l-1], '/');
        return m;
    } catch (error) {
        return error;
    }
}
   //magnet 
app.get('/magnetLink', async function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    if (req.query.p === undefined) {
        console.log("Did not find any matching URLs")
        return;
     }else{
       
       const p = JSON.parse(
        JSON.stringify(req.query.p)); 
       
       var m = await magnetSearch(p) 

     }
    //console.log(m);
    res.send(m);
    
});

app.get('/providers', function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    
        
    return res.send(TorrentSearchApi.getActiveProviders());
})


app.get('/:l', async function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    if (req.query.p === undefined) {
        //console.log("Did not find any matching URLs")
        return;
     }else{
        const urlp = req.query.p.replace(" ", "");
        const names = decodeURIComponent(urlp.slice(1,urlp.length-1));
        const p = names.split(',');
        var q = req.query.q;
        var l =req.params.l
        
        var value = await torrsearch(q,l,p).catch(error => {throw error}); 
     }
  
    
    
    res.send(value);
    
});













app.listen(process.env.PORT ||  port, () => {
    console.log(`Example app listening on port ${port}!`)
});