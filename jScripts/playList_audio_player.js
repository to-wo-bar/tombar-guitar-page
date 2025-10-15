
const list_player = document.getElementById('list_player');
const mediaImage = document.getElementById('mediaImage');

const playBtnLpl = document.querySelector('#i_id_lpl');
const playBtnRpm = document.querySelector('#i_id_rpm');
const progressLpl = document.getElementById('progress-lpl');
const progressContainerLpl = document.getElementById('progress-container-lpl');
const currTimeLpl = document.querySelector('#currTime-lpl');
const durTimeLpl = document.querySelector('#durTime-lpl');

// Rubrik Play Mode 

const check_rpm = document.getElementById('check_rpm'); // checkbox  rubrik play mode 
const nav_list = document.getElementById('audioNavList'); // nav list_play
const nav_rpm = document.getElementById('audioNavRpm'); // nav rubrik play
const act_title_rpm = document.getElementById('actTitle'); // nav rubrik play
const totalDurationRpm = document.getElementById('totalDurationRpm'); // nav rubrik play
const actDurationRpm = document.getElementById('actDurationRpm'); // nav rubrik play


let rubrikPlayMode = false;
let act_rpm_index = 0; // rubrik song index
let max_rpm_index; // rubrik songs 
let act_rpm_current_time  = 0; //  aktuell abgelaufe Zeit der Rubrik


let xmlDoc = null;
const xmlUrl = 'data/PlayList.xml';
let songSourceLpl;
let songList = [];

// Funktion, um die XML-Datei vom Server zu laden
 async function loadXML(url) {
    try {
         const response = await fetch(url);
         if (!response.ok) {
             throw new Error(`Failed to fetch XML file: ${response.status}`);
         }
         const text = await response.text();
         return new DOMParser().parseFromString(text, "application/xml");
     } catch (error) {
         console.error("Error while loading XML:", error);
         return null;
     }
}



// Funktion, um die Tracks einer bestimmten Kategorie zu holen und in der Listbox anzuzeigen
 async function displayTracksByCategory(category,id) {


    let path = 'data/PlayList.xml';
    songList = [];

    // only load once
    if(xmlDoc === null){
        xmlDoc = await loadXML(path);
    }

    const tracks = xmlDoc.getElementsByTagName("track");
    //const songList = [];

    // Container der Listbox holen
    const listBox = document.getElementById("trackListBox");
    const mediaImage = document.getElementById("mediaImage");
   

    // Durchlaufen aller Tracks in der XML-Datei
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];

        if (track.getAttribute("Category") === category) {
            
            const songData = {
                title: track.getElementsByTagName("title")[0].textContent,
                creator: track.getElementsByTagName("creator")[0].textContent,
                location: track.getElementsByTagName("location")[0].textContent,
                duration: parseInt(track.getElementsByTagName("duration")[0].textContent, 10),
                image: track.getElementsByTagName("image")[0].textContent,
                info: track.getElementsByTagName("info")[0].textContent,
                identifier: track.getElementsByTagName("identifier")[0].textContent
            };

            // Hinzufügen des Objekts zum songList-Array
            songList.push(songData);
        }
    }    

    // Aktuellen RubrikLink selektieren
    let rubrikLinks = document.querySelectorAll('.rubrikLink');
    rubrikLinks.forEach( (link) =>  {

        link.classList.remove('rubrikLinkSelected');

        if(link.id == id) {

            link.classList.add('rubrikLinkSelected');
        }

    });


    if(rubrikPlayMode === false)
    {
        
         // init listPlayer
         
        listBox.innerHTML = ""; // Vorherigen Inhalt entfernen
        progressLpl.style.width = 0;
        playBtnLpl.classList.remove('playing');
        document.querySelector('#i_id').classList.add('fa-play');
        document.querySelector('#i_id').classList.remove('fa-remove');
        
        for (let i = 0; i < songList.length; i++) {
           
                // Track zur Listbox hinzufügen
                const listItem = document.createElement("li");
                 // listItem.textContent = songData.title; // Titel anzeigen
                listItem.innerHTML = "<span style='font-size:13px' >" + songList[i].creator + " :</span> <br>" + " <span style='font-size: 10px'>" + songList[i].title + "</span>"
                listItem.classList.add("trackItem");
            
                // erster Song der Rubrik
                if(songList[i].identifier == 0){
                    listItem.classList.add("selected");
                    // Rubrik Image 
                    mediaImage.src = songList[i].image;
                    list_player.src = songList[i].location + 'mp3';
                    songSourceLpl = songList[i].location + 'mp3';
                }
            
                listItem.dataset.index = songList.length - 1; // Index speichern
            
                listBox.appendChild(listItem);

                // Event-Listener für Klick auf den Track
                listItem.addEventListener("click", () => {
                    // Entfernen der 'selected'-Klasse von allen Elementen
                    document.querySelectorAll(".trackItem").forEach(item => {
                        item.classList.remove("selected");
                    });

                    // Setzen der 'selected'-Klasse für das aktuelle Element
                    listItem.classList.add("selected");

                    playSongPlayListPlayer(songList[i]);
                });

        }


        playBtnLpl.classList.add('fa-play');
        playBtnLpl.classList.remove('fa-pause');

    }

    if(rubrikPlayMode === true)
    {
        //console.log('rpm');
        listBox.innerHTML = "<div style='margin-top:20px;text-align:center;color:white;' >Rubrik Play Mode</div><div id='rpm_idx' style='text-align:center;color:white;' ></div>";
        // Rubrik Image 
        mediaImage.src = songList[0].image;
        act_rpm_current_time  = 0;
        playRubrik(songList.length);
    }
    
}

