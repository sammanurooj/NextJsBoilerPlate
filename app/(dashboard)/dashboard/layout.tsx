import Navbar from '@/components/custom/nav-bar';
import Sidebar from '@/components/custom/sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
