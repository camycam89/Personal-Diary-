document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entryForm');
    const entriesDiv = document.getElementById('entries');

    entryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const text = document.getElementById('text').value;
        const category = document.getElementById('category').value;

        const response = await fetch('/api/diary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, text, category }),
        });

        if (response.ok) {
            loadEntries();
            entryForm.reset();
        } else {
            console.error('Error saving entry');
        }
    });

    async function loadEntries() {
        const response = await fetch('/api/diary');
        const entries = await response.json();
        entriesDiv.innerHTML = entries.map(entry => `
            <div class="entry">
                <div class="date">${new Date(entry.date).toLocaleString()}</div>
                <div class="text">${entry.text}</div>
                <div class="category">${entry.category}</div>
            </div>
        `).join('');
    }

    loadEntries();
});
