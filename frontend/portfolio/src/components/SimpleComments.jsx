import { useState, useEffect } from 'react';
import { UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const SimpleComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });

  useEffect(() => {
    const saved = localStorage.getItem(`comments-${postId}`);
    if (saved) setComments(JSON.parse(saved));
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

  return (
    <div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ChatBubbleLeftIcon className="w-5 h-5" />
        Comments ({comments.length})
      </h3>

      {comments.map(comment => (
        <div key={comment.id} style={{ 
          padding: '1rem', 
          backgroundColor: 'var(--surface)', 
          borderRadius: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <UserIcon className="w-4 h-4" />
            <strong>{comment.name}</strong>
            <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
              {new Date(comment.date).toLocaleDateString()}
            </span>
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
          onChange={(e) => setNewComment({...newComment, name: e.target.value})}
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
        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default SimpleComments;