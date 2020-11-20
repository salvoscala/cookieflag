<?php

/**
 * Set default State.
 */
function cookieflag_install() {
  $cookieflag_settings = \Drupal::state()->get('cookieflag_settings', []);
  $cookieflag_settings['cookieflag_flagged_label'] = 'Remove';
  $cookieflag_settings['cookieflag_flag_label'] = 'Flag';
  \Drupal::state()->set('cookieflag_settings', $cookieflag_settings);
}


/**
 * Set default State.
 */
function cookieflag_8001(&$sandbox) {
  $cookieflag_settings = \Drupal::state()->get('cookieflag_settings', []);
  $cookieflag_settings['cookieflag_flagged_label'] = 'Remove';
  $cookieflag_settings['cookieflag_flag_label'] = 'Flag';
  \Drupal::state()->set('cookieflag_settings', $cookieflag_settings);
}
