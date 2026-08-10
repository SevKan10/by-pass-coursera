document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const discussionBtn = document.getElementById('discussionBtn');
    const gradePeerBtn = document.getElementById('gradePeerBtn');
    const doAssignmentBtn = document.getElementById('doAssignmentBtn');
    const doQuizBtn = document.getElementById('doQuizBtn');
    const aiProviderSelect = document.getElementById('aiProvider');
    const apiKeyInput = document.getElementById('apiKey');
    const logDiv = document.getElementById('log');
    const statusDiv = document.getElementById('status');

    // Load saved AI settings
    chrome.storage.local.get(['aiProvider', 'apiKey'], (result) => {
        if (result.aiProvider) aiProviderSelect.value = result.aiProvider;
        if (result.apiKey) apiKeyInput.value = result.apiKey;
    });

    // Save AI settings on change
    aiProviderSelect.addEventListener('change', () => {
        chrome.storage.local.set({ aiProvider: aiProviderSelect.value });
    });
    apiKeyInput.addEventListener('change', () => {
        chrome.storage.local.set({ apiKey: apiKeyInput.value });
    });

    function log(msg) {
        const p = document.createElement('div');
        p.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        logDiv.appendChild(p);
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    async function getActiveCourseraTab() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab || null;
    }

    function sendToCurrentTab(tab, message, onSuccess) {
        chrome.tabs.sendMessage(tab.id, message, (response) => {
            if (chrome.runtime.lastError) {
                const messageText = chrome.runtime.lastError.message || "Unknown runtime error";
                if (messageText.includes('Could not establish connection')) {
                    log('Extension connection error: the page did not expose a content-script listener yet. Reload the Coursera page and open the popup again, or wait until the page has finished loading.');
                    log('If you see this instantly after page load, disable developer tools debug reloading and refresh Coursera once.');
                } else {
                    log('Error: ' + messageText);
                }
                return;
            }

            if (onSuccess) {
                onSuccess(response);
            }
        });
    }

    function setRunningState(isRunning) {
        startBtn.disabled = isRunning;
        stopBtn.disabled = !isRunning;
        statusDiv.textContent = isRunning ? "SevKan" : "SevKan";
    }

    startBtn.addEventListener('click', async () => {
        const tab = await getActiveCourseraTab();

        if (!tab || !tab.url || !tab.url.includes("coursera.org")) {
            log("Error: Not on Coursera!");
            return;
        }

        setRunningState(true);
        log("Sending start command...");

        sendToCurrentTab(tab, { action: "START_SKIPPING" }, (response) => {
            if (response && response.status === "started") {
                log("Started!");
            } else {
                log("Started!");
            }
        });
    });

    stopBtn.addEventListener('click', async () => {
        const tab = await getActiveCourseraTab();

        if (!tab || !tab.url || !tab.url.includes("coursera.org")) {
            log("Error: Not on Coursera!");
            return;
        }

        log("Sending stop command...");
        stopBtn.disabled = true;

        sendToCurrentTab(tab, { action: "STOP_SKIPPING" }, (response) => {
            if (response && response.status === "stopped") {
                setRunningState(false);
                statusDiv.textContent = "Stopped";
            }
            log("Stopped command sent.");
        });
    });

    discussionBtn.addEventListener('click', async () => {
        const tab = await getActiveCourseraTab();

        if (!tab || !tab.url || !tab.url.includes("coursera.org")) {
            log("Error: Not on Coursera!");
            return;
        }

        log("Sending Auto Discussion command...");
        sendToCurrentTab(tab, { action: "AUTO_DISCUSSION" }, () => {
            log("Discussion command sent.");
        });
    });

    gradePeerBtn.addEventListener('click', async () => {
        const tab = await getActiveCourseraTab();

        if (!tab || !tab.url || !tab.url.includes("coursera.org")) {
            log("Error: Not on Coursera!");
            return;
        }

        const gradeCount = document.getElementById('gradeCount').value || 3;
        log(`Sending Auto Grade Peer command (Count: ${gradeCount})...`);
        sendToCurrentTab(tab, { action: "AUTO_GRADE_PEER", count: parseInt(gradeCount) }, () => {
            log("Grade Peer command sent.");
        });
    });

    doAssignmentBtn.addEventListener('click', async () => {
        const tab = await getActiveCourseraTab();

        if (!tab || !tab.url || !tab.url.includes("coursera.org")) {
            log("Error: Not on Coursera!");
            return;
        }

        const provider = aiProviderSelect.value;
        const key = apiKeyInput.value;

        log("Sending Auto Do Assignment command...");
        sendToCurrentTab(tab, { action: "AUTO_DO_ASSIGNMENT", provider: provider, apiKey: key }, () => {
            log("Assignment command sent.");
        });
    });

    doQuizBtn.addEventListener('click', async () => {
        const tab = await getActiveCourseraTab();

        if (!tab || !tab.url || !tab.url.includes("coursera.org")) {
            log("Error: Not on Coursera!");
            return;
        }

        const provider = aiProviderSelect.value;
        const key = apiKeyInput.value;

        if (!key) {
            log("Error: API Key is required for Auto Quiz.");
            return;
        }

        log(`Sending Auto Do Quiz command (${provider})...`);
        sendToCurrentTab(tab, { action: "AUTO_DO_QUIZ", provider: provider, apiKey: key }, () => {
            log("Auto Do Quiz command sent. Please wait for the AI...");
        });
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "LOG") {
            log(request.message);
        } else if (request.action === "FINISHED") {
            setRunningState(false);
            statusDiv.textContent = "Done";
            log("Process finished.");
        }
    });
});
