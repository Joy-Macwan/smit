import { useState, useEffect } from 'react';

const FuturisticDemo = () => {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [matrixLines, setMatrixLines] = useState([]);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    // Generate matrix lines
    const lines = [
      'System.Initialize() → SUCCESS',
      'Neural.Network.Connect() → ONLINE',
      'Quantum.Encryption.Active() → SECURE',
      'Hologram.Display.Ready() → ENABLED'
    ];
    setMatrixLines(lines);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 neural-network">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="holo-dashboard p-6 mb-8 neon-glow">
          <h1 className="text-4xl font-bold text-center text-white mb-4 liquid-metal glow-text">
            🚀 FUTURISTIC UI SHOWCASE 🚀
          </h1>
          <p className="text-center text-cyan-400 text-lg animate-pulse">
            Experience the Future of User Interface Design
          </p>
        </div>

        {/* Navigation */}
        <div className="quantum-nav mb-8">
          {['dashboard', 'components', 'effects', 'matrix'].map((tab) => (
            <button
              key={tab}
              className={`quantum-nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Quantum Cards */}
            <div className="quantum-card cyberpunk-glow">
              <div className="cyber-stats-title">Active Users</div>
              <div className="cyber-stats-value">1,337</div>
              <div className="cyber-stats-change">+42% from last cycle</div>
            </div>

            <div className="quantum-card holographic-animate">
              <div className="cyber-stats-title">System Load</div>
              <div className="cyber-stats-value">73%</div>
              <div className="neon-progress mt-4">
                <div 
                  className="neon-progress-fill" 
                  style={{width: '73%'}}
                ></div>
              </div>
            </div>

            <div className="quantum-card particle-system">
              <div className="cyber-stats-title">Neural Network</div>
              <div className="cyber-stats-value">ONLINE</div>
              <div className="cyber-stats-change text-green-400">All nodes connected</div>
            </div>

            <div className="quantum-card glitch-effect">
              <div className="cyber-stats-title">Quantum State</div>
              <div className="cyber-stats-value">STABLE</div>
              <div className="cyber-stats-change">Coherence maintained</div>
            </div>

            <div className="quantum-card energy-wave">
              <div className="cyber-stats-title">Power Level</div>
              <div className="cyber-stats-value">{progress}%</div>
              <div className="neon-progress mt-4">
                <div 
                  className="neon-progress-fill" 
                  style={{width: `${progress}%`}}
                ></div>
              </div>
            </div>

            <div className="quantum-card quantum-tunnel">
              <div className="cyber-stats-title">Dimensions</div>
              <div className="cyber-stats-value">11</div>
              <div className="cyber-stats-change">Parallel universes accessed</div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-8">
            {/* Buttons */}
            <div className="quantum-card">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Cyber Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="cyber-btn neon-pulse">Initialize</button>
                <button className="cyber-btn holographic-animate">Connect</button>
                <button className="cyber-btn" onClick={() => setShowModal(true)}>
                  Launch Modal
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="quantum-card">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Holographic Inputs</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  className="holo-input w-full" 
                  placeholder="Enter neural command..."
                />
                <input 
                  type="password" 
                  className="holo-input w-full" 
                  placeholder="Quantum encryption key..."
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="quantum-card">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Cyber Timeline</h3>
              <div className="cyber-timeline">
                <div className="cyber-timeline-item">
                  <div className="cyber-timeline-content">
                    <h4 className="text-cyan-400 font-bold">System Boot</h4>
                    <p className="text-gray-300">Neural networks initialized successfully</p>
                  </div>
                </div>
                <div className="cyber-timeline-item">
                  <div className="cyber-timeline-content">
                    <h4 className="text-cyan-400 font-bold">Quantum Sync</h4>
                    <p className="text-gray-300">Parallel dimensions synchronized</p>
                  </div>
                </div>
                <div className="cyber-timeline-item">
                  <div className="cyber-timeline-content">
                    <h4 className="text-cyan-400 font-bold">AI Consciousness</h4>
                    <p className="text-gray-300">Artificial intelligence achieved self-awareness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Effects Tab */}
        {activeTab === 'effects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="quantum-card neon-pulse">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Neon Pulse</h3>
              <p className="text-gray-300">Pulsating neon glow effect</p>
            </div>

            <div className="quantum-card holographic-animate">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Holographic</h3>
              <p className="text-gray-300">Shifting holographic colors</p>
            </div>

            <div className="quantum-card particle-system">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Particle System</h3>
              <p className="text-gray-300">Floating particle animation</p>
            </div>

            <div className="quantum-card glitch-effect">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Glitch Effect</h3>
              <p className="text-gray-300">Digital corruption visual</p>
            </div>

            <div className="quantum-card energy-wave">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Energy Wave</h3>
              <p className="text-gray-300">Flowing energy animation</p>
            </div>

            <div className="quantum-card quantum-tunnel">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Quantum Tunnel</h3>
              <p className="text-gray-300">3D tunnel perspective</p>
            </div>
          </div>
        )}

        {/* Matrix Tab */}
        {activeTab === 'matrix' && (
          <div className="quantum-card">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Matrix Terminal</h3>
            <div className="matrix-display">
              {matrixLines.map((line, index) => (
                <div key={index} className="matrix-line">
                  {line}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <input 
                type="text" 
                className="holo-input w-full" 
                placeholder="root@matrix:~$ _"
              />
            </div>
          </div>
        )}

        {/* Holographic Modal */}
        {showModal && (
          <div className="holo-modal" onClick={() => setShowModal(false)}>
            <div className="holo-modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4 liquid-metal">
                Quantum Portal Activated
              </h2>
              <p className="text-gray-300 mb-6">
                You have successfully accessed the quantum dimension. Neural pathways 
                are now synchronized with the cosmic consciousness matrix.
              </p>
              <div className="flex gap-4">
                <button 
                  className="cyber-btn"
                  onClick={() => setShowModal(false)}
                >
                  Close Portal
                </button>
                <button className="cyber-btn neon-pulse">
                  Enter Matrix
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer with matrix rain */}
        <div className="mt-12 text-center">
          <div className="matrix-rain-container">
            <p className="text-cyan-400 font-mono text-sm opacity-80">
              &copy; 2024 SMIT - Store Management & Inventory Tracking System v2.0
            </p>
            <p className="text-gray-500 font-mono text-xs mt-2">
              Powered by Quantum Neural Networks & Advanced AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticDemo;
