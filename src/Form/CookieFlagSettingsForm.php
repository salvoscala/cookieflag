<?php

namespace Drupal\cookieflag\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form for CookieFlag settings form.
 */
class CookieFlagSettingsForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'cookieflag_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $nid = FALSE) {

    $cookieflag_settings = \Drupal::state()->get('cookieflag_settings', []);


    $nodeEntity = \Drupal::service('entity_display.repository');
    // get list of available view modes for node entities.
    $viewModes = $nodeEntity->getViewModes('node');
    $options = [];
    foreach ($viewModes as $key => $mode) {
      $options[$key] = $mode['label'];
    }

    $form['cookieflag_flagged_label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label when item is flagged'),
      '#default_value' => $cookieflag_settings['cookieflag_flagged_label'] ?? 'Remove',
      '#required' => TRUE,
    ];

    $form['cookieflag_view_mode'] = [
      '#type' => 'select',
      '#title' => $this->t('View Mode (used on saved page)'),
      '#options' => $options,
      '#default_value' => $cookieflag_settings['cookieflag_view_mode'] ?? 'teaser',
    ];

    $form['cookieflag_intro'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Intro Message'),
      '#format' => 'full_html',
      '#default_value' => $cookieflag_settings['cookieflag_intro']['value'] ?? '',
      '#rows' => 3,
    ];

    $form['cookieflag_empty_flag'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Empty Flag Message'),
      '#format' => 'full_html',
      '#default_value' => $cookieflag_settings['cookieflag_empty_flag']['value'] ?? '',
      '#rows' => 3,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => t('Save settings'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    \Drupal::messenger()->addMessage(t('The configuration has been saved!'), 'status');

    $values = $form_state->getValues();
    $new_values['cookieflag_intro'] = $values['cookieflag_intro'];
    $new_values['cookieflag_empty_flag'] = $values['cookieflag_empty_flag'];
    $new_values['cookieflag_view_mode'] = $values['cookieflag_view_mode'];
    $new_values['cookieflag_flagged_label'] = $values['cookieflag_flagged_label'];

    // Set State.
    \Drupal::state()->set('cookieflag_settings', $new_values);
  }

}
