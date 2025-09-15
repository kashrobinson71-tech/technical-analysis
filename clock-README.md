# World Digital Clock

A beautiful, responsive web application that displays current time in multiple time zones with real-time updates.

## Features

✨ **Multiple Time Zones**: Displays time for 6 major time zones:
- UTC (Coordinated Universal Time)
- EST/EDT (Eastern Time)
- PST/PDT (Pacific Time)
- GMT (Greenwich Mean Time)
- JST (Japan Standard Time)
- CET/CEST (Central European Time)

⏰ **Real-time Updates**: Updates every second to show live time

🎨 **Clean Digital Interface**: Modern design with digital-style typography and elegant glass-morphism effects

🔄 **12/24 Hour Format Toggle**: Switch between 12-hour and 24-hour time formats

📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

🛡️ **Error Handling**: Robust error handling for timezone calculations and edge cases

## Usage

1. **Open the Application**: Open `index.html` in any modern web browser
2. **View Multiple Time Zones**: All time zones are displayed simultaneously
3. **Toggle Time Format**: Click the "Switch to 24H" / "Switch to 12H" button to change format
4. **Responsive Experience**: The layout automatically adapts to your screen size

## Technical Implementation

### Files Structure
```
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and responsive design
└── script.js       # JavaScript functionality and timezone logic
```

### Key Technologies
- **HTML5**: Semantic structure with accessibility considerations
- **CSS3**: Modern styling with CSS Grid, Flexbox, and glass-morphism effects
- **JavaScript ES6+**: Class-based architecture with proper error handling

### Time Zone Handling
- Uses JavaScript `Date` object for time calculations
- Implements proper UTC offset calculations
- Includes Daylight Saving Time (DST) detection
- Handles timezone edge cases with fallback mechanisms

### Performance Optimizations
- Efficient update intervals (1 second)
- Page visibility API integration to pause updates when tab is hidden
- Minimal DOM manipulations for smooth performance

## Browser Compatibility

Works in all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Running the Application

### Method 1: Direct File Access
Simply open `index.html` in your web browser.

### Method 2: Local Server (Recommended)
For the best experience, serve the files through a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Customization

### Adding New Time Zones
To add more time zones, modify the `timezones` object in `script.js`:

```javascript
this.timezones = {
    // Existing timezones...
    AEST: { offset: 10, name: 'Australian Eastern Standard Time', dst: true }
};
```

### Styling Customization
The application uses CSS custom properties for easy theming. Main color variables are defined in `styles.css`.

## Screenshots

### Desktop View (12-hour format)
![Desktop 12h](https://github.com/user-attachments/assets/e8fbfaf9-67ed-4401-ac73-ac017d7342f9)

### Desktop View (24-hour format)
![Desktop 24h](https://github.com/user-attachments/assets/220cba24-3bd2-4b9a-b93f-34f614264656)

### Mobile View
![Mobile](https://github.com/user-attachments/assets/473a504e-a5aa-4c89-b671-ffe28b105560)

## License

This project is part of the technical-analysis repository. Please refer to the main repository license.