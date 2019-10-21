<?php
/**
 * Plugin Name: aPlayer
 * Plugin URI: https://mzero.space
 * Description: aPlayer
 * Version: 1.0
 * Author: Mathieu Dombrock
 * Author URI: https://mzero.space
 */
//wp_enqueue_script( 'aplayer-js', plugins_url( '/js/player.js', __FILE__ ),'',"1.0.0",true);
wp_enqueue_script( 'aplayer-js', plugins_url( '/js/player.js', __FILE__ ));
wp_localize_script( 'aplayer-js', 'phpdata', array(
    'pluginsUrl' => plugins_url('',__FILE__),
));
wp_enqueue_style( 'aplayer-css', plugins_url( '/css/player.css', __FILE__ ));

include( plugin_dir_path( __FILE__ ) . 'options.php');

include( plugin_dir_path( __FILE__ ) . 'shortcodes.php');
add_shortcode('aplayer', 'aplayerShortcode');
add_shortcode('aplayer-playlist', 'aplayerShortcodePlaylist');
add_shortcode('aplayer-playlist-item', 'aplayerShortcodePlaylistItem');
