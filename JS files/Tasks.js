const menuIcon = document.getElementById("menuIcon");
const sideDrawer = document.getElementById("sideDrawer");
const drawerLinks = sideDrawer.querySelectorAll("a");

function openDrawer() {
  sideDrawer.style.right = "0";
}

function closeDrawer() {
  sideDrawer.style.right = "-250px";
}

menuIcon.addEventListener("click", openDrawer);

drawerLinks.forEach((link) => {
  link.addEventListener("click", function () {
    closeDrawer();
  });
});

document.addEventListener("click", function (event) {
  if (!sideDrawer.contains(event.target) && event.target !== menuIcon) {
    closeDrawer();
  }
});

// Get the button and the drawer element
const openBtn = document.getElementById("openBtn");
const drawer = document.getElementById("myDrawer");
const closeBtn = document.getElementById("closeBtn");

// Open the drawer when the button is clicked
openBtn.addEventListener("click", function () {
  drawer.classList.add("open");
});

// Close the drawer when the close button is clicked
closeBtn.addEventListener("click", function () {
  drawer.classList.remove("open");
});

// Profile Pic
document.addEventListener("DOMContentLoaded", () => {
  const profilePic = document.getElementById("profilePic");
  const menu = document.getElementById("menu");

  profilePic.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    if (!profilePic.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const profilePicMobile = document.getElementById("profilePicMobile");
  const menu = document.getElementById("menuMobile");

  profilePicMobile.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    if (
      !profilePicMobile.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      menu.style.display = "none";
    }
  });
});

