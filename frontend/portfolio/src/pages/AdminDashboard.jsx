import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon as Plus, PencilIcon as Edit, TrashIcon as Trash2, ArrowRightOnRectangleIcon as LogOut, CheckIcon as Save, XMarkIcon as X } from '@heroicons/react/24/outline';
import { blogAPI } from '../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await blogAPI.getAdminPosts();
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to fetch posts');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editingPost) {
        await blogAPI.updatePost(editingPost.id, postData);
        toast.success('Post updated successfully!');
      } else {
        await blogAPI.createPost(postData);
        toast.success('Post created successfully!');
      }
      
      setFormData({ title: '', content: '', tags: '' });
      setIsEditing(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      tags: post.tags.join(', ')
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await blogAPI.deletePost(id);
      toast.success('Post deleted successfully!');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '', tags: '' });
    setIsEditing(false);
    setEditingPost(null);
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>
          Blog Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            New Post
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              onClick={handleCancel}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-light)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500' 
              }}>
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500' 
              }}>
                Content (Markdown supported)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={20}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  resize: 'vertical',
                  minHeight: '400px'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500' 
              }}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g. machine learning, python, data science"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={20} />
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          All Posts ({posts.length})
        </h2>
        
        {posts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: 'var(--text-light)'
          }}>
            No posts yet. Create your first post!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map(post => (
              <div key={post.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                gap: '1rem'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {post.title}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    fontSize: '0.875rem',
                    color: 'var(--text-light)',
                    flexWrap: 'wrap'
                  }}>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readingTime} min read</span>
                    {post.tags.length > 0 && (
                      <span>Tags: {post.tags.join(', ')}</span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(post)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--primary)',
                      borderRadius: '0.25rem',
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      color: 'var(--primary)',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #ef4444',
                      borderRadius: '0.25rem',
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      color: '#ef4444',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;