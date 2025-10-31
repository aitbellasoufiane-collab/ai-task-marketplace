import { TaskMarketplace } from '@/components/TaskMarketplace'

export default function HomePage() {
  return (
    <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">سوق المهام</h1>
        <TaskMarketplace />
      </div>
      <aside className="space-y-6">
        <div className="card bg-gradient-to-br from-primary to-accent text-white p-6 rounded-xl">
          <h2 className="text-xl font-bold">محفظة العامل</h2>
          <p className="text-4xl font-bold my-2">
            <span id="worker-wallet-balance">0.00</span> درهم
          </p>
          <button className="w-full bg-white/20 hover:bg-white/30 font-bold py-2 px-4 rounded-lg">
            سحب الأرباح
          </button>
        </div>
        <div className="card bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">لوحة تحكم المالك</h2>
          <p className="text-muted text-sm">أرباح المنصة (عمولات + رسوم)</p>
          <p className="text-2xl font-bold my-2 text-gold">
            <span id="owner-wallet-balance">0.00</span> درهم
          </p>
          <button className="w-full bg-border hover:bg-gray-600 font-bold py-2 px-4 rounded-lg">
            🤖 توليد مهام جديدة بالذكاء الاصطناعي
          </button>
        </div>
      </aside>
    </main>
  )
}
