import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-secret");
  };

  const menuItems = [
    {
      name: "📊 Dashboard",
      path: "/admin-secret/dashboard",
    },
    {
      name: "✈️ Trips",
      path: "/admin-secret/trips",
    },
    {
      name: "📍 Destinations",
      path: "/admin-secret/destinations",
    },
    {
      name: "📋 Bookings",
      path: "/admin-secret/bookings",
    },
    {
      name: "👥 Customers",
      path: "/admin-secret/customers",
    },
    {
      name: "⭐ Reviews",
      path: "/admin-secret/reviews",
    },
    {
      name: "💬 Messages",
      path: "/admin-secret/messages",
    },
    {
      name: "⚙️ Settings",
      path: "/admin-secret/settings",
    },
   
  ];

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-brand">
          ✈️ <span>Travel Admin</span>
        </div>

        <nav className="admin-menu">

          {menuItems.map((item) => (
            <button
              key={item.path}
              className={
                location.pathname === item.path
                  ? "admin-menu-btn active"
                  : "admin-menu-btn"
              }
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}

        </nav>

        {/* LOGOUT */}
        <button
          className="admin-logout"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* PAGE CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}