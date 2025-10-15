/**
 * Achtung : Basiert auf der Desktop Version der Tombar Guitar Page
 *
 */



let  languageMode = 'german';

// via checkbox spielt dann eine ganze Rubrik ab.
let  rubrik_mode = false;

let mobile_device = false;



// In diese Variable wirde der gesamte PageContent geladen (Xml-Datei)
let  contentListXML = null;


function InitApplication()
{
    // Offset für das MenuScrolling und Active Classes
    // Active classes des Menu werden über scroolspy im body-tag gesetzt
    
    let offset1;

   // $(".navbar li a,a[href='#pageTop'], a[href='#welcome'], a[href='#vita'],a[href='#repertoire'],a[href='#mediaAudio'],a[href='#mediaVideo'],a[href='#liveSets'],a[href='#gear'],a[href='#feedback']").click(function(event) {
    // $(".navbar li a").click(function(event) {
       
    //     event.preventDefault();

    //     console.log($(this).attr('href'));


    //     switch($(this).attr('href'))
    //     {
    //         case '#imageBanner1' :  offset1 = -110;
    //         break;
    //         case '#welcome' :  offset1 = -75
    //         break;
    //         case '#vita' : offset1 = -75;
    //         break;
    //         case '#repertoire' : offset1 =-70;
    //         break;
    //         case '#mediaAudio' : offset1 = -70;
    //         break;
    //         case '#mediaVideo' : offset1 = -70;
    //         break;
    //         case '#liveSets' : offset1 = -70;
    //         break;
    //         case '#gear' : offset1 = -70;
    //         break;
    //         // mobil_device  in H5_JQMPlayer.js
    //         case '#feedback' : offset1 = mobile_device ? -70 : 20;
        
    //         break;

    //         default :
    //             break;
    //     }

    //     $($(this).attr('href'))[0].scrollIntoView();
       
    //     scrollBy(0, offset1);


    // });



    // Das Collapse-Menu wird nach click geschlossen
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    // Bei click outside Navebar close Menu
    $(document).click(function(e) {


        if (!$(e.target).is('a')) {
            $('.collapse').collapse('hide');
        }
    });


    // Methode aus H5_JQMPlayer.js
    //PlayWelcomeSong();

   playVideoFirstLoadPage('BadenManha');

    // Verzögern wegen des asynchronen javascript (warten auf LoadPageContent() wird in index.html geladen )
    window.setTimeout(function() {

        AttachHomeContent();
        AttachVitaContent();
        AttachRepertoireContent();
        AttachMediaContent();
        AttachLiveSetsContent();
        AttachGearContent();
        AttachFeedbackContent();

        // laden der ersten PlayList ohne SongStart
        //ReadPlayList('AmbientFirst');

        displayTracksByCategory('Ambient','m1');

    },10);

    // verzögern bis DOM vollständig ist
    window.setTimeout(function() {
        // Tooltips SamplePlayer Lautsprecher Symbols
        $('[data-toggle="tooltip"]').tooltip(
         { placement:"top"
           
         }
        ); 

     },500);



}

function showProgram(program)
{

    let  path;
    let  pdf;
   switch(program)
   {
       case  1 :
           path = "assets/images/program/guitarProgramLuteClassic_darkGP.jpg";
           pdf = "PDF/guitarProgramLuteClassic.pdf";
           break;
       case  2 :
           path = "assets/images/program/guitarProgramClassicPopGP.jpg";
           pdf = "PDF/guitarProgramPop.pdf";
           break;

       case  3 :
           path = "assets/images/program/brasilProgrammGP.jpg";
           pdf = "PDF/guitarProgramBrasilJazz.pdf";
           break;

       case  4 :
           path = "assets/images/program/jazzProgramGP.jpg";
           pdf = "PDF/guitarProgramBluesRagtimeJazz.pdf";
           break;

       case  5 :
           path = "assets/images/program/silentInspirationProgrammGP.jpg";
           pdf = "PDF/guitarProgramSilentInspiration.pdf";
           break;

       case  6 :
           path = "assets/images/program/flamencoProgramGP.jpg";
           pdf = "PDF/guitarProgramFlamenco.pdf";
           break;

       case  7 :
           path = "assets/images/program/badenProgramGP.jpg";
           pdf = "PDF/guitarProgramBadenPowell.pdf";
           break;

   }

    $('#imagepreview').attr('src', path); // here asign the image to the modal when the user click the enlarge link

    $('#imagemodal').modal('show');
    $('#prg_download').attr('href', pdf);


    // $("#pop").on("click", function() {
    //     $('#imagepreview').attr('src', $('#imageresource').attr('src')); // here asign the image to the modal when the user click the enlarge link
    //     $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
    // });

}

