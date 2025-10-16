import { Link } from 'react-router-dom';
import { ArrowRightIcon as ArrowRight } from '@heroicons/react/24/outline';

const Code = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const Database = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
const Brain = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;

const Home = () => {
  const skills = [
    { icon: Code, title: 'Machine Learning', desc: 'Python, TensorFlow, PyTorch' },
    { icon: Database, title: 'Data Analysis', desc: 'SQL, Pandas, NumPy' },
    { icon: Brain, title: 'AI & NLP', desc: 'Natural Language Processing' }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '6rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: '700', 
            marginBottom: '1rem',
            lineHeight: '1.1'
          }}>
            Data Scientist | AI & NLP Specialist
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem', 
            opacity: '0.9',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Transforming data into actionable insights through machine learning and artificial intelligence
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn btn-secondary" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
              View My Work <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn" style={{ backgroundColor: 'transparent', border: '2px solid white' }}>
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {skills.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card" style={{ textAlign: 'center' }}>
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
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-light)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: 'var(--surface)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>
            Ready to collaborate?
          </h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Let's discuss how data science can drive your next project forward
          </p>
          <Link to="/contact" className="btn btn-primary">
            Get In Touch <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;