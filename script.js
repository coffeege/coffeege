document.addEventListener('DOMContentLoaded', function () {
    // gm or gn
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

    // what time is it
    greetingElement.textContent = `${greeting} it's ${formatTime()}`;

    // Update age dynamically every 50 milliseconds
    setInterval(() => {
        const ageElement = document.getElementById('age');
        ageElement.textContent = dayjs().diff('1999-06-19', 'year', true).toFixed(10);  
    }, 50);

    // journal entries
    displayEntries();
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme in local storage
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.add(savedTheme);
    themeIcon.src = savedTheme === 'light-mode' ? 'assets/icons8-moon-48.png' : 'assets/icons8-sun-48.png';
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Change the icon based on the theme
    if (body.classList.contains('light-mode')) {
        themeIcon.src = 'assets/icons8-moon-48.png'; 
        localStorage.setItem('theme', 'light-mode');
    } else {
        themeIcon.src = 'assets/icons8-sun-48.png'; // Switch to sun icon for light mode
        localStorage.removeItem('theme');
    }
});



// time formatting
function formatTime() {
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date().toLocaleTimeString([], options);
}

// journal entry
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
    document.getElementById('entry').value = ''; // Clear input field

    displayEntries();
}

// journal
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('journal')) || [];
    const journalContainer = document.getElementById('journal');
    journalContainer.innerHTML = ''; // Clear the existing entries

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

// delete journal
function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('journal')) || [];
    entries.splice(index, 1); // Remove the entry at the specified index

    localStorage.setItem('journal', JSON.stringify(entries)); // Update localStorage
    displayEntries(); // Refresh the displayed entries
}





