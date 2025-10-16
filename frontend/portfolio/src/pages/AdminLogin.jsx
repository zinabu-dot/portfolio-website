import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon as Lock, UserIcon as User } from '@heroicons/react/24/outline';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('adminToken', response.data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Lock size={24} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Admin Login
          </h1>
          <p style={{ color: 'var(--text-light)' }}>
            Access the blog management dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500' 
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)'
                }} 
              />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500' 
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)'
                }} 
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ 
              justifyContent: 'center',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: 'var(--surface)', 
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--text-light)'
        }}>
          <strong>Demo Credentials:</strong><br />
          Username: admin<br />
          Password: admin123
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;