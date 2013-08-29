<?php

add_shortcode('angular-view', 'wp_ng_view');
function wp_ng_view($atts)
{
    global $wp_ng_scripts_added;

    $wp_ng_scripts_added = true;

    $app = '';
    $controller = '';
    $template = '';

    extract(shortcode_atts(array(
        'app' => 'ngApp',
        'controller' => 'HelloCtrl',
        'template' => 'hello.html'
    ), $atts));

    $template = parse_url(plugins_url('wp-ng/client/templates/'), PHP_URL_PATH) . $template;

    return
        '<div ng-app="' . $app . '">' .
        '<div ng-include="' . "'" . $template . "'" .
        '" ng-controller="' . $controller .
        '"></div>' .
        '</div>';
}

add_action('wp_head', 'wp_ng_enqueue_styles');
function wp_ng_enqueue_styles()
{
    wp_enqueue_style('ng-core-style', plugins_url('css/ng-style.css', __FILE__),
        array(), false, 'all');

    wp_enqueue_style('ng-client-style', plugins_url('/client/css/client-style.css', __FILE__),
        array(), false, 'all');
}

add_action('wp_footer', 'wp_ng_enqueue_scripts');
function wp_ng_enqueue_scripts()
{

}

?>