import { ArrowTopRightOnSquareIcon as ExternalLink } from '@heroicons/react/24/outline';

const Github = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" /></svg>;

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Enterprise RAG System for Legal Document Analysis',
      problem: 'Law firm processing 10,000+ legal documents monthly with 40+ hours/week spent on manual research',
      solution: 'Built production RAG system using LangChain, ChromaDB, and GPT-4 with custom legal embeddings and citation tracking',
      impact: '85% reduction in research time, 99.2% accuracy in document retrieval, $2M+ annual cost savings',
      description: 'Enterprise-grade RAG system that revolutionized legal document analysis for a Fortune 500 law firm. Implemented advanced chunking strategies, semantic search, and real-time citation verification.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop',
      tech: ['LangChain', 'GPT-4', 'ChromaDB', 'FastAPI', 'Docker', 'Kubernetes', 'Azure'],
      github: 'https://github.com/yourusername/legal-rag-system',
      demo: 'https://legal-rag-demo.vercel.app',
      featured: true
    },
    {
      id: 2,
      title: 'Real-time MLOps Pipeline for Fraud Detection',
      problem: 'Financial institution losing $50M annually to fraud with 30-second detection latency causing customer friction',
      solution: 'Deployed real-time ML pipeline using Kafka, MLflow, and ensemble models with sub-100ms inference and automated retraining',
      impact: '92% fraud detection rate, 50ms average latency, 40% reduction in false positives, $30M+ losses prevented',
      description: 'Production MLOps system processing 1M+ transactions daily with real-time feature engineering, model monitoring, and automated drift detection.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop',
      tech: ['Python', 'Kafka', 'MLflow', 'XGBoost', 'Redis', 'Prometheus', 'Grafana', 'AWS SageMaker'],
      github: 'https://github.com/yourusername/fraud-detection-mlops',
      demo: 'https://fraud-detection-demo.herokuapp.com',
      featured: true
    },
    {
      id: 3,
      title: 'Multi-Modal AI Assistant for Healthcare',
      problem: 'Hospital radiologists spending 60% of time on routine image analysis, creating 2-week diagnosis backlogs',
      solution: 'Developed multi-modal AI combining vision transformers and LLMs for automated medical image analysis with natural language reporting',
      impact: '70% faster diagnosis, 95% accuracy in anomaly detection, 2-week backlog eliminated, improved patient outcomes',
      description: 'HIPAA-compliant AI system integrating computer vision and NLP for automated medical image analysis with explainable AI features.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      tech: ['PyTorch', 'Transformers', 'DICOM', 'FastAPI', 'PostgreSQL', 'Docker', 'HIPAA Compliance'],
      github: 'https://github.com/yourusername/medical-ai-assistant',
      demo: 'https://medical-ai-demo.streamlit.app',
      featured: false
    },
    {
      id: 4,
      title: 'Intelligent Supply Chain Optimization Platform',
      problem: 'Manufacturing company facing $15M inventory costs and 25% stockout rate due to poor demand forecasting',
      solution: 'Built AI-powered platform using graph neural networks and time series forecasting with real-time optimization algorithms',
      impact: '35% inventory cost reduction, 90% stockout reduction, $8M annual savings, 99.5% forecast accuracy',
      description: 'End-to-end supply chain platform with predictive analytics, automated procurement, and real-time inventory optimization across 200+ locations.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=300&fit=crop',
      tech: ['PyTorch Geometric', 'Prophet', 'Apache Spark', 'Airflow', 'Snowflake', 'Tableau', 'GCP'],
      github: 'https://github.com/yourusername/supply-chain-ai',
      demo: 'https://supply-chain-demo.vercel.app',
      featured: false
    },
    {
      id: 5,
      title: 'Conversational AI for Customer Support Automation',
      problem: 'E-commerce platform handling 50,000+ daily support tickets with 24-hour response time and 60% customer satisfaction',
      solution: 'Deployed fine-tuned LLM with retrieval augmentation, sentiment analysis, and automated escalation workflows',
      impact: '80% ticket automation, 2-minute average response time, 95% customer satisfaction, $5M operational savings',
      description: 'Production conversational AI system with multi-language support, emotion detection, and seamless human handoff capabilities.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop',
      tech: ['GPT-4', 'LangChain', 'Pinecone', 'Streamlit', 'MongoDB', 'WebSocket', 'Kubernetes'],
      github: 'https://github.com/yourusername/conversational-ai-support',
      demo: 'https://ai-support-demo.herokuapp.com',
      featured: false
    },
    {
      id: 6,
      title: 'Automated Code Review & Security Scanner',
      problem: 'Tech company with 200+ developers experiencing 40% of bugs reaching production and security vulnerabilities in 15% of releases',
      solution: 'Built AI-powered code analysis platform using AST parsing, static analysis, and LLM-based vulnerability detection',
      impact: '60% bug reduction, 95% security vulnerability detection, 50% faster code reviews, zero critical security incidents',
      description: 'Enterprise code analysis platform with real-time scanning, automated fix suggestions, and integration with CI/CD pipelines.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop',
      tech: ['Python', 'AST', 'CodeQL', 'GitHub Actions', 'SonarQube', 'Docker', 'Elasticsearch'],
      github: 'https://github.com/yourusername/ai-code-reviewer',
      demo: null,
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="fade-in">
      <section className="section">
        <div className="container">
          <h1 className="section-title">My Projects</h1>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.125rem', 
            color: 'var(--text-light)', 
            maxWidth: '700px', 
            margin: '0 auto 3rem'
          }}>
            Real-world AI solutions that delivered measurable business impact. Each project showcases 
            problem-solving approach, technical implementation, and quantified results.
          </p>

          {/* Featured Projects */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
              Featured Projects
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
              gap: '2rem'
            }}>
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>

          {/* Other Projects */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
              Other Projects
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
              gap: '1.5rem'
            }}>
              {otherProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectCard = ({ project, featured = false }) => {
  return (
    <div className="card" style={{ 
      overflow: 'hidden', 
      padding: '0',
      height: featured ? 'auto' : 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        height: featured ? '250px' : '200px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={project.image} 
          alt={project.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        {featured && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            Featured
          </div>
        )}
      </div>
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          {project.title}
        </h3>
        
        {/* Case Study Structure */}
        {featured && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Problem</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', lineHeight: '1.5' }}>{project.problem}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solution</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', lineHeight: '1.5' }}>{project.solution}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Impact</h4>
              <p style={{ color: 'var(--primary)', fontSize: '0.875rem', lineHeight: '1.5', fontWeight: '500' }}>{project.impact}</p>
            </div>
          </div>
        )}
        
        <p style={{ 
          color: 'var(--text-light)', 
          lineHeight: '1.6', 
          marginBottom: '1.5rem',
          fontSize: featured ? '0.875rem' : '0.9rem'
        }}>
          {project.description}
        </p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tech.map(tech => (
              <span key={tech} style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--primary)',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            <Github size={16} />
            Code
          </a>
          {project.demo && (
            <a 
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;