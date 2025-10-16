import { ArrowTopRightOnSquareIcon as ExternalLink } from '@heroicons/react/24/outline';

const Github = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" /></svg>;

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Customer Churn Prediction',
      description: 'Machine learning model to predict customer churn using ensemble methods. Achieved 94% accuracy with feature engineering and hyperparameter tuning.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
      github: 'https://github.com/yourusername/churn-prediction',
      demo: 'https://churn-demo.vercel.app',
      featured: true
    },
    {
      id: 2,
      title: 'NLP Sentiment Analysis',
      description: 'Real-time sentiment analysis of social media posts using BERT and transformer models. Deployed as a REST API with Docker.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
      tech: ['Python', 'BERT', 'FastAPI', 'Docker'],
      github: 'https://github.com/yourusername/sentiment-analysis',
      demo: 'https://sentiment-api.herokuapp.com',
      featured: true
    },
    {
      id: 3,
      title: 'Sales Forecasting Dashboard',
      description: 'Interactive dashboard for sales forecasting using time series analysis. Built with Streamlit and deployed on AWS.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      tech: ['Python', 'Streamlit', 'Prophet', 'AWS'],
      github: 'https://github.com/yourusername/sales-dashboard',
      demo: 'https://sales-forecast.streamlit.app',
      featured: false
    },
    {
      id: 4,
      title: 'Image Classification API',
      description: 'Deep learning API for image classification using CNN. Supports multiple image formats and batch processing.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop',
      tech: ['TensorFlow', 'Keras', 'FastAPI', 'OpenCV'],
      github: 'https://github.com/yourusername/image-classifier',
      demo: 'https://image-api.vercel.app',
      featured: false
    },
    {
      id: 5,
      title: 'Recommendation System',
      description: 'Collaborative filtering recommendation system for e-commerce. Implemented using matrix factorization techniques.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      tech: ['Python', 'Surprise', 'NumPy', 'Flask'],
      github: 'https://github.com/yourusername/recommendation-system',
      demo: 'https://recommender-demo.herokuapp.com',
      featured: false
    },
    {
      id: 6,
      title: 'Data Pipeline Automation',
      description: 'Automated ETL pipeline for processing large datasets. Built with Apache Airflow and deployed on cloud infrastructure.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=300&fit=crop',
      tech: ['Python', 'Airflow', 'PostgreSQL', 'AWS'],
      github: 'https://github.com/yourusername/data-pipeline',
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
            maxWidth: '600px', 
            margin: '0 auto 3rem'
          }}>
            Here are some of my featured projects showcasing my expertise in data science, 
            machine learning, and AI development.
          </p>

          {/* Featured Projects */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
              Featured Projects
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
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
      height: featured ? 'auto' : '400px',
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
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
          {project.title}
        </h3>
        <p style={{ 
          color: 'var(--text-light)', 
          lineHeight: '1.6', 
          marginBottom: '1rem',
          flex: 1
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
        
        <div style={{ display: 'flex', gap: '1rem' }}>
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