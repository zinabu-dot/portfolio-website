import { useState, useEffect } from 'react';


const SimpleComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`comments-${postId}`);
    if (saved) setComments(JSON.parse(saved));
    
    // Check if user is admin
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
    
    // Load saved username
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setNewComment(prev => ({ ...prev, name: savedUser }));
    }
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.comment.trim()) return;

    const comment = {
      id: Date.now(),
      name: newComment.name,
      comment: newComment.comment,
      date: new Date().toISOString()
    };

    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(updated));
    setNewComment({ name: '', comment: '' });
  };

  const handleDeleteComment = (commentId, commentName) => {
    const currentUser = localStorage.getItem('currentUser') || '';
    
    // Allow deletion if user is admin or comment owner
    if (isAdmin || currentUser === commentName) {
      const updated = comments.filter(c => c.id !== commentId);
      setComments(updated);
      localStorage.setItem(`comments-${postId}`, JSON.stringify(updated));
    }
  };

  const handleUserChange = (name) => {
    localStorage.setItem('currentUser', name);
    setNewComment({ ...newComment, name });
  };

  return (
    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
        💬 Comments ({comments.length})
      </h3>

      {comments.map(comment => (
        <div key={comment.id} style={{ 
          padding: '1rem', 
          backgroundColor: 'var(--surface)', 
          borderRadius: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--primary)', borderRadius: '50%', flexShrink: 0 }}></div>
              <strong style={{ fontSize: '0.875rem' }}>{comment.name}</strong>
              <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
                {new Date(comment.date).toLocaleDateString()}
              </span>
            </div>
            {(isAdmin || localStorage.getItem('currentUser') === comment.name) && (
              <button
                onClick={() => handleDeleteComment(comment.id, comment.name)}
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
          <p style={{ color: 'var(--text-light)' }}>{comment.comment}</p>
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
        <input
          type="text"
          placeholder="Your name"
          value={newComment.name}
          onChange={(e) => handleUserChange(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--background)',
            color: 'var(--text)'
          }}
        />
        <textarea
          placeholder="Write a comment..."
          value={newComment.comment}
          onChange={(e) => setNewComment({...newComment, comment: e.target.value})}
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
        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
          💬 Post Comment
        </button>
      </form>
    </div>
  );
};

export default SimpleComments;