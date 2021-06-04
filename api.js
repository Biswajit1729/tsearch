const TorrentSearchApi = require('torrent-search-api');
const express = require('express');
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
TorrentSearchApi.enableProvider('Eztv');


let torrsearch = async function(q,l) {

// Search '1080' in 'Movies' category and limit to 20 results
try {
    const torrents = await TorrentSearchApi.search(q, "All", l);
    return torrents;
} catch (error) {
    return error;
}



}
app.get('/:l', async function(req, res){
    

    var q = req.query.q;
    var l =req.params.l
    var value = await torrsearch(q,l); 
    
    res.send(value);
    
});


let magnetSearch = async function(q,i) {
    // Search '1080' in 'Movies' category and limit to 20 results
    try {
        const torrents = await TorrentSearchApi.search(q, "All", i);
        const m = await TorrentSearchApi.getMagnet(torrents[i-1]);
        return m;
    } catch (error) {
        return error;
    }
}
   //magnet 
app.get('/magnetLink/:i', async function(req, res){
    var i =req.params.i
    var q = req.query.q;
    var m = await magnetSearch(q,i); 
    
    res.send(m);
    
});
app.listen(process.env.PORT ||  port, () => {
    console.log(`Example app listening on port ${port}!`)
});