const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const attendeeCountEl = document.getElementById("attendeeCount");
const greetingEl = document.getElementById("greeting");
const progressBar = document.getElementById("progressBar");

let count = 0;
const maxCount = 50;

var teamCounts = {
  water: 0,
  zero: 0,
  power: 0
};

form.addEventListener("submit", function(event) {
  event.preventDefault();

  var name = nameInput.value.trim();
  var team = teamSelect.value;
  var teamName = teamSelect.selectedOptions[0].text;

  if (!name || !team) {
    return;
  }

  // Update totals
  count = count + 1;
  attendeeCountEl.textContent = String(count);

  // Update team count
  if (teamCounts.hasOwnProperty(team)) {
    teamCounts[team] = teamCounts[team] + 1;
    var teamCounter = document.getElementById(team + "Count");
    if (teamCounter) {
      teamCounter.textContent = String(teamCounts[team]);
    }
  }

  // Update progress bar
  var percent = Math.round((count / maxCount) * 100);
  var pctText = percent + "%";
  progressBar.style.width = pctText;
  progressBar.setAttribute("aria-valuenow", String(percent));
  progressBar.textContent = pctText;

  // Show greeting message
  greetingEl.textContent = `🎉 Welcome, ${name} from ${teamName}!`;

  // Clear greeting after 4 seconds
  setTimeout(function() {
    greetingEl.textContent = "";
  }, 4000);

  // Reset form and focus
  form.reset();
  nameInput.focus();
});