// Navbar authentication handler
function updateNavbarAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginLinks = document.querySelectorAll('a[href="../Login/index.html"]');
    
    if (user) {
        // User is logged in - hide login links and show logout
        loginLinks.forEach(link => {
            const listItem = link.parentElement;
            listItem.style.display = 'none';
        });
        
        // Add logout button if not already present
        const nav = document.querySelector('#nav ul');
        if (!document.querySelector('#logout-btn')) {
            const logoutLi = document.createElement('li');
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.textContent = 'LOGOUT';
            logoutLink.id = 'logout-btn';
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                alert('Logged out successfully');
                window.location.reload();
            });
            logoutLi.appendChild(logoutLink);
            nav.appendChild(logoutLi);
        }
    } else {
        // User is not logged in - show login links
        loginLinks.forEach(link => {
            const listItem = link.parentElement;
            listItem.style.display = 'block';
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateNavbarAuth);
