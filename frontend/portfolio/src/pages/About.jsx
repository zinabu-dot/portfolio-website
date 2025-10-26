import { ArrowDownTrayIcon as Download, TrophyIcon as Award, UsersIcon as Users } from '@heroicons/react/24/outline';

const Coffee = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>;

const About = () => {
  const stats = [
    { icon: Award, number: '$2M+', label: 'Revenue Generated' },
    { icon: Users, number: '40%', label: 'Cost Reduction' },
    { icon: Coffee, number: '50+', label: 'AI Models Deployed' }
  ];

  const experience = [
    {
      title: 'Senior AI Engineer',
      company: 'AHV International',
      period: '2023 - Present',
      description: 'Led development of LLM-powered customer service automation, reducing response time by 85% and saving $500K annually. Built computer vision system for quality control with 99.2% accuracy.'
    },
    {
      title: 'Machine Learning Engineer',
      company: 'in3',
      period: '2022 - 2023',
      description: 'Architected real-time recommendation engine serving 2M+ users, increasing conversion rates by 32%. Deployed MLOps pipeline reducing model deployment time from weeks to hours.'
    }
  ];

  return (
    <div className="fade-in">
      <section className="section">
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                About Me
              </h1>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                AI Engineer with 5+ years building production-ready machine learning systems that generate 
                measurable ROI. I've deployed models serving millions of users, reduced operational costs by 40%, 
                and built AI solutions that increased revenue by $2M+ annually.
              </p>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '2rem', color: 'var(--text-light)' }}>
                Expert in LLMs, Computer Vision, and MLOps. I bridge the gap between cutting-edge AI research 
                and real-world business applications, ensuring your AI investments deliver concrete results.
              </p>
              <a 
                href="/resume.pdf" 
                download="AI_Engineer_Resume.pdf"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
              >
                <Download size={20} />
                Download Resume
              </a>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--surface)', 
              borderRadius: '1rem', 
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '2rem'
              }}>
                {stats.map(({ icon: Icon, number, label }) => (
                  <div key={label}>
                    <Icon size={32} style={{ color: 'var(--primary)', margin: '0 auto 0.5rem' }} />
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                      {number}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ backgroundColor: 'var(--surface)', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {experience.map((exp, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                gap: '2rem', 
                marginBottom: '3rem',
                paddingBottom: '2rem',
                borderBottom: index < experience.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <div style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: 'white',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  marginTop: '0.5rem',
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {exp.title}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '500' }}>{exp.company}</span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{exp.period}</span>
                  </div>
                  <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem'
          }}>
            {[
              { category: 'AI & LLMs', skills: ['GPT-4', 'Claude', 'LangChain', 'RAG Systems'] },
              { category: 'ML Frameworks', skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'OpenAI API'] },
              { category: 'MLOps & Cloud', skills: ['AWS SageMaker', 'Docker', 'Kubernetes', 'MLflow'] },
              { category: 'Programming', skills: ['Python', 'SQL', 'JavaScript', 'FastAPI'] }
            ].map(({ category, skills }) => (
              <div key={category} className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.map(skill => (
                    <span key={skill} style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;