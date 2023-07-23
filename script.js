// Jobs List
let jobs = [
  {
    title: "Web Developer",
    company: "Zoho Corp",
    location: "Chennai",
    type: "Full-time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Graphic Designer",
    company: "Cognizant",
    location: "Delhi",
    type: "Part-time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Marketing Specialist",
    company: "Accenture",
    location: "Madurai",
    type: "Full-time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Sales Manager",
    company: "TCS",
    location: "Bangalore",
    type: "Full-time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Software Engineer",
    company: "Wipro Ltd.",
    location: "Coimbatore",
    type: "Contract",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "HR Specialist",
    company: "Tech Mahendra",
    location: "Delhi",
    type: "Part-time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "Product Manager",
    company: "Amazon",
    location: "Madurai",
    type: "Full-time",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

const jobsPerPage = 3;
let currentPage = 1; 
let filteredJobs = [];


function displayJobs() {
  const jobListings = document.getElementById("job-listings");
  jobListings.innerHTML = ""; 

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  if (currentJobs.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.innerText = "No jobs found.";
    jobListings.appendChild(noResultsMessage);
  } else {
    currentJobs.forEach(job => {
      const listing = document.createElement("div");
      listing.classList.add("job-listing");

      const title = document.createElement("h2");
      title.innerText = job.title;

      const company = document.createElement("p");
      company.innerText = "Company: " + job.company;

      const jobType = document.createElement("p");
      jobType.innerText = "Job Type: " + job.type;

      const location = document.createElement("p");
      location.innerText = "Location: " + job.location;

      const applyButton = document.createElement("button");
      applyButton.innerText = "Apply";
      applyButton.addEventListener("click", function() {
        showApplyForm(job);
      });

      listing.appendChild(title);
      listing.appendChild(company);
      listing.appendChild(jobType);
      listing.appendChild(location);
      listing.appendChild(applyButton);

      jobListings.appendChild(listing);
    });
  }

  displayPagination(filteredJobs.length);
}

//apply button
function showApplyForm(job) {
  const modalOverlay = document.getElementById("modal-overlay");
  const applyModal = document.getElementById("apply-modal");

  const jobDetails = document.getElementById("apply-modal-content");
  jobDetails.innerHTML = ""; 

  const title = document.createElement("h2");
  title.innerText = job.title;

  const company = document.createElement("p");
  company.innerText = "Company: " + job.company;

  const location = document.createElement("p");
  location.innerText = "Location: " + job.location;

  const type = document.createElement("p");
  type.innerText = "Type: " + job.type;

  const description = document.createElement("p");
  description.innerText = "Description: " + job.description;

  const applyForm = document.createElement("form");
  applyForm.id = "job-application-form";
  applyForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const resume = document.getElementById("resume").value;
    console.log("Applying for job:", job.title);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Resume:", resume);
    closeModal();
  });

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "name");
  nameLabel.innerText = "Name:";
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.id = "name";
  nameInput.required = true;

  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.innerText = "Email:";
  const emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.id = "email";
  emailInput.required = true;

  const resumeLabel = document.createElement("label");
  resumeLabel.setAttribute("for", "resume");
  resumeLabel.innerText = "Resume:";
  const resumeInput = document.createElement("input");
  resumeInput.setAttribute("type", "file");
  resumeInput.id = "resume";
  resumeInput.required = true;

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Apply";

  const closeButton = document.createElement("button");
  closeButton.id = "close-modal";
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", closeModal);

  applyForm.appendChild(nameLabel);
  applyForm.appendChild(nameInput);
  applyForm.appendChild(emailLabel);
  applyForm.appendChild(emailInput);
  applyForm.appendChild(resumeLabel);
  applyForm.appendChild(resumeInput);
  applyForm.appendChild(submitButton);
  applyForm.appendChild(closeButton);

  jobDetails.appendChild(title);
  jobDetails.appendChild(company);
  jobDetails.appendChild(location);
  jobDetails.appendChild(type);
  jobDetails.appendChild(description);
  jobDetails.appendChild(applyForm);

  modalOverlay.classList.remove("hidden");
  applyModal.classList.remove("hidden");
}
//close form
function closeModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  const applyModal = document.getElementById("apply-modal");

  modalOverlay.classList.add("hidden");
  applyModal.classList.add("hidden");
}

//filter
function handleFilter() {
  const filterType = document.getElementById("filter-type").value;
  const filterLocation = document.getElementById("filter-location").value.toLowerCase();

  filteredJobs = jobs.filter(job => {
    const typeMatch = filterType === "" || job.type.toLowerCase().includes(filterType);
    const locationMatch = filterLocation === "" || job.location.toLowerCase().includes(filterLocation);
    return typeMatch && locationMatch;
  });

  currentPage = 1; 
  displayJobs();
}

// job searching
function handleSearch() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();

  filteredJobs = jobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(searchTerm);
    const companyMatch = job.company.toLowerCase().includes(searchTerm);
    const locationMatch = job.location.toLowerCase().includes(searchTerm);
    const descriptionMatch = job.description.toLowerCase().includes(searchTerm);
    return titleMatch || companyMatch || locationMatch || descriptionMatch;
  });

  currentPage = 1;
  displayJobs();
}

//  page number
function displayPagination(totalJobs) {
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const paginationSection = document.getElementById("pagination-section");
  paginationSection.innerHTML = ""; 

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.innerText = i;
    pageNumber.addEventListener("click", function() {
      currentPage = i;
      displayJobs();
    });

    if (i === currentPage) {
      pageNumber.classList.add("active");
    }

    paginationSection.appendChild(pageNumber);
  }
}

window.addEventListener("DOMContentLoaded", function() {
  filteredJobs = jobs; 
  displayJobs();
});

document.getElementById("search-button").addEventListener("click", handleSearch);
document.getElementById("filter-type").addEventListener("change", handleFilter);
document.getElementById("filter-location").addEventListener("change", handleFilter);



//login popup
function showLoginPopup() {
  const loginPopup = document.getElementById("login-popup");
  loginPopup.style.display = "block";
}


function hideLoginPopup() {
  const loginPopup = document.getElementById("login-popup");
  loginPopup.style.display = "none";
}

//create account popup
function showCreateAccountPopup() {
  const createAccountPopup = document.getElementById("create-account-popup");
  createAccountPopup.style.display = "block";
}


function hideCreateAccountPopup() {
  const createAccountPopup = document.getElementById("create-account-popup");
  createAccountPopup.style.display = "none";
}


document.getElementById("login-button").addEventListener("click", showLoginPopup);
document.getElementById("create-account-button").addEventListener("click", showCreateAccountPopup);
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  hideLoginPopup();
});
document.getElementById("create-account-form").addEventListener("submit", function(event) {
  event.preventDefault();
  hideCreateAccountPopup();
});
document.getElementById("login-popup").addEventListener("click", function(event) {
  if (event.target === this) {
    hideLoginPopup();
  }
});
document.getElementById("create-account-popup").addEventListener("click", function(event) {
  if (event.target === this) {
    hideCreateAccountPopup();
  }
});
