var activePlayerId = "none";
var scrubbing = "none";
var allPlayers = [];

window.addEventListener('load', function () {
    console.log("PAGE LOADED");
    setInterval(function(){ updatePlayerUI(); }, 100);  
});

function initPlayer(id){
    // initalizes a specific player
    allPlayers.push(id);
    var player = document.getElementById(id);
    console.log('player init: '+id);

    tTime = get_tTime(id);

    var scrub_div_wrap = document.getElementById(id+"-scrub-wrap");
    scrub_div_wrap.innerHTML = "<input class='aplayer-range' id='"+id+"-scrub' type='range' min='0' max='"+tTime+"' value='0' oninput=\"setCurrentTime('"+id+"')\" onmousedown=\"startScrubbing('"+id+"')\" onmouseup=\"stopScrubbing()\">";
}
function startScrubbing(id){
    console.log("Start Scrubbing");
    // set the scrubbing id so we can make sure we don't try to move the knob when user is scrubbing that track
    scrubbing = id;
}
function stopScrubbing(){
    console.log("Stop Scrubbing");
    // reset scrubbing to none
    scrubbing = "none";
}
function setCurrentTime(id){
    // sets the current track time when scrubbing
    var player = document.getElementById(id);
    var scrub_range = document.getElementById(id+"-scrub");
    player.currentTime = scrub_range.value;
    if(id!=activePlayerId){
        updatePlayerUI(id);
    }
}
function aplayer_toggle(id){
    // toggles the play/pause of a specific track
    activePlayerId = id;
    var player = document.getElementById(id);
    console.log('toggling player: '+id);
    if(player.paused){
        aplayer_play(id);
    }else{
        aplayer_pause(id);
    }
}
function aplayer_play(id){
    // plays a specific track
    console.log('playing: '+id);
    var player = document.getElementById(id);
    var ppBtn = document.getElementById(id+'-pp');
    allPlayers.forEach(function(playerID){
        aplayer_pause(playerID);
    });
    if(player.paused==true){
        player.play();
        ppBtn.innerHTML = '<img src="'+phpdata.pluginsUrl+'/img/pause.png">';
    }
}
function aplayer_pause(id){
    // pauses a specific track
    console.log('pausing: '+id);
    var player = document.getElementById(id);
    var ppBtn = document.getElementById(id+'-pp');
    if(player.paused==false){
        player.pause();
        ppBtn.innerHTML = '<img src="'+phpdata.pluginsUrl+'/img/play.png">';
    }
    
}
function aplayer_stop(id){
    // stops a specific track
    console.log('stopping: '+id);
    var player = document.getElementById(id);
    player.currentTime = 0;
    aplayer_pause(id);
}

function updatePlayerUI(id="none"){
    // updates the UI for the activley playing song
    // also can take an option 'id' param which will allow you to update a specific track as a one time thing
    // for example changing the timestamp when scrubbing a track that's not active
    if(id=="none"){ // check if we are setting a custom id for the update
        id = activePlayerId;
    }
    if(id=="none"){// if we still have no ID to work with that means nothing is playing yet so we don't need to update
        return;
    }

    var player = document.getElementById(id);

    // get the current track time and write it
    var cTime = player.currentTime;
    var cTime_div = document.getElementById(id+"-ctime");
    var cTimeHuman = new Date(null);
    cTimeHuman.setSeconds(cTime)
    cTimeHuman = cTimeHuman.toISOString().substr(14, 5);
    cTime_div.innerHTML = cTimeHuman;

    get_tTime(id);
    
    // check if we are scrubbing the currently playing track
    if(scrubbing!=id){
        // we are not scrubbing the track so it's safe to change the range value
        var scrub_range = document.getElementById(id+"-scrub");
        scrub_range.value = cTime;
    }else{
        // if we are, do not try to change the scrub range value
        console.log("scrubbing");
    }  
}
function get_tTime(id){
    //get the total track time and write it
    var player = document.getElementById(id);
    var tTime = player.duration;
    var tTime_div = document.getElementById(id+"-ttime");
    var tTimeHuman = new Date(null);
    tTimeHuman.setSeconds(tTime)
    tTimeHuman = tTimeHuman.toISOString().substr(14, 5);
    tTime_div.innerHTML = tTimeHuman;
    return tTime;
}
function renderPlayer(url,title,artist,album,playerID){
    var ret = "<div><strong>"+title+" - "+artist+"</strong></div>";
    ret += "<div style='font-size:0.8rem;'>"+album+"</div>";
    ret += "<br>";
    ret += "<audio id='"+playerID+"' preload='metadata' onloadedmetadata='initPlayer(\""+playerID+"\");';>";//was oncanplay
    ret += "<source src='"+url+"' type='audio/mpeg'>";
    ret += "Your browser does not support the audio element.";
    ret += "</audio>";

    ret += "<button class='aplayer-btn' id='"+playerID+"-pp' onclick='aplayer_toggle(\""+playerID+"\")'> <img src='"+phpdata.pluginsUrl+"/img/play.png'> </button>";
    ret += "<button class='aplayer-btn id='"+playerID+"-stop' onclick='aplayer_stop(\""+playerID+"\")'><img src='"+phpdata.pluginsUrl+"/img/stop.png'></button>";
    
    ret += "<div style='float:right; font-size:1.5rem;'>";
    ret += "<span id='"+playerID+"-ctime'>00:00</span>";
    ret += "/<span id='"+playerID+"-ttime'>00:00</span>";
    ret += "</div>";

    ret += "<br>";
    ret += `<div id='`+playerID+`-scrub-wrap' style='width:100%;'>
<input class='aplayer-range' type='range' min='0' max='0' val='0'>
</div>`;
    var wrap = document.getElementById(playerID+"-wrap");
    wrap.innerHTML = ret;
}