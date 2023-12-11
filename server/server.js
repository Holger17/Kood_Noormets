const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readfile('ilmateade.html', (err, data) =>{
        if (err) {
            res.Writehead(500, {'Content-type': 'text/plain'});
            return res.end('Error faili laadimisega');
        }
        res.Writehead(200, {'Content-type': 'text/html'});
        res.end(data);
    })
})

server.listen(3000, () => {
    console.log('Server kuulab pordil 3000. Külasta htttp:/localhost:3000');
})