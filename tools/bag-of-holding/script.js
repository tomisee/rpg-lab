async function getMagicItems() {
    try {
        const res = await fetch('https://api.open5e.com/magicitems/?limit=5');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching magic items:', error);
        return [];
    }
}

function displayMagicItems(items) {
    const container = document.getElementById('magic-items');
    container.innerHTML = ''; // Clear previous items

    items.forEach(item => {
        const div = document.createElement('div');
        const name = document.createElement('h3');
        const desc = document.createElement('p');

        name.textContent = item.name;
        desc.textContent = item.desc || 'No description available.';
        div.appendChild(name);
        div.appendChild(desc);
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const items = await getMagicItems();
    displayMagicItems(items);
});