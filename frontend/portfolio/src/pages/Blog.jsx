import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon as Calendar, ClockIcon as Clock, TagIcon as Tag, MagnifyingGlassIcon as Search } from '@heroicons/react/24/outline';
import { blogAPI } from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await blogAPI.getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <div style={{ fontSize: '1.125rem', color: 'var(--text-light)' }}>Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Blog</h1>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.125rem', 
            color: 'var(--text-light)', 
            maxWidth: '600px', 
            margin: '0 auto 3rem'
          }}>
            Insights, tutorials, and thoughts on data science, machine learning, and AI.
          </p>

          {/* Search and Filter */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '3rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{ position: 'relative', minWidth: '300px' }}>
              <Search 
                size={20} 
                style={{ 
                  position: 'absolute', 
                  left: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)'
                }} 
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--background)',
                color: 'var(--text)',
                fontSize: '1rem',
                minWidth: '150px'
              }}
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: 'var(--text-light)'
            }}>
              {posts.length === 0 ? 'No blog posts yet.' : 'No posts match your search.'}
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem'
            }}>
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem',
          lineHeight: '1.4'
        }}>
          {post.title}
        </h2>
        
        <p style={{ 
          color: 'var(--text-light)', 
          lineHeight: '1.6', 
          marginBottom: '1rem',
          flex: 1
        }}>
          {post.content}
        </p>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          fontSize: '0.875rem',
          color: 'var(--text-light)',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={16} />
            {formatDate(post.date)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={16} />
            {post.readingTime} min read
          </div>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
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
      </article>
    </Link>
  );
};

export default Blog;