/**
 * Der Aufruf von den VideoLinks von der videoPage
 * @param video
 */

function playVideo(video,id)
{



    if(mobile_device === true)
    {
        // $("html,body").animate({scrollY:4180}, 500);
        $("html,body").animate({scrollTop:4800}, 500);


    }

    // Aktuellen VideokLink selektieren
    let videoLinks = document.querySelectorAll('.videoLink');
    videoLinks.forEach( (link) =>  {

        link.classList.remove('videoLinkSelected');

        if(link.id == id) {

            link.classList.add('videoLinkSelected');
        }

    });


    // ListAudioPlayer wird stumm geschaltet
    pauseSongPlayer3();

    var videoDir = 'assets/video/';

    if(languageMode === 'english' && video === 'D_BachMedley_C')
    {
        video = 'E_BachMedley';
    }


    var videoTitleOgv = videoDir +  video + '.ogv';
    var videoTitleMp4 = videoDir +  video + '.mp4';


    var  srcTags = '<video id="video1" height="auto" width="100%" >';

    if(video === 'D_BachMedley_C' || video === 'D_GreensleevesVariation' || video === 'Roeslein' )
    {


        srcTags = '<video id="video1" controls height="auto" width="100%"  oncontextmenu="return false;">';

    }

   // srcTags += '<source src=' + '"' +  videoTitleOgv  + '"'  +   " type='video/ogg;" + ' codecs="theora, vorbis"' + " '>";
    srcTags += '<source src=' + '"' +  videoTitleMp4  + '"'  +   " type='video/mp4;" + ' codecs="avc1.42E01E, mp4a.40.2"' + " '>";
    srcTags += ' <h5>Your Browser does not support HTML5 videoTag !</h5>';
    srcTags +=  '</video>';

    //alert(srcTags);


    $('#videoTagWrapper').empty().html(srcTags);

    $("#playPauseVideo").attr('class','glyphicon glyphicon-pause');


    if( $('#welcomeSongPlayer').length > 0)
        $('#welcomeSongPlayer')[0].pause();



    $("#video1")[0].play();

}

/**
 * Der Button unter dem Video
 *
 */
function PlayPauseVideo()
{

    if( $("#playPauseVideo").attr('class') === 'glyphicon glyphicon-play' )
    {
        $("#video1")[0].play();

        $("#playPauseVideo").attr('class','glyphicon glyphicon-pause');

        // ListAudioPlayer wird stumm geschaltet
        pauseSongPlayer3();

    }
    else
    {
        $("#video1")[0].pause();

        $("#playPauseVideo").attr('class','glyphicon glyphicon-play');
    }

}




