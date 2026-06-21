let attendeeCount = Number(localStorage.getItem("attendeeCount")) || 0;
let waterCount = Number(localStorage.getItem("waterCount")) || 0;
let zeroCount = Number(localStorage.getItem("zeroCount")) || 0;
let powerCount = Number(localStorage.getItem("powerCount")) || 0;
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

const goal = 50;

function getWinningTeam() {
  let maxCount = Math.max(waterCount, zeroCount, powerCount);
  if (waterCount === maxCount) {
    return "Team Water Wise";
  } else if (zeroCount === maxCount) {
    return "Team Net Zero";
  } else if (powerCount === maxCount) {
    return "Team Renewables";
  }
  return "";
}

function showCheckInCelebration() {
  let confetti = document.createElement("div");
  confetti.className = "confetti";
  document.body.appendChild(confetti);

  setTimeout(function () {
    confetti.remove();
  }, 1500);
}

function showCelebration(teamName) {
  let modal = document.getElementById("celebrationModal");
  let winningTeamElement = document.getElementById("winningTeam");

  winningTeamElement.textContent = "Winning Team: " + teamName + " 🏆";

  modal.classList.remove("hidden");
  modal.classList.add("show");

  setTimeout(function () {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  }, 5000);
}

function updatePage() {
  document.getElementById("attendeeCount").textContent = attendeeCount;
  document.getElementById("waterCount").textContent = waterCount;
  document.getElementById("zeroCount").textContent = zeroCount;
  document.getElementById("powerCount").textContent = powerCount;

  document.getElementById("progressBar").style.width =
    (attendeeCount / goal) * 100 + "%";

  let list = document.getElementById("attendeeList");
  if (list) {
    list.innerHTML = "";
    attendees.forEach(function (person) {
      let item = document.createElement("p");
      item.textContent = person.name + " — " + person.team;
      list.appendChild(item);
    });
  }
}

document
  .getElementById("checkInForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("attendeeName").value;
    let team = document.getElementById("teamSelect").value;

    if (name === "" || team === "") {
      alert("Please enter a name and select a team.");
      return;
    }

    attendeeCount++;

    if (team === "water") {
      waterCount++;
      team = "Team Water Wise";
    } else if (team === "zero") {
      zeroCount++;
      team = "Team Net Zero";
    } else if (team === "power") {
      powerCount++;
      team = "Team Renewables";
    }

    document.getElementById("greeting").textContent =
      "Welcome, " + name + "! You checked in for " + team + ".";

    showCheckInCelebration();

    attendees.push({ name: name, team: team });

    localStorage.setItem("attendeeCount", attendeeCount);
    localStorage.setItem("waterCount", waterCount);
    localStorage.setItem("zeroCount", zeroCount);
    localStorage.setItem("powerCount", powerCount);
    localStorage.setItem("attendees", JSON.stringify(attendees));

    updatePage();

    if (attendeeCount >= goal) {
      document.getElementById("greeting").textContent =
        "🎉 Attendance goal reached! Great job, Intel teams!";
      let winningTeam = getWinningTeam();
      showCelebration(winningTeam);
    }

    document.getElementById("attendeeName").value = "";
    document.getElementById("teamSelect").value = "";
  });

updatePage();
