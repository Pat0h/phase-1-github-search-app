document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value;
      
      // Clear previous search results
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      // Search GitHub for users
      const users = await searchGitHubUsers(searchTerm);
  
      // Display user information
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        listItem.addEventListener('click', () => {
          showUserRepos(user.login);
        });
        userList.appendChild(listItem);
      });
    });
  
    async function searchGitHubUsers(query) {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await response.json();
      return data.items;
    }
  
    async function showUserRepos(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await response.json();
  
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(listItem);
      });
    }
  });
  