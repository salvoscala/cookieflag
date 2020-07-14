<?php

namespace Drupal\cookieflag\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a counter for cookieflags.
 *
 * @Block(
 *   id = "cookieflag_counter",
 *   admin_label = @Translation("CookieFlag Counter"),
 *
 * )
 */
class CookieFlagCounter extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    return [
      '#theme' => 'cookieflag_counter',
    ];
  }
}
