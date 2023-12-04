document.addEventListener("DOMContentLoaded", function () {
  // Get references to the "Student" and "Administrator" buttons
  var studentButton = document.getElementById("studentButton");
  var adminButton = document.getElementById("adminButton");

  var roleSelectionContainer = document.getElementById("roleSelectionContainer");
  var searchFormContainer = document.getElementById("searchFormContainer");

  // Add a click event listener to the "Student" button
  studentButton.addEventListener("click", function () {
      // Hide the role selection container
      roleSelectionContainer.style.display = "none";
  

      // Shsow the login form
      searchFormContainer.style.display = "block";
  });




});
// Get references to the buttons and form containers
const adminButton = document.getElementById("adminButton");
const adminLoginFormContainer = document.getElementById("adminLoginFormContainer");
const adminLoginButton = document.getElementById("adminLoginButton");

// Add a click event listener to the admin button
adminButton.addEventListener("click", function () {
  // Hide the role selection container
  roleSelectionContainer.style.display = "none";

  // Show the admin login form container
  adminLoginFormContainer.style.display = "block";
});

adminLoginButton.addEventListener("click", function () {
  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;

  if (username === "adminRATPD" && password === "prmsucoeadminRATPD") {
      // Hide the admin login form container
      adminLoginFormContainer.style.display = "none";
      
      // Show the course selection container
      document.getElementById("courseSelectionContainer").style.display = "block";

      // Display a success message or redirect to an admin panel page
      alert("Log In Successful");
  } else {
      // Display error messages based on the input
      let errorMessage = "";

      if (username !== "adminRATPD") {
          errorMessage += "Incorrect Username";
      }

      if (password !== "prmsucoeadminRATPD") {
          if (errorMessage) {
              errorMessage += " and ";
          }
          errorMessage += "Incorrect Password";
      }

      if (!errorMessage) {
          errorMessage = "Please check your Username and Password";
      }

      // Display the error message
      alert(errorMessage);
  }
});

// Function to show the file uploader and hide the course selection buttons
function showFileUploader() {
  document.getElementById("courseSelectionContainer").style.display = "none";
  document.getElementById("fileUploaderContainer").style.display = "block";
}

// Function to show the course selection buttons and hide the file uploader
function showCourseSelectionButtons() {
  document.getElementById("courseSelectionContainer").style.display = "block";
  document.getElementById("fileUploaderContainer").style.display = "none";
}

// Function to go back to the course selection from file uploader
function goBackToCourseSelection() {
  showCourseSelectionButtons();
}

// Add a click event listener to the course buttons
document.getElementById("BSCEButton").addEventListener("click", function () {
  showFileUploader();
});

document.getElementById("BSCpEButton").addEventListener("click", function () {
  showFileUploader();
});

document.getElementById("BSEEButton").addEventListener("click", function () {
  showFileUploader();
});

document.getElementById("BSMEButton").addEventListener("click", function () {
  showFileUploader();
});




// Function to handle file upload for both thesis and research papers
function uploadFile(category) {
  const fileInput = document.getElementById('fileInput');
  const fileList = fileInput.files;

  if (fileList.length > 0) {
    const file = fileList[0];
    if (!isFileAlreadyUploaded(file.name, category)) {
      displayFile(file, category);
      saveFile(file, category);
    } else {
      alert('File is already existing. You cannot upload the same file again.');
    }
  } else {
    alert('Please select a file.');
  }
}

// Function to check if the file is already uploaded
function isFileAlreadyUploaded(fileName, category) {
  const fileListElement = document.getElementById(category === 'thesis' ? 'uploadedFiles' : 'uploadedResearchFiles');
  const fileLinks = fileListElement.querySelectorAll('a');
  return Array.from(fileLinks).some(link => link.textContent === fileName);
}




// Function to display file in the appropriate file list
function displayFile(file, category) {
  const fileListElement = document.getElementById(category === 'thesis' ? 'uploadedFiles' : 'uploadedResearchFiles');
  fileListElement.classList.add('fileListWithScroll'); // Apply the CSS class

  const listItem = document.createElement('li');
  const fileLink = document.createElement('a');
  fileLink.textContent = file.name;
  fileLink.href = URL.createObjectURL(file);
  fileLink.target = '_blank';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteButton';
  deleteButton.onclick = function () {
    listItem.remove();
    removeFile(file, category);
  };

  listItem.appendChild(fileLink);
  listItem.appendChild(deleteButton);
  fileListElement.appendChild(listItem);
}

// Function to save file information in localStorage
function saveFile(file, category) {
  const storedFiles = localStorage.getItem(`${category}_uploadedFiles`);
  let uploadedFiles = [];

  if (storedFiles) {
    uploadedFiles = JSON.parse(storedFiles);
  }

  uploadedFiles.push({ name: file.name, link: URL.createObjectURL(file) });

  localStorage.setItem(`${category}_uploadedFiles`, JSON.stringify(uploadedFiles));
}

// Function to remove file from localStorage
function removeFile(file, category) {
  const storedFiles = localStorage.getItem(`${category}_uploadedFiles`);
  let uploadedFiles = [];

  if (storedFiles) {
    uploadedFiles = JSON.parse(storedFiles);
  }

  uploadedFiles = uploadedFiles.filter((uploadedFile) => uploadedFile.name !== file.name);

  localStorage.setItem(`${category}_uploadedFiles`, JSON.stringify(uploadedFiles));
}


// Display previously uploaded files on page load for each category
document.addEventListener('DOMContentLoaded', function () {
  const categories = ['BSCE', 'BSCpE', 'BSEE', 'BSME'];

  categories.forEach(category => {
      const storedFiles = localStorage.getItem(`${category}_uploadedFiles`);
      const fileListElement = document.getElementById(`${category}_uploadedFiles`);

      if (storedFiles) {
          const uploadedFiles = JSON.parse(storedFiles);
          uploadedFiles.forEach((file) => {
              displayFile(file, category);
          });
      }
  });
});