const articleContainer = document.getElementById("articles");

function getArticles() {
  return JSON.parse(localStorage.getItem("articles") || "[]");
}

function saveArticles(articles) {
  localStorage.setItem("articles", JSON.stringify(articles));
}

function displayArticles() {
  articleContainer.innerHTML = "";
  const articles = getArticles();
  articles.forEach((article, index) => {
    const div = document.createElement("div");
    div.className = "article";
    div.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.content}</p>
      <div class='comment-input'>
        <input type='text' placeholder='💬 Add a comment and press Enter' 
               onkeydown='if(event.key==="Enter"){addComment(${index}, this.value); this.value=""}'>
      </div>
      <div>${article.comments.map(c => `<div class='comment'>${c}</div>`).join("")}</div>
    `;
    articleContainer.appendChild(div);
  });
}

function addArticle() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  if (!title || !content) return alert("Please fill in both fields.");
  const articles = getArticles();
  articles.unshift({ title, content, comments: [] });
  saveArticles(articles);
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  displayArticles();
}

function addComment(index, comment) {
  if (!comment.trim()) return;
  const articles = getArticles();
  articles[index].comments.push(comment);
  saveArticles(articles);
  displayArticles();
}

displayArticles();
