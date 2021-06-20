const TorrentSearchApi = require('torrent-search-api');
const express = require('express');
const { query } = require('express');
const app = express();
const port = 3000;

TorrentSearchApi.enableProvider('1337x');
TorrentSearchApi.enableProvider('ThePirateBay');
TorrentSearchApi.enableProvider('Torrent9');
TorrentSearchApi.enableProvider('Torrentz2');
TorrentSearchApi.enableProvider('KickassTorrents');
TorrentSearchApi.enableProvider('Rarbg');
TorrentSearchApi.enableProvider('TorrentProject');
TorrentSearchApi.enableProvider('Yts');
TorrentSearchApi.enableProvider('Limetorrents');
//TorrentSearchApi.enableProvider('Eztv');


let torrsearch = async function(q,l) {

// Search '1080' in 'Movies' category and limit to 20 results
try {
    const torrents = await TorrentSearchApi.search(
        ['1337x', 'Torrent9','Yts','ThePirateBay','Torrentz2',
        'KickassTorrents','Rarbg','Limetorrents','TorrentProject'],
        q, 'All', l);
       
    return torrents;
} catch (error) {
    return error;
}



}
app.get('/:l', async function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,   Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    var q = req.query.q;
    var l =req.params.l
    var value = await torrsearch(q,l); 
    
    res.send(value);
    
});


let magnetSearch = async function(q,i) {
    // Search '1080' in 'Movies' category and limit to 20 results
    try {
        const torrents = await TorrentSearchApi.search(
            ['1337x', 'Torrent9','Yts','ThePirateBay','Torrentz2',
            'KickassTorrents','Rarbg','Limetorrents','TorrentProject'],
            q, 'All', l);
        const m = await TorrentSearchApi.getMagnet(torrents[i-1]);
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
    var m = await magnetSearch(q,i); 
    
    res.send(m);
    
});
app.listen(process.env.PORT ||  port, () => {
    console.log(`Example app listening on port ${port}!`)
});