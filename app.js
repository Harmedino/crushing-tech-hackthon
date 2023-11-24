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


function rotateAndReplace(svgElement) {
  // Rotate the SVG
  svgElement.classList.toggle('rotate');

  // Replace with a different SVG after 2 seconds
  
    svgElement.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#4A4A4A"></circle>
    <path
      d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
      fill="#fff"
    ></path>
  </svg>
    `;
 
}
function toggleList(listElement) {
  const lists = document.querySelectorAll('.lists');
  lists.forEach((list) => {
    if (list !== listElement && list.classList.contains('active')) {
      list.classList.remove('active');
    }
    listElement.classList.add('active');
  });

  // if (listElement.classList.contains('active')) {
  //   return
  // }

  // Toggle the clicked list
 

  // Rotate the arrow
  // const rotateElement = listElement.querySelector('.rotate');
  // rotateElement.classList.toggle('rotate');

  // Close other lists
 
}

