'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {
  $scope.playing = PlayerFactory.isPlaying();


  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // state
  // $scope.currentSong= PlayerFactory.getCurrentSong();
  $scope.playing = false;

  // main toggle
  $scope.toggle = function (song) {
    console.log('what fucken song are you', song);
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
          console.log("hellooooooo");
          PlayerFactory.pause();
          $scope.playing= PlayerFactory.isPlaying();
         } else{
          console.log("second block");
          PlayerFactory.start(song);
          $scope.song= song; 
          $rootScope.currentSong= PlayerFactory.getCurrentSong(); 
          $scope.playing = PlayerFactory.isPlaying();
         } 
  };

  // incoming events (from Album or toggle)
  $scope.$on('pause', pause);
  $scope.$on('play', play);

  // functionality
  function pause () {
    PlayerFactory.pause();
    $scope.toggle($scope.currentSong);
    $scope.playing = false;
  }
  function play (event, song){
    PlayerFactory.pause();
    $scope.playing = true;
    // resume current song
    // enable loading new song
    $scope.currentSong = song;
    PlayerFactory.start($scope.currentSong);
  }

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

});
