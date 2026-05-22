// js/notes.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const supabase = createClient('https://xyzcompany.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MjEyMywiZXhwIjoxOTMxNzM4MTIzfQ.placeholder-key');

const params = new URLSearchParams(window.location.search);
const noteId = params.get('id');
let noteData = null;
fetch('../data/notes.json').then(r=>r.json()).then(notes=>{
  noteData = notes.find(n=>n.id == noteId);
  const fullContent = noteData?.content || 'Note content';
  const previewLength = Math.floor(fullContent.length * 0.3);
  document.getElementById('noteContent').innerHTML = fullContent.substring(0, previewLength);
  if(localStorage.getItem(`unlocked_${noteId}`)) {
    document.getElementById('noteContent').innerHTML = fullContent;
  } else {
    document.getElementById('premiumLock').style.display = 'block';
    document.getElementById('noteContent').classList.add('blur-content');
  }
});
document.getElementById('unlockBtn').addEventListener('click', async ()=>{
  const name = document.getElementById('leadName').value;
  const mobile = document.getElementById('leadMobile').value;
  if(!name || !mobile) return alert('Enter details');
  const { error } = await supabase.from('leads').insert([{ name, mobile, note_id: noteId, note_title: noteData?.title }]);
  if(!error) {
    localStorage.setItem(`unlocked_${noteId}`, 'true');
    document.getElementById('noteContent').classList.remove('blur-content');
    document.getElementById('noteContent').innerHTML = noteData?.content;
    document.getElementById('premiumLock').style.display = 'none';
  }
});
window.addEventListener('scroll', ()=>{
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  document.getElementById('progressBar').style.width = (scrollTop/docHeight)*100 + '%';
});
