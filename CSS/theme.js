// Dark mode functionality
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme);
        
        // Add toggle button to all pages
        this.addToggleButton();
        
        // Add event listeners
        this.addEventListeners();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.updateToggleButton();
    }

    addToggleButton() {
        // Find navigation container
        const nav = document.querySelector('.main-nav');
        if (nav) {
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'theme-toggle';
            toggleBtn.id = 'theme-toggle';
            toggleBtn.innerHTML = `
                <span class="icon">${this.theme === 'light' ? '🌙' : '☀️'}</span>
                <span>${this.theme === 'light' ? 'الوضع المظلم' : 'الوضع المضيء'}</span>
            `;
            
            // Insert before the first nav link
            nav.insertBefore(toggleBtn, nav.firstChild);
        }
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = `
                <span class="icon">${this.theme === 'light' ? '🌙' : '☀️'}</span>
                <span>${this.theme === 'light' ? 'الوضع المظلم' : 'الوضع المضيء'}</span>
            `;
        }
    }

    addEventListeners() {
        // Add click event to toggle button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) {
                this.toggleTheme();
            }
        });

        // Add keyboard shortcut (Ctrl/Cmd + D)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});