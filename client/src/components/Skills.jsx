import React, { useState, useEffect } from 'react';
// Removed unused lucide-react icons to address ESLint no-unused-vars warnings
import { getSkills } from '../utils/api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback to static data if API fails
        setSkills([
          { _id: '1', name: 'MongoDB', description: 'NoSQL database design & optimization', icon: '🍃', color: 'bg-green-500' },
          { _id: '2', name: 'Express.js', description: 'RESTful API development', icon: '⚡', color: 'bg-gray-700' },
          { _id: '3', name: 'React', description: 'Modern UI with hooks & context', icon: '⚛️', color: 'bg-blue-500' },
          { _id: '4', name: 'Node.js', description: 'Backend server architecture', icon: '🟢', color: 'bg-green-600' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-purple-400">Loading skills...</div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Technical Skills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.isArray(skills) && skills.map((skill) => (
            <div key={skill._id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 group">
              <div className="flex items-start gap-4">
                <div className={`${skill.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <div className="text-3xl">{skill.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
                  <p className="text-gray-400">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold mb-4">Additional Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {['Redux', 'JWT', 'Socket.io', 'Git', 'REST APIs', 'GraphQL', 'Docker', 'AWS', 'Tailwind CSS', 'Material-UI'].map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm border border-purple-500/30">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}