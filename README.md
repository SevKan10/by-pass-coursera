# Coursera Skipper - Detailed User Guide

**Coursera Skipper** is a Chrome extension designed to automate your learning process on Coursera. It saves you a significant amount of time by automatically skipping videos, readings, completing discussion prompts, and grading peer assignments.

---

## 🚀 Key Features

1. **Skip Videos**: Automatically marks lecture videos as complete.
   - If skipping is allowed: The extension instantly ends the video.
   - If viewing is required: The extension simulates the viewing process (start, progress, end) via APIs to finish quickly.
2. **Auto Discussion**: Automatically fills in and submits discussion posts or replies using professional pre-made content.
3. **Auto Do Assignment**: Automatically populates required content fields for peer-graded assignments and submits them.
4. **Auto Grade Peer**: Automatically reviews and grades assignments submitted by other students.
   - Allows setting a target number of reviews (**Grade count**) to prevent unnecessary over-grading.
   - Automatically selects the highest score rubric options and fills in positive feedback.
5. **Locking Browser Bypass (NEW)**: Bypasses the requirement to launch the "Coursera Locking Browser" app.
   - Take assignments directly inside your standard web browser.
   - Freely use copy and paste shortcuts (`Ctrl+C`, `Ctrl+V`).

---

## 🛠 Installation Guide

1. Download the extension source code to your computer.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click **Load unpacked** and select the folder containing the downloaded source code.

---

## 📖 How to Use

### 1. Skip Videos and Reading Material
- Log in to Coursera and go to the course homepage (where the weekly syllabus is displayed).
- Open the extension popup and click **Skip videos**.
- The extension will scan the entire course and automatically mark video and reading items as complete.

### 2. Auto Discussion
- Navigate to a specific discussion prompt on Coursera.
- Open the extension popup and click **Auto Discussion**. The extension will automatically populate the response and click **Post**.

### 3. Auto Submit Assignments
- Navigate to the assignment submission page ("Submit your assignment").
- Open the extension popup and click **Auto Do Assignment**. The extension will fill in the title, default content, and submit the assignment.

### 4. Auto Grade Peers
- Navigate to the peer review grading page.
- Enter the desired number of peer submissions to review in the **Grade count** field (e.g., 3).
- Click **Auto Grade Peer**. The extension will automatically grade the specified number of submissions and stop.

---

## ⚠️ Important Notes

- **Risks**: Using automation tools may violate Coursera's Terms of Service. Please use at your own discretion.
- **Token**: The extension uses your current `CSRF3-Token` cookie to send valid requests. If you encounter errors, try refreshing the Coursera page.
- **Stopping Tasks**: You can click the red **Stop** button at any time to cancel ongoing actions.

---
*Wishing you efficient learning and time savings!*
