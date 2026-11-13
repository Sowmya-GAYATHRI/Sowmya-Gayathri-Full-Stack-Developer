const searchToggle = document.getElementById("searchToggle");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("portfolioSearch");
const searchResults = document.getElementById("searchResults");

const searchableSections = [
  { title: "About Me", detail: "Profile, introduction and strengths", target: "about", keywords: "about profile introduction fresher adaptability accountability" },
  { title: "Technical Skills", detail: "Python, Java, SQL, HTML, CSS, JavaScript, ML, Django and tools", target: "skills", keywords: "skills python java sql html css javascript machine learning scikit learn django mysql git github excel power bi docker aws" },
  { title: "Task Manager Web Application", detail: "Python, Django, MySQL, HTML, CSS and JavaScript", target: "projects", keywords: "task manager web application python django mysql html css javascript git" },
  { title: "Predicting Student Performance Using Machine Learning", detail: "Python, Pandas, NumPy and Scikit-learn", target: "projects", keywords: "student performance prediction machine learning python pandas numpy scikit learn" },
  { title: "Email Spam Classification System", detail: "Python, Pandas, Scikit-learn and Naive Bayes", target: "projects", keywords: "email spam classification python pandas scikit learn naive bayes" },
  { title: "Education", detail: "B.Tech, Class XII and Class X", target: "education", keywords: "education btech bachelor computer science engineering srm narayana school" },
  { title: "Certifications", detail: "HP AI, HP Data Science and Unstop DSA Bootcamp", target: "education", keywords: "certifications certificate hp ai data science analytics unstop data structures algorithms" },
  { title: "Leadership & Activities", detail: "Community Connect Coordinator – RASS", target: "leadership", keywords: "leadership community coordinator rass activities" },
  { title: "Contact", detail: "Email, GitHub and LinkedIn", target: "contact", keywords: "contact email github linkedin" }
];

function openSearch() {
  searchOverlay.hidden = false;
  searchInput.value = "";
  renderResults("");
  searchInput.focus();
}
function hideSearch() {
  searchOverlay.hidden = true;
  searchToggle.focus();
}
function renderResults(query) {
  const q = query.trim().toLowerCase();
  const matches = q
    ? searchableSections.filter(item => (item.title + " " + item.detail + " " + item.keywords).toLowerCase().includes(q))
    : searchableSections;
  searchResults.innerHTML = "";
  if (!matches.length) {
    searchResults.innerHTML = '<p class="no-results">No matching details found. Try another keyword.</p>';
    return;
  }
  matches.forEach(item => {
    const link = document.createElement("a");
    link.className = "search-result";
    link.href = "#" + item.target;
    const title = document.createElement("strong");
    title.textContent = item.title;
    const detail = document.createElement("small");
    detail.textContent = item.detail;
    link.append(title, detail);
    link.addEventListener("click", hideSearch);
    searchResults.appendChild(link);
  });
}
searchToggle.addEventListener("click", openSearch);
closeSearch.addEventListener("click", hideSearch);
searchInput.addEventListener("input", event => renderResults(event.target.value));
searchOverlay.addEventListener("click", event => {
  if (event.target === searchOverlay) hideSearch();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !searchOverlay.hidden) hideSearch();
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});
