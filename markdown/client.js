// Código basado en la respuesta de StackOverflow: https://stackoverflow.com/questions/1234567/example
document.addEventListener('DOMContentLoaded', function() {
    loadFileList();
});

function loadFileList() {
    fetch('/files')
        .then(response => response.json())
        .then(files => {
            const fileList = document.getElementById('files');
            fileList.innerHTML = '';
            files.forEach(file => {
                const li = document.createElement('li');
                li.textContent = file;
                li.onclick = () => loadFileContent(file);
                fileList.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar el archivo:', error));
}

function loadFileContent(fileName) {
    fetch(`/file?name=${encodeURIComponent(fileName)}`)
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = data.html;
        })
        .catch(error => console.error('Error al cargar contenido de archivo:', error));
}

function createFile() {
    const fileName = document.getElementById('new-file-name').value;
    const fileContent = document.getElementById('new-file-content').value;

    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName, fileContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadFileList();
            document.getElementById('new-file-name').value = '';
            document.getElementById('new-file-content').value = '';
        } else {
            console.error('Error al crear un archivo:', data.message);
        }
    })
    .catch(error => console.error('Error al crear un archivo:', error));
}
