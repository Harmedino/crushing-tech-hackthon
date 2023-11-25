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
const rotateDiv = document.querySelectorAll('.rotate');
const loadingDiv = document.querySelectorAll('.loading');
const successDiv = document.querySelectorAll('.success');
const dropdownItems = profileDropdown.querySelectorAll('[role="menuitem"]');




function toggleProfileDropdown() {
  const isHidden = alertBell.classList.contains("hidden");
  const expanded = notificationIcon.getAttribute('aria-expanded') === 'true';

  // Toggle the visibility of the dropdown
  profileDropdown.classList.toggle("hidden");

  // Update aria-expanded attribute
  notificationIcon.setAttribute("aria-expanded", !expanded);

  // Focus on the button to provide better navigation for screen reader users
  notificationIcon.focus();
}
  profileName.addEventListener("click", toggleProfileDropdown);
  
  



  function toggleNotificationIcon() {
    const isDropdownHidden = profileDropdown.classList.contains('hidden');
    const isBellHidden = alertBell.classList.contains('hidden');
  
    if (isDropdownHidden) {
      alertBell.classList.toggle('hidden');
    } else {
      profileDropdown.classList.add('hidden');
      alertBell.classList.toggle('hidden');
    }
  
    // Update aria-expanded attribute for the notification icon
    notificationIcon.setAttribute('aria-expanded', isDropdownHidden ? 'false' : 'true');
  }
  

dropdownItems.forEach((element, index) => {
  element.addEventListener('keyup', ()=> {
    navigateMenuItem()
  })
})

function navigateMenuItem(event) {
  console.log(event);
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
  if (focusedElement.classList.contains("profile")) {
    if (event.key === "Enter") {
        toggleNotificationIcon()
    }
  } if (event.key === "Escape" && !alertBell.classList.contains("hidden")) {
    alertBell.classList.add('hidden')
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



function toggleList(listElement) {
  const lists = document.querySelectorAll('.lists');
  lists.forEach((list) => {
    if (list !== listElement && list.classList.contains('active')) {
      list.classList.remove('active');
    }
    listElement.classList.add('active');
  });

 
}
rotateDiv.forEach((rotate,index )=> {
  rotate.addEventListener('click', () => {
    // Simulate loading state
    
    rotate.style.display = 'none';
    loadingDiv[index].style.display = 'block';
  
    
    setTimeout(() => {
      // Simulate success state
      loadingDiv[index].style.display = 'none';
      successDiv[index].style.display = 'block';
      if (index < loadingDiv.length ) {
        
        toggleList(loadingDiv[index+1].closest('.lists'))
      }
    }, 1000); 
  });
})

successDiv.forEach((element, index) => {
  element.addEventListener('click', () => {
    element.style.display = 'none'

    rotateDiv[index].style.display = 'block'
    // toggleList(element.closest('.lists'))
  })
})

