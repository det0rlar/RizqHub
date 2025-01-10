document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the current user from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Update the panel-title text with the user's name
    const panelTitle = document.querySelector('.panel-title');
    if (currentUser && panelTitle) {
        panelTitle.textContent = currentUser.username;
    }
});

document.querySelector('.panel-sidebar-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    this.parentElement.classList.toggle('active');
});