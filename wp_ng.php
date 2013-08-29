<?php
/*
Plugin Name: WP Angular
Plugin URI: 
Description: WordPress AngularJS integration
Author: Shiyaz Rasheed
Version: 0.1
Author URI: www.atollier.com
*/

register_activation_hook(__FILE__, 'wp_ng_activate');
register_deactivation_hook(__FILE__, 'wp_ng_deactivate');

function wp_ng_activate() {
	require_once dirname(__FILE__) . '/wp_ng_loader.php';
	$loader = new WP_NG_Loader();
	$loader->activate();
}

function wp_ng_deactivate() {
	require_once dirname(__FILE__) . '/wp_ng_loader.php';
	$loader = new WP_NG_Loader();
	$loader->deactivate();
}

add_action('init', 'register_wp_ng_scripts');

$wp_ng_client_config = array(
    'template_path' => parse_url(plugins_url('wp-ng/client/templates/'), PHP_URL_PATH),
);

$file_tmp = glob(dirname(__FILE__).'/client/*.php', GLOB_MARK | GLOB_NOSORT);
foreach ($file_tmp as $item){
    if (substr($item, -1) != DIRECTORY_SEPARATOR) {
        require_once($item);
    }
}

function register_wp_ng_scripts() {
    global $wp_ng_client_config;

    wp_register_script('wpng-jqf', plugins_url('core/js/lib/jquery.form.js', __FILE__),
        array('jquery'), false, true);
    wp_register_script('wpng-ng', plugins_url('core/js/lib/angular.js', __FILE__),
        array('jquery'), false, true);
    wp_register_script('wpng-ngres', plugins_url('core/js/lib/angular-resource.js', __FILE__),
        array('wpng-ng'), false, true);
    wp_register_script('wpng-lib', plugins_url('core/js/ng-lib.js', __FILE__),
        array('wpng-ng', 'wpng-ngres', 'underscore', 'jquery', 'wpng-jqf'), false, true);
    wp_register_script('wpng-drts', plugins_url('core/js/directives/directives.js', __FILE__),
        array('wpng-lib'), false, true);
    wp_register_script('wpng-svcs', plugins_url('core/js/services/services.js', __FILE__),
        array('wpng-lib'), false, true);
    wp_register_script('wpng-ctrl', plugins_url('core/js/controllers/controllers.js', __FILE__),
        array('wpng-lib'), false, true);
    wp_register_script('wpng-client', plugins_url('client/js/client.js', __FILE__),
        array('wpng-ctrl'), false, true);

    wp_localize_script('wpng-client', 'WP_NG_Client_Config', $wp_ng_client_config);

    wp_enqueue_script('wpng-app', plugins_url('core/js/ng-app.js', __FILE__),
        array('wpng-ctrl', 'wpng-svcs', 'wpng-drts', 'wpng-client'), false, true);
}

$file_tmp = glob(dirname(__FILE__).'/core/*.php', GLOB_MARK | GLOB_NOSORT);
foreach ($file_tmp as $item){
    if (substr($item, -1) != DIRECTORY_SEPARATOR) {
        require_once($item);
    }
}

?>