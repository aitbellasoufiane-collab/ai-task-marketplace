'use client'

import { useState, useEffect } from 'react'

const PLATFORM_FEE_PERCENT = 15;

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  status: 'open' | 'claimed' | 'done';
  featured: boolean;
}

const initialTasks: Task[] = [
  { id: 1, title: 'تصنيف 100 صورة لمنتجات', description: 'حدد ما إذا كانت الصورة لـ "قميص" أو "بنطال".', reward: 50, status: 'open', featured: true },
  { id: 2, title: 'كتابة 5 أوصاف قصيرة لمنتجات', description: 'اكتب وصف من 30 كلمة لعطور جديدة.', reward: 40, status: 'open', featured: false },
];

export function TaskMarketplace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // fetch('/api/tasks').then(res => res.json()).then(data => setTasks(data));
    setTasks(initialTasks);
  }, []);

  const claimTask = async (id: number) => {
    setIsLoading(true);
    // API call to claim the task on the server
    // await fetch(`/api/tasks/claim`, { method: 'POST', body: JSON.stringify({ taskId: id }) });

    // For prototype: update state locally
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id && task.status === 'open' ? { ...task, status: 'claimed' } : task
      )
    );
    alert('تم استلام المهمة. نفّذها ثم اضغط إكمال.');
    setIsLoading(false);
  };

  const completeTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setIsLoading(true);
    // API call to securely process completion and distribute funds on the server
    // await fetch(`/api/tasks/complete`, { method: 'POST', body: JSON.stringify({ taskId: id }) });

    // For prototype: update state locally
    setTasks(currentTasks =>
      currentTasks.map(t =>
        t.id === id ? { ...t, status: 'done' } : t
      )
    );

    const platformFee = task.reward * (PLATFORM_FEE_PERCENT / 100);
    const workerPayout = task.reward - platformFee;
    alert(`تم إكمال المهمة! سيتم إضافة ${workerPayout.toFixed(2)} درهم لمحفظتك.`);
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tasks.map(task => (
        <div key={task.id} className={`card p-6 flex flex-col gap-3 relative overflow-hidden ${task.featured ? 'border-gold shadow-lg shadow-gold/10' : ''}`}>
          {task.featured && <div className="featured-badge">⭐ مميزة</div>}
          <div className="task-header">
            <h3 className="text-lg font-bold m-0">{task.title}</h3>
            <span className="task-reward">{task.reward} درهم</span>
          </div>
          <p className="text-muted text-sm m-0">{task.description}</p>
          <div className="mt-auto pt-3 flex justify-between items-center">
            {task.status === 'open' && (
              <button onClick={() => claimTask(task.id)} disabled={isLoading} className="btn btn-secondary">
                {isLoading ? 'جاري...' : 'استلام المهمة'}
              </button>
            )}
            {task.status === 'claimed' && (
              <button onClick={() => completeTask(task.id)} disabled={isLoading} className="btn btn-primary">
                {isLoading ? 'جاري...' : 'إكمال المهمة'}
              </button>
            )}
            {task.status === 'done' && <p className="text-accent font-bold">تم دفع المكافأة</p>}
          </div>
        </div>
      ))}
    </div>
  );
}