// Beispielaufruf: Tracks der Kategorie "Ambient" anzeigen
//displayTracksByCategory("Ambient");


// aufruf aus der ListBox
function playSongPlayListPlayer(songData){

    //console.log('songData.location');
    playBtnLpl.classList.add('playing');
    document.querySelector('#i_id_lpl').classList.remove('fa-play');
    document.querySelector('#i_id_lpl').classList.add('fa-pause');
    list_player.src = songData.location + 'mp3';
    //console.log(songData.location);
    list_player.play();
  
    mediaImage.src = songData.image; 
}


// Play song call from playbutton
function playSongPlayer3() {

    // VideoPlayer   
    $("#video1")[0].pause();
    $("#playPauseVideo").attr('class','glyphicon glyphicon-play');


    list_player.play();

    if(rubrikPlayMode)
    {
        playBtnRpm.classList.add('playing');
        playBtnRpm.classList.remove('fa-play');
        playBtnRpm.classList.add('fa-pause');
    }
    else {
        playBtnLpl.classList.add('playing');
        playBtnLpl.classList.remove('fa-play');
        playBtnLpl.classList.add('fa-pause');
    }

    
}

// Pause song
function pauseSongPlayer3() {

    list_player.pause();

    if(rubrikPlayMode)
    {
        playBtnRpm.classList.remove('playing');
        playBtnRpm.classList.add('fa-play');
        playBtnRpm.classList.remove('fa-pause');
    }
    else {
        playBtnLpl.classList.remove('playing');
        playBtnLpl.classList.add('fa-play');
        playBtnLpl.classList.remove('fa-pause');
    }
    
}

  // song zurück zum Anfang und progress bar zurücksetzen
  function endSong(e)
  {
    if(rubrikPlayMode)
    {
       if(act_rpm_index < max_rpm_index)
       {
         act_rpm_current_time = act_rpm_current_time + songList[act_rpm_index].duration
         act_rpm_index ++;
         list_player.src = songList[act_rpm_index].location + "mp3";
         let rpmIdx = document.getElementById('rpm_idx'); // Anzeige song 1 of 7
         rpmIdx.innerHTML =`Song ${act_rpm_index + 1} of ${max_rpm_index} <div><br>${songList[act_rpm_index].creator}</div>`;
         act_title_rpm.innerHTML = `<div style="font-size:12px;" >${songList[act_rpm_index].title}</div>`;
         
         playSongPlayer3();
       }
       else {
        act_rpm_index = 0;
        act_rpm_current_time = 0;
        list_player.src = songList[act_rpm_index].location + "mp3;";
        pauseSongPlayer3();
       }
       
        
        
    }else{

        list_player.src = songSourceLpl;
        pauseSongPlayer3();
        progressLpl.style.width = 0 ;

    }
      

  }

