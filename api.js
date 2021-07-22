const TorrentSearchApi = require('torrent-search-api');
const express = require('express');
const app = express();
const port = 3000;

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
app.get('/:l', async function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    const urlp = req.query.p;
    const names = decodeURIComponent(urlp.slice(1,urlp.length-1));
    const p = names.split(',');
    console.log(p);
    //var p = JSON.parse(req.query.array);
    var q = req.query.q;
    var l =req.params.l
    
    var value = await torrsearch(q,l,p).catch(error => {throw error}); 
    
    res.send(value);
    
});


let magnetSearch = async function(q,i) {
    // Search '1080' in 'Movies' category and limit to 20 results
    try {
        const torrents = await TorrentSearchApi.search(q, "All", i).catch(error => {throw error}); 
        const m = await TorrentSearchApi.getMagnet(torrents[i-1]).catch(error => {throw error}); 
        return m;
    } catch (error) {
        return error;
    }
}
   //magnet 
app.get('/magnetLink/:i', async function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    var i =req.params.i
    var q = req.query.q;
    var m = await magnetSearch(q,i).catch(error => {throw error}); 
    
    res.send(m);
    
});
app.listen(process.env.PORT ||  port, () => {
    console.log(`Example app listening on port ${port}!`)
});