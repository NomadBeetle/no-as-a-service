/**
 * No-as-a-Service — Frontend Logic
 * Handles API calls, typewriter effect, history, stats, and sarcastic UX.
 */

// ============================================================
// Configuration
// ============================================================
const API_BASE_URL = "https://no-as-a-service.onrender.com";
const API_ENDPOINT = `${API_BASE_URL}/no`;

// ============================================================
// DOM Elements
// ============================================================
const noButton = document.getElementById("no-button");
const resultCard = document.getElementById("result-card");
const resultText = document.getElementById("result-text");
const resultSource = document.getElementById("result-source");
const loader = document.getElementById("loader");
const copyBtn = document.getElementById("copy-btn");
const copyText = document.getElementById("copy-text");
const shareBtn = document.getElementById("share-btn");
const historyList = document.getElementById("history-list");
const historyEmpty = document.getElementById("history-empty");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const statCount = document.getElementById("stat-count");
const statCopies = document.getElementById("stat-copies");
const statStreak = document.getElementById("stat-streak");
const copyApiBtn = document.getElementById("copy-api-btn");
const particlesContainer = document.getElementById("particles");

// ============================================================
// State
// ============================================================
let history = [];
let stats = { count: 0, copies: 0, streak: 0 };
let isLoading = false;
let currentReason = "";
let typewriterTimer = null;

// ============================================================
// Sarcastic loading messages
// ============================================================
const loadingMessages = [
    "Consulting the rejection oracle...",
    "Brewing a fresh batch of nope...",
    "Asking the universe for a polite decline...",
    "Generating weaponized refusal...",
    "Loading professional disappointment...",
    "Crafting artisanal rejection...",
    "Summoning the spirit of NO...",
    "Calibrating the excuse generator...",
    "Harvesting organic free-range nopes...",
    "Distilling pure essence of refusal...",
];

// ============================================================
// Initialize
// ============================================================
function init() {
    loadState();
    createParticles();
    bindEvents();
    updateStatsDisplay();
    renderHistory();
}

// ============================================================
// Particles Background
// ============================================================
function createParticles() {
    const count = 20;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${8 + Math.random() * 12}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ============================================================
// Event Bindings
// ============================================================
function bindEvents() {
    noButton.addEventListener("click", handleNoClick);
    copyBtn.addEventListener("click", handleCopy);
    shareBtn.addEventListener("click", handleShare);
    clearHistoryBtn.addEventListener("click", clearHistory);
    copyApiBtn.addEventListener("click", () => {
        copyToClipboard(`curl ${API_ENDPOINT}`);
        copyApiBtn.textContent = "Copied!";
        setTimeout(() => (copyApiBtn.textContent = "Copy"), 2000);
    });
}

// ============================================================
// Main: Fetch Rejection
// ============================================================
async function handleNoClick() {
    if (isLoading) return;

    isLoading = true;
    noButton.classList.add("loading");

    // Clear any ongoing typewriter
    if (typewriterTimer) {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
    }

    // Show loader with random sarcastic message
    const loaderText = loader.querySelector(".loader-text");
    loaderText.textContent =
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    resultCard.classList.add("hidden");
    resultCard.classList.remove("slide-in");
    loader.classList.remove("hidden");

    try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        currentReason = data.reason;

        // Update stats
        stats.count++;
        stats.streak++;
        updateStatsDisplay();

        // Add to history
        addToHistory(currentReason);

        // Show result with typewriter
        loader.classList.add("hidden");
        resultCard.classList.remove("hidden");
        resultCard.classList.add("slide-in");
        resultSource.textContent = `#${stats.count} · via NaaS API`;
        typewriterEffect(currentReason);

        // Screen shake!
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 400);
    } catch (error) {
        console.error("Failed to fetch rejection:", error);
        loader.classList.add("hidden");
        resultCard.classList.remove("hidden");
        resultCard.classList.add("slide-in");
        currentReason =
            "Even the rejection API rejected you. That's impressively meta.";
        resultText.textContent = currentReason;
        resultSource.textContent = "⚠️ API unreachable — fallback sass";
    } finally {
        isLoading = false;
        noButton.classList.remove("loading");
        saveState();
    }
}

