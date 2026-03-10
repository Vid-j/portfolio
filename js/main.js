// JavaScript for interactive features of the portfolio website

// Smooth scroll for in-page navigation links
document.addEventListener('DOMContentLoaded', () => {
    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href')?.substring(1);
            const targetEl = targetId ? document.getElementById(targetId) : null;
            if (targetEl) {
                event.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Function to show a specific project page (used on projects page)
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