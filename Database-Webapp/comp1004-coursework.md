# COMP1004 Coursework - Jonathan Nwebube - 20554142

## HTML - Additional Work Done

- All three required HTML pages are implemented:
    - `People.html`
    - `Vehicles.html`
    - `add-vehicle.html`

- Navigation `<ul>` is used correctly within `<header>`, shared across all pages
- Semantic layout is used with `<header>`, `<main>`, `<aside>`, and `<footer>` on all pages
- All pages include a sidebar image:  
  - `People.html`: BusinessMan.png  
  - `Vehicles.html`: Car.png  
  - `add-vehicle.html`: Car2.png  
- Forms are present on each page for querying or updating data

### Accessibility
- 100% Lighthouse accessibility score achieved for all pages
- Shown through `add-vehicle.html` page
    - Screenshot: `AccessibilityCheckOwner.jpg` 

**Accessibility Changes**
- Added `alt` text to all `<img>` elements
    - File: `People.html`, Line 40
    - File: `Vehicles.html`, Line 22
    - File: `add-vehicle.html`, Line 22

- `<labels>` correctly associated with `input` `id's` across all forms
    - File: `People.html`, Lines 24-28
    - File: `Vehicles.html`, Lines 28-29
    - File: `add-vehicle.html`, Lines 27-77

- Increased button size and the form text box size to improve clicking accesibility
    - All `<button>` elements are styled to be at least 48x48px to meet minimum interactive standards
        - File: `styles.css`, Lines 81-87
    - Text size increased for buttons and inputs to imporve readability
        - File: `styles.css`, Lines 89-96

- Used descriptive buttont text for better screen reader navigation
    - "Check owner", "Add vehicle" buttons


## CSS - Additional Work Done

- Single external stylesheet: `styles.css`
- CSS Grid used for layout
    - File: `styles.css`, Lines 6-16

- Flexbox used for horizontal nav links
- File: `styles.css`, Lines 48-54

- Responsive layout implemented using `@media screen and (max-width: 500px)`
- File `styles.css`, Lines 98-141
    - Sidebar moves below main
    - Nav bar becomes vertical
    - Image resizes

### Responsive Screenshot
- Screenshot: `ResponsivePage.jpg`


## JavaScript + Supabase Database

- Supabase client used in all JS files with the correct API key
- No external libraries are used 

- There were issues with my supabase database not auto incremented primary key when adding a new row
    - To fix this issue I manually set up an auto-increment for the IDs

### People Search

File `supabase-People.js`, Lines 14-43

**Validation**
- Search by name or license partial and case-insensitive
- Display "Error" if both fields are empty
- Display "Error" if both fields are filled

### Vehicle Search

File `supabase-Vehicles.js`, Lines 13-33

**Validation**
- Search by plate number case-insensitive
- Display "Error" if field is empty

### Add Vehicle

File `supabase-add-vehicle.js`, Lines 4-9 and 43-77 and 105-143 and 153-169

**Validation**
#### Owner Check Lines 43-77
- Search is partial and case-insensitive
- Displays multiple matches with select button
- Displayes "Error" if nothing is entered

#### Add New Owner Lines 105-143
- Display "Error" if a field is missing
- Display "Error" if duplicate person 

#### Add Vehicle
- Display "Error" if a field is missing


## Playwright Issues

No known issues with Playwright compatibility. All IDs, labels and structure follow spec
Screenshot: `PlaywrightTest.jpg`
