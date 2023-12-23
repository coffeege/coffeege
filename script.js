document.addEventListener('DOMContentLoaded', function() {
    // current hour
    const currentHour = new Date().getHours();

    // greeting
    const greetingElement = document.getElementById('greeting');

    // journal
    const journalSection = document.getElementById('journal');

    // gm or gn 
    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good morning,';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good afternoon,';
    } else {
        greeting = 'Good night,';
    }

    // hey :)
    greetingElement.textContent = `${greeting} it's ${formatTime()}`;

});

function formatTime() {
    // tine format
    const options = { hour: 'numeric', minute: '2-digit' };
    return new Date().toLocaleTimeString([], options);
}

document.addEventListener('DOMContentLoaded', function () {
    displayEntries();
});

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

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('journal')) || [];
    const journalContainer = document.getElementById('journal');
    journalContainer.innerHTML = '';

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


function deleteEntry(index) {

    const entries = JSON.parse(localStorage.getItem('journal')) || [];

    entries.splice(index, 1);

    localStorage.setItem('journal', JSON.stringify(entries));

    displayEntries();
}




