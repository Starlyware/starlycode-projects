/*
  Project: JavaScript Data Form
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/

//--- Helpers ---
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

function showToast(message, timeout = 2500) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
  }, timeout);
}

//Secure random password using Web Crypto
function randomPassword(len = 12) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!£$%&/=@+()_-[]{}<>?*";
  const array = new Uint32Array(len);
  crypto.getRandomValues(array);
  return Array.from(array, v => charset[v % charset.length]).join('');
}

//Very small strength evaluator
function evaluateStrength(pw) {
  let score = 0;
  if (!pw) return {score:0, label:'Empty'};
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[a-z]/.test(pw)) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/\d/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  const max = 6;
  const percent = Math.round((score / max) * 100);
  let label = 'Weak';
  if (percent > 75) label = 'Strong';
  else if (percent > 40) label = 'Medium';
  return {score:percent, label};
}

//Update strength bar UI
function updateStrengthUI(pw) {
  const {score, label} = evaluateStrength(pw);
  const bar = $('#strengthBar');
  const text = $('#strengthText');
  bar.style.width = score + '%';
  text.textContent = label + (pw ? ` · ${pw.length} chars` : '');
  //color by score
  if (score > 75) bar.style.background = 'linear-gradient(90deg,#2dd4bf,#06b6d4)';
  else if (score > 40) bar.style.background = 'linear-gradient(90deg,#ffd166,#ff8a66)';
  else bar.style.background = 'linear-gradient(90deg,#ff6b6b,#ffb86b)';
}

//Submissions storage (demo only)
const STORAGE_KEY = 'sc_demo_submissions';
function loadSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to parse submissions', e);
    return [];
  }
}
function saveSubmissions(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

//Render submissions list
function renderSubmissions() {
  const list = loadSubmissions();
  const ul = $('#submissionsList');
  ul.innerHTML = '';
  if (!list.length) {
    ul.innerHTML = `<li style="font-style:italic;color:var(--muted)">No submissions yet</li>`;
    return;
  }
  list.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    const left = document.createElement('div');
    left.innerHTML = `<strong>${escapeHtml(item.username)}</strong><div class="meta">${escapeHtml(item.email || '')}</div>`;
    const right = document.createElement('div');
    right.className = 'meta';
    right.textContent = new Date(item.date).toLocaleString();
    li.appendChild(left);
    li.appendChild(right);
    ul.appendChild(li);
  });
}

function escapeHtml(str='') {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

//--- Init DOM interactions ---
document.addEventListener('DOMContentLoaded', () => {
  const form = $('#dataForm');
  const username = $('#username');
  const email = $('#email');
  const password = $('#password');
  const togglePw = $('#togglePassword');
  const genBtn = $('#generateBtn');
  const remember = $('#remember');
  const clearBtn = $('#clearStorage');

  //Initial render
  updateStrengthUI('');
  renderSubmissions();

  //Toggle password visibility
  togglePw.addEventListener('click', () => {
    const isPwd = password.type === 'password';
    password.type = isPwd ? 'text' : 'password';
    togglePw.setAttribute('aria-label', isPwd ? 'Hide password' : 'Show password');
  });

  //Generate password
  genBtn.addEventListener('click', () => {
    const pw = randomPassword(12);
    password.value = pw;
    updateStrengthUI(pw);
    showToast('Generated a strong-ish password (demo)');
  });

  //Live strength update
  password.addEventListener('input', () => updateStrengthUI(password.value));

  //Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Clear previous errors
    $$('#dataForm .error').forEach(el => el.textContent = '');

    let valid = true;
    if (!username.value.trim() || username.value.trim().length < 3) {
      $('#username').nextElementSibling.textContent = 'Enter a username (min 3 chars).';
      valid = false;
    }
    if (email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
      $('#email').nextElementSibling.textContent = 'Enter a valid email or leave empty.';
      valid = false;
    }
    if (!password.value || password.value.length < 6) {
      $('#password').closest('.field').querySelectorAll('.error')[1].textContent = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (!valid) {
      showToast('Please fix the errors and try again');
      return;
    }

    //Store demo submission (do NOT store real passwords in production)
    const list = loadSubmissions();
    list.push({
      username: username.value.trim(),
      email: email.value.trim(),
      //WARNING: storing passwords here is only for demo - we won't store them in this example
      //Password: password.value,
      date: new Date().toISOString(),
      remember: remember.checked
    });
    saveSubmissions(list);
    renderSubmissions();

    //Feedback & reset
    showToast('Submission saved (demo)');
    form.reset();
    updateStrengthUI('');
  });

  //Clear demo storage
  clearBtn.addEventListener('click', () => {
    if (confirm('Clear demo storage? This will remove saved submissions.')) {
      localStorage.removeItem(STORAGE_KEY);
      renderSubmissions();
      showToast('Demo storage cleared');
    }
  });

});