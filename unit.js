// js/unit.js
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
fetch('../data/units.json').then(r=>r.json()).then(units=>{
  const unit = units.find(u=>u.id == id);
  document.getElementById('unitName').textContent = unit?.name || 'Unit';
});
function loadTab(tab){
  const content = document.getElementById('tabContent');
  if(tab==='notes'){
    fetch('../data/notes.json').then(r=>r.json()).then(notes=>{
      const filtered = notes.filter(n=>n.unit_id == id);
      content.innerHTML = filtered.map(n=>`<a href="notes.html?id=${n.id}" class="card">${n.title}</a>`).join('');
    });
  } else if(tab==='pyq'){
    fetch('../data/pyqs.json').then(r=>r.json()).then(pyqs=>{
      const filtered = pyqs.filter(p=>p.unit_id == id);
      content.innerHTML = filtered.map(p=>`<div class="card"><strong>${p.year}</strong> - ${p.question}</div>`).join('');
    });
  } else {
    fetch('../data/important_questions.json').then(r=>r.json()).then(imp=>{
      const filtered = imp.filter(i=>i.unit_id == id);
      content.innerHTML = filtered.map(i=>`<div class="card">${i.question} (${i.category})</div>`).join('');
    });
  }
}
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    loadTab(e.target.dataset.tab);
  });
});
loadTab('notes');
