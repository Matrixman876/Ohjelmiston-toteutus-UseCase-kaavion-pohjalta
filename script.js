// Mock Data Structures
let users = []; // { id, password, role, name }
let voters = []; // { id, name, hasVoted }
let votes = [];  // { voterId, candidate }
let electionClosed = false;
let resultsPublished = false;
let currentUser = null;

// Toggle Login/Register View
document.getElementById('toggleAuth').addEventListener('click', function(e) {
    e.preventDefault();
    const isLogin = document.getElementById('authTitle').textContent === 'Kirjaudu sisään';
    document.getElementById('authTitle').textContent = isLogin ? 'Rekisteröidy' : 'Kirjaudu sisään';
    document.getElementById('authButton').textContent = isLogin ? 'Rekisteröidy' : 'Kirjaudu sisään';
    document.getElementById('passwordField').style.display = isLogin ? 'none' : 'block';
    document.getElementById('nameField').style.display = isLogin ? 'block' : 'none';
    document.getElementById('registerPasswordField').style.display = isLogin ? 'block' : 'none';
    document.getElementById('roleField').style.display = isLogin ? 'block' : 'none';
    document.getElementById('toggleAuth').textContent = isLogin
        ? 'Onko sinulla jo tili? Kirjaudu sisään'
        : 'Eikö sinulla ole tiliä? Rekisteröidy';
    document.getElementById('authForm').reset();
});


document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value.trim();
    const isLogin = document.getElementById('authButton').textContent === 'Kirjaudu sisään';

    if (isLogin) {
        const password = document.getElementById('password').value.trim();
        const user = users.find(u => u.id === userId && u.password === password);
        if (!user) return alert('Virhe: Väärä käyttäjätunnus tai salasana.');
        currentUser = user;
        showDashboard();
    } else {
        const name = document.getElementById('userName').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const role = document.getElementById('userRole').value;
        if (!userId || !name || !password || !role) return alert('Täytä kaikki kentät.');
        if (users.some(u => u.id === userId)) return alert('Käyttäjätunnus on jo käytössä.');
        users.push({ id: userId, password, role, name });
        alert(`Rekisteröinti onnistui käyttäjänä ${name}`);
        document.getElementById('toggleAuth').click(); // Switch to login
    }
    this.reset();
});


function showDashboard() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('voterFunctions').style.display = currentUser.role === 'voter' ? 'block' : 'none';
    document.getElementById('officialFunctions').style.display = currentUser.role === 'official' ? 'block' : 'none';
    document.getElementById('adminFunctions').style.display = currentUser.role === 'admin' ? 'block' : 'none';

    if (currentUser.role === 'voter') {
        document.getElementById('voterIdVote').value = currentUser.id;
    }
}


document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    currentUser = null;
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('authForm').reset();
    document.getElementById('toggleAuth').click(); // Ensure login view
});


document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const voterName = document.getElementById('voterName').value.trim();
    const voterId = document.getElementById('voterId').value.trim();

    if (voters.some(v => v.id === voterId)) return alert('Äänestäjätunnus on jo käytössä.');
    voters.push({ id: voterId, name: voterName, hasVoted: false });
    alert(`Äänestäjä ${voterName} lisätty.`);
    this.reset();
});


document.getElementById('verifyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const voterId = document.getElementById('verifyVoterId').value.trim();
    const voter = voters.find(v => v.id === voterId);

    if (!voter) {
        document.getElementById('verifyResult').innerHTML = '<p class="text-danger">Tunnusta ei löydy.</p>';
    } else {
        document.getElementById('verifyResult').innerHTML = `<p class="text-success">${voter.name} voi äänestää.</p>`;
    }
    this.reset();
});


document.getElementById('voteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const voterId = document.getElementById('voterIdVote').value.trim();
    const candidate = document.getElementById('candidate').value;
    const voter = voters.find(v => v.id === voterId);

    if (!voter) return alert('Virhe: Tunnusta ei löydy.');
    if (voter.hasVoted) return alert('Virhe: Äänestäjä on jo äänestänyt.');
    if (electionClosed) return alert('Virhe: Vaalit ovat sulkeutuneet.');

    voter.hasVoted = true;
    votes.push({ voterId, candidate });
    alert('Ääni tallennettu.');
    this.reset();
});


document.getElementById('tallyBtn').addEventListener('click', function() {
    if (!electionClosed) return alert('Vaalit ovat vielä auki.');
    const tally = votes.reduce((acc, vote) => {
        acc[vote.candidate] = (acc[vote.candidate] || 0) + 1;
        return acc;
    }, {});
    document.getElementById('tallyResults').innerHTML = Object.entries(tally)
        .map(([name, count]) => `<li>${name}: ${count}</li>`)
        .join('');
    resultsPublished = true;
});


document.getElementById('viewResultsBtn').addEventListener('click', function() {
    if (!resultsPublished) return alert('Tulokset eivät ole julkaistu.');
    const tally = votes.reduce((acc, vote) => {
        acc[vote.candidate] = (acc[vote.candidate] || 0) + 1;
        return acc;
    }, {});
    document.getElementById('resultsDisplay').innerHTML = Object.entries(tally)
        .map(([name, count]) => `<li>${name}: ${count}</li>`)
        .join('');
});


setTimeout(() => {
    electionClosed = true;
    alert('Vaalit on nyt suljettu (demo).');
}, 300000); // 5 minute
