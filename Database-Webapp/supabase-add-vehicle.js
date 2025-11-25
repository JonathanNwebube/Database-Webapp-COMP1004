import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://enquhjspcnuohnqvnkag.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVucXVoanNwY251b2hucXZua2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg2NzUsImV4cCI6MjA2MDE1NDY3NX0.qF69sWGgZ4Km7wvJsT32wynC4j5TK35Pu-2ZyEXHvZQ');

if (window.location.pathname.includes("add-vehicle.html")) {
    const vehicleForm = document.getElementById("vehicle-form");
    if (vehicleForm) {
        vehicleForm.style.display = "block";
    }
}

let selectedOwnerId = null;

const ownerInput = document.getElementById('owner');
const checkOwnerBtn = document.getElementById('checkOwner');
const ownerForm  = document.getElementById('ownerForm');
const ownerResultsDiv = document.getElementById('owner-results');
const newOwnerBtn = document.getElementById('newOwner');

const newOwnerForm = document.getElementById('new-owner-form');
const addOwnerBtn = document.getElementById('addOwner');
const messageOwnerDiv = document.getElementById('message-owner');

const vehicleForm = document.getElementById('vehicle-form');
const regoInput = document.getElementById('rego');
const makeInput = document.getElementById('make');
const modelInput = document.getElementById('model');
const colourInput = document.getElementById('colour');
const addVehicleBtn = document.getElementById('addVehicle');
const messageVehicleDiv = document.getElementById('message-vehicle');


ownerInput.addEventListener('input', () => {
  checkOwnerBtn.disabled = ownerInput.value.trim() === '';
  messageOwnerDiv.textContent = '';
});


ownerForm.addEventListener('submit', async e => {e.preventDefault();
    ownerResultsDiv.innerHTML = '';
    messageOwnerDiv.textContent = '';
    selectedOwnerId = null;

    const name = ownerInput.value.trim();
    try {
        const { data, error } = await supabase
            .from('People')
            .select('*')
            .ilike('Name', `%${name}%`);

        if (error) throw error;

        if (data.length) {
            data.forEach(person => {
                const box = document.createElement('div');
                box.className = 'result-box';
                box.innerHTML = `
                    <p><strong>PersonID:</strong> ${person.PersonID}</p>
                    <p><strong>Name:</strong> ${person.Name}</p>
                    <p><strong>Address:</strong> ${person.Address}</p>
                    <p><strong>DOB:</strong> ${person.DOB}</p>
                    <p><strong>LicenseNumber:</strong> ${person.LicenseNumber}</p>
                    <p><strong>ExpiryDate:</strong> ${person.ExpiryDate}</p>
                    <button class="select-owner" data-id="${person.PersonID}">Select owner</button>
                `;
                ownerResultsDiv.appendChild(box);
            });
        } 
        else {
            ownerResultsDiv.innerHTML = '<p>No results found</p>';
        }
        newOwnerBtn.style.display = 'inline';
    } 
    catch (_) {
        ownerResultsDiv.innerHTML = '<p>Error</p>';
        newOwnerBtn.style.display = 'inline';
    }
});


ownerResultsDiv.addEventListener('click', e => {
    if (e.target.matches('.select-owner')) {
        selectedOwnerId = e.target.dataset.id;
        vehicleForm.style.display = 'block';
        ownerForm   .style.display = 'none';
        ownerResultsDiv.style.display = 'none';
        newOwnerBtn .style.display = 'none';
    }
});

newOwnerBtn.addEventListener('click', () => {
    newOwnerForm.style.display = 'block';
    ownerResultsDiv.style.display = 'none';
    checkOwnerBtn.disabled = true;
    newOwnerBtn.disabled  = true;
});

addOwnerBtn.addEventListener('click', async () => {
    messageOwnerDiv.textContent = '';
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const license = document.getElementById('license').value.trim();
    const expire = document.getElementById('expire').value.trim();

    if (!name || !address || !dob || !license || !expire) {
        messageOwnerDiv.textContent = 'Error';
        return;
    }

    try {
        const { data: exists, error: e2 } = await supabase
            .from('People')
            .select('*')
            .eq('Name', name)
            .eq('Address', address)
            .eq('DOB', dob)
            .eq('LicenseNumber', license)
            .eq('ExpiryDate', expire);

        if (e2) throw e2;
        if (exists.length) {
            messageOwnerDiv.textContent = 'Error';
            return;
        }   

        const { data: inserted, error: e3 } = await supabase
            .from('People')
            .insert([{ Name: name, Address: address, DOB: dob, LicenseNumber: license, ExpiryDate: expire }])
            .select();

        if (e3) throw e3;
        selectedOwnerId = inserted[0].PersonID;
        messageOwnerDiv.textContent = 'Owner added successfully';
        vehicleForm.style.display     = 'block';
        newOwnerForm.style.display    = 'none';
        ownerForm.style.display       = 'none';
        newOwnerBtn.style.display     = 'none';
    } 
    catch (err) {
        console.error(err);
        messageOwnerDiv.textContent = `Error:${err.message}`;
    }
});


addVehicleBtn.addEventListener('click', async () => {
    messageVehicleDiv.textContent = '';
    const rego = regoInput.value.trim().toUpperCase();
    const make = makeInput.value.trim();
    const model = modelInput.value.trim();
    const colour = colourInput.value.trim();

    if (!rego || !make || !model || !colour || !selectedOwnerId) {
        messageVehicleDiv.textContent = 'Error';
        return;
    }

    try {
        const { error } = await supabase
            .from('Vehicles')
            .insert([{ VehicleID: rego, Make: make, Model: model, Colour: colour, OwnerID: selectedOwnerId }]);

        if (error) throw error;
            messageVehicleDiv.textContent = 'Vehicle added successfully';
    } 
    catch (_) {
        messageVehicleDiv.textContent = 'Error';
    }
});
