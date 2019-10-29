<?php
/**
 * Plugin Name: Asayake Player
 * Plugin URI: https://github.com/matdombrock/Asayake-Player
 * Description: A simple, modular and highly customizable HTML 5 audio player for WordPress with support for playlists. 
 * Version: 1.0.2
 * Author: Mathieu Dombrock
 * Author URI: https://mzero.space
 */
add_action( 'wp_enqueue_scripts', 'aplayer_scripts' );
add_action( 'admin_enqueue_scripts', 'aplayer_admin_scripts' );
function aplayer_scripts(){
    wp_enqueue_script( 'aplayer-js', plugins_url( '/js/player.js', __FILE__ ));
    wp_localize_script( 'aplayer-js', 'phpdata', array(
        'pluginsUrl' => plugins_url('',__FILE__),
    ));
    wp_enqueue_style( 'aplayer-css', plugins_url( '/css/player.css', __FILE__ ));
}
function aplayer_admin_scripts(){
    wp_enqueue_script( 'aplayer-scjs', plugins_url( '/js/scGenerator.js', __FILE__ ));
    wp_enqueue_style( 'aplayer-css', plugins_url( '/css/scGenerator.css', __FILE__ ));
}

include( plugin_dir_path( __FILE__ ) . 'options.php');

include( plugin_dir_path( __FILE__ ) . 'shortcodes.php');
add_shortcode('aplayer', 'aplayerShortcode');
add_shortcode('aplayer-playlist', 'aplayerShortcodePlaylist');
add_shortcode('aplayer-playlist-item', 'aplayerShortcodePlaylistItem');
?>