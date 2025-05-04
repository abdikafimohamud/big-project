const apiUrl = 'http://localhost:3000/projects';
const projectsContainer = document.getElementById('projects-container');
const addProjectForm = document.getElementById('add-project-form');


function loadProjects() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(projects => {
      projectsContainer.innerHTML = ''; 
      projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-card');
        projectElement.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">View Project</a>
          <button onclick="deleteProject('${project.id}')">Delete</button>
          <button onclick="editProject('${project.id}')">Edit</button>
        `;
        projectsContainer.appendChild(projectElement);
      });
    })
    .catch(error => console.error('Error loading projects:', error));
}


addProjectForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const newProject = {
    title: document.getElementById('project-title').value,
    link: document.getElementById('project-link').value,
    description: document.getElementById('project-description').value,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProject),
  })
    .then(response => response.json())
    .then(() => {
      loadProjects(); 
      addProjectForm.reset(); 
    })
    .catch(error => console.error('Error adding project:', error));
});


function deleteProject(projectId) {
  fetch(`${apiUrl}/${projectId}`, {
    method: 'DELETE',
  })
    .then(() => {
      loadProjects();
    })
    .catch(error => console.error('Error deleting project:', error));
}


function editProject(projectId) {
  const updatedTitle = prompt('Enter new title:');
  const updatedDescription = prompt('Enter new description:');
  const updatedLink = prompt('Enter new project link:');

  const updatedProject = {
    title: updatedTitle,
    description: updatedDescription,
    link: updatedLink,
  };

  fetch(`${apiUrl}/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProject),
  })
    .then(() => {
      loadProjects(); 
    })
    .catch(error => console.error('Error editing project:', error));
}


loadProjects();
