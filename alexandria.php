<?php
/**
 * Plugin.
 *
 * @package alexandria-wp
 * @wordpress-plugin
 *
 * Plugin Name:     Alexandria Novum
 * Description:     Alexandria plugin
 * Author:          David MARIE
 * Author URL:      https://dmkreation.com
 * Version:         1.0
 * Domain Path:     /languages
 */

/**
 * Shortcode which renders Root element for your React App.
 *
 * @return string
 */
function md_react_app_shortcode() {

	/**
	 * You can pass in here some data which if you need to have some settings\localization etc for your App,
	 * so you'll be able for example generate initial state of your app for Redux, based on some settings provided by WordPress.
	 */
	$settings = array(
		'l18n'       => array(
			'main_title' => 'Hi this is your React app running in WordPress',
		),
		'some_items' => array( 'lorem ipsum', 'dolor sit amet' ),
	);

	return '<div id="md-react-app" data-default-settings="' . esc_attr( wp_json_encode( $settings ) ) . '"></div>';
}

add_shortcode(
	'md-react-app',
	'md_react_app_shortcode'
);

/**
 * Enqueues styles and js compiled for plugin.
 */
function alexandria_app_enqueue_assets() {
	if ( is_admin() ) {
    $ver = ( get_plugin_data( __FILE__ ) )['Version'];
	} 
	if ( !is_admin() ) {
    $ver = '1.0.0';
	}
	$js_to_load  = plugin_dir_url( __FILE__ ) . 'app/build/static/js/main.js';
	$css_to_load = plugin_dir_url( __FILE__ ) . 'app/build/static/css/main.css';

	/* `wp-element` as dependency will load React and ReactDom for our app from `wp-includes` */
	wp_enqueue_script( 'md-react-app', $js_to_load, array( 'wp-element' ), $ver, true );

	wp_enqueue_style( 'md-react-app', $css_to_load, array(), $ver );
}

function alexandria_admin_enqueue_assets($hook) {

	$js_to_load  = plugin_dir_url( __FILE__ ) . 'admin/build/static/js/main.js';
	$css_to_load = plugin_dir_url( __FILE__ ) . 'admin/build/static/css/main.css';

	/* `wp-element` as dependency will load React and ReactDom for our app from `wp-includes` */
	wp_enqueue_script( 'alexandria-admin', $js_to_load, array( 'wp-element' ), 1, true);

	wp_enqueue_style( 'alexandria-admin', $css_to_load);
}

add_action( 'wp_enqueue_scripts', 'alexandria_app_enqueue_assets' );
add_action( 'admin_enqueue_scripts', 'alexandria_admin_enqueue_assets' );

add_action('admin_menu', 'alexandria_admin_setup');

function alexandria_admin_setup(){
    add_menu_page( 'Alexandria Page', 'Alexandria', 'manage_options', 'alexandria-plugin', 'alexandria_admin_init' );
}

function alexandria_admin_init(){
	echo '<div id="alexandria-admin"></div>';
}