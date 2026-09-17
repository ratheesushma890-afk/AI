import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-secret");
  };

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-brand">
          ✈️ <span>Travel Admin</span>
        </div>

        <nav>

          <button
            className="active"
            onClick={() =>
              navigate("/admin-secret/dashboard")
            }
          >
            📊 Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/admin-secret/trips")
            }
          >
            ✈️ Trips
          </button>

          <button
            onClick={() =>
              navigate("/admin-secret/destinations")
            }
          >
            📍 Destinations
          </button>

          <button
            onClick={() =>
              navigate("/admin-secret/bookings")
            }
          >
            📋 Bookings
          </button>

          <button
            onClick={() =>
              navigate("/admin-secret/customers")
            }
          >
            👥 Customers
          </button>

          <button
            onClick={() =>
              navigate("/admin-secret/reviews")
            }
          >
            ⭐ Reviews
          </button>

          <button
            onClick={() =>
              navigate("/admin-secret/messages")
            }
          >
            💬 Messages
          </button>

          <button
            onClick={() =>
              navigate("/admin-secret/settings")
            }
          >
            ⚙️ Settings
          </button>

        </nav>

        <button
          className="admin-logout"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </aside>


      {/* MAIN */}
      <main className="admin-main">

        {/* HEADER */}
        <header className="admin-header">

          <div>
            <h1>Dashboard</h1>
            <p>Manage your travel website</p>
          </div>

          <div className="admin-profile">
            👤 <span>Admin</span>
          </div>

        </header>


        {/* STATS */}
        <section className="admin-stats">

          <div className="stat-card">
            <span>✈️</span>

            <div>
              <p>Total Trips</p>
              <h2>24</h2>
            </div>
          </div>


          <div className="stat-card">
            <span>📋</span>

            <div>
              <p>Total Bookings</p>
              <h2>128</h2>
            </div>
          </div>


          <div className="stat-card">
            <span>👥</span>

            <div>
              <p>Customers</p>
              <h2>96</h2>
            </div>
          </div>


          <div className="stat-card">
            <span>💰</span>

            <div>
              <p>Revenue</p>
              <h2>₹4.8L</h2>
            </div>
          </div>

        </section>


        {/* RECENT BOOKINGS */}
        <section className="admin-section">

          <div className="section-heading">

            <div>
              <h2>Recent Bookings</h2>
              <p>Latest trip bookings</p>
            </div>

            <button
              onClick={() =>
                navigate("/admin-secret/bookings")
              }
            >
              View All
            </button>

          </div>


          <div className="booking-table">

            <div className="table-row table-head">
              <span>Customer</span>
              <span>Trip</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>


            <div className="table-row">
              <span>Rahul Sharma</span>
              <span>Dubai Escape</span>
              <span>20 Oct</span>
              <span>₹45,000</span>
              <b className="confirmed">
                Confirmed
              </b>
            </div>


            <div className="table-row">
              <span>Priya Singh</span>
              <span>Paris Tour</span>
              <span>25 Oct</span>
              <span>₹85,000</span>
              <b className="pending">
                Pending
              </b>
            </div>


            <div className="table-row">
              <span>Aman Verma</span>
              <span>Bali Trip</span>
              <span>02 Nov</span>
              <span>₹62,000</span>
              <b className="confirmed">
                Confirmed
              </b>
            </div>

          </div>

        </section>


        {/* QUICK ACTIONS */}
        <section className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="quick-grid">

            <button
              onClick={() =>
                navigate("/admin-secret/trips")
              }
            >
              <strong>＋</strong>
              <span>Add New Trip</span>
            </button>


            <button
              onClick={() =>
                navigate("/admin-secret/bookings")
              }
            >
              <strong>📋</strong>
              <span>Manage Bookings</span>
            </button>


            <button
              onClick={() =>
                navigate("/admin-secret/destinations")
              }
            >
              <strong>📍</strong>
              <span>Add Destination</span>
            </button>


            <button
              onClick={() =>
                navigate("/admin-secret/reviews")
              }
            >
              <strong>⭐</strong>
              <span>Manage Reviews</span>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}