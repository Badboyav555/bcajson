// js/admin.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const supabase = createClient('https://xyzcompany.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MjEyMywiZXhwIjoxOTMxNzM4MTIzfQ.placeholder-key');

document.querySelectorAll('.sidebar a').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelectorAll('.sidebar a').forEach(l=>l.classList.remove('active'));
    e.target.classList.add('active');
    const section = e.target.dataset.section;
    document.getElementById('leadsSection').style.display = section==='leads'?'block':'none';
    document.getElementById('generateSection').style.display = section==='generate'?'block':'none';
  });
});
async function loadLeads(){
  const { data, error } = await supabase.from('leads').select('*').order('created_at', {ascending:false});
  if(data){
    document.getElementById('totalLeads').textContent = data.length;
    const tbody = document.querySelector('#leadsTable tbody');
    tbody.innerHTML = data.map(lead=>`<tr><td>${lead.name}</td><td>${lead.mobile}</td><td>${lead.note_title}</td><td>${new Date(lead.created_at).toLocaleDateString()}</td><td><button onclick="navigator.clipboard.writeText('${lead.mobile}')">📋</button></td></tr>`).join('');
  }
}
loadLeads();
document.getElementById('exportCSV').addEventListener('click', async ()=>{
  const { data } = await supabase.from('leads').select('*');
  const csv = data.map(d=>`${d.name},${d.mobile},${d.note_title}`).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='leads.csv'; a.click();
});
