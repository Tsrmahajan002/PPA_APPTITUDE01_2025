window.addEventListener('load', function() {
    const student = JSON.parse(localStorage.getItem('currentStudent'));
    
    if (!student) {
        alert('No student data found. Redirecting to login.');
        window.location.href = 'index.html';
        return;
    }
    
    // Display student info
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('studentSeat').textContent = student.seat_no;
    
    // Display total marks
    document.getElementById('totalMarks').textContent = student.total === 0 && student.c_sharp === 'AB' ? 'Absent' : student.total;
    
    // Subjects array
    const subjects = [
        { key: 'c_sharp', label: 'C#' },
        { key: 'asp_net', label: 'ASP.NET' },
        { key: 'dsa', label: 'DSA' },
        { key: 'sql', label: 'SQL' },
        { key: 'os', label: 'OS' },
        { key: 'ms_azure', label: 'MS AZURE' }
    ];
    
    // Generate cards
    const cardsContainer = document.getElementById('subjectCards');
    subjects.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'col-md-4 col-sm-6 mb-3';
        card.innerHTML = `
            <div class="card shadow text-center">
                <div class="card-body">
                    <h5 class="card-title">${sub.label}</h5>
                    <h3>${student[sub.key] === 'AB' ? 'Absent' : student[sub.key]}</h3>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
    
    // Chart: Bar chart for subject marks
    const ctx = document.getElementById('marksChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects.map(sub => sub.label),
            datasets: [{
                label: 'Marks',
                data: subjects.map(sub => student[sub.key] === 'AB' ? 0 : student[sub.key]),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10 // Set max to 10 based on observed data
                }
            }
        }
    });
});