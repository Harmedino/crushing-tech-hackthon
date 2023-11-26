const profileName = document.getElementById("profileName");
const profileDropdown = document.getElementById("profile-dropdown");
const trialCallout = document.getElementById("trial");
const trialPlan = document.getElementById("plan");
const alertBell = document.getElementById("alert");
const notificationIcon = document.getElementById("notification");
const upDown = document.getElementById("up-down");
const upArrow = document.querySelector(".up");
const downArrow = document.querySelector(".down");
const stepsContainer = document.getElementById("stepsContainer");
const rotateDiv = document.querySelectorAll(".rotate");
const loadingDiv = document.querySelectorAll(".loading");
const successDiv = document.querySelectorAll(".success");
const dropdownItems = profileDropdown.querySelectorAll('[role="menuitem"]');
let progressValue = 0;
let completedCount = 0;
const progressBar = document.getElementById('progressBar');
const progressLabel = document.querySelector('.bar');

function toggleProfileDropdown() {
  const isHidden = profileDropdown.classList.contains("hidden");
  const expanded = notificationIcon.getAttribute("aria-expanded") === "true";

  if (!alertBell.classList.contains("hidden")) {
    alertBell.classList.add("hidden");
  }
  // Toggle the visibility of the dropdown

  profileDropdown.classList.toggle("hidden");


  profileName.setAttribute("aria-expanded", isHidden ? "true" : "false");

}
profileName.addEventListener("click", toggleProfileDropdown);

function toggleNotificationIcon() {
  const isDropdownHidden = alertBell.classList.contains("hidden");

  if (!profileDropdown.classList.contains("hidden")) {
    profileDropdown.classList.add("hidden");
  }
  if (isDropdownHidden) {
    alertBell.classList.toggle("hidden");
  } else {
    profileDropdown.classList.add("hidden");
    alertBell.classList.toggle("hidden");
  }

  // Update aria-expanded attribute for the notification icon
  notificationIcon.setAttribute(
    "aria-expanded",
    isDropdownHidden ? "true" : "false"
  );

  notificationIcon.focus();

   
  const isExpanded = alertBell.getAttribute("aria-expanded") === "true";
  
  if (isExpanded) {
    alertBell.setAttribute("aria-expanded", "false");
    alertBell.setAttribute("aria-live", "off");
    alertBell.setAttribute("aria-label", "Notification closed");
  } else {
    alertBell.setAttribute("aria-expanded", "true");
    alertBell.setAttribute("aria-live", "assertive");
    alertBell.setAttribute("aria-label", "Notification open");
  }
}



// Call this function when you want to announce an alert
// announceAlert('New alert message here');

notificationIcon.addEventListener("click", toggleNotificationIcon);

document.addEventListener("keydown", (event) => {
  const focusedElement = document.activeElement;

  if (focusedElement.classList.contains("profileName")) {
    if (event.key === "Enter") {
      toggleProfileDropdown();
      if (focusedElement.classList.contains("cancel")) {
        trialPlan.classList.add("hidden");
      }
    }
  }
  
  if (event.key === "Escape" && !profileDropdown.classList.contains("hidden")) {
    profileDropdown.classList.add("hidden");
  }
  if (focusedElement.classList.contains("profile")) {
    if (event.key === "Enter") {
      toggleNotificationIcon();
    }
  }
  if (event.key === "Escape" && !alertBell.classList.contains("hidden")) {
    alertBell.classList.add("hidden");
  }
});

trialCallout.addEventListener("click", () => {
  trialPlan.classList.add("hidden");
});

upDown.addEventListener("click", () => {
  upArrow.classList.toggle("hidden");
  downArrow.classList.toggle("hidden");

  const expanded = upDown.getAttribute("aria-expanded") === "true";

  // Toggle visibility of the content
  stepsContainer.classList.toggle("hidden", !expanded);

  // Toggle aria-expanded attribute
  upDown.setAttribute("aria-expanded", !expanded);

  // Focus on the button to provide better navigation for screen reader users
  upDown.focus();
});

function toggleList(listElement) {
  const lists = document.querySelectorAll(".lists");
  lists.forEach((list) => {
    if (list !== listElement && list.classList.contains("active")) {
      list.classList.remove("active");
    }
    listElement.classList.add("active");
  });
}
rotateDiv.forEach((rotate, index) => {
  rotate.addEventListener("click", () => {
    // Simulate loading state
    rotate.setAttribute("aria-checked", "false");
    rotate.setAttribute("aria-label", "Item not marked");

    rotate.style.display = "none";
    loadingDiv[index].style.display = "block";
    loadingDiv[index].setAttribute("aria-hidden", "false");
    successDiv[index].setAttribute("aria-hidden", "true");

    setTimeout(() => {
      // Simulate success state
      loadingDiv[index].style.display = "none";
      successDiv[index].style.display = "block";
      rotate.setAttribute("aria-checked", "true");
      rotate.setAttribute("aria-label", "Item marked as done");
      rotate.setAttribute("aria-hidden", "true");
      loadingDiv[index].setAttribute("aria-hidden", "true");
      successDiv[index].setAttribute("aria-hidden", "false");

       // Update progress
      progressValue += 14.4;
      progressBar.setAttribute('width', progressValue);
      completedCount += 1;
      progressLabel.textContent = `${completedCount} / 5 completed`;
  

      if (index < loadingDiv.length) {
        toggleList(loadingDiv[index + 1].closest(".lists"));
        loadingDiv[index + 1].closest('.checkbox').focus()
      }
    }, 2000);
  });
});

successDiv.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.display = "none";
    loadingDiv[index].style.display = "inherit";
    rotateDiv[index].setAttribute("aria-checked", "false");
    rotateDiv[index].setAttribute("aria-label", "Item not marked");
    rotateDiv[index].setAttribute("aria-hidden", "false");
    loadingDiv[index].setAttribute("aria-hidden", "false");
    successDiv[index].setAttribute("aria-hidden", "true");

     // Update progress
     progressValue -= 20;
    progressBar.value = progressValue;
        // Update completed count and progress label
        completedCount -= 1;
        progressLabel.textContent = `${completedCount} / 5 completed`;

    setTimeout(() => {
      loadingDiv[index].style.display = "none";
      rotateDiv[index].style.display = "inherit";
    }, 2000);
  });
});
