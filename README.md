# LIRIBot
This is a CLI App that's made to introduce information of an Artist/Movie that the user is currently interested in and provide all possible concerts, movie information, and songs applicable.

#### Searching Concerts
1.  If the user is interested in all upcoming concerts of an Artist (concert-this), this app will query a request to BandsinTown and receive a response back with the Name of the Venue, Venue Location, and Date of Event (provided in readable format via Moment.js).
![sampleConcert](/assets/images/concert-this.gif)

#### Searching Songs
2.  If the user wanted to find out the Artist responsible for their favorite song (spotify-this-song), it will query a request to Spotify's database and pull up all relavent responses to the terminal, such as Artist(s), Song Name, a Link to Song, and the Album the song is from.
![sampleSong](/assets/images/spotify-this-song.gif)

#### Searching Movies
3.  If the user wants to find out more information associated with their favorite movie (movie-this), the user will get a response back with Title of Movie, Year it was released, IMDB rating, Rotten Tomato Rating, Country of Release, Language, Basic Plot, and Actors relavent.
![sampleMovie](/assets/images/movie-this.gif)

#### Random Element
4.  If the user doesn't care what the outcome is (do-what-it-says), they can use this function to do what's already written in the random.txt and receive the results of said item.
![sampleRandom](/assets/images/do-what-it-says.gif)

#### Uses:
* Node-Spotify-API
* Axios
* Moment
* DotEnv