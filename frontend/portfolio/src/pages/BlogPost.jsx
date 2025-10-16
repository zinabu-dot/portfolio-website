import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon as Calendar, ClockIcon as Clock, TagIcon as Tag, ArrowLeftIcon as ArrowLeft, ShareIcon as Share2, HeartIcon as Heart } from '@heroicons/react/24/outline';
// import Giscus from '@giscus/react';
import ServerComments from '../components/ServerComments';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { blogAPI } from '../utils/api';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetchPost();
    loadLikes();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await blogAPI.getPost(id);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLikes = () => {
    const savedLikes = localStorage.getItem(`post-${id}-likes`) || '0';
    const userLiked = localStorage.getItem(`post-${id}-liked`) === 'true';
    setLikes(parseInt(savedLikes));
    setHasLiked(userLiked);
  };

  const handleLike = () => {
    const newLikes = hasLiked ? likes - 1 : likes + 1;
    const newHasLiked = !hasLiked;
    
    setLikes(newLikes);
    setHasLiked(newHasLiked);
    
    localStorage.setItem(`post-${id}-likes`, newLikes.toString());
    localStorage.setItem(`post-${id}-liked`, newHasLiked.toString());
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <div style={{ fontSize: '1.125rem', color: 'var(--text-light)' }}>Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '1.125rem', color: 'var(--text-light)' }}>Post not found</div>
        <Link to="/blog" className="btn btn-primary">
          <ArrowLeft size={20} />
          Back to Blog
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fade-in">
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <Link 
          to="/blog" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--primary)',
            textDecoration: 'none',
            marginBottom: '2rem',
            fontSize: '0.875rem'
          }}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: '700', 
            lineHeight: '1.2',
            marginBottom: '1rem'
          }}>
            {post.title}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem', 
            fontSize: '0.875rem',
            color: 'var(--text-light)',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} />
              {formatDate(post.date)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} />
              {post.readingTime} min read
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border)'
          }}>
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: hasLiked ? 'var(--primary)' : 'var(--text)',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={16} fill={hasLiked ? 'currentColor' : 'none'} />
              {likes}
            </button>
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: 'var(--text)',
                transition: 'all 0.2s ease'
              }}
            >
              <Share2 size={16} />
              Share
            </button>
          </div>
        </header>

        <div style={{ 
          lineHeight: '1.7', 
          fontSize: '1.125rem',
          marginBottom: '3rem'
        }}>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code 
                    className={className} 
                    style={{
                      backgroundColor: 'var(--surface)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.875em'
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div style={{ 
          borderTop: '1px solid var(--border)', 
          paddingTop: '2rem'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1rem' 
          }}>
            Comments
          </h3>
          <ServerComments postId={post.id} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;