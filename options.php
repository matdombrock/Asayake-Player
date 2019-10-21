
<?php
// OPTIONS
/** Step 2 (from text above). */
add_action( 'admin_menu', 'my_plugin_menu' );
/** Step 1. */
function my_plugin_menu() {
	add_options_page( 'aPlayer Options', 'aPlayer', 'manage_options', 'aplayer-settings', 'aplayer_options' );
}

/** Step 3. */
function aplayer_options() {
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap">';
	echo '<p>Here is where the form would go if I actually had options.</p>';
	echo '</div>';
}