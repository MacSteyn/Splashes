/**
 * Splashes - Simple Vue component: announcement bar
 * (Featured Vue component within the site)
 */
(function () {
  if (typeof Vue === 'undefined') return;
  var el = document.getElementById('vue-announcement-bar');
  if (!el) return;

  new Vue({
    el: el,
    data: {
      message: 'Welcome to Splashes Aquatics — Safe, professional swimming lessons for all ages.',
      visible: true
    },
    methods: {
      close: function () {
        this.visible = false;
      }
    },
    template:
      '<div v-if="visible" class="vue-announcement-bar py-2 px-3 text-center text-white small">' +
        '<span>{{ message }}</span>' +
        ' <a href="lessons.html" class="text-white text-decoration-underline ms-2">View lessons</a>' +
        '<button type="button" class="btn-close btn-close-white btn-sm ms-2 align-middle" aria-label="Close" @click="close"></button>' +
      '</div>'
  });
})();
