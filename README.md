# Cookiflag Drupal 8 module

This project allow users to flag node and save in a cookie. Saved nodes can be viewed at the /saved page.

## Installation

    * Enable it under: `admin/modules`

## Configuration

    * Configure module: `/admin/config/system/cookieflag` (be sure to have the administer cookieflag settings).

## Usage

    * Add an element the DOM with the 'data-cookieflag-id' attribute and the 'cookieflag' class. This should be the Node Id of the element.
      e.g. <div class="cookieflag" data-cookieflag-id="1">Flag Node!</div>