// Single Audio Song Player für die SoundSamples im Modal Dialog ( musikalische Beispiele )

const imageContainer = document.getElementById('image-container');
// Achtung Event wird vom i tag ausgelöst
const playBtn = document.querySelector('#i_id');
const audio_player1 = document.getElementById('audio_player1');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('songTitle');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


let songSource;

// New song details start of player script
function loadSongAndPlay(src,songTitle,cdCover) {

  title.innerText = songTitle;
  songSource = src;
  audio_player1.src = src;
  cover.src = cdCover;
  playSongPlayer2()
}


// Play song
function playSongPlayer2() {

	// VideoPlayer   
	$("#video1")[0].pause();
	$("#playPauseVideo").attr('class','glyphicon glyphicon-play');

	// ListPlayer
	pauseSongPlayer3();


	  imageContainer.classList.add('play');
	  document.querySelector('#i_id').classList.remove('fa-play');
	  document.querySelector('#i_id').classList.add('fa-pause');
	  audio_player1.play();
}

// Pause song
function pauseSongPlayer2() {

	imageContainer.classList.remove('play');
	document.querySelector('#i_id').classList.add('fa-play');
	document.querySelector('#i_id').classList.remove('fa-remove')
	audio_player1.pause();
}


    // song zurück zum Anfang und progress bar zurücksetzen
	function endSong(e)
	{
	
		audio_player1.src = songSource;
		pauseSongPlayer2();
		progress.style.width = 0 ;

	}

  // progress bar vergrößern je nach song-position
  function updateProgress(e) {
	
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
	
  }
  
  // Set progress bar - click in den progressbar song position verändern
  function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio_player1.duration;
  
	audio_player1.currentTime = (clickX / width) * duration;
  }
  
  // Song Current Time ermitteln und im Dom aktualisieren
  function CurrentTime(e) {

	const {duration,currentTime} = e.srcElement;

	let sec = Math.floor((currentTime % 60 ));

	let min =  Math.floor(currentTime / 60 );

    // change currentTime DOM

	sec = sec < 10 ? '0'+sec:sec;

	min = min < 10 ? '0'+ min:min;

    currTime.innerHTML = min +':'+ sec;

  }

  // Song-Dauer ermitteln und im dom setzen
  audio_player1.onloadedmetadata = function () {

        duration = audio_player1.duration;

		let total_seconds = Math.floor((duration % 60 ));

		let total_minutes =  Math.floor(duration / 60 );

		let = songDuration =  `${total_minutes}:${total_seconds}`;
		
		durTime.innerHTML = songDuration;

  };
	
  // Event listeners
  // Achtung Event wird vom i tag ausgelöst

	playBtn.addEventListener('click', () => {

	//console.log('play');

	const isPlaying = imageContainer.classList.contains('play');

	if (isPlaying) {
		pauseSongPlayer2();
	} else {
		playSongPlayer2();
	}
	});	
  
  
  // Time/song update
  audio_player1.addEventListener('timeupdate', updateProgress);
  
  // Click on progress bar
  progressContainer.addEventListener('click', setProgress);
  
  // Song ends
  audio_player1.addEventListener('ended', endSong);
  
  // update current Time of song
  audio_player1.addEventListener('timeupdate',CurrentTime);
  