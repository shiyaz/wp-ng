<?php

add_action('wp_head', 'wp_ng_enqueue_client_styles');
function wp_ng_enqueue_client_styles()
{
    wp_enqueue_style('ng-client-style', plugins_url('css/client-style.css', __FILE__),
        array(), false, 'all');
}

add_action('wp_footer', 'wp_ng_enqueue_client_scripts');
function wp_ng_enqueue_client_scripts()
{
// enqueue/register additional client scripts here
}

?>