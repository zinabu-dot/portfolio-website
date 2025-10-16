import { useState } from 'react';
import { EnvelopeIcon as Mail, PhoneIcon as Phone, MapPinIcon as MapPin, PaperAirplaneIcon as Send } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { contactAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactAPI.sendMessage(formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'zinabu.melese.dev@gmail.com',
      href: 'mailto:zinabu.melese.dev@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+31 (686) 241-137',
      href: 'tel:+31686241137'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Amsterdam, Netherlands',
      href: null
    }
  ];

  return (
    <div className="fade-in">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Get In Touch</h1>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.125rem', 
            color: 'var(--text-light)', 
            maxWidth: '600px', 
            margin: '0 auto 3rem'
          }}>
            Have a project in mind or want to discuss data science opportunities? 
            I'd love to hear from you!
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Contact Information */}
            <div>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '2rem' 
              }}>
                Contact Information
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {contactInfo.map(({ icon: Icon, title, value, href }) => (
                  <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        marginBottom: '0.25rem' 
                      }}>
                        {title}
                      </h3>
                      {href ? (
                        <a 
                          href={href}
                          style={{ 
                            color: 'var(--text-light)', 
                            textDecoration: 'none' 
                          }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                          onMouseLeave={(e) => e.target.style.color = 'var(--text-light)'}
                        >
                          {value}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-light)' }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                marginTop: '2rem', 
                padding: '1.5rem', 
                backgroundColor: 'var(--surface)', 
                borderRadius: '0.75rem' 
              }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem' 
                }}>
                  Let's Connect
                </h3>
                <p style={{ 
                  color: 'var(--text-light)', 
                  lineHeight: '1.6' 
                }}>
                  I'm always interested in discussing new opportunities, 
                  collaborating on exciting projects, or simply chatting about 
                  the latest trends in data science and AI.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '1.5rem' 
              }}>
                Send Message
              </h2>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '500' 
                    }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '500' 
                  }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
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
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--background)',
                      color: 'var(--text)',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ 
                    justifyContent: 'center',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        border: '2px solid transparent',
                        borderTop: '2px solid currentColor',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Contact;