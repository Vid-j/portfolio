// JavaScript for interactive features of the portfolio website

// Toggle the mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close the mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});

// Function to show a specific project page
function showProject(projectId) {
    // Hide the main portfolio content
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('hero').classList.add('hidden'); // Also hide the hero section if needed

    // Show the project details section
    const projectDetailsSection = document.getElementById('project-details');
    projectDetailsSection.classList.remove('hidden');

    // Hide all project detail pages
    const allProjectPages = projectDetailsSection.querySelectorAll('div');
    allProjectPages.forEach(page => {
        page.classList.add('hidden');
    });

    // Show the specific project page
    const selectedProjectPage = document.getElementById(projectId + '-page');
    if (selectedProjectPage) {
        selectedProjectPage.classList.remove('hidden');
    }
    
    window.scrollTo(0, 0); // Scroll to the top of the page
}

// Function to hide project details and show the main portfolio content
function hideProjectDetails() {
    // Hide the project details section
    document.getElementById('project-details').classList.add('hidden');

    // Show the main portfolio content
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('hero').classList.remove('hidden');
}