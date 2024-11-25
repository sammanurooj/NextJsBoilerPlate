import {
  BarChart2,
  Calendar,
  FileText,
  LayoutDashboard,
  Settings,
  Users
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/',
      active: true
    },
    {
      title: 'Customers',
      icon: <Users className="h-5 w-5" />,
      href: '/customers'
    },
    {
      title: 'Invoices',
      icon: <FileText className="h-5 w-5" />,
      href: '/invoices'
    },
    {
      title: 'Reports and Analysis',
      icon: <BarChart2 className="h-5 w-5" />,
      href: '/reports'
    },
    {
      title: 'Appointments',
      icon: <Calendar className="h-5 w-5" />,
      href: '/appointments'
    }
  ];

  const settingsSubmenu = [
    { title: 'Services', href: '/settings/services' },
    { title: 'Sales Representative', href: '/settings/sales' },
    { title: 'Email Configurations', href: '/settings/email' }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 hidden md:block">
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-placeholder.png" alt="PV RUGS" className="h-8" />
            <span className="font-bold text-xl">PV RUGS</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="flex items-center gap-3 px-4 py-2.5 text-gray-700">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
            <ul className="ml-9 mt-1 space-y-1">
              {settingsSubmenu.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
