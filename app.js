let registros = JSON.parse(localStorage.getItem('registros')) || [];

document.getElementById('form-glicemia').addEventListener('submit', function(e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valor').value);
    const fecha = new Date();
    const fechaStr = fecha.toLocaleDateString();
    const horaStr = fecha.toLocaleTimeString();
    let clasificacion = '';
    if (valor < 70) clasificacion = 'bajo';
    else if (valor >= 70 && valor <= 99) clasificacion = 'normal';
    else clasificacion = 'alto';
    registros.push({fecha: fechaStr, hora: horaStr, valor, clasificacion});
    localStorage.setItem('registros', JSON.stringify(registros));
    mostrarRegistros();
    document.getElementById('form-glicemia').reset();
});

function mostrarRegistros(filtro = 'todos') {
    const tbody = document.getElementById('lista-registros');
    tbody.innerHTML = '';
    registros.filter(r => filtro === 'todos' || r.clasificacion === filtro)
    .forEach(r => {
        const tr = document.createElement('tr');
        tr.classList.add(r.clasificacion);
        tr.innerHTML = `<td>${r.fecha}</td><td>${r.hora}</td><td>${r.valor}</td><td>${r.clasificacion}</td>`;
        tbody.appendChild(tr);
    });
}

function filtrar(tipo) {
    mostrarRegistros(tipo);
}

function exportarCSV() {
    let csv = 'Fecha,Hora,Valor,Clasificación\n';
    registros.forEach(r => {
        csv += `${r.fecha},${r.hora},${r.valor},${r.clasificacion}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'glicemia.csv';
    a.click();
}

function respaldarDrive() {
    alert('Función de respaldo a Drive pendiente de configurar con OAuth.');
}

mostrarRegistros();