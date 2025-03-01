document.addEventListener('DOMContentLoaded', () => {
    const galleryList = document.querySelector('.gallery__list');

    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery__item');
                galleryItem.innerHTML = `
                    <img src="${item.thumbnailUrl}" alt="${item.title}">
                    <p>${item.title}</p>
                `;
                galleryItem.addEventListener('click', () => {
                    window.location.href = `details.html?id=${item.id}`;
                });
                galleryList.appendChild(galleryItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});