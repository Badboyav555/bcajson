// js/subject.js
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
fetch('../data/subjects.json').then(r=>r.json()).then(subjects=>{
  const sub = subjects.find(s=>s.id == id);
  document.getElementById('subjectTitle').textContent = sub?.name || 'Subject';
});
fetch('../data/units.json').then(r=>r.json()).then(units=>{
  const filtered = units.filter(u=>u.subject_id == id);
  document.getElementById('unitsGrid').innerHTML = filtered.map(u=>`
    <a href="unit.html?id=${u.id}" class="card"><h3>${u.name}</h3><span>Notes: ${u.notes_count||0}</span></a>
  `).join('');
});
