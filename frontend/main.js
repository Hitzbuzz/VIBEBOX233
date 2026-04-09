const API_BASE = "https://api.vibebox233.com/api";

// Load posts (home & category)
async function loadPosts(containerId, category = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const res = await fetch(`${API_BASE}/posts`);
  let posts = await res.json();

  if (category) {
    posts = posts.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card">
        <img src="${post.image}" alt="${post.title}">
        <div class="card-content">
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="post.html?id=${post._id}">
            <button class="btn">Read More</button>
          </a>
        </div>
      </div>
    `;
  });
}

// Load single post
async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const res = await fetch(`${API_BASE}/posts/${id}`);
  const post = await res.json();

  document.getElementById("post-title").innerText = post.title;
  document.getElementById("post-image").src = post.image;
  document.getElementById("post-date").innerText = post.date;
  document.getElementById("post-body").innerText = post.content;
}

// Newsletter
async function subscribe(email) {
  await fetch(`${API_BASE}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  alert("Subscribed!");
}

// Contact
async function sendMessage(name, email, message) {
  await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  });
  alert("Message sent!");
}

document.addEventListener("DOMContentLoaded", () => {
  // Load posts
  if (document.getElementById("posts")) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    loadPosts("posts", category);
  }

  // Load post page
  loadPost();

  // Newsletter button
  const btn = document.querySelector(".newsletter .btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const email = document.querySelector(".newsletter input").value;
      if (email) subscribe(email);
    });
  }
});