(function () {
  var MODEL_URL = "https://teachablemachine.withgoogle.com/models/LILsZ-Czn/";
  var MIN_SCAN_MS = 1400; // let the scan animation read as deliberate, not a flash

  var dropZone = document.getElementById("dropZone");
  if (!dropZone) return;

  var fileInput = document.getElementById("imageUpload");
  var previewWrap = document.getElementById("previewWrap");
  var preview = document.getElementById("imagePreview");
  var overlay = document.getElementById("scanOverlay");
  var clearBtn = document.getElementById("clearBtn");
  var statusBox = document.getElementById("scanStatus");
  var statusTitle = document.getElementById("statusTitle");
  var statusDetail = document.getElementById("statusDetail");
  var resultBox = document.getElementById("result");

  var webcamWrap = document.getElementById("webcamWrap");
  var webcamOverlay = document.getElementById("webcamOverlay");
  var webcamContainer = document.getElementById("webcam-container");
  var webcamBtn = document.getElementById("webcamBtn");
  var captureBtn = document.getElementById("captureBtn");
  var retakeBtn = document.getElementById("retakeBtn");

  var modelPromise = null;
  var webcam = null;
  var webcamOn = false;   // camera is streaming
  var webcamLive = false; // frame loop is running (false = frozen on a captured frame)

  function show(el) { if (el) el.hidden = false; }
  function hide(el) { if (el) el.hidden = true; }

  function setStatus(title, detail) {
    statusTitle.textContent = title;
    statusDetail.textContent = detail || "";
    show(statusBox);
  }

  function loadModel() {
    if (!modelPromise) {
      modelPromise = tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json")
        .catch(function (err) {
          modelPromise = null; // let the next attempt retry
          throw err;
        });
    }
    return modelPromise;
  }

  function topPrediction(predictions) {
    var best = predictions[0];
    for (var i = 1; i < predictions.length; i++) {
      if (predictions[i].probability > best.probability) best = predictions[i];
    }
    return best;
  }

  function list(items) {
    return items.map(function (t) { return "<li>" + t + "</li>"; }).join("");
  }

  function section(title, items, tone) {
    if (!items || !items.length) return "";
    return '<div class="remedy-section ' + (tone || "") + '">' +
             "<h4>" + title + "</h4><ul>" + list(items) + "</ul></div>";
  }

  function renderResult(best) {
    var pct = Math.round(best.probability * 100);
    var info = window.lookupCondition(best.className);
    var severity = info ? info.severity : "moderate";
    var name = info ? info.label : best.className;

    var html =
      '<div class="result-head">' +
        '<h3 class="result-name">' + name + "</h3>" +
        '<span class="chip ' + severity + '">' +
          (severity === "urgent" ? "See a doctor promptly" : severity + " concern") +
        "</span>" +
      "</div>";

    if (info) html += '<p class="result-summary">' + info.summary + "</p>";

    html +=
      '<div class="conf-row"><span>Model confidence</span><span>' + pct + "%</span></div>" +
      '<div class="conf-track"><div class="conf-fill" id="confFill"></div></div>';

    if (info) {
      html += '<div class="remedy-grid">' +
        section("Do this now", info.immediate, severity === "urgent" ? "danger" : "") +
        section("Home remedies", info.remedies) +
        section("Avoid", info.avoid, "warn") +
        section("See a doctor if", info.seeDoctor, "danger") +
      "</div>";
    } else {
      html += '<div class="remedy-section warn"><h4>No guidance on file</h4><ul>' +
        "<li>This result (&ldquo;" + best.className + "&rdquo;) has no self-care entry yet.</li>" +
        "<li>Keep the area clean and dry, and avoid scratching it.</li>" +
        "<li>Have a clinician look at it before treating anything.</li></ul></div>";
    }

    if (pct < 60) {
      html += '<div class="scan-error">Confidence is low, so treat this as a weak guess. ' +
        "Retake the photo in bright, even light with the area filling most of the frame.</div>";
    }

    html += '<div class="disclaimer"><strong>This is not a medical diagnosis.</strong> ' +
      "It is an image-classification model that can be confidently wrong. Use it as a prompt to " +
      "get checked, never as a reason to delay care or self-treat a serious condition.</div>";

    resultBox.innerHTML = html;
    show(resultBox);

    requestAnimationFrame(function () {
      var fill = document.getElementById("confFill");
      if (fill) fill.style.width = pct + "%";
    });
  }

  function showError(message) {
    hide(statusBox);
    resultBox.innerHTML = '<div class="scan-error">' + message + "</div>";
    show(resultBox);
  }

  /* Runs one prediction against an <img> or a canvas and renders the result. */
  function runScan(input, overlayEl) {
    hide(resultBox);
    show(overlayEl);
    setStatus("Loading model…", "First run downloads the model — this takes a few seconds.");

    var startedAt = Date.now();

    return loadModel()
      .then(function (model) {
        setStatus("Scanning image…", "Analysing texture, colour and pattern.");
        return model.predict(input, false);
      })
      .then(function (predictions) {
        var wait = Math.max(0, MIN_SCAN_MS - (Date.now() - startedAt));
        return new Promise(function (resolve) {
          setTimeout(function () { resolve(predictions); }, wait);
        });
      })
      .then(function (predictions) {
        hide(overlayEl);
        hide(statusBox);
        renderResult(topPrediction(predictions));
      })
      .catch(function (err) {
        hide(overlayEl);
        showError("Could not run the scan: " + (err && err.message ? err.message : err) +
          ". Check your connection and try again.");
      });
  }

  /* ---------- upload ---------- */
  function handleFile(file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      showError("That file is not an image. Please choose a JPG or PNG.");
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      preview.onload = function () {
        preview.onload = null;
        runScan(preview, overlay);
      };
      preview.src = e.target.result;
      show(previewWrap);
      hide(dropZone);
    };
    reader.onerror = function () { showError("Could not read that file. Try another image."); };
    reader.readAsDataURL(file);
  }

  fileInput.addEventListener("change", function () {
    handleFile(this.files && this.files[0]);
  });

  dropZone.addEventListener("click", function (e) {
    e.preventDefault();
    fileInput.click();
  });

  ["dragenter", "dragover"].forEach(function (evt) {
    dropZone.addEventListener(evt, function (e) {
      e.preventDefault();
      dropZone.classList.add("is-over");
    });
  });

  ["dragleave", "drop"].forEach(function (evt) {
    dropZone.addEventListener(evt, function (e) {
      e.preventDefault();
      dropZone.classList.remove("is-over");
    });
  });

  dropZone.addEventListener("drop", function (e) {
    var dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length) handleFile(dt.files[0]);
  });

  clearBtn.addEventListener("click", function () {
    fileInput.value = "";
    preview.removeAttribute("src");
    hide(previewWrap);
    hide(resultBox);
    hide(statusBox);
    hide(overlay);
    show(dropZone);
  });

  /* ---------- tabs ---------- */
  var tabs = document.querySelectorAll(".scan-tab");
  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener("click", function () {
      Array.prototype.forEach.call(tabs, function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");

      var mode = tab.getAttribute("data-mode");
      document.getElementById("pane-upload").hidden = mode !== "upload";
      document.getElementById("pane-webcam").hidden = mode !== "webcam";

      hide(resultBox);
      hide(statusBox);
      if (mode !== "webcam" && webcamOn) stopWebcam();
    });
  });

  /* ---------- webcam ----------
   * The feed only streams frames. Prediction runs once, on the frame the
   * user chooses to capture — otherwise the result flickers between classes
   * on every tick and none of them mean anything.
   */
  function liveLoop() {
    if (!webcamOn || !webcamLive) return;
    webcam.update();
    requestAnimationFrame(liveLoop);
  }

  function stopWebcam() {
    webcamOn = false;
    webcamLive = false;
    if (webcam) {
      webcam.stop();
      if (webcam.canvas && webcam.canvas.parentNode) {
        webcam.canvas.parentNode.removeChild(webcam.canvas);
      }
    }
    webcamBtn.textContent = "Start webcam";
    hide(webcamWrap);
    hide(webcamOverlay);
    hide(captureBtn);
    hide(retakeBtn);
    hide(statusBox);
  }

  webcamBtn.addEventListener("click", function () {
    if (webcamOn) {
      stopWebcam();
      hide(resultBox);
      return;
    }

    setStatus("Starting camera…", "Allow camera access when your browser asks.");

    loadModel()
      .then(function () {
        webcam = new tmImage.Webcam(300, 300, true);
        return webcam.setup().then(function () { return webcam.play(); });
      })
      .then(function () {
        webcamContainer.appendChild(webcam.canvas);
        webcamOn = true;
        webcamLive = true;
        webcamBtn.textContent = "Stop webcam";
        show(webcamWrap);
        show(captureBtn);
        hide(retakeBtn);
        hide(statusBox);
        liveLoop();
      })
      .catch(function (err) {
        showError("Could not start the camera: " + (err && err.message ? err.message : err) +
          ". Check that you granted camera permission.");
      });
  });

  captureBtn.addEventListener("click", function () {
    if (!webcamOn) return;
    webcamLive = false; // freezes the canvas on the current frame
    hide(captureBtn);
    runScan(webcam.canvas, webcamOverlay).then(function () {
      show(retakeBtn);
    });
  });

  retakeBtn.addEventListener("click", function () {
    if (!webcamOn) return;
    hide(resultBox);
    hide(retakeBtn);
    show(captureBtn);
    webcamLive = true;
    liveLoop();
  });
})();
