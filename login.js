document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const seatNo = document.getElementById('seatNo').value.trim();
    
    try {
        // Fetch student data from JSON file
        const response = await fetch('students.json');
        const students = await response.json();
        
        // Find student by seat no (convert seatNo to number for comparison)
        const student = students.find(s => s.seat_no === parseInt(seatNo));
        
        if (student) {
            // Store student data in localStorage for result page
            localStorage.setItem('currentStudent', JSON.stringify(student));
            // Redirect to result page
            window.location.href = 'result.html';
        } else {
            alert('Invalid Seat No. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching student data:', error);
        alert('An error occurred. Please try again later.');
    }
});