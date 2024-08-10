document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchNews();
});

function fetchNews() {
    const apiKey = 'a8b21a4f2fb7440b841bf2f6cef7ceac'; // Replace with your actual API key
    const apiUrl = `https://newsapi.org/v2/everything?q=natural%20disaster%20AND%20India&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayNews(data.articles))
        .catch(error => {
            console.error('Error fetching news:', error);
            document.getElementById('newsContainer').innerHTML = `<p>Error fetching news: ${error.message}</p>`;
        });
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = ''; // Clear previous news

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news found.</p>';
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const newsLink = document.createElement('a');
        newsLink.href = article.url;
        newsLink.target = '_blank'; // Open link in a new tab

        const newsTitle = document.createElement('h3');
        newsTitle.classList.add('news-title');
        newsTitle.textContent = article.title;

        const newsImage = document.createElement('img');
        newsImage.classList.add('news-image');
        newsImage.src = article.urlToImage || 'placeholder.jpg'; // Fallback image if none is available
        newsImage.alt = article.title;

        const newsDescription = document.createElement('p');
        newsDescription.classList.add('news-description');
        newsDescription.textContent = article.description;

        newsLink.appendChild(newsTitle);
        newsLink.appendChild(newsImage);
        newsLink.appendChild(newsDescription);

        newsItem.appendChild(newsLink);
        newsContainer.appendChild(newsItem);
    });
}