// ============================================================
// Typewriter Effect
// ============================================================
function typewriterEffect(text) {
    resultText.innerHTML = "";
    let i = 0;
    const cursor = document.createElement("span");
    cursor.classList.add("typewriter-cursor");

    typewriterTimer = setInterval(() => {
        if (i < text.length) {
            resultText.textContent = text.substring(0, i + 1);
            resultText.appendChild(cursor);
            i++;
        } else {
            clearInterval(typewriterTimer);
            typewriterTimer = null;
            // Remove cursor after a beat
            setTimeout(() => {
                if (cursor.parentNode) cursor.remove();
            }, 2000);
        }
    }, 25);
}

// ============================================================
// Copy & Share
// ============================================================
function handleCopy() {
    if (!currentReason) return;
    copyToClipboard(currentReason);
    copyText.textContent = "Copied!";
    copyBtn.classList.add("copied");
    stats.copies++;
    updateStatsDisplay();
    saveState();
    setTimeout(() => {
        copyText.textContent = "Copy";
        copyBtn.classList.remove("copied");
    }, 2000);
}

function handleShare() {
    if (!currentReason) return;
    const shareText = `"${currentReason}" — via No-as-a-Service 🐰🚫`;

    if (navigator.share) {
        navigator
            .share({
                title: "No-as-a-Service",
                text: shareText,
                url: window.location.href,
            })
            .catch(() => {
                copyToClipboard(shareText);
            });
    } else {
        copyToClipboard(shareText);
        const shareSpan = shareBtn.querySelector("span");
        shareSpan.textContent = "Copied!";
        setTimeout(() => (shareSpan.textContent = "Share"), 2000);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
    });
}

// ============================================================
// History
// ============================================================
function addToHistory(reason) {
    history.unshift(reason);
    if (history.length > 50) history.pop(); // cap
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historyEmpty.style.display = "block";
        historyList
            .querySelectorAll(".history-item")
            .forEach((el) => el.remove());
        return;
    }

    historyEmpty.style.display = "none";
    historyList
        .querySelectorAll(".history-item")
        .forEach((el) => el.remove());

    history.forEach((reason, index) => {
        const item = document.createElement("div");
        item.classList.add("history-item");

        const num = document.createElement("span");
        num.classList.add("history-number");
        num.textContent = `${history.length - index}`;

        const text = document.createElement("p");
        text.classList.add("history-text");
        text.textContent = reason;

        item.appendChild(num);
        item.appendChild(text);

        item.addEventListener("click", () => {
            copyToClipboard(reason);
            num.textContent = "✓";
            num.style.color = "var(--success)";
            setTimeout(() => {
                num.textContent = `${history.length - index}`;
                num.style.color = "";
            }, 1500);
        });
        historyList.appendChild(item);
    });
}

function clearHistory() {
    history = [];
    stats.streak = 0;
    updateStatsDisplay();
    renderHistory();
    saveState();
}

// ============================================================
// Stats
// ============================================================
function updateStatsDisplay() {
    animateStat(statCount, stats.count);
    animateStat(statCopies, stats.copies);
    animateStat(statStreak, stats.streak);
}

function animateStat(element, value) {
    element.textContent = value;
    element.classList.remove("stat-pop");
    // Trigger reflow
    void element.offsetWidth;
    element.classList.add("stat-pop");
}

// ============================================================
// Persistence (sessionStorage)
// ============================================================
function saveState() {
    sessionStorage.setItem(
        "naas_state",
        JSON.stringify({ history, stats })
    );
}

function loadState() {
    try {
        const saved = sessionStorage.getItem("naas_state");
        if (saved) {
            const data = JSON.parse(saved);
            history = data.history || [];
            stats = data.stats || { count: 0, copies: 0, streak: 0 };
        }
    } catch {
        // fresh start
    }
}

// ============================================================
// Utility
// ============================================================
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ============================================================
// Boot
// ============================================================
document.addEventListener("DOMContentLoaded", init);