function playVideoFirstLoadPage(video)
{



    var videoDir = 'assets/video/';

    var videoTitleOgv = videoDir +  video + '.ogv';
    var videoTitleMp4 = videoDir +  video + '.mp4';





    var  srcTags = '<video id="video1" height="auto" width="100%"  poster="assets/images/coverBaden.png" >';
    srcTags += '<source src=' + '"' +  videoTitleOgv  + '"'  +   " type='video/ogg;" + ' codecs="theora, vorbis"' + " '>";
    srcTags += '<source src=' + '"' +  videoTitleMp4  + '"'  +   " type='video/mp4;" + ' codecs="avc1.42E01E, mp4a.40.2"' + " '>";
    srcTags += ' <h5>Your Browser does not support HTML5 videoTag !</h5>';
    srcTags +=  '</video>';

    //alert(srcTags);


    $('#videoTagWrapper').empty().html(srcTags);

    $("#playPauseVideo").attr('class','glyphicon glyphicon-play');



   // $("#video1")[0].currentTime = 1.300;


    $("#video1")[0].pause();

  ///  $('#v1').attr( "class","videoLinkSelected");

    //prevVideoSelected = 'v1';



}







function playVideoSample(videoSoundSample)
{

    let head;
    let content1;
    let source;



    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find(videoSoundSample).each(function () {


        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language === languageMode) {


            head = element.find("head").text();
            content1 = element.find("content1").text();
            source = element.find("source").text();


            return false;
        }


    });


    $('#contentVideo1').html();

    $("#videoSamplePlayer").attr('src',source);
    $("#videoSamplePlayer")[0].load();
    $("#videoSamplePlayer")[0].play();

    if(source === 'assets/video/D_BachMedley.mp4' || source === 'assets/video/E_BachMedley.mp4'){

        $('.modal-title').html('BACH MEDLEY  <br> JOY AIR MENUETT</span>');
    }

    if(source === 'assets/video/D_GreensleevesVariation.mp4' || source === 'assets/video/E_GreensleevesVariations.mp4'){

        $('.modal-title').html('GREENSLEEVES VARIATION<br> FRANCIS CUTTING 1580</span>');
    }

    if(source === 'assets/video/D_SunnySideWebsite.mp4' || source === 'assets/video/E_SunnySideWebsite.mp4'){

        $('.modal-title').html('THE SUNNY SIDE OF THE MOON</span>');
    }

    console.log('playVideoSample');


    $('#videoSampleModal').modal({backdrop: 'static', keyboard: false}, 'show');
    
    
}

function stopVideoSample()
{

    $("#videoSamplePlayer")[0].pause();
    $('#videoSampleModal').modal( 'hide');

}

function playSoundSample(gearSoundSample,kind='CD')
{


    let head;
    let content1;
    let source;
    let cover;


    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find(gearSoundSample).each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language === languageMode) {


            head = element.find("head").text();
            content1 = element.find("content1").text();
            source = element.find("source").text();
            cover = element.find("cover").text();

            return false;
        }


    });
    console.log(head);
    console.log(cover);

    $('.modal-title').html('TOMBAR SOUND SAMPLE PLAYER</span>');

    if(source === 'assets/sound/MelodicRock/HowSweetWithDrumsV3.mp3'){

        $('.modal-title').html('HOW SWEET IT IS<br><span style="font-size: smaller"> TO BE LOVED BY SOMEONE</span>');
    }

    if(source === 'assets/sound/EasyListening/LoveOfMyLife.mp3'){

        $('.modal-title').html('LOVE OF MY LIFE<span style="font-size: smaller"><br>QUEEN - FREDDIE MERCURY</span>');
    }

    if(source === 'assets/sound/Classic/Joy.mp3'){

        $('.modal-title').html('Bach: Cantata BWV 147<br><span style="font-size: smaller"> Jesu, Joy of Man’s Desiring</span>');
    }

    if(source === 'assets/sound/MelodicRock/WestCoast.mp3'){

        $('.modal-title').html('WEST COAST');
    }

    if(source === 'assets/sound/EasyListening/ArthursThemeV1.mp3'){

        $('.modal-title').html('Arthur’s Theme<br>Best That You Can Do');
    }

    if(source === 'assets/sound/EasyListening/killingMeSoftly.mp3'){

        $('.modal-title').html('KILLING ME SOFTLY<br>ROBERTA FLACK');
    }

    if(source === 'assets/sound/Ambient/Fantasia.mp3'){

        $('.modal-title').html('FANTASIA');
    }

    if(source === 'assets/sound/BrasilSwing/Sunny.mp3'){

        $('.modal-title').html('THE SUNNY SIDE OF THE MOON');
    }

    if(source === 'assets/sound/BrasilPoetic/Poema.mp3'){

        $('.modal-title').html('POEMA <br> BADEN POWELL 1971');
    }




    
  

    // function in single_audio_player.js
    // modal with CD player
    if(kind == 'CD')
    {
        
       
        $('#content1').html(content1);
        loadSongAndPlay(source,head,cover);
        $('#soundSampleModalCD').modal({backdrop: 'static', keyboard: false}, 'show');
    }

    // modal without CD player
    if(kind == 'sample')
    {
  
        $('#content1-sample').html(content1);
        $("#soundSamplePlayer").attr('src',source);
        $("#soundSamplePlayer")[0].load();
        $("#soundSamplePlayer")[0].play();
        $('#soundSampleModal').modal({backdrop: 'static', keyboard: false}, 'show');
    }


}


