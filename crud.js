document.addEventListener('DOMContentLoaded', () => {
    const addCourseForm = document.getElementById('addCourseForm');
    const courseSearch = document.getElementById('courseSearch');
    const courseList = document.getElementById('courseList');
  
    // Function to fetch and display courses
    const fetchCourses = async () => {
      try {
        const response = await fetch('/courses');
        const courses = await response.json();
  
        // Clear existing course list
        courseList.innerHTML = '';
  
        // Populate table with courses
        courses.forEach(course => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.desc}</td>
            <td>
              <button class="editButton" data-id="${course._id}">Edit</button>
              <button class="deleteButton" data-id="${course._id}">Delete</button>
            </td>
          `;
          courseList.appendChild(row);
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    // Fetch and display courses when the page loads
    fetchCourses();
  
    // Add event listener for submitting the course form
    addCourseForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(addCourseForm);
      const name = formData.get('name');
      const desc = formData.get('desc');
  
      try {
        const response = await fetch('/courses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, desc })
        });
  
        if (response.ok) {
          // Refresh course list after adding a new course
          fetchCourses();
          addCourseForm.reset();
        } else {
          console.error('Failed to add course:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding course:', error);
      }
    });
  
    // Add event listener for searching courses
    courseSearch.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const searchName = document.getElementById('searchName').value;
      const searchID = document.getElementById('searchID').value;
  
      try {
        const response = await fetch(`/courses?name=${searchName}&id=${searchID}`);
        const courses = await response.json();
  
        // Clear existing course list
        courseList.innerHTML = '';
  
        // Populate table with searched courses
        courses.forEach(course => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.desc}</td>
            <td>
              <button class="editButton" data-id="${course._id}">Edit</button>
              <button class="deleteButton" data-id="${course._id}">Delete</button>
            </td>
          `;
          courseList.appendChild(row);
        });
      } catch (error) {
        console.error('Error searching courses:', error);
      }
    });
  
    // Event delegation for edit and delete buttons
    courseList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('editButton')) {
        const courseId = event.target.dataset.id;
        // Redirect to edit page or open a modal for editing
        console.log('Edit course:', courseId);
      }
  
      if (event.target.classList.contains('deleteButton')) {
        const courseId = event.target.dataset.id;
        if (confirm('Are you sure you want to delete this course?')) {
          try {
            const response = await fetch(`/courses/${courseId}`, {
              method: 'DELETE'
            });
  
            if (response.ok) {
              // Refresh course list after deleting a course
              fetchCourses();
            } else {
              console.error('Failed to delete course:', response.statusText);
            }
          } catch (error) {
            console.error('Error deleting course:', error);
          }
        }
      }
    });
  });
  