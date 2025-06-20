async function getMagicItems() {
    const limit = 10;

    try {
        // Step 1: Get total count
        const countRes = await fetch('https://api.open5e.com/magicitems/?limit=1');
        const countData = await countRes.json();
        const total = countData.count;

        // Step 2: Pick a random offset
        const randomOffset = Math.floor(Math.random() * (total - limit));
        const res = await fetch(`https://api.open5e.com/magicitems/?limit=${limit}&offset=${randomOffset}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Failed to fetch magic items:', error);
        return [];
    }
}
async function reloadMagicItems() {
    const items = await getMagicItems();
    displayMagicItems(items);
}

function displayMagicItems(items) {
    const container = document.getElementById('magic-items');
    container.innerHTML = ''; // Clear previous items

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'magic-item';
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        container.appendChild(itemDiv);
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    const items = await getMagicItems();
    displayMagicItems(items);
    console.log('Magic items loaded:', items);
});