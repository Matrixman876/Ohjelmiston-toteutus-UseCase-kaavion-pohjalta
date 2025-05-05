// Mock data to simulate system state
let voters = [];
let votes = [];
let electionClosed = false;
let resultsPublished = false;

// Login Form
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const userRole = document.getElementById('userRole').value;
    alert  console.log(userId, userRole);
    alert(`Logged in as ${userRole} with ID ${userId}`);
});

// Register Voter Form
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const voterName = document.getElementById('voterName').value;
    const voterId = document.getElementById('voterId').value;

    // Check for duplicate ID
    if (voters.some(v => v.id === voterId)) {
        alert('Error: Voter ID already registered.');
        return;
    }

    voters.push({ id: voterId, name: voterName, hasVoted: false });
    alert(`Voter ${voterName} registered successfully with ID ${voterId}.`);
    this.reset();
});

// Cast Vote Form
document.getElementById('voteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const voterId = document.getElementById('voterIdVote').value;
    const candidate = document.getElementById('candidate').value;

    // Verify voter eligibility
    const voter = voters.find(v => v.id === voterId);
    if (!voter) {
        alert('Error: Voter ID not found.');
        return;
    }
    if (voter.hasVoted) {
        alert('Error: Voter has already voted.');
        return;
    }
    if (electionClosed) {
        alert('Error: Election is closed.');
        return;
    }

    // Record vote
    voter.hasVoted = true;
    votes.push({ voterId, candidate });
    alert('Vote submitted successfully!');
    this.reset();
});

// Tally Votes
document.getElementById('tallyBtn').addEventListener('click', function() {
    if (!electionClosed) {
        alert('Error: Election is still active.');
        return;
    }

    const tally = votes.reduce((acc, vote) => {
        acc[vote.candidate] = (acc[vote.candidate] || 0) + 1;
        return acc;
    }, {});

    let resultHtml = '<h4>Vote Tally:</h4><ul>';
    for (const [candidate, count] of Object.entries(tally)) {
        resultHtml += `<li>${candidate}: ${count} votes</li>`;
    }
    resultHtml += '</ul>';
    document.getElementById('tallyResults').innerHTML = resultHtml;
    resultsPublished = true;
});

// View Results
document.getElementById('viewResultsBtn').addEventListener('click', function() {
    if (!resultsPublished) {
        alert('Error: Results not yet published.');
        return;
    }

    const tally = votes.reduce((acc, vote) => {
        acc[vote.candidate] = (acc[vote.candidate] || 0) + 1;
        return acc;
    }, {});

    let resultHtml = '<h4>Election Results:</h4><ul>';
    for (const [candidate, count] of Object.entries(tally)) {
        resultHtml += `<li>${candidate}: ${count} votes</li>`;
    }
    resultHtml += '</ul>';
    document.getElementById('resultsDisplay').innerHTML = resultHtml;
});

// Simulate election close for testing
setTimeout(() => {
    electionClosed = true;
    alert('Election is now closed.');
}, 60000); // Close election after 1 minute for demo