// Local development
//const API = "http://localhost:5000";

// When deployed, replace this with backend URL 👇
 const API = "https://studentrecoredsystem.vercel.app/";

async function getStudents() {
  const res = await fetch(`${API}/api/students`);
  const data = await res.json();
  const tableBody = document.querySelector('#studentTable tbody');
  tableBody.innerHTML = '';

  data.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input value="${student.name}" id="name-${student._id}"></td>
      <td><input value="${student.email}" id="email-${student._id}"></td>
      <td><input value="${student.course}" id="course-${student._id}"></td>
      <td>
        <button onclick="updateStudent('${student._id}')">Update</button>
        <button onclick="deleteStudent('${student._id}')">Delete</button>
      </td>`;
    tableBody.appendChild(row);
  });
}

async function addStudent() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const course = document.getElementById('course').value;

  if (!name || !email || !course) return alert('Please fill all fields!');

  await fetch(`${API}/api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, course })
  });

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('course').value = '';
  getStudents();
}

async function deleteStudent(id) {
  await fetch(`${API}/api/students/${id}`, { method: 'DELETE' });
  getStudents();
}

async function updateStudent(id) {
  const name = document.getElementById(`name-${id}`).value;
  const email = document.getElementById(`email-${id}`).value;
  const course = document.getElementById(`course-${id}`).value;

  await fetch(`${API}/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, course })
  });

  getStudents();
}

getStudents();