function stopSoundSample()
{

    $("#soundSamplePlayer")[0].pause();
    $('#soundSampleModal').modal( 'hide');

    // function in audio_player_v1.js
    pauseSongPlayer2();

}

// Init gearList Guitar
$('#g6').attr( "class","musicLinkSelected");
let prevGearSelected = 'g6';



$('ul.gearList li').on('click',function () {

    //alert(this.id);


    if(prevGearSelected !== null)
    {
        $('#' + prevGearSelected).attr( "class","musicLink");

    }

    $('#' + this.id).attr( "class","musicLinkSelected");

    prevGearSelected = this.id;

});





function DisplayGearContent(id) {


        switch(id)
        {
            case  'gearGuitar1'  :

                AttachGearContentVar1(id);

                break;
            case  'gearGuitar2'  :

                AttachGearContentVar1(id);
                break;
            case  'gearGuitar3'  :
                AttachGearContentVar1(id);
                break;
            case  'gearGuitar4'  :
                AttachGearContentVar1(id);
                break;

            case  'gearGuitar5'  :
                AttachGearContentVar1(id);
                break;

            case  'gearGuitar6'  :
                AttachGearContentVar1(id);
                break;
            case  'gearGuitar7'  :
                AttachGearContentVar1(id);
                break;

            case  'gearRecording1'  :

                AttachGearContentVar2(id);
                break;
            case  'gearRecording2' :
                AttachGearContentVar2(id);
                break;
            case  'gearRecording3'  :
                AttachGearContentVar2(id);
                break;
            case  'gearRecording4'  :
                AttachGearContentVar2(id);
                break;
            case  'gearRecording5'  :
                AttachGearContentVar2(id);
                break;

            case  'gearRecording6'  :
                AttachGearContentVar2(id);
                break;

            case  'gearRecording7'  :
                AttachGearContentVar2(id);
                break;
            case  'gearRecording8'  :
                AttachGearContentVar2(id);
                break;
            case  'gearRecording9'  :
                AttachGearContentVar2(id);
                break;

            case  'gearAmplifier1'  :

                AttachGearContentVar2(id);
                break;
            case  'gearAmplifier2'  :

                AttachGearContentVar2(id);
                break;

            default :
                break;

        }

   // $('#gearModal').modal('show');



}





