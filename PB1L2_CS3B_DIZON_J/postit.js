const nameBox = document.getElementById("nameBox");
const postBox = document.getElementById("postBox");
const nameInput = document.getElementById("nameInput");
const userName = document.getElementById("userName");
const caption = document.getElementById("caption");
const thread = document.getElementById("thread");

let name = localStorage.getItem("postitName");
let posts = JSON.parse(localStorage.getItem("postitPosts") || "[]");

function encrypt(name, post, date) {
  return btoa(unescape(encodeURIComponent(JSON.stringify({ name, post, date }))));
}

function showApp() {
  if (name) {
    nameBox.hidden = true;
    postBox.hidden = false;
    userName.textContent = name;
  }
}

function render() {
  thread.innerHTML = "";
  posts.forEach(function (p) {
    const div = document.createElement("div");
    div.className = "post";

    const l1 = document.createElement("p");
    l1.className = "label";
    l1.textContent = "ORIGINAL POST";

    const text = document.createElement("p");
    text.textContent = p.post;

    const l2 = document.createElement("p");
    l2.className = "label";
    l2.textContent = "ENCRYPTED";

    const enc = document.createElement("p");
    enc.className = "encrypted";
    enc.textContent = p.encrypted;

    div.append(l1, text, l2, enc);
    thread.appendChild(div);
  });
}

document.getElementById("nameBtn").onclick = function () {
  const value = nameInput.value.trim();
  if (!value) return alert("Please enter your name.");
  name = value;
  localStorage.setItem("postitName", name);
  showApp();
};

document.getElementById("postBtn").onclick = function () {
  const text = caption.value.trim();
  if (!text) return alert("Write something first.");
  const date = new Date().toLocaleString();
  posts.unshift({ post: text, encrypted: encrypt(name, text, date) });
  localStorage.setItem("postitPosts", JSON.stringify(posts));
  caption.value = "";
  render();
};

showApp();
render();
