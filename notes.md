Sep render and logic
refasctor js

# features
playlist mode with dif shortcode
autoplay next
remeber state in local storage?
anchor/bookmark points?
preset themes
custom hooks
3 band visualizer
draw waveform

All of this could just be rended in JS which would make it easier to port outside of WP

/*  PHP RENDERING   
    $ret .= "<div><strong>$title - $artist</strong></div>";
    $ret .= "<div style='font-size:0.8rem;'>$album</div>";
    $ret .= "<br>";

    $ret .= "<audio id='$playerID' preload='metadata' onloadedmetadata='initPlayer(\"$playerID\");';>";//was oncanplay
    $ret .= "<source src='$url' type='audio/mpeg'>";
    $ret .= "Your browser does not support the audio element.";
    $ret .= "</audio>";

    $ret .= "<button class='aplayer-btn' id='$playerID-pp' onclick='aplayer_toggle(\"$playerID\")'> <img src='$img_playBtn'> </button>";
    $ret .= "<button class='aplayer-btn id='$playerID-stop' onclick='aplayer_stop(\"$playerID\")'><img src='$img_stopBtn'></button>";

    $ret .= "<div style='float:right; font-size:1.5rem;'>";
    $ret .= "<span id='$playerID-ctime'>00:00</span>";
    $ret .= "/<span id='$playerID-ttime'>00:00</span>";
    $ret .= "</div>";

    $ret .= "</br>";

    $ret .= "<div id='$playerID-scrub-wrap' style='width:100%;'>
    <input class='aplayer-range' type='range' min='0' max='0' val='0'>
    </div>"; */