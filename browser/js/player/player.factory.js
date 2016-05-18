'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var playing= false; 
  var currentSong= null;
  var songUl;

  return {
  	start: function(song, songList){
  		console.log("im in factory", song);
  		//if (song === scope.currentSong) return audio.play();
  		if (song !== currentSong) this.pause();
  		currentSong = song;
		audio.src = song.audioUrl;
	    audio.load();
	    audio.play();
	    playing= true;
	    if(songList) 
	    songUl= songList; 
  	},
  	pause: function(){
  		audio.pause();
  		playing= false; 
  	},
  	resume: function(){
  		audio.play();
  		playing=true; 
  	},
  	isPlaying: function(){
  		return playing;
  	},
  	getCurrentSong: function(){
  		return currentSong; 
  	},
  	next: function(){
  		var curId= songUl.indexOf(currentSong); 
  		var nextSongId = (curId === songUl.length - 1) ? 0 : (curId + 1);
  		var nextSong= songUl[nextSongId]; 
  		this.start(nextSong);

  	},
  	previous: function(){
  		var curId= songUl.indexOf(currentSong); 
  		var nextSongId = (curId === 0) ? songUl.length-1 : (curId - 1);
  		var nextSong= songUl[nextSongId]; 
  		this.start(nextSong);
  	},
  	getProgress: function(){
  		if(!playing){
  			return 0; 
  		}
  		return  audio.currentTime / audio.duration;
  	}

  }






});
 