/*
 Laden des page_contents (Texte) vom Server.
 Dies geschieht nur einmal und wird dann
 für die weitere Verarbeitung in der globalen variable  gespeichert

 */
 function  LoadPageContent()
{
    // alert('Load');
    // Liste nur einmal vom server laden
    if(contentListXML == null)
    {
        // $.get("data/page_content_v3.xml",function (XMLDoc) {

        //     contentListXML = $(XMLDoc);

        // });


        $.get("data/page_content.xml").done(function (XMLDoc) {

            contentListXML = $(XMLDoc);

            InitApplication();

           
        });


    //     const res = await fetch('data/page_content_v3.xml');
    //     const data = await res.text();
       
    //    // contentListXML   = new window.DOMParser().parseFromString(data, "text/xml");

    //     let parser = new DOMParser ();
    //     contentListXML = parser.parseFromString (data, 'text/xml');

    //     //console.log(contentListXML);

    //     InitApplication();



  






    }

}


/*
 setzt den TextContent der HomePage
 */
function AttachHomeContent()
{
//    alert('1');

    let head;
    let content1;
    let content2;
    let content3;


    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find("home").each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language == languageMode) {


            head = element.find("head").text();

            content1 = element.find("content1").text();
            content2 = element.find("content2").text();
            content3 = element.find("content3").text();

          return false;
        }


    });

    // TextContent zuweisen
    $('#homeCH').text(head);
    $('#homeC1').html(content1);
    $('#homeC2').html(content2);
    $('#homeC3').html(content3);





}

/*
 setzt den TextContent der VitaPage
 */
function AttachVitaContent()
{

    let head;
    let content1;
    let content2;



    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find("vita").each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language == languageMode) {


            head = element.find("head").text();

            content1 = element.find("content1").text();
            content2 = element.find("content2").text();


            return false;
        }


    });

    // TextContent zuweisen
    $('#vitaCH').text(head);
    $('#vitaC1').html(content1);
    $('#vitaC2').html(content2);



}

/*
 setzt den TextContent der RepertoirePage
 */
function AttachRepertoireContent()
{

    let head;
    let content1;
    let content2;



    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find("repertoire").each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language == languageMode) {


            head = element.find("head").text();

            content1 = element.find("content1").text();
            content2 = element.find("content2").text();


            return false;
        }


    });

    // TextContent zuweisen
    $('#repertoireCH').text(head);
    $('#repertoireC1').html(content1);
    $('#repertoireC2').html(content2);

}


/*
 setzt den FeedbackContent der FeedbackPage
 */
function AttachFeedbackContent()
{

    let head;
    let content1;
    let content2;



   // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find("feedback").each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language == languageMode) {


            head = element.find("head").text();

            content1 = element.find("content1").text();
            content2 = element.find("content2").text();


            return false;
        }


    });

    // TextContent zuweisen
    $('#feedbackCH').text(head);
    $('#feedbackC1').html(content1);

    const tempArray = content2.split('#');


    $('#email').html(tempArray[0]);
    $('#message').html(tempArray[1]);
    $('#send').html(tempArray[2]);
    $('#success-message').html(tempArray[3]);
    $('#error-message').html(tempArray[4]);

   

}

/*
 setzt den TextContent der MediaPage
 */
function AttachMediaContent()
{

    let head;
    let headVideo;
    let content1;
    let content2;
    let content3;
    let content4;
    let content5;
    let content6;

    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find("media").each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language == languageMode) {


            head = element.find("head").text();
            headVideo = element.find("headVideo").text();

            content1 = element.find("content1").text();
            content2 = element.find("content2").text();
            content3 = element.find("content3").text();
            content4 = element.find("content4").text();
            content5 = element.find("content5").text();
            content6 = element.find("content6").text();

            return false;
        }


    });

    // TextContent zuweisen
    $('#mediaCH').text(head);
    $('#mediaVideoH').text(headVideo);
    $('#mediaC1').html(content1);
    $('#mediaC2').html(content2);
    $('#mediaC3').html(content3);
    $('#mediaC4').html(content4);
    $('#mediaC5').html(content5);
    $('#mediaC6').html(content6);

}


/*
 setzt den TextContent der LiveSets
 */
