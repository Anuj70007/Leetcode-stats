document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-btn");
    const userNameInput = document.getElementById("user-input");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const statsContainer = document.querySelector(".stats-card");
    const catStickerContainer = document.createElement("div"); 
    catStickerContainer.classList.add("cat-sticker");
    statsContainer.appendChild(catStickerContainer);

    function validateUserName(username) {
        if (username.trim() === "") {
            alert("Username shouldn't be empty!");
            return false;
        }
        const regex = /^(?!_)[a-zA-Z0-9_]{4,15}(?<!_)$/;
        if (!regex.test(username)) {
            alert("Invalid Username!");
            return false;
        }
        return true;
    }

    async function fetchUserDetails(username) {
        try {
            const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("User not found");

            const data = await response.json();
            updateUI(data);
        } catch (error) {
            statsContainer.innerHTML = `<p style="color: red;">⚠️ Failed to fetch data. Try again!</p>`;
            catStickerContainer.innerHTML = "<img src='https://raw.githubusercontent.com/Anuj70007/Memes/main/less.png' alt='Error Meme' width='100'>";
        }
    }

    function updateUI(data) {
        easyLabel.textContent = `Easy: ${data.easySolved}/${data.totalEasy}`;
        mediumLabel.textContent = `Medium: ${data.mediumSolved}/${data.totalMedium}`;
        hardLabel.textContent = `Hard: ${data.hardSolved}/${data.totalHard}`;

        statsContainer.innerHTML = `
            <p>✅ Total Problems Solved: ${data.totalSolved}</p>
            <p>📊 Acceptance Rate: ${data.acceptanceRate.toFixed(2)}%</p>
            <p>🏆 Ranking: ${data.ranking}</p>
        `;

        let memeUrl = "";
        if (data.totalSolved > 500) {
            memeUrl = "https://raw.githubusercontent.com/Anuj70007/Memes/main/hard.png";
        } else if (data.totalSolved > 250) {
            memeUrl = "https://raw.githubusercontent.com/Anuj70007/Memes/main/medium.png";
        } else {
            memeUrl = "https://raw.githubusercontent.com/Anuj70007/Memes/main/less.png";
        }

        catStickerContainer.innerHTML = `<img src="${memeUrl}" alt="Meme Sticker" width="150" onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/Anuj70007/Memes/main/less.png'">`;
        statsContainer.appendChild(catStickerContainer);
    }

    searchButton.addEventListener('click', function() {
        const username = userNameInput.value.trim();
        if (validateUserName(username)) {
            fetchUserDetails(username);
        }
    });
});
