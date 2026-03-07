(function () {
  function initGreeting() {
    var greetingElement = document.getElementById('greeting');
    if (!greetingElement) {
      return;
    }

    var greetings = [
      'Selam!',
      'Hello!',
      'Hola!',
      'Bonjour!',
      'Hallo!',
      'Ciao!',
      'नमस्ते!',
      'こんにちは!',
      '안녕하세요!',
      'Привет!',
      'Merhaba!',
      '你好!'
    ];

    var index = 0;
    setInterval(function () {
      index = (index + 1) % greetings.length;
      greetingElement.textContent = greetings[index];
    }, 2700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGreeting);
  } else {
    initGreeting();
  }
})();