function AttachLiveSetsContent()
{

    let head;
    let content1;
    let content2;


    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find("liveSets").each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language === languageMode) {


            head = element.find("head").text();

            content1 = element.find("content1").text();
            content2 = element.find("content2").text();


            return false;
        }


    });

    // TextContent zuweisen
    $('#liveSetsH').text(head);
    $('#liveSets1').html(content1);
    $('#liveSets2').html(content2);

}


let prevImageCount = 1;
// Max Anzahl der GearBilder zu einem Instrument
let maxImage = 0;

let actGearLabel = 'Default';

let imagesGearBig = [];
let imagesGearBigCaption = [];

/*
 setzt den TextContent der Gear
 */
function AttachGearContent()
{

    let head;
    let content1;
    let content2;
    let content3;


    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find("gearIntro").each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language === languageMode) {


            head = element.find("head").text();

            content1 = element.find("content1").text();
            content2 = element.find("content2").text();
            content3 = element.find("content3").text();


            return false;
        }


    });

    // TextContent zuweisen
    $('#gearH').text(head);
    $('#gear1').html(content1);
    $('#gear2').html(content2);
    $('#gear3').html(content3);

    AttachGearContentVar1('gearGuitar6');

}

/*
 setzt den TextContent der GearPageInstrumente
 in der Variante 1 Gitarren Bild links
 */
function AttachGearContentVar1(gearId)
{

    let head;
    let contentText;
    let gearImageSmall;
    let gearImageBig;

    $("#gearCollage").hide();
    $("#gearVar2").hide();
    $("#gearVar1").show();

    // Init bzw. zürücksetze (löschen) des Array mit den BigImages
    imagesGearBig = [];
    imagesGearBigCaption = [];

    // Nur für Cubase 7-11 BigImage Überschriften im ImageViewer , keine Überschriften für alle anderen BigImages
    $('#caption').text("");

    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find(gearId).each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        let element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        let language = element.attr("language");

        // alert(language);

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language === languageMode) {



            actGearLabel = element.find("gearLabel").text();
            contentText = element.find("content1").text();
            gearImageSmall = element.find("content2").text();

            let elementContent3 =  element.find("content3");

            elementContent3.find("imageBig").each(function () {

                let elementImageBig = $(this);

                // Bild im Array anhängen
                imagesGearBig.push(elementImageBig.text());

            }) ;

            return false;
        }


    });

    // Setzen des vorschau Bildes
    $("#gearImageVar1").attr('src',gearImageSmall);
    console.log(gearImageSmall);
    //$("#gearImageVar1").attr('src','assets/images/gear/gibson135/GibsonSV4_N2.jpg');


    // TextContent zuweisen
    $('#gearC3Var1').html(contentText);

   // $('#gearModal').modal('show');



}


function AttachGearContentVar2(gearId)
{

    var head;
    var contentText;
    var gearImageSmall;
    var gearImageBig;

    console.log(gearId);



    $("#gearCollage").hide();
    $("#gearVar1").hide();
    $("#gearVar2").show();

    // Init bzw. zürücksetze (löschen) des Array mit den BigImages
    imagesGearBig = [];
    imagesGearBigCaption = [];
    // Nur für Cubase 7-11 BigImage Überschriften im ImageViewer , keine Überschriften für alle anderen BigImages
    $('#caption').text("");

    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find(gearId).each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        var element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        var language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language === languageMode) {

            actGearLabel = element.find("gearLabel").text();

            contentText = element.find("content1").text();
            gearImageSmall = element.find("content2").text();

            var elementContent3 =  element.find("content3");

            elementContent3.find("imageBig").each(function () {

                var elementImageBig = $(this);

                // Bild im Array anhängen
                imagesGearBig.push(elementImageBig.text());

            }) ;

            // Nur für Cubase 7-11 BigImages Bild Überschriften
            elementContent3.find("imageBigCaption").each(function () {

                var elementImageBig = $(this);

                // Bild im Array anhängen
                imagesGearBigCaption.push(elementImageBig.text());

            }) ;


            return false;
        }


    });

    // Setzen des vorschau Bildes
    $("#gearImageVar2").attr('src',gearImageSmall);


    // TextContent zuweisen
    $('#gearC3Var2').html(contentText);

}

