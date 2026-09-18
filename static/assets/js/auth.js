(function () {
  /* Show / hide password */
  document.querySelectorAll(".toggle-pass").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = document.getElementById(btn.getAttribute("data-target"));
      if (!input) return;
      var hidden = input.type === "password";
      input.type = hidden ? "text" : "password";
      btn.textContent = hidden ? "Hide" : "Show";
      input.focus();
    });
  });

  /* Live password requirements on signup */
  var pw = document.getElementById("pass");
  var rules = document.getElementById("pwRules");

  if (pw && rules) {
    var checks = {
      lower: function (v) { return /[a-z]/.test(v); },
      upper: function (v) { return /[A-Z]/.test(v); },
      digit: function (v) { return /\d/.test(v); },
      length: function (v) { return v.length >= 8; }
    };

    pw.addEventListener("input", function () {
      var v = pw.value;
      rules.querySelectorAll(".pw-rule").forEach(function (el) {
        var name = el.getAttribute("data-rule");
        el.classList.toggle("ok", checks[name] ? checks[name](v) : false);
      });
    });
  }

  /* Stop double submits, and make the wait visible.
     "Forgot password?" is a submit button too, so read which one was used. */
  var form = document.getElementById("loginForm") || document.getElementById("signupForm");
  var submitBtn = document.getElementById("submitBtn");

  if (form && submitBtn) {
    var clickedValue = null;
    form.querySelectorAll("[type=submit]").forEach(function (b) {
      b.addEventListener("click", function () { clickedValue = b.value; });
    });

    form.addEventListener("submit", function () {
      if (clickedValue === "forgot") return; // different action, leave the button alone
      submitBtn.disabled = true;
      submitBtn.textContent = form.id === "signupForm" ? "Creating account…" : "Logging in…";
    });
  }
})();
