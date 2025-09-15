/**
 * World Digital Clock Application
 * Displays current time in multiple time zones with real-time updates
 */

class WorldClock {
    constructor() {
        this.is24HourFormat = false;
        this.updateInterval = null;
        this.timezones = {
            UTC: { offset: 0, name: 'Coordinated Universal Time' },
            EST: { offset: -5, name: 'Eastern Standard Time', dst: true },
            PST: { offset: -8, name: 'Pacific Standard Time', dst: true },
            GMT: { offset: 0, name: 'Greenwich Mean Time' },
            JST: { offset: 9, name: 'Japan Standard Time' },
            CET: { offset: 1, name: 'Central European Time', dst: true }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startClock();
        console.log('World Clock initialized');
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('format-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTimeFormat());
        }
    }

    toggleTimeFormat() {
        this.is24HourFormat = !this.is24HourFormat;
        const toggleBtn = document.getElementById('format-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = this.is24HourFormat ? 'Switch to 12H' : 'Switch to 24H';
        }
        this.updateAllClocks();
    }

    isDaylightSaving(date) {
        // Simple DST check for US/EU (March to November roughly)
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // DST typically runs from March to November in Northern Hemisphere
        return month >= 2 && month <= 10;
    }

    getTimezoneOffset(timezone, currentDate) {
        const tz = this.timezones[timezone];
        if (!tz) return 0;

        let offset = tz.offset;
        
        // Adjust for Daylight Saving Time if applicable
        if (tz.dst && this.isDaylightSaving(currentDate)) {
            offset += 1; // Add 1 hour for DST
        }
        
        return offset;
    }

    formatTime(date, is24Hour = false) {
        try {
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            
            let ampm = '';
            
            if (!is24Hour) {
                ampm = hours >= 12 ? ' PM' : ' AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // Convert 0 to 12
            }
            
            const hoursStr = hours.toString().padStart(2, '0');
            const minutesStr = minutes.toString().padStart(2, '0');
            const secondsStr = seconds.toString().padStart(2, '0');
            
            return `${hoursStr}:${minutesStr}:${secondsStr}${ampm}`;
        } catch (error) {
            console.error('Error formatting time:', error);
            return '--:--:--';
        }
    }

    formatDate(date) {
        try {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            
            return `${year}/${month}/${day}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return '----/--/--';
        }
    }

    getTimeForTimezone(timezone) {
        try {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const offset = this.getTimezoneOffset(timezone, now);
            const timezoneTime = new Date(utc + (offset * 3600000));
            
            return timezoneTime;
        } catch (error) {
            console.error(`Error calculating time for ${timezone}:`, error);
            return new Date(); // Fallback to local time
        }
    }

    updateClock(timezone) {
        try {
            const time = this.getTimeForTimezone(timezone);
            const timeString = this.formatTime(time, this.is24HourFormat);
            const dateString = this.formatDate(time);
            
            const timeElement = document.getElementById(`time-${timezone}`);
            const dateElement = document.getElementById(`date-${timezone}`);
            
            if (timeElement) {
                timeElement.textContent = timeString;
                timeElement.classList.remove('loading');
            }
            
            if (dateElement) {
                dateElement.textContent = dateString;
            }
        } catch (error) {
            console.error(`Error updating clock for ${timezone}:`, error);
            
            // Display error state
            const timeElement = document.getElementById(`time-${timezone}`);
            if (timeElement) {
                timeElement.textContent = 'ERROR';
                timeElement.style.color = '#ff4444';
            }
        }
    }

    updateAllClocks() {
        Object.keys(this.timezones).forEach(timezone => {
            this.updateClock(timezone);
        });
        
        // Update last updated timestamp
        this.updateLastUpdated();
    }

    updateLastUpdated() {
        const lastUpdateElement = document.getElementById('last-update');
        if (lastUpdateElement) {
            const now = new Date();
            const timeString = this.formatTime(now, this.is24HourFormat);
            lastUpdateElement.textContent = timeString;
        }
    }

    startClock() {
        // Initial update
        this.updateAllClocks();
        
        // Set up interval for real-time updates (every second)
        this.updateInterval = setInterval(() => {
            this.updateAllClocks();
        }, 1000);
        
        console.log('Clock started with 1-second interval');
    }

    stopClock() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('Clock stopped');
        }
    }

    // Utility method to handle page visibility changes
    handleVisibilityChange() {
        if (document.hidden) {
            this.stopClock();
        } else {
            this.startClock();
        }
    }
}

// Error handling for initialization
function initializeWorldClock() {
    try {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.worldClock = new WorldClock();
            });
        } else {
            window.worldClock = new WorldClock();
        }
        
        // Handle page visibility changes to optimize performance
        document.addEventListener('visibilitychange', () => {
            if (window.worldClock) {
                window.worldClock.handleVisibilityChange();
            }
        });
        
        // Handle page unload
        window.addEventListener('beforeunload', () => {
            if (window.worldClock) {
                window.worldClock.stopClock();
            }
        });
        
    } catch (error) {
        console.error('Failed to initialize World Clock:', error);
        
        // Display error message to user
        const container = document.querySelector('.container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                background: rgba(255, 68, 68, 0.1);
                border: 1px solid rgba(255, 68, 68, 0.3);
                color: #ff4444;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                margin: 20px 0;
            `;
            errorDiv.innerHTML = `
                <h3>⚠️ Clock Initialization Error</h3>
                <p>There was an error starting the world clock. Please refresh the page.</p>
                <p><small>Error: ${error.message}</small></p>
            `;
            container.insertBefore(errorDiv, container.firstChild);
        }
    }
}

// Initialize the application
initializeWorldClock();

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WorldClock };
}