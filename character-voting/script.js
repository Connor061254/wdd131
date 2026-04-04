// --- Data Structure ---
const heroesData = {
    hero1: {
        title: "The Tall Pirate",
        names: [{ name: "Kael", votes: 8 }, { name: "Bill", votes: 10 }, { name: "Jax", votes: 3 }]
    },
    hero2: {
        title: "The Female Pirate",
        names: [{ name: "Aria", votes: 12 }, { name: "Lyra", votes: 9 }, { name: "Kate", votes: 6 }]
    },
    hero3: {
        title: "The Short Pirate",
        names: [{ name: "Brom", votes: 5 }, { name: "Thorne", votes: 13 }, { name: "Gideon", votes: 2 }]
    }
};

let hasVotedSession = false;

// --- DOM Elements ---
const navHome = document.getElementById('nav-home');
const navLeaderboard = document.getElementById('nav-leaderboard');
const viewHome = document.getElementById('view-home');
const viewLeaderboard = document.getElementById('view-leaderboard');

// --- Navigation Logic ---
navHome.addEventListener('click', () => {
    viewHome.classList.add('active-view');
    viewHome.classList.remove('hidden');
    viewLeaderboard.classList.remove('active-view');
    viewLeaderboard.classList.add('hidden');
    navHome.classList.add('active');
    navLeaderboard.classList.remove('active');
});

navLeaderboard.addEventListener('click', () => {
    viewLeaderboard.classList.add('active-view');
    viewLeaderboard.classList.remove('hidden');
    viewHome.classList.remove('active-view');
    viewHome.classList.add('hidden');
    navLeaderboard.classList.add('active');
    navHome.classList.remove('active');
    renderLeaderboard(); 
});

// --- LOCKOUT FUNCTION ---
function disableAllVoting() {
    hasVotedSession = true;
    
    renderAllVotingOptions(); 
    
    const heroSelect = document.getElementById('hero-select');
    const newNameInput = document.getElementById('new-name');
    const submitBtn = document.getElementById('submit-btn');
    const suggestionBox = document.querySelector('.suggestion-box');

    heroSelect.disabled = true;
    newNameInput.disabled = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Vote Already Cast";
    
    suggestionBox.style.opacity = '0.5';
    suggestionBox.style.pointerEvents = 'none';
}

// --- Render Voting Buttons ---
function renderAllVotingOptions() {
    ['hero1', 'hero2', 'hero3'].forEach(heroId => {
        const container = document.getElementById(`options-${heroId}`);
        container.innerHTML = ''; 
        
        heroesData[heroId].names.forEach((candidate, index) => {
            const btn = document.createElement('button');
            btn.classList.add('btn-vote');
            btn.textContent = candidate.name;
            
            if (hasVotedSession) {
                btn.disabled = true;
            }

            btn.addEventListener('click', (e) => {
                if (hasVotedSession) return;
                
                heroesData[heroId].names[index].votes++;
                
                e.target.classList.add('selected-vote');
                
                disableAllVoting();
                
                e.target.disabled = false; 
                
                document.getElementById('vote-message').classList.remove('hidden');
            });
            
            container.appendChild(btn);
        });
    });
}

document.getElementById('suggestion-form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    if (hasVotedSession) return; 
    
    const heroSelect = document.getElementById('hero-select');
    const newNameInput = document.getElementById('new-name');
    
    const selectedHeroId = heroSelect.value;
    const newName = newNameInput.value.trim();
    
    if (newName !== '' && selectedHeroId !== '') {
        heroesData[selectedHeroId].names.push({ name: newName, votes: 1 });
        
        document.getElementById('suggestion-message').classList.remove('hidden');

        disableAllVoting();
    }
});

// --- Leaderboard Logic ---
function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = ''; 
    
    let allCandidates = [];
    for (const [heroId, heroData] of Object.entries(heroesData)) {
        heroData.names.forEach(candidate => {
            allCandidates.push({
                heroTitle: heroData.title,
                name: candidate.name,
                votes: candidate.votes
            });
        });
    }
    
    allCandidates.sort((a, b) => b.votes - a.votes);
    
    allCandidates.slice(0, 10).forEach((candidate, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${index + 1}</td>
            <td><span class="hero-label">${candidate.heroTitle}</span></td>
            <td><strong>${candidate.name}</strong></td>
            <td>${candidate.votes}</td>
        `;
        tbody.appendChild(row);
    });
}

renderAllVotingOptions();
renderLeaderboard();