var aplayer = function(){
    this.activePlayerId = "none";
    this.scrubbing = "none";
    this.allPlayers = [];
    this.playlists = [];
    this.rootUrl = phpdata.pluginsUrl;
    this.images = {
        "pause":this.rootUrl+"/img/pause.png",
        "play":this.rootUrl+"/img/play.png",
        "stop":this.rootUrl+"/img/stop.png",
    };
    this.initPlayer = function(id){
        this.allPlayers.push(id);
        var player = document.getElementById(id);
        //console.log('player init: '+id);
        tTime = this.updatePlayerUI_tTime(id);
        var scrub_wrap = document.getElementById(id+"-scrub-wrap");
        this.render_scrubWrap(scrub_wrap,id,tTime);
    }
    this.addPlaylistItem = function(playlistID,url,artist,title,album){
        //console.log("adding playlist item");
        var playlistItem = {
            url : url,
            artist : artist,
            title: title,
            album: album,
        }
        if(this.playlists[playlistID]==null){
            this.playlists[playlistID] = [];
        }
        this.playlists[playlistID].push(playlistItem);
        var playlistItemIndex = this.playlists[playlistID].length -1;
        this.render_playlist_item(playlistID,playlistItemIndex);
        if(playlistItemIndex == 0){
            this.playlist_loadTrack(playlistID,0,false);
        }
    }
    this.playlist_loadTrack = function(playlistID, playlistItemIndex, autoplay=true){
        url = this.playlists[playlistID][playlistItemIndex].url;
        artist = this.playlists[playlistID][playlistItemIndex].artist;
        title = this.playlists[playlistID][playlistItemIndex].title;
        album = this.playlists[playlistID][playlistItemIndex].album;

        var self = this;
        document.getElementById(playlistID).addEventListener('ended', function(event){
            self.stateStop(playlistID);
            var newIndex = -1;
            if(playlistItemIndex < self.playlists[playlistID].length -1){
                newIndex = playlistItemIndex + 1;
                self.playlist_loadTrack(playlistID, newIndex);
            }
        })

        this.render_activePlaylistItemHighlight(playlistID, playlistItemIndex);

        this.stateStop(playlistID);
        this.render_activePlaylistItemMetaData(playlistID, artist, title, album);
        document.getElementById(playlistID).src = url;
        if(autoplay){
            this.statePlay(playlistID);
        }
        

    }
    this.scrubStart = function(id){
        this.scrubbing = id;
    }
    this.scrubStop = function(){
        this.scrubbing = "none";
    }
    this.scrubSet = function(id){
        var player = document.getElementById(id);
        var scrub_range = document.getElementById(id+"-scrub");
        player.currentTime = scrub_range.value;
        if(id!=this.activePlayerId){
            this.render_playerUI(id);
        }
    }

    this.stateToggle = function(id){
        var player = document.getElementById(id);
        if(player.paused){
            this.statePlay(id);
        }else{
            this.statePause(id);
        }
    }
    this.statePlay = function(id){
        this.activePlayerId = id;
        var player = document.getElementById(id);
        var ppBtn = document.getElementById(id+'-pp');
        var self = this;
        this.allPlayers.forEach(function(playerID){
            //pause other players
            self.statePause(playerID);
        });
        if(player.paused==true){
            player.play();
            this.render_ppImg(ppBtn, this.images["pause"]);
        }
    }
    this.statePause = function(id){
        var player = document.getElementById(id);
        var ppBtn = document.getElementById(id+'-pp');
        if(player.paused==false){
            player.pause();
            this.render_ppImg(ppBtn, this.images["play"]);
        }
    }
    this.stateFinishedPlaying = function(){
        alert("DONE PLAYING");
    }
    this.stateStop = function(id){
        var player = document.getElementById(id);
        player.currentTime = 0;
        this.statePause(id);
    }

    this.updatePlayerUI_Main = function(id="none"){
        if(id=="none"){ // check if we are setting a custom id for the update
            id = this.activePlayerId;
        }
        if(id=="none"){// if we still have no ID to work with that means nothing is playing yet so we don't need to update
            return;
        }
        var cTime = this.updatePlayerUI_cTime(id);
        if(this.scrubbing!=id){
            var scrub_range = document.getElementById(id+"-scrub");
            scrub_range.value = cTime;
        }else{
            // if we are, do not try to change the scrub range value
        }
    }
    this.updatePlayerUI_cTime = function(id){
        var player = document.getElementById(id);
        var cTime = player.currentTime;
        var cTime_div = document.getElementById(id+"-ctime");
        var cTimeHuman = new Date(null);
        cTimeHuman.setSeconds(cTime)
        cTimeHuman = cTimeHuman.toISOString().substr(14, 5);
        this.render_time(cTime_div, cTimeHuman);
        return cTime;
    }
    this.updatePlayerUI_tTime = function(id){
        var player = document.getElementById(id);
        var tTime = player.duration;
        var tTime_div = document.getElementById(id+"-ttime");
        var tTimeHuman = new Date(null);
        tTimeHuman.setSeconds(tTime);
        if(Number.isInteger(tTime)==false){
            console.warn("tTime for "+id+" is NAN!");
        }
        tTimeHuman = tTimeHuman.toISOString().substr(14, 5);
        this.render_time(tTime_div, tTimeHuman);
        return tTime;
    }

    this.generatePlayer = function(url,title,artist,album,playerID,isPlaylist = "false"){
        var ret = "";
        if(title!=null && title!=""){
            ret += "<div><strong id='"+playerID+"-title' class='aplayer-title'>"+title;
            if(artist!== ''){
              ret += " - "+artist;
            }
            ret += "</strong></div>";
            ret += "<div style='font-size:0.8rem;' id='"+playerID+"-album' class='aplayer-album'>"+album+"</div>";
            ret += "<br>";
        }
        
        ret += "<audio id='"+playerID+"' preload='metadata' onloadedmetadata='aplayerInstance.initPlayer(\""+playerID+"\");'>";//was oncanplay
        ret += "<source src='"+url+"' type='audio/mpeg'>";
        ret += "Your browser does not support the audio element.";
        ret += "</audio>";

        ret += "<span class='aplayer-btn aplayer-pp' id='"+playerID+"-pp' onclick='aplayerInstance.stateToggle(\""+playerID+"\")'> <img src='"+this.images["play"]+"'> </span>";
        ret += "<span class='aplayer-btn aplayer-stop' id='"+playerID+"-stop' onclick='aplayerInstance.stateStop(\""+playerID+"\")'><img src='"+this.images["stop"]+"'></span>";
        
        ret += "<div style='float:right; font-size:1.5rem;' class='aplayer-time'>";
        ret += "<span id='"+playerID+"-ctime'>00:00</span>";
        ret += "/<span id='"+playerID+"-ttime'>00:00</span>";
        ret += "</div>";

        ret += "<br>";
        ret += `<div id='`+playerID+`-scrub-wrap' class='aplayer-scrub' style='width:100%;'>
    <input class='aplayer-range' type='range' min='0' max='0' val='0'>
    </div>`;

        if(isPlaylist == "true"){
            ret += "<div class='aplayer-playlist-wrap' id='"+playerID+"-playlist'>";
            //ret += "";
            ret += "</div>";
        }
        this.render_player(playerID,ret);
    }

    this.render_scrubWrap = function(scrub_wrap,id,tTime){
        scrub_wrap.innerHTML = "<input class='aplayer-range' id='"+id+"-scrub' type='range' min='0' max='"+tTime+"' value='0' oninput=\"aplayerInstance.scrubSet('"+id+"')\" onmousedown=\"aplayerInstance.scrubStart('"+id+"')\" onmouseup=\"aplayerInstance.scrubStop()\">";
    }
    this.render_ppImg = function(ppBtn, curImg){
        ppBtn.innerHTML = '<img src="'+curImg+'">';
    }
    this.render_time = function(time_div,timeHuman){
        time_div.innerHTML = timeHuman;
    }
    this.render_player = function(playerID,html){
        var wrap = document.getElementById(playerID+"-wrap");
        wrap.innerHTML = html;
    }
    this.render_playlist_item = function(playlistID,playlistItemIndex){
        var playlist_wrap = document.getElementById(playlistID+"-playlist");
        ret = "<div id='"+playlistID+"-item-"+playlistItemIndex+"' class='aplayer-playlist-item' onclick=\"aplayerInstance.playlist_loadTrack('"+playlistID+"',"+playlistItemIndex+")\">";
        ret +=  this.playlists[playlistID][playlistItemIndex].title+" - "+this.playlists[playlistID][playlistItemIndex].artist;
        ret += "</div>";
        playlist_wrap.innerHTML += ret;
    }
    this.render_activePlaylistItemHighlight = function(playlistID, playlistItemIndex){
        var otherPlaylistItems = document.getElementsByClassName("aplayer-playlist-item");
        for(var i = 0; i<otherPlaylistItems.length;i++){
            otherPlaylistItems[i].classList.remove("aplayer-active-playlist-item");
        };
        document.getElementById(playlistID+"-item-"+playlistItemIndex).classList.add("aplayer-active-playlist-item");
    }
    this.render_activePlaylistItemMetaData = function(playlistID, artist, title, album){
        document.getElementById(playlistID+"-title").innerHTML = title+" - "+artist;
        document.getElementById(playlistID+"-album").innerHTML = album;
    }
}
var aplayerInstance = new aplayer();
window.addEventListener('load', function () {
    console.log("PAGE LOADED");
    setInterval(function(){ aplayerInstance.updatePlayerUI_Main(); }, 100);  
});