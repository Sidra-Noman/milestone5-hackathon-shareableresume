// to generate hide/show button for skills
var toggleButton = document.getElementById('toggle-skills');
var skills = document.getElementById('skills');
toggleButton.addEventListener('click', function () {
    if (skills.style.display === 'none') {
        skills.style.display = 'block';
    }
    else {
        skills.style.display = 'none';
    }
});
// Get reference to the form and display area
var form = document.getElementById('resumeform');
var resumeDisplayElement = document.getElementById('resumeOutput');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// handle for submission
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault(); // prevent page reload
    // collect input values
    var profilePictureInput = document.getElementById('profilePicture');
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Picture element
    var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var profilePictureURl = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
    // Generate the resume content dynamically
    var resumeOutput = "\n<h2><b>Resume</b></h2>\n".concat(profilePictureURl ? "<img src=".concat(profilePictureURl, " alt=\"Profile Picture\" class=\"profilePicture\">") : '', "\n<h3><b>Personal Information</b></h3>\n<p><b>Name:</b> <span id=\"edit-name\" class=\"editable\">").concat(name, "</span></p>\n<p><b>Email:</b><span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n<p><b>Phone:</b><span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n<p><b>Address:</b><span id=\"edit-address\" class=\"editable\">").concat(address, "</span></p>\n\n<h3>Education</h3>\n<p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n<h3>Experience</h3>\n<p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n\n<h3>Skills</h3>\n<p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeOutput;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value =
                username;
            document.getElementById('name').value =
                resumeData.name;
            document.getElementById('email').value =
                resumeData.email;
            document.getElementById('phone').value =
                resumeData.phone;
            document.getElementById('education').value =
                resumeData.education;
            document.getElementById('experience').value
                = resumeData.experience;
            document.getElementById('skills').value =
                resumeData.skills;
        }
    }
});
