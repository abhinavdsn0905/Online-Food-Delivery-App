import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { FaChartBar, FaUtensils, FaUsers, FaClipboardList, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../components/Loader';
import { Button } from '../components/Buttons';

const DashboardView = ({ orders }) => {
  const totalRevenue = orders.reduce((acc, o) => acc + o.total_amount, 0);
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  const statCardStyle = { backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' };
  const statValueStyle = { fontSize: '2rem', fontWeight: '700', color: 'var(--secondary-color)', marginTop: '8px' };
  const statLabelStyle = { color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--secondary-color)', marginBottom: '8px' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-light)' }}>Monitor your platform's performance and live orders.</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Total Revenue</div>
          <div style={statValueStyle}>₹{totalRevenue.toFixed(2)}</div>
        </div>
        <div style={{...statCardStyle, borderLeft: '4px solid var(--primary-color)'}}>
          <div style={statLabelStyle}>Active Orders</div>
          <div style={statValueStyle}>{activeOrders}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Delivered</div>
          <div style={statValueStyle}>{deliveredOrders}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Total Orders</div>
          <div style={statValueStyle}>{totalOrders}</div>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--secondary-color)', marginBottom: '20px' }}>Recent Transactions</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Order ID</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Amount</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--secondary-color)' }}>#{o.id.toString().padStart(4, '0')}</td>
                <td style={{ padding: '16px 12px' }}>₹{o.total_amount.toFixed(2)}</td>
                <td style={{ padding: '16px 12px' }}>
                  <span style={{ 
                    padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                    backgroundColor: o.status === 'Delivered' ? '#e8f5e9' : (o.status === 'Cancelled' ? '#ffebee' : '#fff3e0'),
                    color: o.status === 'Delivered' ? '#2e7d32' : (o.status === 'Cancelled' ? '#c62828' : '#f57c00')
                  }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: '16px 12px', color: 'var(--text-light)' }}>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-light)' }}>No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const OrdersView = ({ orders, refreshOrders }) => {
  const handleUpdateStatus = async (id, status) => {
    try {
      await api.updateOrderStatus(id, status);
      refreshOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}>All Orders Management</h1>
      </div>
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Order ID</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Customer ID</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Amount</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Payment</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--secondary-color)' }}>#{o.id.toString().padStart(4, '0')}</td>
                <td style={{ padding: '16px 12px' }}>User #{o.user_id}</td>
                <td style={{ padding: '16px 12px' }}>₹{o.total_amount.toFixed(2)}</td>
                <td style={{ padding: '16px 12px' }}>
                  <span style={{ 
                    padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                    backgroundColor: o.status === 'Delivered' ? '#e8f5e9' : (o.status === 'Cancelled' ? '#ffebee' : '#fff3e0'),
                    color: o.status === 'Delivered' ? '#2e7d32' : (o.status === 'Cancelled' ? '#c62828' : '#f57c00')
                  }}>{o.status}</span>
                </td>
                <td style={{ padding: '16px 12px' }}>{o.payment_status}</td>
                <td style={{ padding: '16px 12px', color: 'var(--text-light)' }}>{new Date(o.created_at).toLocaleString()}</td>
                <td style={{ padding: '16px 12px', display: 'flex', gap: '8px' }}>
                  {o.status !== 'Delivered' && o.status !== 'Cancelled' && (
                    <>
                      <button onClick={() => handleUpdateStatus(o.id, 'Delivered')} style={{ padding: '6px', background: '#e8f5e9', color: '#2e7d32', border: 'none', borderRadius: '4px', cursor: 'pointer' }} title="Mark Delivered"><FaCheck /></button>
                      <button onClick={() => handleUpdateStatus(o.id, 'Cancelled')} style={{ padding: '6px', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', cursor: 'pointer' }} title="Cancel Order"><FaTimes /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-light)' }}>No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const RestaurantsView = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const initialForm = { name: '', cuisine: '', image: '', location: '', delivery_time: '' };
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const data = await api.getRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { name: '', description: '', price: '', category: '', image: '', imageFile: null }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.image;
      if (imageFile) {
        finalImageUrl = await api.uploadImage(imageFile);
      }

      const finalItems = await Promise.all(items.map(async (item) => {
        let itemImageUrl = item.image;
        if (item.imageFile) {
          itemImageUrl = await api.uploadImage(item.imageFile);
        }
        return {
          name: item.name,
          description: item.description,
          price: parseFloat(item.price),
          category: item.category,
          image: itemImageUrl,
          availability: true
        };
      }));

      const payload = { ...formData, image: finalImageUrl, items: finalItems };

      if (editMode) {
        await api.updateRestaurant(editId, payload);
      } else {
        await api.addRestaurant(payload);
      }
      setShowForm(false);
      setEditMode(false);
      setFormData(initialForm);
      setImageFile(null);
      setItems([]);
      fetchRestaurants();
    } catch (err) {
      alert("Failed to save restaurant: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (restaurant) => {
    setFormData({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      image: restaurant.image,
      location: restaurant.location,
      delivery_time: restaurant.delivery_time
    });
    setEditId(restaurant.id);
    setEditMode(true);
    
    // Fetch items for edit mode
    try {
      const menuData = await api.getMenuByRestaurant(restaurant.id);
      setItems(menuData.map(m => ({ ...m, imageFile: null })));
    } catch(err) {
      console.error("Failed to load menu", err);
      setItems([]);
    }
    
    setShowForm(true);
  };

  const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', marginBottom: '16px', outline: 'none' };
  const labelStyle = { display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem' };

  if (loading) return <Loader />;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}>Restaurants Management</h1>
        <Button variant="primary" onClick={() => { setShowForm(!showForm); setEditMode(false); setFormData(initialForm); setImageFile(null); setItems([]); }}>
          {showForm ? 'Cancel' : '+ Add New Restaurant'}
        </Button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>{editMode ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              <div><label style={labelStyle}>Name</label><input required type="text" style={inputStyle} value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="e.g. Burger King" /></div>
              <div><label style={labelStyle}>Cuisine</label><input required type="text" style={inputStyle} value={formData.cuisine} onChange={e=>setFormData({...formData, cuisine: e.target.value})} placeholder="e.g. Fast Food" /></div>
              <div>
                <label style={labelStyle}>Upload Image (Or leave empty to use URL)</label>
                <input type="file" accept="image/*" style={inputStyle} onChange={e=>setImageFile(e.target.files[0])} />
              </div>
              <div>
                <label style={labelStyle}>Image URL (Fallback if no file)</label>
                <input type="text" style={inputStyle} value={formData.image} onChange={e=>setFormData({...formData, image: e.target.value})} placeholder="https://..." />
              </div>
              <div><label style={labelStyle}>Location</label><input required type="text" style={inputStyle} value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} placeholder="e.g. New York" /></div>
              <div><label style={labelStyle}>Delivery Time</label><input required type="text" style={inputStyle} value={formData.delivery_time} onChange={e=>setFormData({...formData, delivery_time: e.target.value})} placeholder="e.g. 30-40 min" /></div>
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Menu Items</h3>
                <button type="button" onClick={handleAddItem} style={{ padding: '6px 12px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Add Item</button>
              </div>
              {items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                  <input required type="text" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(idx, 'name', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 1.5}} />
                  <input required type="number" step="0.01" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 0.8}} />
                  <input required type="text" placeholder="Category" value={item.category} onChange={(e) => handleItemChange(idx, 'category', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 1}} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <input type="file" accept="image/*" onChange={(e) => handleItemChange(idx, 'imageFile', e.target.files[0])} style={{...inputStyle, marginBottom: 0, fontSize: '0.8rem', padding: '6px'}} />
                    <input type="text" placeholder="Or Image URL" value={item.image} onChange={(e) => handleItemChange(idx, 'image', e.target.value)} style={{...inputStyle, marginBottom: 0, fontSize: '0.8rem', padding: '6px'}} />
                  </div>
                  <input required type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} style={{...inputStyle, marginBottom: 0, flex: 2}} />
                  <button type="button" onClick={() => handleRemoveItem(idx)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <Button type="submit" variant="primary">Save Restaurant</Button>
            </div>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>ID</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Cuisine</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Location</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--secondary-color)' }}>#{r.id}</td>
                <td style={{ padding: '16px 12px', fontWeight: '500' }}>{r.name}</td>
                <td style={{ padding: '16px 12px' }}>{r.cuisine}</td>
                <td style={{ padding: '16px 12px', color: 'var(--text-light)' }}>{r.location}</td>
                <td style={{ padding: '16px 12px' }}>
                  <button onClick={() => handleEdit(r)} style={{ padding: '6px 10px', background: '#e3f2fd', color: '#1976d2', border: 'none', borderRadius: '4px', cursor: 'pointer' }} title="Edit"><FaEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const CustomersView = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const data = await api.getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        alert("Failed to delete user: " + (err.response?.data?.message || err.message));
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}>Customers Management</h1>
      </div>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>ID</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Role</th>
              <th style={{ padding: '16px 12px', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--secondary-color)' }}>#{c.id}</td>
                <td style={{ padding: '16px 12px', fontWeight: '500' }}>{c.name}</td>
                <td style={{ padding: '16px 12px' }}>{c.email}</td>
                <td style={{ padding: '16px 12px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase',
                    backgroundColor: c.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                    color: c.role === 'admin' ? '#1976d2' : '#616161'
                  }}>
                    {c.role}
                  </span>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  {c.role !== 'admin' && (
                    <button onClick={() => handleDelete(c.id)} style={{ padding: '6px 10px', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', cursor: 'pointer' }} title="Remove User"><FaTrash /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};


const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const data = await api.getAdminOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading && activeTab === 'dashboard') return <Loader />;

  const getSidebarItemStyle = (tabName) => ({
    padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', 
    fontWeight: '600', cursor: 'pointer', transition: '0.2s', borderRadius: '8px', marginBottom: '8px',
    backgroundColor: activeTab === tabName ? '#fff0eb' : 'transparent',
    color: activeTab === tabName ? 'var(--primary-color)' : 'var(--text-color)'
  });

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', backgroundColor: '#f8f9fa' }}>
      
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: 'var(--white)', borderRight: '1px solid var(--border-color)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', paddingLeft: '8px' }}>Menu</h3>
        
        <div style={getSidebarItemStyle('dashboard')} onClick={() => setActiveTab('dashboard')}>
          <FaChartBar size={18} /> Dashboard
        </div>
        <div style={getSidebarItemStyle('orders')} onClick={() => setActiveTab('orders')}>
          <FaClipboardList size={18} /> Orders Management
        </div>
        <div style={getSidebarItemStyle('restaurants')} onClick={() => setActiveTab('restaurants')}>
          <FaUtensils size={18} /> Restaurants
        </div>
        <div style={getSidebarItemStyle('customers')} onClick={() => setActiveTab('customers')}>
          <FaUsers size={18} /> Customers
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        {activeTab === 'dashboard' && <DashboardView orders={orders} />}
        {activeTab === 'orders' && <OrdersView orders={orders} refreshOrders={fetchAdminData} />}
        {activeTab === 'restaurants' && <RestaurantsView />}
        {activeTab === 'customers' && <CustomersView />}
      </div>
    </div>
  );
};

export default Admin;
