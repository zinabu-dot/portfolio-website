import { useState, useEffect } from 'react';
import { commentAPI } from '../utils/api';
import UserAuth from './UserAuth';
import toast from 'react-hot-toast';

const ServerComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchComments();
    loadUser();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await commentAPI.getComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const loadUser = () => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    const savedUser = localStorage.getItem('currentUser');
    
    // Check if admin is logged in via admin panel
    if (adminToken) {
      setUser({ username: 'admin', id: 'admin' });
      setIsAdmin(true);
    } else if (userToken && savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      setIsAdmin(user.username === 'admin');
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuth(true);
      return;
    }
    
    if (!newComment.trim()) return;

    try {
      // Use appropriate token based on user type
      const token = isAdmin ? localStorage.getItem('adminToken') : localStorage.getItem('userToken');
      const originalToken = localStorage.getItem('userToken');
      
      if (isAdmin) {
        localStorage.setItem('userToken', token);
      }
      
      const response = await commentAPI.addComment(postId, newComment);
      setComments([...comments, response.data]);
      setNewComment('');
      toast.success('Comment added!');
      
      if (isAdmin && originalToken) {
        localStorage.setItem('userToken', originalToken);
      }
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDelete = async (commentId, commentUserId) => {
    if (!user || (user.id !== commentUserId && !isAdmin)) return;
    
    try {
      await commentAPI.deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
      toast.success('Comment deleted');
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    loadUser();
  };

  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem('adminToken');
    } else {
      localStorage.removeItem('userToken');
      localStorage.removeItem('currentUser');
    }
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>
          💬 Comments ({comments.length})
        </h3>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
            <span>👋 {user.username}</span>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                color: 'var(--text-light)',
                fontSize: '0.75rem'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            Login to Comment
          </button>
        )}
      </div>

      {comments.map(comment => (
        <div key={comment.id} style={{ 
          padding: '1rem', 
          backgroundColor: 'var(--surface)', 
          borderRadius: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: comment.author === 'admin' ? '#f59e0b' : 'var(--primary)', 
                borderRadius: '50%', 
                flexShrink: 0 
              }}></div>
              <strong style={{ fontSize: '0.875rem' }}>
                {comment.author === 'admin' ? '👑 Admin' : comment.author}
              </strong>
              <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
                {new Date(comment.date).toLocaleDateString()}
              </span>
            </div>
            {(isAdmin || (user && user.id === comment.userId)) && (
              <button
                onClick={() => handleDelete(comment.id, comment.userId)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  padding: '0.25rem'
                }}
                title="Delete comment"
              >
                🗑️
              </button>
            )}
          </div>
          <p style={{ color: 'var(--text-light)' }}>{comment.content}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} style={{ 
        padding: '1.5rem', 
        backgroundColor: 'var(--surface)', 
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <textarea
          placeholder={user ? "Write a comment..." : "Login to write a comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!user}
          rows={3}
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--background)',
            color: 'var(--text)',
            resize: 'vertical'
          }}
        />
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ alignSelf: 'flex-start', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          disabled={!user}
        >
          💬 Post Comment
        </button>
      </form>

      {showAuth && (
        <UserAuth
          onLogin={handleLogin}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

export default ServerComments;