// progress bar vergrößern je nach song-position
function updateProgressLpl(e) {
  
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressLpl.style.width = `${progressPercent}%`;
  
}

// Set progress bar - click in den progressbar song position verändern
function setProgressLpl(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = list_player.duration;

 list_player.currentTime = (clickX / width) * duration;
}

// Song Current Time ermitteln und im Dom aktualisieren
function CurrentTimeLpl(e) {

  let {duration,currentTime} = e.srcElement;

  if(rubrikPlayMode)
  {
     currentTime = act_rpm_current_time + currentTime
  }

  let sec = Math.floor((currentTime % 60 ));

  let min =  Math.floor(currentTime / 60 );

  // change currentTime DOM

  sec = sec < 10 ? '0'+sec:sec;

  min = min < 10 ? '0'+ min:min;

  if(rubrikPlayMode)
  {
    actDurationRpm.innerHTML = min +':'+ sec + " /&nbsp; ";

  }else {

    currTimeLpl.innerHTML = min +':'+ sec;

  }
  

}

// Song-Dauer ermitteln und im dom setzen
list_player.onloadedmetadata = function () {

      duration = list_player.duration;

      let total_seconds = Math.floor((duration % 60 ));

      let total_minutes =  Math.floor(duration / 60 );

      let = songDuration =  `${total_minutes}:${total_seconds}`;
      
      durTimeLpl.innerHTML = songDuration;

};
  
// Event listeners
// Achtung Event wird vom i tag ausgelöst nicht vom button
// eventListener playBtnRpm inline, da display:none
playBtnLpl.addEventListener('click',onClickPlayBtn);


function onClickPlayBtn()
{

    //console.log('onClick');

    let isPlaying; 

    if(rubrikPlayMode === false){
         isPlaying = playBtnLpl.classList.contains('playing');
    }else{
         isPlaying = playBtnRpm.classList.contains('playing');
    }
    
    if (isPlaying) {
          pauseSongPlayer3();
    } else {
          playSongPlayer3();
    }

}


// Time/song update
list_player.addEventListener('timeupdate', updateProgressLpl);

// Click on progress bar
progressContainerLpl.addEventListener('click', setProgressLpl);

// Song ends
list_player.addEventListener('ended', endSong);

// update current Time of song
list_player.addEventListener('timeupdate',CurrentTimeLpl);


// Rubrik Play Mode

check_rpm.addEventListener('change',RubrikPlayMode);

function RubrikPlayMode() 
{

 rubrikPlayMode = check_rpm.checked;

 if(rubrikPlayMode)
 {
    nav_rpm.classList.remove("hide-nav");
    nav_list.classList.add("hide-nav");

    displayTracksByCategory('Ambient','m1');
 }
 else {
    nav_rpm.classList.add("hide-nav");
    nav_list.classList.remove("hide-nav");
    displayTracksByCategory('Ambient','m1');
 }


}

function playRubrik(songsNumber)
{
    
    max_rpm_index = songsNumber;
    act_rpm_index = 0;
    
    let totalDuration;
    //console.log(songList);
    totalDuration = calculateRubrikDuration();   
    list_player.src = songList[act_rpm_index].location + 'mp3';
    //act_title_rpm.innerHTML = songList[act_rpm_index].title;
    act_title_rpm.innerHTML = `<div class="rpm-font-size" >${songList[act_rpm_index].title}</div>`;
    totalDurationRpm.innerHTML = totalDuration
    //rpm_idx wird dynamisch erzeugt
    const rpmIdx = document.getElementById('rpm_idx');
    rpmIdx.innerHTML = `Song ${act_rpm_index + 1} of ${max_rpm_index} <div><br>${songList[act_rpm_index].creator}</div>`;
    playSongPlayer3();


}

function calculateRubrikDuration(){

    let total = 0;

    songList.forEach( (item,index) => {

        total = total + item.duration;
    });

    let total_seconds = Math.floor((total % 60 ));

    let total_minutes =  Math.floor(total / 60 );

    let = songDuration =  `${total_minutes}:${total_seconds}`;

    return songDuration;

}

