// Carrega dados dos membros
fetch('data/team.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('teamContainer');
        data.forEach(member => {
            container.innerHTML += `
                <div class="member-card">
                    <img src="${member.photo}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                </div>
            `;
        });
    });

// Carrega dados dos robôs
fetch('data/robots.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('robotsContainer');
        data.forEach(robot => {
            container.innerHTML += `
                <div class="robot-card">
                    <img src="${robot.image}" alt="${robot.name}">
                    <h3>${robot.name}</h3>
                    <p>Ano: ${robot.year}</p>
                </div>
            `;
        });
    });

// Formulário de competições (LocalStorage)
document.getElementById('eventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    
    const event = { name: eventName, date: eventDate };
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    
    updateEventsList();
    e.target.reset();
});

function updateEventsList() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const list = document.getElementById('eventsList');
    list.innerHTML = events.map(event => 
        `<li><strong>${event.name}</strong> - ${new Date(event.date).toLocaleDateString()}</li>`
    ).join('');
}

// Carrega eventos ao iniciar
updateEventsList();