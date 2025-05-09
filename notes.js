document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['notes'], (data) => {
      const notes = data.notes || [];
      displayNotes(notes);
    });
  });
  
  document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    chrome.storage.sync.get(['notes'], (data) => {
      const notes = data.notes || [];
      const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(query) || 
        note.tags.some(tag => tag.toLowerCase().includes(query))
      );
      displayNotes(filteredNotes);
    });
  });
  
  document.getElementById('exportNotes').addEventListener('click', () => {
    chrome.storage.sync.get(['notes'], (data) => {
      const notes = data.notes || [];
      const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smartnote_export.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  });
  
  function displayNotes(notes) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    notes.forEach(note => {
      const li = document.createElement('li');
      li.className = 'note';
      li.innerHTML = `
        <p><strong>Matn:</strong> ${note.text}</p>
        <p><strong>Teglar:</strong> ${note.tags.join(', ') || 'Yo‘q'}</p>
        <p><strong>Manba:</strong> <a href="${note.url}" target="_blank">${note.url || 'Yo‘q'}</a></p>
        <p><strong>Sana:</strong> ${new Date(note.timestamp).toLocaleString()}</p>
      `;
      notesList.appendChild(li);
    });
  }