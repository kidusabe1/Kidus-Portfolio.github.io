(function () {
  function initCvPreview() {
    var frame = document.getElementById('mycv');
    var status = document.getElementById('cvStatus');

    if (!frame || !status) {
      return;
    }

    var loadingTimer = setTimeout(function () {
      status.textContent = 'Still loading… if your browser blocks previews, use Open in New Tab.';
    }, 3500);

    frame.addEventListener('load', function () {
      clearTimeout(loadingTimer);
      status.textContent = 'Preview loaded';
      status.classList.add('is-ready');
    });

    frame.addEventListener('error', function () {
      clearTimeout(loadingTimer);
      status.textContent = 'Preview failed to load. Please use Open in New Tab.';
      status.classList.add('is-error');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCvPreview);
  } else {
    initCvPreview();
  }
})();
