// Get the container where articles will be shown
var articleContainer = document.getElementById("articles");

// Get articles from local storage or return an empty array
function getArticles() {
  var stored = localStorage.getItem("articles");
  if (stored) {
    return JSON.parse(stored);
  } else {
    return [];
  }
}

// Save articles to local storage
function saveArticles(articleList) {
  localStorage.setItem("articles", JSON.stringify(articleList));
}

// Show all the articles on the page
function displayArticles() {
  articleContainer.innerHTML = ""; // Clear existing articles
  var articles = getArticles();

  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];

    var div = document.createElement("div");
    div.className = "article";

    var html = "<h3>" + article.title + "</h3>";
    html += "<p>" + article.content + "</p>";

    html += "<div class='comment-input'>" +
            "<input type='text' placeholder='💬 Add a comment and press Enter' " +
            "onkeydown='if(event.key===\"Enter\"){addComment(" + i + ", this.value); this.value=\"\"}'>" +
            "</div>";

    var commentHtml = "";
    for (var j = 0; j < article.comments.length; j++) {
      commentHtml += "<div class='comment'>" + article.comments[j] + "</div>";
    }

    html += "<div>" + commentHtml + "</div>";

    div.innerHTML = html;
    articleContainer.appendChild(div);
  }
}

// Add a new article
function addArticle() {
  var titleInput = document.getElementById("title");
  var contentInput = document.getElementById("content");

  var title = titleInput.value.trim();
  var content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Please fill in both fields.");
    return;
  }

  var articles = getArticles();
  var newArticle = {
    title: title,
    content: content,
    comments: []
  };

  articles.unshift(newArticle); // Add to beginning
  saveArticles(articles);

  // Clear input fields
  titleInput.value = "";
  contentInput.value = "";

  displayArticles();
}

// Add a comment to an article
function addComment(index, comment) {
  if (comment.trim() === "") {
    return;
  }

  var articles = getArticles();
  articles[index].comments.push(comment);
  saveArticles(articles);
  displayArticles();
}

// Show articles when page loads
displayArticles();
