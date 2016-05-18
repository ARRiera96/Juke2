'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.createElement('audio');
    initialize audio player (note this kind of DOM stuff is odd for Angular)
  audio.addEventListener('ended', function () {
    objReturn.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    // $scope.progress = 100 * audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    $rootScope.progress = objReturn.getProgress();
    $rootScope.$evalAsync();
    //$scope.$evalAsync(); // likely best, schedules digest if none happening
  });
  var playing= false; 
  var currentSong= null;
  var songUl;
  var objReturn =  {
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
  return objReturn;






});
 