import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://enquhjspcnuohnqvnkag.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVucXVoanNwY251b2hucXZua2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg2NzUsImV4cCI6MjA2MDE1NDY3NX0.qF69sWGgZ4Km7wvJsT32wynC4j5TK35Pu-2ZyEXHvZQ');

document.getElementById('searchForm').addEventListener('submit', async (e) => {e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const license = document.getElementById('license').value.trim();
    const message = document.getElementById('message');
    const results = document.getElementById('results');

    results.innerHTML = '';
    message.textContent = '';

    if (!name && !license) {
        message.textContent = 'Error';
        return;
    }

    if (name && license) {
        message.textContent = 'Error';
        return;
    }
    
    let query = supabase.from('People').select('*');

    if (name) {
        query = query.ilike('Name', `%${name}%`);
    }
    else if (license) {
        query = query.eq('LicenseNumber', license);
    }

    const {data, error} = await query;

    if (error) {
        console.error("Supabase error: ", error);
        message.textContent = 'Error';
        return;
    }

    if (!data || data.length === 0) {
        message.textContent = 'No results found';
        return;
    }

    message.textContent = 'Search successful';
    results.className = 'results-container';

    data.forEach(person => {
        const box = document.createElement('div');
        box.className = 'result-box';
        box.innerHTML = `
            <p><strong>personid:</strong> ${person.PersonID}</p>
            <p><strong>name:</strong> ${person.Name}</p>
            <p><strong>address:</strong> ${person.Address}</p>
            <p><strong>dob:</strong> ${person.DOB}</p>
            <p><strong>licensenumber:</strong> ${person.LicenseNumber}</p>
            <p><strong>expirydate:</strong> ${person.ExpiryDate}</p>
         `;
        results.appendChild(box);
    });
});
