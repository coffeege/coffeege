document.addEventListener('DOMContentLoaded', function () {
    // Greeting (gm or gn)
    const currentHour = new Date().getHours();
    const greetingElement = document.getElementById('greeting');
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good morning,';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good afternoon,';
    } else {
        greeting = 'Good night,';
    }

    greetingElement.textContent = `${greeting} it's ${formatTime()}`;

    // Update age dynamically every 50 milliseconds
    setInterval(() => {
        const ageElement = document.getElementById('age');
        ageElement.textContent = dayjs().diff('1999-06-19', 'year', true).toFixed(10);
    }, 50);

    // Select necessary elements
    const navbar = document.querySelector('.navbar');
    const journal = document.querySelector('#journal');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeIcon.src = savedTheme === 'light-mode' ? 'assets/icons8-moon-48.png' : 'assets/icons8-sun-48.png';
    }

    // Theme toggle functionality
    document.getElementById('theme-toggle').addEventListener('click', function () {
        const isLightMode = document.body.classList.toggle('light-mode');
        
        if (isLightMode) {
            // Apply light mode and set icon to moon
            themeIcon.src = 'assets/icons8-moon-48.png';
            localStorage.setItem('theme', 'light-mode');
        } else {
            // Revert to dark mode and set icon to sun
            themeIcon.src = 'assets/icons8-sun-48.png';
            localStorage.removeItem('theme');
        }
    });

    // Konami code activation
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    let konamiIndex = 0;

    document.addEventListener('keydown', function (event) {
        if (event.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateJournalMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateJournalMode() {
        // Show the journal section and the entry form
        document.getElementById("journal").style.display = "block";
        document.getElementById("journal-entry-form").style.display = "block"; // Show the entry form
        document.body.classList.add("journal-mode"); // Apply the journal mode style
        alert("Konami code activated! Journal mode enabled.");

        displayEntries();
    }

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Display journal entries on load (when journal mode is activated)
    displayEntries();
});

// Time formatting function
function formatTime() {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date().toLocaleTimeString([], options);
}

// Journal entry addition function
function addEntry() {
    const entryText = document.getElementById('entry').value;

    if (entryText.trim() === '') {
        alert('Please enter a valid journal entry.');
        return;
    }

    const entry = {
        text: entryText,
        timestamp: new Date().toLocaleString(),
    };

    const entries = JSON.parse(localStorage.getItem('journal')) || [];
    entries.push(entry);

    localStorage.setItem('journal', JSON.stringify(entries));
    document.getElementById('entry').value = '';

    displayEntries();
}

// Display journal entries function
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('journal')) || [];
    const journalContainer = document.getElementById('journal-entries');
    journalContainer.innerHTML = ''; // Clear existing entries

    entries.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.innerHTML = `
            <p>${entry.text}</p>
            <small>${entry.timestamp}</small>
            <button class="submit-button" onclick="deleteEntry(${index})">Delete</button>
        `;
        journalContainer.appendChild(entryElement);
    });
}

// Delete journal entry function
function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('journal')) || [];
    entries.splice(index, 1); // Remove entry at the specified index

    localStorage.setItem('journal', JSON.stringify(entries)); // Update localStorage
    displayEntries(); // Refresh displayed entries
}
