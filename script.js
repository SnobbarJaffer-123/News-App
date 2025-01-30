
document.addEventListener("DOMContentLoaded", () => {
    // API Configuration
    const API_TOKEN = "5619114bf636463f8008e053d1f47b8c"; // Replace with your API key
    const BASE_URL = "https://newsapi.org/v2/top-headlines";
    const COUNTRY = "us"; // Default country for headlines
  
    // DOM Elements
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const newsContainer = document.getElementById("newsContainer");
    const newsTitle = document.querySelector(".news-section__title");
    
    // DOM Elements for Category Buttons
  const topHeadlinesBtn = document.getElementById("top-headlines-btn");
  const technologyBtn = document.getElementById("technology-btn");
  const sportsBtn = document.getElementById("sports-btn");
  const entertainmentBtn = document.getElementById("entertainment-btn");
  const businessBtn = document.getElementById("business-btn");
  const healthBtn = document.getElementById("health-btn");
  const scienceBtn = document.getElementById("science-btn");
  const politicsBtn = document.getElementById("politics-btn");
  const worldBtn = document.getElementById("world-btn");
  const musicBtn = document.getElementById("music-btn");
  const fashionBtn = document.getElementById("fashion-btn");
  
  // Function to handle active button toggle
  function setActiveButton(activeBtn) {
    const buttons = document.querySelectorAll('.nav__button');
    buttons.forEach(button => {
      button.classList.remove('nav__button--active');
    });
    activeBtn.classList.add('nav__button--active');
  }
  
  // Event Listeners for Category Buttons
  topHeadlinesBtn.addEventListener("click", () => {
    setActiveButton(topHeadlinesBtn);
    fetchNews("top-headlines");
  });
  technologyBtn.addEventListener("click", () => {
    setActiveButton(technologyBtn);
    fetchNews("technology");
  });
  sportsBtn.addEventListener("click", () => {
    setActiveButton(sportsBtn);
    fetchNews("sports");
  });
  entertainmentBtn.addEventListener("click", () => {
    setActiveButton(entertainmentBtn);
    fetchNews("entertainment");
  });
  businessBtn.addEventListener("click", () => {
    setActiveButton(businessBtn);
    fetchNews("business");
  });
  healthBtn.addEventListener("click", () => {
    setActiveButton(healthBtn);
    fetchNews("health");
  });
  scienceBtn.addEventListener("click", () => {
    setActiveButton(scienceBtn);
    fetchNews("science");
  });
  politicsBtn.addEventListener("click", () => {
    setActiveButton(politicsBtn);
    fetchNews("politics");
  });
  worldBtn.addEventListener("click", () => {
    setActiveButton(worldBtn);
    fetchNews("world");
  });
  musicBtn.addEventListener("click", () => {
    setActiveButton(musicBtn);
    fetchNews("music");
  });
  fashionBtn.addEventListener("click", () => {
    setActiveButton(fashionBtn);
    fetchNews("fashion");
  });
  
  
    // Fetch and Display News
    async function fetchNews(query = "", category = "") {
      try {
        // Clear the news container and show a loading placeholder
        newsContainer.innerHTML = `<p class="news-placeholder">Loading news articles...</p>`;
  
        // Construct API URL with parameters
        let url = `${BASE_URL}?country=${COUNTRY}&apiKey=${API_TOKEN}&pageSize=12`;
        if (query) {
          url += `&q=${encodeURIComponent(query)}`;
        }
        if (category) {
          url += `&category=${encodeURIComponent(category)}`;
        }
  
        console.log("Fetching news from:", url); // Log for debugging
  
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
  
        console.log("API Response:", data); // Log for debugging
  
        if (data.status !== "ok") {
          throw new Error(data.message || "Failed to fetch news articles.");
        }
  
        // Update the news section title
        if (query) {
          newsTitle.innerText = `🔍 Results for "${query}"`;
        } else if (category) {
          newsTitle.innerText = `📰 ${category.charAt(0).toUpperCase() + category.slice(1)} News`;
        } else {
          newsTitle.innerText = "🗞️ Latest News";
        }
  
        // Display the articles
        displayNews(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = `<p class="news-placeholder">Failed to load news: ${error.message}</p>`;
      }
    }
  
    // Display News Articles
    function displayNews(articles) {
      if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `<p class="news-placeholder">No news articles found. Try a different search or category.</p>`;
        return;
      }
  
      const newsHTML = articles
        .map((article) => {
          const { urlToImage, title, description, url } = article;
          return `
            <div class="news-card">
              <img 
                src="${urlToImage || "https://via.placeholder.com/300x200?text=No+Image"}" 
                alt="${title || "News Image"}" 
                class="news-card__image" 
              />
              <div class="news-card__content">
                <h3 class="news-card__title">${title || "No Title Available"}</h3>
                <p class="news-card__description">${description || "No description available for this article."}</p>
                <a href="${url}" target="_blank" class="news-card__link">Read More</a>
              </div>
            </div>
          `;
        })
        .join("");
  
      newsContainer.innerHTML = newsHTML;
    }
  
    // Add Event Listeners
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) {
          alert("Please enter a keyword to search for news!");
          return;
        }
        fetchNews(query);
      });
    }
  
    if (topHeadlinesBtn) {
      topHeadlinesBtn.addEventListener("click", () => fetchNews());
    }
  
    if (technologyBtn) {
      technologyBtn.addEventListener("click", () => fetchNews("", "technology"));
    }
  
    if (sportsBtn) {
      sportsBtn.addEventListener("click", () => fetchNews("", "sports"));
    }
  
    if (entertainmentBtn) {
      entertainmentBtn.addEventListener("click", () => fetchNews("", "entertainment"));
    }
  
    // Initial Fetch for Top Headlines
    fetchNews();
  });
  