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
const checkbox = document.querySelectorAll('.checkbox')
const checkboxStatus = document.querySelectorAll('.checkbox-status')

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
  } if (focusedElement.classList.contains('list-head')) {
    if (event.key === 'Enter') {
      const listHead = focusedElement.closest('.list-head');
      toggleList(listHead)
    }
  }
});

trialCallout.addEventListener("click", () => {
  trialPlan.classList.add("hidden");
});



function toggleUpDown() {
  upArrow.classList.toggle("hidden");
  downArrow.classList.toggle("hidden");

  const expanded = upDown.getAttribute("aria-expanded") === "true";

  // Toggle visibility of the content
  stepsContainer.classList.toggle("hidden", !expanded);

  // Toggle aria-expanded attribute
  upDown.setAttribute("aria-expanded", String(!expanded));

  // Toggle aria-hidden attribute
  stepsContainer.setAttribute("aria-hidden", String(!expanded));

  // Focus on the button to provide better navigation for screen reader users
  upDown.focus();
}

upDown.addEventListener("click", toggleUpDown);
upDown.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    toggleUpDown();
  }
});



function toggleList(listElement) {
  const lists = document.querySelectorAll(".lists");
  const imgBox = document.querySelectorAll(".img-box");

  lists.forEach((list, index) => {
    const currentImgBox = imgBox[index];

    if (list === listElement.closest('.lists')) {
      if (currentImgBox.classList.contains("hidden")) {
        // Close all other img-box elements
        imgBox.forEach(box => box.classList.add("hidden"));

        // Open the selected img-box
        currentImgBox.classList.remove("hidden");
      } else {
        // If the selected img-box is already open, do nothing
      }
    } else {
      // Close other lists
      imgBox[index].classList.add("hidden");
    }
  });
}





// Function to handle the logic inside the click event
function handleRotateClick(index) {

  // Simulate loading state
  rotateDiv[index].setAttribute("aria-checked", "false");
  rotateDiv[index].setAttribute("aria-label", "Item not marked");

  rotateDiv[index].style.display = "none";
  loadingDiv[index].style.display = "block";
  loadingDiv[index].setAttribute("aria-hidden", "false");
  successDiv[index].setAttribute("aria-hidden", "true");
  checkboxStatus[index].ariaLabel = 'Loading please wait'
  setTimeout(() => {
    
    // Simulate success state
    loadingDiv[index].style.display = "none";
    successDiv[index].style.display = "block";
    rotateDiv[index].setAttribute("aria-checked", "true");
    rotateDiv[index].setAttribute("aria-label", "Item marked as done");
    rotateDiv[index].setAttribute("aria-hidden", "true");
    loadingDiv[index].setAttribute("aria-hidden", "true");
    successDiv[index].setAttribute("aria-hidden", "false");

    // Update progress
    progressValue += 20; // Adjust this value based on your progress logic
    progressBar.setAttribute('width', progressValue);
    progressBar.setAttribute("aria-valuenow", progressValue);
    progressBar.setAttribute("aria-valuetext", `${progressValue}%`);
    progressBar.setAttribute("aria-labelledby", "completionStatus");

    completedCount += 1;
    progressLabel.textContent = `${completedCount} / 5 completed`;

    if (index < loadingDiv.length) {
      toggleList(loadingDiv[index + 1].closest(".list-head"));
      loadingDiv[index + 1].closest('.checkbox').focus();
    }
    checkboxStatus[index].ariaLabel = 'successfully marked '
  }, 2000);
}

rotateDiv.forEach((rotate, index) => {
  rotate.addEventListener("click", () => {
    
    checkbox[index].ariaLabel = checkbox[index].ariaLabel.replace('mark', 'unmark')
    
    handleRotateClick(index);
  });

  rotate.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleRotateClick(index);
    }
  });
});

successDiv.forEach((element, index) => {
  element.addEventListener("click", () => {
    handleSuccessClick(index);
    checkbox[index].ariaLabel = checkbox[index].ariaLabel.replace('unmark','mark')
    handleRotateClick(index);
  });

  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSuccessClick(index);
    }
  });
});

function handleSuccessClick(index) {
  element.style.display = "none";
  loadingDiv[index].style.display = "inherit";
  rotateDiv[index].setAttribute("aria-checked", "false");
  rotateDiv[index].setAttribute("aria-label", "Item not marked");
  rotateDiv[index].setAttribute("aria-hidden", "false");
  loadingDiv[index].setAttribute("aria-hidden", "false");
  successDiv[index].setAttribute("aria-hidden", "true");

  
  
  checkboxStatus[index].ariaLabel = 'Loading please wait'
  setTimeout(() => {
    // Update progress
    progressValue -= 20; // Adjust this value based on your progress logic
  progressBar.setAttribute('width', progressValue);
  progressBar.setAttribute("aria-valuenow", progressValue);
  progressBar.setAttribute("aria-valuetext", `${progressValue}%`);
  progressBar.setAttribute("aria-labelledby", "completionStatus");

  // Update completed count and progress label
  completedCount -= 1;
  progressLabel.textContent = `${completedCount} / 5 completed`;
    loadingDiv[index].style.display = "none";
    rotateDiv[index].style.display = "inherit";
    checkboxStatus[index].ariaLabel = 'successfully unmark'
  }, 2000);
}


