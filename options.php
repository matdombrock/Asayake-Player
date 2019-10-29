<?php

// OPTIONS
/** Step 2 (from text above). */
add_action( 'admin_menu', 'my_plugin_menu' );
/** Step 1. */
function my_plugin_menu() {
	add_management_page( 'Asayake Player Options', 'Asayake Player', 'manage_options', 'aplayer-settings', 'aplayer_options' );
}

/** Step 3. */
function aplayer_options($content) {
	$generator = "<div class='agen'>";
	$generator = "
<h1 id=''>Asayake Player</h1>
<div class='aplayer-help' style='text-align:center;'>
<h2>Shortcode Generator</h2>
Type:
<select id='agen-type' onchange='updateType(value)'>
	<option value='stand-alone'>Stand Alone</option>
	<option value='playlist'>Playlist</option>
</select>

<div id='agen-playlist' class='hidden'>
	<input type='text' id='agen-id' placeholder='Unique Playlist ID (REQUIRED)' oninput='updateSA_SC(\"playlistID\",value)'><hr>
	<input type='text' id='agen-title' placeholder='Title (SUGGESTED)' oninput='updateSA_SC(\"title\",value)'><br>
	<input type='text' id='agen-artist' placeholder='Artist (SUGGESTED)' oninput='updateSA_SC(\"artist\",value)'><br>
	<input type='text' id='agen-album' placeholder='Album (SUGGESTED)' oninput='updateSA_SC(\"album\",value)'><br>
	<input type='url' id='agen-url' placeholder='URL (REQUIRED)' oninput='updateSA_SC(\"url\",value)'><br>
	<span onclick='newTrack()' class='agen-new-track'>+ Add Another Track</span>
</div>

<div id='agen-stand-alone' class='hidden'>
	<input type='text' id='agen-title-p' placeholder='Title' oninput='updateSA_SC(\"title\",value)'><br>
	<input type='text' id='agen-artist-p' placeholder='Artist' oninput='updateSA_SC(\"artist\",value)'><br>
	<input type='text' id='agen-album-p' placeholder='Album' oninput='updateSA_SC(\"album\",value)'><br>
	<input type='url' id='agen-url-p' placeholder='URL (REQUIRED)' oninput='updateSA_SC(\"url\",value)'><br>
</div>
<textarea id='agen-sc' readonly rows='10'>
[ aplayer url=\"\" artist=\"\" album=\"\" title=\"\" ]
</textarea>
<hr>
<a href='https://github.com/matdombrock/Asayake-Player'>Need More Help?</a>
</div><!--wrap-->
<style>
.agen-hidden{
	visibility:none;
}
.agen-new-track{
	color:#0073AA;
	cursor:pointer;
}
.aplayer-help textarea, .aplayer-help input{
	width:600px;
	font-size:1.2rem;
	padding:0.5rem;
}

</style>
	";
	$generator .= "</div>";

	$genScript = "
<script>

</script>	
	";

	$content = '
<div class="aplayer-help">
<h1 id="asayakesunriseplayer">Asayake (Sunrise) Player</h1>

<p>A simple, modular and highly customizable HTML 5 audio player for WordPress with support for playlists. </p>

<h2 id="usage">Usage</h2>

<p>Download and install the project to the directory <code>plugins/asayake/</code>.</p>

<p>Activate the plugin.</p>

<hr />

<p><strong>Setting up a stand-alone player:</strong></p>

<p>For a simple "stand-alone" player insert a shortcode like this:</p>

<textarea class="html language-html"> [aplayer url="http://somesite.com/dope-beat.wav"]
</textarea><br>

<p>You can also supply optional metadata to the shortcode to display the track title, artist and album:</p>

<textarea  class="html language-html">[aplayer url="http://somesite.com/dope-beat.wav" title=\'Dope Beat\' artist=\'Mathieu Dombrock\' album="Imaginary Machines EP"] 
</textarea>

<hr />

<p><strong>Setting up a playlist:</strong></p>

<p>Initialize a new playlist with:</p>

<textarea class="html language-html">[aplayer-playlist playlist_id="test-playlist"]
</textarea>

<p><em>Here the <code>playlist_id</code> value can be anything you want but make sure it\'s UNIQUE.</em></p>

<p>Add a new track to the playlist with:</p>

<textarea class="html language-html">[aplayer-playlist-item  playlist_id="test-playlist" url="http://somesite.com/dope-beat.wav" title=\'Dope Beat\' artist=\'Mathieu Dombrock\' album="Imaginary Machines EP"]
</textarea>

<p><em>The <code>playlist_id</code> value here should match the ID you set when you initialized the playlist.</em></p>

<p><em>Aside from the <code>playlist_id</code> value, the rest of the parameters match the meta data supplied for the stand-alone player</em></p>

<p><em>The parameters aside from the <code>playlist_id</code> value, are optional here as well but highly suggested!</em></p>

<p><em>The playlist tracks will show up in the order they are inserted into the page, with the first track loading by default.</em></p>
</div>
<style>

</style>
';
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap">';
	echo $generator;
	echo $genScript;
	//echo $content;
	echo '</div>';

}
?>