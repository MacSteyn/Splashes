/**
 * Splashes - JavaScript interactions, jQuery components, Ajax
 * (2 jQuery components; Ajax used in accordion)
 */
(function () {
  'use strict';

  if (typeof jQuery === 'undefined') return;

  var $ = jQuery;

  // ----- Smooth scroll for anchor links -----
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ----- jQuery Component 1: Accordion with Ajax-loaded content -----
  var $accordionContainer = $('#accordion-container');
  if ($accordionContainer.length) {
    var accordionId = 'splashes-faq-accordion';
    var accordionHtml =
      '<div class="accordion" id="' + accordionId + '">' +
        '<div class="accordion-item">' +
          '<h2 class="accordion-header">' +
            '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true">Quick FAQs</button>' +
          '</h2>' +
          '<div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#' + accordionId + '">' +
            '<div class="accordion-body" id="ajax-faq-panel"><p class="text-muted">Loading…</p></div>' +
          '</div>' +
        '</div>' +
        '<div class="accordion-item">' +
          '<h2 class="accordion-header">' +
            '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">Locations at a glance</button>' +
          '</h2>' +
          '<div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#' + accordionId + '">' +
            '<div class="accordion-body">California & Denver — 21 swim schools. <a href="locations.html">View locations</a>.</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    $accordionContainer.html(accordionHtml);

    // Ajax: load FAQ content into first panel
    $.ajax({
        url: 'content/faq.html',
        method: 'GET',
        dataType: 'html'
      })
      .done(function (data) {
        $('#ajax-faq-panel').html(data);
      })
      .fail(function () {
        $('#ajax-faq-panel').html('<p>Could not load FAQs. Please try again later.</p>');
      });
  }

  // ----- jQuery Component 2: Simple tabs (Bootstrap) + Ajax for one tab -----
  var $tabsContainer = $('#splashes-tabs-container');
  if ($tabsContainer.length) {
    var tabsHtml =
      '<ul class="nav nav-tabs mb-2" role="tablist">' +
        '<li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-programs" type="button">Programs</button></li>' +
        '<li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-updates" type="button">Updates</button></li>' +
      '</ul>' +
      '<div class="tab-content">' +
        '<div class="tab-pane fade show active" id="tab-programs">' +
          '<p>Private, semi-private, and Parent & Me lessons available at all locations.</p>' +
        '</div>' +
        '<div class="tab-pane fade" id="tab-updates">' +
          '<div id="ajax-tab-updates"><p class="text-muted">Loading…</p></div>' +
        '</div>' +
      '</div>';
    $tabsContainer.html(tabsHtml);

    $tabsContainer.find('button[data-bs-target="#tab-updates"]').on('show.bs.tab', function () {
      var $panel = $('#ajax-tab-updates');
      if ($panel.find('.ajax-loaded').length) return;
      $.get('content/faq.html')
        .done(function (html) {
          $panel.addClass('ajax-loaded').html(html);
        })
        .fail(function () {
          $panel.html('<p>Updates could not be loaded.</p>');
        });
    });
  }

  // ----- Register / Sign In form: show feedback (no submit to server) -----
  $('#authModal form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var email = $form.find('input[type="email"]').val();
    if (!email) {
      $form.find('.form-control').first().addClass('is-invalid');
      return;
    }
    $form.find('.form-control').removeClass('is-invalid');
    var $btn = $form.find('button[type="submit"]');
    var text = $btn.text();
    $btn.prop('disabled', true).text('Sending…');
    setTimeout(function () {
      $btn.prop('disabled', false).text(text);
      bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
    }, 800);
  });
})();
