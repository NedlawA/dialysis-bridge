// Tab switching with progress bar update
const tabButtons = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.section');
const progressFill = document.getElementById('progressFill');

function updateProgress(index) {
  const total = tabButtons.length;
  const percent = ((index + 1) / total) * 100;
  progressFill.style.width = percent + '%';
}

tabButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));

    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    targetSection.classList.add('active');

    updateProgress(index);
  });
});

// Matching answer keys
const answerKeys = {
  anatomy: ['a', 'c', 'b'],     // Kidney, Nephron, Ureter
  disease: ['b', 'a', 'c'],     // CKD, Kidney failure, Creatinine test
  sanitation: ['a', 'b', 'c', 'd']   // Disinfectant, Sharps container, Gloves, PPE
};

function checkMatching(groupName) {
  const group = document.querySelector(`.matching-group[data-group="${groupName}"]`);
  const selects = group.querySelectorAll('select');
  const feedback = document.getElementById(`feedback-${groupName}`);
  const key = answerKeys[groupName];

  let correctCount = 0;
  selects.forEach((sel, idx) => {
    const value = sel.value;
    if (value === key[idx]) {
      correctCount++;
      sel.classList.remove('shake');
      sel.style.borderColor = '#1a7f3c';
    } else {
      sel.style.borderColor = '#b3261e';
      sel.classList.remove('shake');
      // trigger reflow to restart animation
      void sel.offsetWidth;
      sel.classList.add('shake');
    }
  });

  if (correctCount === selects.length) {
    feedback.textContent = 'All correct! Great job.';
    feedback.classList.remove('incorrect');
    feedback.classList.add('correct');
  } else {
    feedback.textContent = `You got ${correctCount} out of ${selects.length} correct. Try again.`;
    feedback.classList.remove('correct');
    feedback.classList.add('incorrect');
  }
}

// Attach listeners to "Check Answers" buttons
const checkButtons = document.querySelectorAll('.btn-check');

checkButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const groupName = btn.getAttribute('data-check');
    checkMatching(groupName);
  });
});

// Initial progress (Hour 1)
updateProgress(0);
