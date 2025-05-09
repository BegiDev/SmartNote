document.getElementById('saveNote').addEventListener('click', () => {
    const noteText = document.getElementById('noteText').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
  
    if (noteText) {
      chrome.runtime.sendMessage({
        action: 'saveNote',
        note: {
          text: noteText,
          tags: tags,
          url: '',
          timestamp: new Date().toISOString()
        }
      });
      document.getElementById('noteText').value = '';
      document.getElementById('tags').value = '';
      alert('Eslatma saqlandi!');
    } else {
      alert('Iltimos, eslatma matnini kiriting.');
    }
  });
  
  document.getElementById('viewNotes').addEventListener('click', () => {
    chrome.tabs.create({ url: 'notes.html' });
  });