// Add Task button functionality
document.addEventListener("DOMContentLoaded", () => {
  const taskTabs = document.querySelectorAll(".task-tab");
  const taskTabContents = document.querySelectorAll(".task-tab-content");

  taskTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-task-tab");

      taskTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      taskTabContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === target) {
          content.classList.add("active");
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const addNewTaskBtn = document.getElementById("addNewTaskBtn");
  const taskDialog = document.getElementById("taskDialog");
  const cancelTaskBtn = document.getElementById("cancelTaskBtn");
  const addTaskForm = document.getElementById("addTaskForm");

  let editingTaskCard = null; // Variable to store the task card being edited

  // Show dialog when the "Add New Task" button is clicked
  addNewTaskBtn.addEventListener("click", () => {
    taskDialog.style.display = "flex";
    editingTaskCard = null; // Clear the editing task card when creating a new task
    document.getElementById("highPriorityCheckbox").checked = false; // Reset checkbox
  });

  // Hide dialog when the "Cancel" button is clicked
  cancelTaskBtn.addEventListener("click", () => {
    taskDialog.style.display = "none";
  });

  // Handle form submission when adding or editing a task
  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const taskTab = document.getElementById("taskTabSelect").value;
    const taskType = document.getElementById("taskType").value;
    const other = document.getElementById("other").value;
    const leadName = document.getElementById("leadName").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;
    const realtor = document.getElementById("realtor").value;
    const concierge = document.getElementById("concierge").value;
    const taskAssignee = document.getElementById("taskAssignee").value;

    // Check if "High Priority" checkbox is selected
    const isHighPriority = document.getElementById(
      "highPriorityCheckbox"
    ).checked;
    const highPriorityLabel = isHighPriority
      ? "<div style='background-color: red; color: white; padding: 5px; width: fit-content; border-radius: 5px; height: fit-content;'>High</div>"
      : "";

    // Combine task date and time
    const taskDateTime = taskDate + " " + taskTime;

    // Create or update task card
    const taskCard = editingTaskCard || document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.setAttribute("tabindex", "0"); // Make focusable
    taskCard.setAttribute("role", "button"); // Accessibility
    taskCard.style.cursor = "pointer"; // Visual feedback for clickability

    // Add icon color and "High" label if selected
    const iconColor = taskTab === "task-completed" ? "#4ac366" : "#ccc";

    taskCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="display: flex; align-items: flex-start">
          <span style="margin-right: 10px;">
            <span class="iconify"
              data-icon="icon-park-solid:check-one"
              data-inline="false"
              style="color: ${iconColor}; font-size: 30px;">
            </span>
          </span>
          <div>
            <h4>${taskType}</h4>
            <p>${other}</p>
            <p>${leadName}</p>
            <p>${new Date(taskDateTime).toLocaleString()}</p>
            <p>${realtor}</p>
            <p>${concierge}</p>
            <span>${taskAssignee}</span>
          </div>
        </div>
        ${highPriorityLabel}
      </div>
    `;

    // Add event listener to task card for editing
    taskCard.addEventListener("click", () => handleTaskCardClick(taskCard));

    // Find the correct task-slider-container based on the selected tab
    const selectedTabContent = document.getElementById(taskTab);
    if (selectedTabContent) {
      const taskSliderContainer = selectedTabContent.querySelector(
        ".task-slider-container"
      );
      if (taskSliderContainer && !editingTaskCard) {
        taskSliderContainer.appendChild(taskCard);
      }
    }

    // If editing, replace the existing task card
    if (editingTaskCard) {
      editingTaskCard.replaceWith(taskCard);
    }

    // Close the dialog after submitting
    taskDialog.style.display = "none";

    // Clear the form
    addTaskForm.reset();

    // Update the task count on the tab button
    updateTabTaskCount();
  });

  // Handle task card click to open the dialog with pre-filled details for editing
  function handleTaskCardClick(taskCard) {
    const taskType = taskCard.querySelector("h4").textContent;
    const taskDetails = taskCard.querySelectorAll("p");
    const other = taskDetails[0]?.textContent || "";
    const leadName = taskDetails[1]?.textContent || "";
    const taskDateTime = taskDetails[2]?.textContent || "";
    const realtor = taskDetails[3]?.textContent || "";
    const concierge = taskDetails[4]?.textContent || "";
    const taskAssignee = taskCard.querySelector("span")?.textContent || "";
    const highPriorityText = taskCard.querySelector(
      "div[style*='background-color: red']"
    );

    // Split taskDateTime into date and time
    const [taskDate, taskTime] = taskDateTime.split(", ");
    const [taskDatePart] = taskDate.split(" ");
    const [taskTimePart] = taskTime.split(" ");

    // Fill the form with the task card details
    document.getElementById("taskTabSelect").value =
      getTaskTabFromCard(taskCard);
    document.getElementById("taskType").value = taskType;
    document.getElementById("other").value = other;
    document.getElementById("leadName").value = leadName;
    document.getElementById("taskDate").value = taskDatePart;
    document.getElementById("taskTime").value = taskTimePart;
    document.getElementById("realtor").value = realtor;
    document.getElementById("concierge").value = concierge;
    document.getElementById("taskAssignee").value = taskAssignee;

    // Set the "High Priority" checkbox based on the task card
    document.getElementById("highPriorityCheckbox").checked =
      !!highPriorityText;

    // Set the task card as the one being edited
    editingTaskCard = taskCard;

    // Open the dialog
    taskDialog.style.display = "flex";
  }

  // Function to get the tab ID for the task card
  function getTaskTabFromCard(taskCard) {
    const taskTabContent = taskCard.closest(".task-tab-content");
    return taskTabContent ? taskTabContent.id : "task-today-tomorrow"; // Default tab if not found
  }

  // Function to update the task count on each tab
  function updateTabTaskCount() {
    const taskTabs = document.querySelectorAll(".task-tab");
    taskTabs.forEach((tab) => {
      const taskTabContent = document.getElementById(
        tab.getAttribute("data-task-tab")
      );
      const taskCount = taskTabContent
        ? taskTabContent.querySelectorAll(".task-slider-container .task-card")
            .length
        : 0;
      const tabLabel = tab.querySelector("span");
      tabLabel
        ? (tabLabel.textContent = `(${taskCount})`)
        : (tab.innerHTML += ` <span>(${taskCount})</span>`);
    });
  }
});

// Selectors
const callIcon = document.getElementById("call-icon");
const callDrawer = document.getElementById("call-drawer");
const closeDrawerCall = document.getElementById("close-drawer");
const quickConnectsButton = document.getElementById("quick-connects");
const numberPadButton = document.getElementById("number-pad");
const dynamicContent = document.getElementById("dynamic-content");
const openCallDrawerButton = document.getElementById("open-call-drawer");

openCallDrawerButton.addEventListener("click", () => {
  callDrawer.classList.add("show");
  callDrawer.classList.remove("hidden");
});


// Open call drawer
callIcon.addEventListener("click", () => {
  callDrawer.classList.add("show");
  callDrawer.classList.remove("hidden");
});

// Close call drawer
closeDrawerCall.addEventListener("click", () => {
  callDrawer.classList.remove("show");
  setTimeout(() => callDrawer.classList.add("hidden"), 300); // Wait for animation
});

// Show Quick Connects UI
quickConnectsButton.addEventListener("click", () => {
  showQuickConnects();
});

// Show Number Pad UI
numberPadButton.addEventListener("click", () => {
  showNumberPad();
});

// Function to display Quick Connects UI
function showQuickConnects() {
  dynamicContent.innerHTML = `
    <div class="quick-connect-container">
      <div class="quick-connect-input">
        <select class="flag-select">
          <option value="us">🇺🇸</option>
          <option value="uk">🇬🇧</option>
          <option value="fr">🇫🇷</option>
        </select>
        <input type="text" placeholder="Quick Connect or Number" class="quick-connect-field" id="quick-connect-input">
      </div>
      <button class="incoming-call-btn action-btn">Incoming Call</button>
      <div class="quick-actions">
        <button id="number-pad-btn" class="action-btn">Number Pad</button>
        <button id="call-btn" class="call-btn">Call</button>
      </div>
    </div>
  `;

  // Add event listener for Number Pad button inside Quick Connects UI
  const numberPadBtn = document.getElementById("number-pad-btn");
  numberPadBtn.addEventListener("click", () => {
    showNumberPad();
  });

  // Add event listener for Incoming Call button
  const incomingCallBtn = document.querySelector(".incoming-call-btn");
  incomingCallBtn.addEventListener("click", () => {
    showIncomingCallUI();
  });

  // Add event listener for Call button
  const callBtn = document.getElementById("call-btn");
  callBtn.addEventListener("click", () => {
    handleCallButtonClick();
  });
}

// Function to display Number Pad UI
function showNumberPad() {
  dynamicContent.innerHTML = `
    <div class="availability" style="display: flex; flex-direction: column; justify-content: start; align-items: flex-start;padding: 0px 10px 10px 0px;">
      <select id="availability">
        <option value="available">Available</option>
        <option value="busy">Busy</option>
        <option value="offline">Offline</option>
      </select>
    </div>
    <input type="text" id="number-input" class="quick-connect-field" placeholder="Enter Number" style="width: 100%;" />
    <div class="dial-pad">
      <button class="dial-btn">1</button>
      <button class="dial-btn">2</button>
      <button class="dial-btn">3</button>
      <button class="dial-btn">4</button>
      <button class="dial-btn">5</button>
      <button class="dial-btn">6</button>
      <button class="dial-btn">7</button>
      <button class="dial-btn">8</button>
      <button class="dial-btn">9</button>
      <button class="dial-btn">*</button>
      <button class="dial-btn">0</button>
      <button class="dial-btn">#</button>
    </div>
    <div class="quick-actions">
      <button id="quick-connects-btn" class="action-btn">Quick Connects</button>
      <button id="call-btn" class="call-btn">Call</button>
    </div>
  `;

  const numberInput = document.getElementById("number-input");
  const dialButtons = document.querySelectorAll(".dial-btn");

  // Add event listeners to digit buttons
  dialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Append the clicked button's text to the input field
      numberInput.value += button.textContent;
    });
  });

  // Add event listener for Quick Connects button inside Number Pad UI
  const quickConnectsBtn = document.getElementById("quick-connects-btn");
  quickConnectsBtn.addEventListener("click", () => {
    quickConnectsButton.click();
  });

  // Add event listener for Call button
  const callBtn = document.getElementById("call-btn");
  callBtn.addEventListener("click", () => {
    handleCallButtonClick();
  });
}

// Function to handle the Call button click
function handleCallButtonClick() {
  const inputField = document.querySelector(".quick-connect-field");
  const phoneNumber = inputField.value.trim();

  // Validate the phone number
  if (/^\d{10}$/.test(phoneNumber)) {
    alert(`Dialing ${phoneNumber}...`);
    showConnectedCallUI();
  } else {
    alert("Please enter a valid 10-digit phone number.");
  }
}

// Function to display Incoming Call UI
function showIncomingCallUI() {
  dynamicContent.innerHTML = `
    <div class="incoming-call">
       <div class="incoming-call-header">
      <h3 style="margin: 0; color: #fff;">+1-202-555-2546</h3>
      <span style="color: #ccc; font-size: 14px;">Incoming Call</span>
    </div>

      <div class="call-actions">
        <button id="accept-call-btn" class="call-btn" style="background-color: #4CAF50;">Accept Call</button>
        <button id="reject-call-btn" class="call-btn" style="background-color: #f44336;">Reject Call</button>
      </div>
    </div>
  `;

  const acceptCallBtn = document.getElementById("accept-call-btn");
  const rejectCallBtn = document.getElementById("reject-call-btn");

  // Add event listener for Accept Call button
  acceptCallBtn.addEventListener("click", () => {
    alert("Call Accepted");
    showConnectedCallUI();
  });

  // Add event listener for Reject Call button
  rejectCallBtn.addEventListener("click", () => {
    alert("Call Rejected");
    quickConnectsButton.click();
  });
}

// Function to display Connected Call UI
function showConnectedCallUI() {
  dynamicContent.innerHTML = `
    <div class="connected-call-header" style="background-color: #4CAF50; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
      <div class="call-info">
        <h3 style="margin: 0;">+1-202-555-0181</h3>
        <span style="font-size: 14px;">Connected Call</span>
      </div>
      <div class="call-duration">
        <span style="font-size: 14px;">⏱ 2:40</span>
      </div>
    </div>
    <div class="quick-connect-container" style="padding: 10px;">
      <div class="quick-connect-input" style="display: flex; align-items: center; gap: 10px;">
        <select class="flag-select">
          <option value="us">🇺🇸</option>
          <option value="uk">🇬🇧</option>
          <option value="fr">🇫🇷</option>
        </select>
        <input type="text" id="contact-search" placeholder="Search for a contact..." class="quick-connect-field" style="flex: 1;" />
      </div>
      <div id="contact-list" style="margin-top: 10px; display: none;"></div>
      <div class="quick-actions" style="display: flex; justify-content: space-between; margin-top: 10px;">
        <button id="number-pad-btn" class="action-btn">Number Pad</button>
        <button class="call-btn">Call</button>
      </div>
    </div>
  `;

  const contacts = [
    { name: "Mark Struert", phone: "+1-202-555-0108" },
    { name: "Henry Marksman", phone: "+1-202-555-5486" },
    { name: "Mark Luber", phone: "+1-202-555-1254" },
  ];

  const contactSearchInput = document.getElementById("contact-search");
  const contactListDiv = document.getElementById("contact-list");

  // Add event listener to search input for filtering contacts
  contactSearchInput.addEventListener("input", () => {
    const searchValue = contactSearchInput.value.toLowerCase().trim();
    contactListDiv.innerHTML = "";

    if (searchValue) {
      const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue)
      );

      if (filteredContacts.length > 0) {
        contactListDiv.style.display = "block";
        filteredContacts.forEach(contact => {
          const contactItem = document.createElement("div");
          contactItem.classList.add("contact-item");
          contactItem.setAttribute("data-phone", contact.phone);
          contactItem.style.cursor = "pointer";
          contactItem.style.margin = "5px 0";
          contactItem.innerHTML = `${contact.name} <span style="color: gray;">${contact.phone}</span>`;

          contactItem.addEventListener("click", () => {
            alert(`Starting call with ${contact.phone}...`);
            showConnectedCallUIWithPhoneNumber(contact.phone);
          });

          contactListDiv.appendChild(contactItem);
        });
      } else {
        contactListDiv.style.display = "block";
        contactListDiv.innerHTML = `<div style="color: gray;">No contacts found</div>`;
      }
    } else {
      contactListDiv.style.display = "none";
    }
  });

  // Add event listener for Number Pad button
  const numberPadBtn = document.getElementById("number-pad-btn");
  numberPadBtn.addEventListener("click", () => {
    showNumberPad();
  });
}

// Function to display the connected call UI with a specific phone number
// Function to display the connected call UI with a specific phone number
function showConnectedCallUIWithPhoneNumber(phoneNumber) {
  dynamicContent.innerHTML = `
    <div class="connected-call-container" style=" overflow: hidden;">
    
      <div style="display: flex; flex-direction: column; background-color: #FFD700; padding: 10px; color: #000;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0;">${phoneNumber}</h3>
          <button style="background: none; border: none; font-size: 16px; cursor: pointer; color: #000;">✖</button>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; margin-top: 5px;">
          <span>⏱ 2:40</span>
          <span>On Hold</span>
        </div>
      </div>

      <!-- Internal Transfer Section -->
      <div style="background-color: #001F54; color: #fff; padding: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
          <p>Internal Transfer</p>
          <p>Connecting</p>
          </div>
          <button style="background: none; border: none; font-size: 16px; cursor: pointer; color: #fff;">✖</button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-wrap: wrap; gap: 10px; padding: 10px; justify-content: space-between; margin-top: 80px;">
        <button id="mute-btn" style="flex: 1; padding: 10px; background-color: #F5F5F5; border: 1px solid #ddd; cursor: pointer;">Mute</button>
        <button id="join-btn" style="flex: 1; padding: 10px; background-color: #F5F5F5; border: 1px solid #ddd; cursor: pointer;">Join</button>
        <button id="swap-btn" style="flex: 1; padding: 10px; background-color: #F5F5F5; border: 1px solid #ddd; cursor: pointer;">Swap</button>
        <button id="number-pad-btn" style="flex: 1; padding: 10px; background-color: #F5F5F5; border: 1px solid #ddd; cursor: pointer;">Number Pad</button>
        <button id="end-call-btn" style="flex: 1; padding: 10px; background-color: #FF4C4C; color: #fff; border: none; cursor: pointer;">End Call</button>
      </div>
    </div>
  `;

  // Add functionality to buttons
  document.getElementById("mute-btn").addEventListener("click", () => {
    alert("Muted");
  });

  document.getElementById("join-btn").addEventListener("click", () => {
    alert("Joining the call...");
  });

  document.getElementById("swap-btn").addEventListener("click", () => {
    alert("Swapping the call...");
  });

  document.getElementById("number-pad-btn").addEventListener("click", () => {
    showNumberPad(); // Call the Number Pad UI
  });

  document.getElementById("end-call-btn").addEventListener("click", () => {
    showDefaultState(); // Return to the default state
  });
}

// Function to display the default state
function showDefaultState() {
  dynamicContent.innerHTML = `
    <div id="dynamic-content" class="dynamic-content">
      <!-- Default state -->
      <div style="display: flex; flex-direction: column; justify-content: start; align-items: flex-start;">
        <select id="availability">
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <div class="welcome-message">
        <h2 style="color: #333; text-align: center; margin-bottom: 40px;">Welcome</h2>
        <button id="quick-connects" class="action-btn">
          <span class="iconify" data-icon="ph:phone-disconnect" data-inline="false" style="color: #0055fd; font-size: 20px; margin: 0 5px 0 5px;"></span>
          <p>Quick Connects</p>
        </button>
        <button id="number-pad" class="action-btn">
          <span class="iconify" data-icon="ph:numpad" data-inline="false" style="color: #0055fd; font-size: 16px; font-weight: 600;"></span>
          <p>Number Pad</p>
        </button>
      </div>
    </div>
  `;
}
