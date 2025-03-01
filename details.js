document.addEventListener('DOMContentLoaded', () => {
    const detailsContent = document.querySelector('.details__content');
    const backButton = document.querySelector('.details__back');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then(response => response.json())
            .then(data => {
                detailsContent.innerHTML = `
                    <img src="${data.url}" alt="${data.title}">
                    <h3>${data.title}</h3>
                    <p>Album ID: ${data.albumId}</p>
                    <p>ID: ${data.id}</p>
                `;
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    backButton.addEventListener('click', () => {
        window.history.back();
    });
});