let imagesGearMobil= [];
let imagesGearMobilCaption = [];


function AttachGearContentMobil(gearId)
{

    let head;
    let contentText;
    let gearImageSmallMobil;
    let gearImageBig;

    console.log(gearId);


    // Init bzw. zürücksetze (löschen) des Array mit den BigImages
    imagesGearMobil= [];
    imagesGearMobilCaption = [];
    // Überschriften für dei verschiedenen Gitarren
    $('#captionMobil').text("");

    // Enthält die XML-Datei die zuvor vom Server mit der  function : LoadPageConent() eingelesen wurde
    contentListXML.find(gearId).each(function () {



        // gefundenen abschnitt in variable zwischenspeichern (cachen)
        var element = $(this);

        // einzelne werte auslesen und zwischenspeichern
        // attribute: funktion 'attr()'
        // tags: nach dem tag suchen & text auslesen

        var language = element.attr("language");

        // die aktuelle sprache filtern und in die globalen variablen speichern
        if (language === languageMode) {

            actGearLabel = element.find("gearLabel").text();

            var elementContent1 =  element.find("content1");

            elementContent1.find("imageMobil").each(function () {

                let elementImageMobil= $(this);

                // Bild im Array anhängen
                imagesGearMobil.push(elementImageMobil.text());

            }) ;

            // Nur für Cubase 7-11 BigImages Bild Überschriften
            elementContent1.find("imageMobilCaption").each(function () {

                var elementImageCaption = $(this);

                // Bild im Array anhängen
                imagesGearMobilCaption.push(elementImageCaption.text());

            }) ;


            return false;
        }

    });

    //
    // console.log(imagesGearMobil);
    // console.log(imagesGearMobilCaption);

}







/**
 *
 * Startet den GearImage Viewer
 * beim click auf BIG
 */
function DisplayBigImage()
{

    // Anzahl der Bilder
    maxImage = imagesGearBig.length;

    $('#gearModalImageViewer').modal('show');

    $('#imageCount').text('1');

    prevImageCount = 1;

    $('#imageMax').text(maxImage);

    $('#gearLabel').text(actGearLabel);

    // Erstes bild initialisieren
    $("#gearImageBig").attr('src',imagesGearBig[0]);
    $("#caption").text(imagesGearBigCaption[0]);

    $('#imageViewer').show();

}

function NextImage(direction)
{

    if(direction === 'next')
    {
        if(prevImageCount < maxImage)
        {
            prevImageCount++;
            $('#imageCount').text( prevImageCount);

            // Bild anzeigen -1 da arrayIndex mit 0 beginnt
            $("#gearImageBig").attr('src',imagesGearBig[prevImageCount - 1]);
            $("#caption").text(imagesGearBigCaption[prevImageCount - 1]);
        }

    }
    else // direction ist prev
    {
        if(prevImageCount > 1)
        {
            prevImageCount--;
            $('#imageCount').text( prevImageCount);

            // Bild anzeigen -1 da arrayIndex mit 0 beginnt
            $("#gearImageBig").attr('src',imagesGearBig[prevImageCount - 1]);
            $("#caption").text(imagesGearBigCaption[prevImageCount - 1]);
        }

    }

}

let prevImageCountMobil;
let maxImageMobil;
/**
 *
 * Startet den GearMobilImage Viewer
 * beim click auf Instruments
 */
function DisplayGuitarsImageMobil()
{


    AttachGearContentMobil('gearGuitarsMobil');

    // Anzahl der Bilder
    maxImageMobil = imagesGearMobil.length;


    $('#imageCountMobil').text('1');

    prevImageCountMobil = 1;

    $('#imageMaxMobil').text(maxImageMobil);

   // $('#gearLabel').text(actGearLabel);

    // Erstes bild initialisieren
    $("#gearImageMobil").attr('src',imagesGearMobil[0]);
    $("#gearLabelMobil").text(imagesGearMobilCaption[0]);


    $('#gearModalMobil').modal('show');

}

