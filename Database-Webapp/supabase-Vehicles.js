import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://enquhjspcnuohnqvnkag.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVucXVoanNwY251b2hucXZua2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg2NzUsImV4cCI6MjA2MDE1NDY3NX0.qF69sWGgZ4Km7wvJsT32wynC4j5TK35Pu-2ZyEXHvZQ');

document.getElementById('vehicleForm').addEventListener('submit', async (e) => {e.preventDefault();
    const rego = document.getElementById('rego').value.trim().toUpperCase();
    console.log("Searching for rego:", rego); 
    const message = document.getElementById('message');
    const results = document.getElementById('results');
    results.innerHTML = '';
    message.textContent = '';

    /*If search box is empty */
    if (!rego) {
        message.textContent = 'Error';
        return;
    }

    const {data, error} = await supabase
        .from('Vehicles')
        .select('*')
        .eq('VehicleID', rego);

    if (error) {
        console.error("Supabase error:", error);
        message.textContent = 'Error';
        return;
    }

    /* search returns nothing */
    if (!data || data.length === 0) {
        message.textContent = 'No result found';
        return;
    }

    message.textContent = 'Search successful';

    data.forEach(vehicle => {
        const box = document.createElement('div');
        box.className = 'result-box';
        box.innerHTML = `
            <p><strong>vehicleid:</strong> ${vehicle.VehicleID}</p>
            <p><strong>make:</strong> ${vehicle.Make}</p>
            <p><strong>model:</strong> ${vehicle.Model}</p>
            <p><strong>colour:</strong> ${vehicle.Colour}</p>
            <p><strong>ownerid:</strong> ${vehicle.OwnerID}</p>
        `;
        results.appendChild(box);
  });
});
