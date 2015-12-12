var disqus_config = function () {
  this.page.url = "{% canonical_url %}";
  this.page.identifier = "{{ page.id }}";
};

(function() {
  var d = document, s = d.createElement('script');
  s.src = '//jurnal-risan.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
