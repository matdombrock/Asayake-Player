<?php
function aplayerShortcode($atts){
    $url = $atts['url'];
    $artist = $atts['artist']??"";
    $title = $atts['title']??"";
    $album = $atts['album']??"";

    $playerID = "aplayer_".$atts['id']??"aplayer_".uniqid();

    $safe_url = addslashes($url);
    $safe_artist = addslashes($artist);
    $safe_title = addslashes($title);
    $safe_album = addslashes($album);
    $safe_playerID = addslashes($playerID);
    
    $img_playBtn = plugins_url( '/img/play.png', __FILE__ );
    $img_stopBtn = plugins_url( '/img/stop.png', __FILE__ );

    $ret = "<div class='aplayer-wrap' id='$safe_playerID-wrap'>";
    $ret .= "Loading Player...";
    $ret .= "</div>";
    $ret .= "
    <script>
        aplayerInstance.generatePlayer('$safe_url', '$safe_title', '$safe_artist', '$safe_album', '$safe_playerID');
    </script>";
    return $ret;
}
function aplayerShortcodePlaylist($atts){
    //$playerID = "aplayer_".uniqid();
    $playerID = $atts['playlist_id'];
    //return $id;
    $safe_playerID = addslashes($playerID);
    //dont think these hget used anymore not sure
    $img_playBtn = plugins_url( '/img/play.png', __FILE__ );
    $img_stopBtn = plugins_url( '/img/stop.png', __FILE__ );

    $ret = "<div class='aplayer-wrap' id='$safe_playerID-wrap'>";
    $ret .= "Loading Player...";
    $ret .= "</div>";
    $ret .= "<script>aplayerInstance.generatePlayer('#', '#', '#', '#', '$safe_playerID','true');</script>";
    return $ret;
}

function aplayerShortcodePlaylistItem($atts){
    $url = $atts['url'];
    $playlistID = $atts['playlist_id'];
    $title = $atts['title'];
    $artist = $atts['artist'];
    $album = $atts['album'];

    $safe_url = addslashes($url);
    $safe_artist = addslashes($artist);
    $safe_title = addslashes($title);
    $safe_album = addslashes($album);
    $safe_playlistID = addslashes($playlistID);

    $ret = "<script>aplayerInstance.addPlaylistItem('$safe_playlistID','$safe_url','$safe_artist','$safe_title','$safe_album');</script>";
    return $ret;
}
?>