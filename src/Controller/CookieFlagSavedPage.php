<?php

namespace Drupal\cookieflag\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\Core\Render\Markup;

/**
 * Provides route responses for the saved page.
 */
class CookieFlagSavedPage extends ControllerBase {

  /**
   * 
   */
  public function content() {

    $cookieflag_settings = \Drupal::state()->get('cookieflag_settings', []);

    if (isset($_COOKIE['cookieflag']) && !empty($_COOKIE['cookieflag'])) {
      $saved = explode(',', $_COOKIE['cookieflag']);
      $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');

      $view_mode = $cookieflag_settings['cookieflag_view_mode'];
      foreach ($saved as $id) {
        $node = Node::load($id);
        $nodes[] = $view_builder->view($node, $view_mode);
      }
    }
    else {
      $build = [
        '#intro' => Markup::create($cookieflag_settings['cookieflag_empty_flag']['value']) ?? '',
        '#theme' => 'cookieflag_saved_page',
      ];
      return $build;
    }

    $build = [
      '#nodes' => $nodes ?? [],
      '#intro' => Markup::create($cookieflag_settings['cookieflag_intro']['value']) ?? '',
      '#theme' => 'cookieflag_saved_page',
    ];

    return $build;

  }
}
