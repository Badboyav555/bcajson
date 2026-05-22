// js/semester.js
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
fetch('../data/semesters.json').then(r=>r.json()).then(semesters=>{
  const sem = semesters.find(s=>s.id == id);
  document.getElementById('semTitle').textContent = sem?.name || 'Semester';
});
fetch('../data/subjects.json').then(r=>r.json()).then(subjects=>{
  const filtered = subjects.filter(s=>s.semester_id == id);
  document.getElementById('subjectGrid').innerHTML = filtered.map(s=>`
    <a href="subject.html?id=${s.id}" class="card"><h3>${s.name}</h3><span class="badge">${s.code||''}</span></a>
  `).join('');
});
