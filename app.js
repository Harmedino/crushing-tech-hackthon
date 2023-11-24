const profileName = document.getElementById("profileName");
const profileDropdown = document.getElementById("profile-dropdown");
const trialCallout = document.getElementById("trial");
const trialPlan = document.getElementById("plan");
const alertBell = document.getElementById("alert");
const notificationIcon = document.getElementById("notification");
const upDown = document.getElementById('up-down');
const upArrow = document.querySelector('.up');
const downArrow = document.querySelector('.down');
const stepsContainer = document.getElementById('stepsContainer');

function toggleProfileDropdown() {
    if (alertBell.classList.contains("hidden")) {
      profileDropdown.classList.toggle("hidden");
    } else {
      alertBell.classList.add("hidden");
      profileDropdown.classList.toggle("hidden");
    }
  }
  
  profileName.addEventListener("click", toggleProfileDropdown);
  

  function toggleNotificationIcon() {
    if (profileDropdown.classList.contains('hidden')) {
        alertBell.classList.toggle("hidden");
    } else {
        profileDropdown.classList.add('hidden')
        alertBell.classList.toggle('hidden')
    }
}

function announceAlert(message) {
  const liveRegion = document.getElementById('alert');
  liveRegion.innerText = message;
}

// Call this function when you want to announce an alert
// announceAlert('New alert message here');

notificationIcon.addEventListener("click", toggleNotificationIcon);


document.addEventListener("keydown", (event) => {
  const focusedElement = document.activeElement;

  if (focusedElement.classList.contains("profileName")) {
    if (event.key === "Enter") {
        toggleProfileDropdown()
    }
  }
  if (focusedElement.classList.contains("cancel")) {
    trialPlan.classList.add("hidden");
  }
  if (event.key === "Escape" && !profileDropdown.classList.contains("hidden")) {
    profileDropdown.classList.add("hidden");
  }
  if (focusedElement.classList.contains("notification")) {
    if (event.key === "Enter") {
        toggleNotificationIcon()
    }
  }
});

trialCallout.addEventListener("click", () => {
  trialPlan.classList.add("hidden");
});



upDown.addEventListener('click', () => {
  upArrow.classList.toggle('hidden');
  downArrow.classList.toggle('hidden');

  const expanded = upDown.getAttribute('aria-expanded') === 'true';
  
  // Toggle visibility of the content
  stepsContainer.classList.toggle('hidden', !expanded);

  // Toggle aria-expanded attribute
  upDown.setAttribute('aria-expanded', !expanded);

  // Focus on the button to provide better navigation for screen reader users
  upDown.focus();
});