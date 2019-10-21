<?php
function aplayerShortcode($atts){
    $url = $atts['url'];
    $artist = $atts['artist']??"";
    $title = $atts['title']??"";
    $album = $atts['album']??"";

    $playerID = "aplayer_".uniqid();

    $img_playBtn = plugins_url( '/img/play.png', __FILE__ );
    $img_stopBtn = plugins_url( '/img/stop.png', __FILE__ );

    $ret = "<div class='aplayer-wrap' id='$playerID-wrap'>";
    $ret .= "Loading Player...";
    $ret .= "</div>";
    $ret .= "
    <script>
        aplayerInstance.generatePlayer('$url', '$title', '$artist', '$album', '$playerID');
    </script>";
    return $ret;
}
function aplayerShortcodePlaylist($atts){
    //$playerID = "aplayer_".uniqid();
    $playerID = $atts['playlist_id'];
    //return $id;

    //dont think these hget used anymore not sure
    $img_playBtn = plugins_url( '/img/play.png', __FILE__ );
    $img_stopBtn = plugins_url( '/img/stop.png', __FILE__ );

    $ret .= "<div class='aplayer-wrap' id='$playerID-wrap'>";
    $ret .= "Loading Player...";
    $ret .= "</div>";
    $ret .= "<script>aplayerInstance.generatePlayer('#', '#', '#', '#', '$playerID','true');</script>";
    return $ret;
}

function aplayerShortcodePlaylistItem($atts){
    $url = $atts['url'];
    $playlistID = $atts['playlist_id'];
    $title = $atts['title'];
    $artist = $atts['artist'];
    $album = $atts['album'];
    $ret = "<script>aplayerInstance.addPlaylistItem('$playlistID','$url','$artist','$title','$album');</script>";
    return $ret;
}