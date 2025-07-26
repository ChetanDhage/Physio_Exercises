// auth.js - Central authentication handling for all pages

// Check if user is logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    setupLogoutHandlers();
});

// Update UI based on authentication state
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (currentUser.loggedIn) {
        // User is logged in - show profile, hide auth buttons
        
        // Update mobile menu
        const mobileAuthButtons = document.getElementById('mobile-auth-buttons') || 
                                document.getElementById('mobile-auth-section');
        const mobileUserProfile = document.getElementById('mobile-user-profile') || 
                                document.getElementById('mobile-profile-section');
        
        if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');
        if (mobileUserProfile) {
            mobileUserProfile.classList.remove('hidden');
            
            // Update user info in mobile menu
            const mobileUserName = document.getElementById('mobile-user-name');
            const mobileUserRole = document.getElementById('mobile-user-role');
            const mobileUserInitial = document.getElementById('mobile-user-initial');
            
            if (mobileUserName) {
                mobileUserName.textContent = currentUser.firstName ? 
                    `${currentUser.firstName} ${currentUser.lastName}` : 
                    currentUser.name || currentUser.email.split('@')[0];
            }
            
            if (mobileUserRole) {
                mobileUserRole.textContent = currentUser.role || 'User';
            }
            
            if (mobileUserInitial && currentUser.firstName) {
                mobileUserInitial.textContent = currentUser.firstName.charAt(0);
            }
        }
        
        // Update header
        const headerAuthButtons = document.getElementById('header-auth-buttons');
        const headerUserProfile = document.getElementById('header-user-profile');
        
        if (headerAuthButtons) headerAuthButtons.classList.add('hidden');
        if (headerUserProfile) {
            headerUserProfile.classList.remove('hidden');
            
            // Update user info in header
            const headerUserName = document.getElementById('header-user-name');
            if (headerUserName) {
                headerUserName.textContent = currentUser.firstName ? 
                    `${currentUser.firstName} ${currentUser.lastName}` : 
                    currentUser.name || currentUser.email.split('@')[0];
            }
        }
        
        // Set dashboard link based on user role
        const headerDashboardLink = document.getElementById('header-dashboard-link');
        const mobileDashboardLink = document.getElementById('mobile-dashboard-link');
        
        const dashboardUrl = getDashboardUrl(currentUser.role);
        
        if (headerDashboardLink) headerDashboardLink.href = dashboardUrl;
        if (mobileDashboardLink) mobileDashboardLink.href = dashboardUrl;
    } else {
        // User is not logged in - hide profile, show auth buttons
        
        // Update mobile menu
        const mobileAuthButtons = document.getElementById('mobile-auth-buttons') || 
                                document.getElementById('mobile-auth-section');
        const mobileUserProfile = document.getElementById('mobile-user-profile') || 
                                document.getElementById('mobile-profile-section');
        
        if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
        if (mobileUserProfile) mobileUserProfile.classList.add('hidden');
        
        // Update header
        const headerAuthButtons = document.getElementById('header-auth-buttons');
        const headerUserProfile = document.getElementById('header-user-profile');
        
        if (headerAuthButtons) headerAuthButtons.classList.remove('hidden');
        if (headerUserProfile) headerUserProfile.classList.add('hidden');
    }
}

// Get dashboard URL based on user role
function getDashboardUrl(role) {
    switch(role) {
        case 'patient':
            return 'patient-dashboard.html';
        case 'doctor':
            return 'doctor-dashboard.html';
        case 'admin':
            return 'admin-dashboard.html';
        default:
            return 'index.html';
    }
}

// Setup logout handlers
function setupLogoutHandlers() {
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    const headerLogoutBtn = document.getElementById('header-logout-btn');
    
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }
    
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', handleLogout);
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}