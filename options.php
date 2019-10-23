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
.aplayer-help textarea{
	width:400px;
}
</style>
';
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap">';
	echo $content;
	echo '</div>';

}
?>