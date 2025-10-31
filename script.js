// --- Self-Developing, Profit-Oriented Platform Logic ---

const PLATFORM_FEE_PERCENT = 15;
const FEATURED_TASK_FEE = 5;

// 1. State Management (in-memory simulation for prototype)
// In a real application, this 'state' object would be replaced by:
// - A state management library (like Redux, Zustand).
// - Data fetched from a database via API calls.
let state = {
    tasks: [],
    wallets: {
        worker: 0,
        owner: 0,
    }
};

// In a real application, this function would be an API call:
// async function getTasks() { const response = await fetch('/api/tasks'); return await response.json(); }
function getInitialTasks() {
    return [
        { id: 1, title: 'تصنيف 100 صورة لمنتجات', description: 'حدد ما إذا كانت الصورة لـ "قميص" أو "بنطال".', reward: 50, status: 'open', featured: true },
        { id: 2, title: 'كتابة 5 أوصاف قصيرة لمنتجات', description: 'اكتب وصف من 30 كلمة لعطور جديدة.', reward: 40, status: 'open', featured: false },
    ];
}

// The render function is the core of the UI update logic.
// In a framework like React, this would be handled automatically by re-rendering components when the state changes.
function render() {
    const taskListEl = document.getElementById('task-list');
    if (!taskListEl) return;
    taskListEl.innerHTML = '';

    state.tasks.forEach(task => {
        let statusText, statusClass, actionButton;
        switch (task.status) {
            case 'claimed':
                statusText = 'مستلمة'; statusClass = 'status-claimed';
                actionButton = `<button class="btn btn-primary" onclick="completeTask(${task.id})">إكمال المهمة</button>`;
                break;
            case 'done':
                statusText = 'مكتملة'; statusClass = 'status-done';
                actionButton = `<p style="color: var(--accent);">تم دفع المكافأة</p>`;
                break;
            default:
                statusText = 'متاحة'; statusClass = 'status-open';
                actionButton = `<button class="btn btn-secondary" onclick="claimTask(${task.id})">استلام المهمة</button>`;
        }

        const taskCard = `
            <div class="card task ${task.featured ? 'featured' : ''}">
                ${task.featured ? '<div class="featured-badge">⭐ مميزة</div>' : ''}
                <div class="task-header">
                    <h3 style="margin: 0;">${task.title}</h3>
                    <span class="task-reward">${task.reward} درهم</span>
                </div>
                <p style="color: var(--muted); margin: 0;">${task.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 12px;">
                    <span class="task-status ${statusClass}">${statusText}</span>
                    ${actionButton}
                </div>
            </div>
        `;
        taskListEl.innerHTML += taskCard;
    });

    document.getElementById('worker-wallet-balance').textContent = state.wallets.worker.toFixed(2);
    document.getElementById('owner-wallet-balance').textContent = state.wallets.owner.toFixed(2);
}

// 2. Core Business & AI Logic
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const reward = parseFloat(document.getElementById('task-reward').value);
    const isFeatured = document.getElementById('task-featured').checked;

    if (!title || !reward) return;
    
    // In a real app, this would be a POST request to an API endpoint like '/api/tasks'
    const newTask = { id: Date.now(), title, description: document.getElementById('task-desc').value, reward, status: 'open', featured: isFeatured };
    state.tasks.unshift(newTask);

    if (isFeatured) {
        state.wallets.owner += FEATURED_TASK_FEE;
        alert(`تمت إضافة المهمة كمميزة. تم إضافة ${FEATURED_TASK_FEE} درهم لخزينة المنصة.`);
    }

    render();
    e.target.reset();
});

// In a real app, this would be a POST request to an API endpoint like '/api/tasks/claim'
function claimTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task && task.status === 'open') {
        task.status = 'claimed';
        render();
        alert('تم استلام المهمة. نفّذها ثم اضغط إكمال.');
    }
}

// In a real app, this would be a POST request to an API endpoint like '/api/tasks/complete'
function completeTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task && task.status === 'claimed') {
        task.status = 'done';

        // Profit distribution logic
        const platformFee = task.reward * (PLATFORM_FEE_PERCENT / 100);
        const workerPayout = task.reward - platformFee;

        state.wallets.worker += workerPayout;
        state.wallets.owner += platformFee;

        render();
        alert(`تم إكمال المهمة! أُضيف ${workerPayout.toFixed(2)} درهم لمحفظتك. وحصلت المنصة على عمولة ${platformFee.toFixed(2)} درهم.`);
    }
}

// This simulates an AI service that generates new, relevant tasks.
function generateAITasks() {
    alert("محاكاة: الذكاء الاصطناعي يحلل السوق ويقترح مهام جديدة...");
    const aiTasks = [
        { id: Date.now() + 1, title: 'AI: تدقيق 50 تعليقًا للبحث عن الكلمات السلبية', description: 'مراجعة سريعة لتحديد التعليقات التي تحتاج لرد.', reward: 75, status: 'open', featured: true },
        { id: Date.now() + 2, title: 'AI: إنشاء 10 عناوين جذابة لمقالات', description: 'بناءً على الكلمة المفتاحية "السفر الاقتصادي".', reward: 30, status: 'open', featured: false },
    ];

    state.tasks.unshift(...aiTasks);
    state.wallets.owner += FEATURED_TASK_FEE; // Fee for the featured AI task
    
    setTimeout(() => {
        render();
        alert("تمت إضافة مهام جديدة ومربحة إلى السوق!");
    }, 1500);
}

// 3. Payout Info (Helper)
function showPayoutInfo() {
    alert('طرق الدفع المتاحة للعمال: Wise / Payoneer / Stripe Connect. يتم الربط عبر API آمن.');
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // In a real app, you would load the initial state from localStorage or an API
    const savedState = localStorage.getItem('platformState');
    if (savedState) { state = JSON.parse(savedState); }
    else { state.tasks = getInitialTasks(); }
    render();
});