// to generate hide/show button for skills

const toggleButton = document.getElementById('toggle-skills') as HTMLButtonElement
const skills = document.getElementById('skills') as HTMLElement


toggleButton.addEventListener('click',()=>{
    if(skills.style.display === 'none'){
        skills.style.display ='block'
    } else {
        skills.style.display = 'none'
    }
});


// Get reference to the form and display area
const form = document.getElementById('resumeform') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as
HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as
HTMLButtonElement;

// handle for submission

form.addEventListener('submit',  (event:Event) =>{
    event.preventDefault();   // prevent page reload


// collect input values

const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
const username = (document.getElementById('username') as
HTMLInputElement).value;
const name = (document.getElementById('name') as HTMLInputElement).value;
const email = (document.getElementById('email') as HTMLInputElement).value;
const phone = (document.getElementById('phone') as HTMLInputElement).value;
const address = (document.getElementById('address') as HTMLInputElement).value;
const education = (document.getElementById('education') as HTMLTextAreaElement).value;
const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;


// Save form data in localStorage with the username as the key
const resumeData = {
    name,
    email,
    phone,
    address,
    education,
    experience,
    skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally






// Picture element
const profilePictureFile = profilePictureInput.files?.[0]
const profilePictureURl = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';


// Generate the resume content dynamically
const resumeOutput = `
<h2><b>Resume</b></h2>
${profilePictureURl ? `<img src=${profilePictureURl} alt="Profile Picture" class="profilePicture">`:''}
<h3><b>Personal Information</b></h3>
<p><b>Name:</b> <span id="edit-name" class="editable">${name}</span></p>
<p><b>Email:</b><span id="edit-email" class="editable">${email}</span></p>
<p><b>Phone:</b><span id="edit-phone" class="editable">${phone}</span></p>
<p><b>Address:</b><span id="edit-address" class="editable">${address}</span></p>

<h3>Education</h3>
<p id="edit-education" class="editable">${education}</p>

<h3>Experience</h3>
<p id="edit-experience" class="editable">${experience}</p>


<h3>Skills</h3>
<p id="edit-skills" class="editable">${skills}</p>
`;

// Display the generated resume
resumeDisplayElement.innerHTML = resumeOutput;
// Generate a shareable URL with the username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); // This will open the print dialog and allow the user to save as PDF

});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (username) {

// Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}
}
});