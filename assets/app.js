/* Road(eo) to Jerusalem - small interactions. The page works without JavaScript. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* 1. Gesture demos: hover plays them on desktop, tap toggles them on touch screens. */
  var demos = document.querySelectorAll(".demo");
  Array.prototype.forEach.call(demos, function (demo) {
    demo.setAttribute("aria-pressed", "false");
    demo.addEventListener("click", function () {
      var playing = demo.classList.toggle("is-playing");
      demo.setAttribute("aria-pressed", playing ? "true" : "false");
    });
  });

  /* 2. Final ranking demo: the donkey that carries Jesus at the finish climbs up to four places. */
  var board = document.querySelector("[data-rank]");
  if (!board) return;

  var button = board.querySelector("[data-rank-button]");
  var status = board.querySelector("[data-rank-status]");
  var rows = {};
  Array.prototype.forEach.call(board.querySelectorAll("[data-id]"), function (row) {
    rows[row.getAttribute("data-id")] = row;
  });

  var before = ["grey", "sure", "long", "play", "hard"];
  var after = ["hard", "grey", "sure", "long", "play"];

  var texts = {
    before:
      "The race is over. Hardhooviel carries Jesus, but only in 5th place.",
    after:
      "Hardhooviel kept Jesus to the end and climbs four places: 5th to 1st.",
  };

  var finished = false;

  function place(order) {
    order.forEach(function (id, index) {
      if (rows[id]) rows[id].style.setProperty("--pos", String(index));
    });
  }

  function render() {
    place(finished ? after : before);
    status.textContent = finished ? texts.after : texts.before;
    button.textContent = finished ? "Race again" : "Give the bonus";
  }

  button.addEventListener("click", function () {
    finished = !finished;
    render();
  });

  render();
})();