function NextImageMobil(direction)
{


    console.log( ': ' + maxImageMobil);
    if(direction === 'next')
    {
        if(prevImageCountMobil < maxImageMobil)
        {
            prevImageCountMobil++;
            $('#imageCountMobil').text( prevImageCountMobil);

            // Bild anzeigen -1 da arrayIndex mit 0 beginnt
            $("#gearImageMobil").attr('src',imagesGearMobil[prevImageCountMobil - 1]);
            $("#gearLabelMobil").text(imagesGearMobilCaption[prevImageCountMobil - 1]);
        }

    }
    else // direction ist prev
    {
        if(prevImageCountMobil > 1)
        {
            prevImageCountMobil--;
            $('#imageCountMobil').text( prevImageCountMobil);

            // Bild anzeigen -1 da arrayIndex mit 0 beginnt
            $("#gearImageMobil").attr('src',imagesGearMobil[prevImageCountMobil - 1]);
            $("#gearLabelMobil").text(imagesGearMobilCaption[prevImageCountMobil - 1]);
        }

    }

}


/**
 * Neue Function für die Responsive Guitar Page
 * alle Content Bereiche werden auf einmal aktualisiert
 * @constructor
 */
function SetLanguageMode()
{


    if(languageMode === 'german')
    {
        $('#language').empty().text('German');
        languageMode = 'english';
    }
    else
    {
        $('#language').empty().text('English');
        languageMode = 'german';
    }


    AttachHomeContent();
    AttachVitaContent();
    AttachRepertoireContent();
    AttachMediaContent();
    AttachLiveSetsContent();
    AttachGearContent();
    ToggleContentGear('guitar');
    AttachFeedbackContent();


    window.setTimeout(function() {

        $('[data-toggle="tooltip"]').tooltip(
         { placement:"top"
           
          }
 
        ); 

       
 
     },500);


}

/**
 * Setzt via checkbox den rubrikmode true/ false
 * bei true wird dann eine ganze Category ( Rubrik) hintereinander abgespielt
 * @param mode
 *
 */
function SetRubrikMode(mode)
{

    rubrik_mode = mode;

    if(rubrik_mode === true)
    {
        // laden der ersten PlayList ohne SongStart
        ReadPlayListRubrik('AmbientFirst');
    }

    if(rubrik_mode === false)
    {
        // laden der ersten PlayList ohne SongStart
        ReadPlayList('AmbientFirst');
    }


}

function set_mobile_status(status){

    mobile_device = status;

}



let  prevGearContent = 'guitar';

/**
 *
 * @param id
 *
 */
function ToggleContentGear(id)
{

    // console.log(obj);
    // let   actGearContent = obj.id;

    let   actGearContent = id;

    console.log(actGearContent);

    if(prevGearContent !== actGearContent )
    {
        $('#' + actGearContent + '_C').toggle('fast');
        $('#' + prevGearContent + '_C').toggle('fast');

        prevGearContent = actGearContent;

        if(prevGearSelected !== null)
        {
            $('#' + prevGearSelected).attr( "class","musicLink");

        }



        switch(actGearContent)
        {
            case 'guitar' : AttachGearContentVar1('gearGuitar6');
                $('#g6').attr( "class","musicLinkSelected");
                prevGearSelected = 'g6';
                break;
            case 'recording' : AttachGearContentVar2('gearRecording1');
                $('#g7').attr( "class","musicLinkSelected");
                prevGearSelected = 'g7';
                break;
            case 'amplifier' : AttachGearContentVar2('gearAmplifier1');
                $('#g16').attr( "class","musicLinkSelected");
                prevGearSelected = 'g16';
                break;

        }

    }

}

