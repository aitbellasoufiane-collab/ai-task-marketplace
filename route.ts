import { NextResponse } from 'next/server';

// In a real app, you would import your database client, e.g., from Supabase
// import { createClient } from '@supabase/supabase-js'

const PLATFORM_FEE_PERCENT = 15;

export async function POST(req: Request) {
  const { taskId } = await req.json();

  // --- Secure Server-Side Logic ---
  try {
    // 1. Get the user ID from the session (authentication)
    // const userId = await getUserIdFromSession(req);

    // 2. Fetch task from the database to get its reward
    // const { data: task, error } = await supabase.from('tasks').select('reward').eq('id', taskId).single();
    const task = { reward: 100 }; // Dummy data

    // 3. Calculate payout and platform fee
    const platformFee = task.reward * (PLATFORM_FEE_PERCENT / 100);
    const workerPayout = task.reward - platformFee;

    // 4. Update database: update task status, update worker wallet, update owner wallet in a transaction
    console.log(`Processing task ${taskId}: Worker gets ${workerPayout}, Platform gets ${platformFee}`);

    return NextResponse.json({ success: true, message: 'Task completed and funds distributed.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}