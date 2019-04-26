//deps
let axios= require('axios');
let Spotify= require('node-spotify-api');
let dotenv= require('dotenv').config();
let keys= require('./keys.js');
let spotify= new Spotify(keys.spotify);
let moment= require('moment');
moment().format();
let fs= require('fs');


let command= process.argv[2];
let input=process.argv[3];

//switch commands
switch(command){
    default: console.log('sorry I, dont understand');
    break;

    case 'concert-this': 
    let bandsInTown= 'https://rest.bandsintown.com/artists/'+ input +'/events?app_id=codingbootcamp';
    //req concert info from api
    axios.get(bandsInTown).then((response)=>{
        let data= response.data[0];
        let concertInfo= [
            '\n',
            'Artist:'+ input,
            '\nDate:'+moment(data.datetime).format('YYYY/MM/DD'),
            '\nVenue:'+ data.venue.name,
            '\nLocation:'+ data.venue.city + ',' + data.venue.region,
            '\n'
        ].join('\n\n');
        //display concert info
        console.log(concertInfo);
    }).catch((error)=>{
        console.log(error);
    });
    console.log('concert info:');
    break;

    case 'spotify-this-song': 
    console.log('spotify info:');
        //get spotify info
        spotify.search({type:'track',query:input})
        //display spotify info
        .then((res)=>{
            let data= res.tracks.items[0].album;
            let songInfo=[
                'Artist:'+data.artists[0].name,
                '\nSong:'+input,
                '\nSpotify link:'+data.artists[0].external_urls.spotify,
                '\nAlbum:'+data.name,
                '\n'
            ].join('\n');
            console.log(songInfo);
        }).catch((error)=>{console.log(error);})
    break;

    case 'movie-this':
    console.log('omdb info: ');
    //req omdb information
    axios.get('http://www.omdbapi.com/?t='+input+'&y=&plot=short&apikey=trilogy')
    //display movie info
    .then((response)=>{
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.Rated);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
    })

    console.log('movie info:');
    break;

    case 'do-what-it-says': 
    fs.readFile('random.txt','UTF-8', (error,data)=>{
        if (error){console.log('error: '+error);}
    else {
        let selection= data.split(',');
        console.log(selection[1]);
        //spotify search
        spotify.search({type:'track',query:selection[1]})
        .then((res)=>{
            let data= res.tracks.items[0].album;
            let songInfo=[
                'Artist:'+data.artists[0].name,
                '\nSong:'+selection[1],
                '\nSpotify link:'+data.artists[0].external_urls.spotify,
                '\nAlbum:'+data.name,
                '\n'
            ].join('\n');
            console.log(songInfo);
        }).catch((error)=>{console.log(error);})
    }
    })
    console.log('test concert command');
    break; 
}