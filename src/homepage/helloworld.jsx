import { useState } from 'react';
import { FiWifi, FiBriefcase, FiBook, FiShoppingBag, FiHeart, FiShield, FiHelpCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ResourceSection = ({ icon: Icon, title, resources, partners, isOpen, toggleOpen }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
      <button
        onClick={toggleOpen}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="bg-c4p/10 p-3 rounded-xl">
            <Icon className="text-2xl text-c4p" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        {isOpen ? (
          <FiChevronUp className="text-2xl text-gray-400" />
        ) : (
          <FiChevronDown className="text-2xl text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2">
          {/* Free Resources */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Resources</h3>
            <div className="grid gap-3">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gradient-to-r from-c4p/5 to-transparent border-l-4 border-c4p rounded-lg hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{resource.name}</h4>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Recommended Partners (if any) */}
          {partners && partners.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommended Partners</h3>
              <p className="text-xs text-gray-500 mb-4 italic">These are trusted organizations we work with</p>
              <div className="grid gap-3">
                {partners.map((partner, index) => (
                  <a
                    key={index}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function HelloWorld() {
  const [openSections, setOpenSections] = useState({
    internet: true,
    jobs: false,
    learning: false,
    benefits: false,
    healthcare: false,
    safety: false,
    help: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    {
      id: 'internet',
      icon: FiWifi,
      title: 'Get Internet',
      resources: [
        {
          name: 'Shield Internet - $14.89/month',
          description: 'Unlimited internet from Computers 4 People, our nonprofit program',
          url: 'https://www.computers4people.org/shield'
        },
        {
          name: 'Lifeline Program',
          description: 'Free or discounted phone and internet service',
          url: 'https://www.fcc.gov/lifeline-consumers'
        },
        {
          name: 'Find Internet in Your Area',
          description: 'Compare internet providers and prices where you live',
          url: 'https://broadbandnow.com/'
        }
      ],
      partners: []
    },
    {
      id: 'jobs',
      icon: FiBriefcase,
      title: 'Find a Job',
      resources: [
        {
          name: 'Indeed',
          description: 'Search millions of jobs and apply online',
          url: 'https://www.indeed.com'
        },
        {
          name: 'LinkedIn',
          description: 'Build your professional network and find opportunities',
          url: 'https://www.linkedin.com'
        },
        {
          name: 'CareerOneStop',
          description: 'Government job search and career resources',
          url: 'https://www.careeronestop.org'
        },
        {
          name: 'Google Career Certificates',
          description: 'Free training programs for in-demand jobs',
          url: 'https://grow.google/certificates/'
        }
      ],
      partners: []
    },
    {
      id: 'learning',
      icon: FiBook,
      title: 'School & Learning',
      resources: [
        {
          name: 'Khan Academy',
          description: 'Free courses in math, science, and more - K-12 through college',
          url: 'https://www.khanacademy.org'
        },
        {
          name: 'Coursera',
          description: 'Free online courses from top universities',
          url: 'https://www.coursera.org'
        },
        {
          name: 'edX',
          description: 'Free university-level courses online',
          url: 'https://www.edx.org'
        },
        {
          name: 'YouTube Learning',
          description: 'Free educational videos on every topic',
          url: 'https://www.youtube.com/learning'
        }
      ],
      partners: []
    },
    {
      id: 'benefits',
      icon: FiShoppingBag,
      title: 'Food & Benefits',
      resources: [
        {
          name: 'SNAP (Food Stamps)',
          description: 'Apply for food assistance benefits online',
          url: 'https://www.fns.usda.gov/snap'
        },
        {
          name: 'Benefits.gov',
          description: 'Find all government benefits you qualify for',
          url: 'https://www.benefits.gov'
        },
        {
          name: 'Feeding America',
          description: 'Find food banks and meal programs near you',
          url: 'https://www.feedingamerica.org/find-your-local-foodbank'
        },
        {
          name: '211',
          description: 'Call or text 211 for local assistance programs',
          url: 'https://www.211.org'
        }
      ],
      partners: []
    },
    {
      id: 'healthcare',
      icon: FiHeart,
      title: 'Healthcare',
      resources: [
        {
          name: 'Healthcare.gov',
          description: 'Find affordable health insurance',
          url: 'https://www.healthcare.gov'
        },
        {
          name: 'Medicaid',
          description: 'Free or low-cost health coverage',
          url: 'https://www.medicaid.gov'
        },
        {
          name: 'FindAHealthCenter.gov',
          description: 'Find free or low-cost clinics near you',
          url: 'https://findahealthcenter.hrsa.gov'
        },
        {
          name: 'Mental Health Resources',
          description: 'Free mental health support - call 988 anytime',
          url: 'https://988lifeline.org'
        }
      ],
      partners: []
    },
    {
      id: 'safety',
      icon: FiShield,
      title: 'Online Safety',
      resources: [
        {
          name: 'Staying Safe Online',
          description: 'Tips to protect yourself from scams and fraud',
          url: 'https://staysafeonline.org/online-safety-basics/'
        },
        {
          name: 'Create Strong Passwords',
          description: 'How to protect your accounts',
          url: 'https://consumer.ftc.gov/articles/how-create-strong-passwords'
        },
        {
          name: 'Spot Scams',
          description: 'Learn to recognize and avoid common scams',
          url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams'
        },
        {
          name: 'Privacy Settings Guide',
          description: 'Control your privacy on social media',
          url: 'https://www.consumer.ftc.gov/articles/0272-how-keep-your-personal-information-secure'
        }
      ],
      partners: []
    },
    {
      id: 'help',
      icon: FiHelpCircle,
      title: 'Get Help',
      resources: [
        {
          name: 'Computer Basics',
          description: 'Free tutorials on how to use your computer',
          url: 'https://edu.gcfglobal.org/en/topics/computer-basics/'
        },
        {
          name: 'Microsoft Support',
          description: 'Help with Windows and Microsoft Office',
          url: 'https://support.microsoft.com'
        },
        {
          name: 'Google Help',
          description: 'Learn how to use Google tools',
          url: 'https://support.google.com'
        },
        {
          name: 'Contact Computers 4 People',
          description: 'Reach out to our team for computer support',
          url: 'https://www.computers4people.org/contact'
        }
      ],
      partners: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-c4p to-c4p-hover text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to Your Computer
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-2">
            Free resources to help you succeed
          </p>
          <p className="text-base sm:text-lg text-white/80">
            Click any section below to get started
          </p>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sections.slice(0, 4).map((section) => (
            <button
              key={section.id}
              onClick={() => {
                toggleSection(section.id);
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all hover:scale-105"
            >
              <section.icon className="text-3xl text-c4p mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">{section.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <ResourceSection
                icon={section.icon}
                title={section.title}
                resources={section.resources}
                partners={section.partners}
                isOpen={openSections[section.id]}
                toggleOpen={() => toggleSection(section.id)}
              />
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
            <p className="text-gray-700 mb-2">
              <strong>Need help navigating these resources?</strong>
            </p>
            <p className="text-gray-600 text-sm">
              Contact Computers 4 People at (201) 669-3062 or{' '}
              <a href="https://www.computers4people.org/contact" className="text-c4p underline font-medium">
                visit our contact page
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
