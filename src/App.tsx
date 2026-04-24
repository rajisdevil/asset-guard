import { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, Database, FileCode, FileImage, Key, 
  Lock, RefreshCw, LayoutDashboard, Search, Fingerprint 
} from 'lucide-react';
import './index.css';

interface Asset {
  id: string;
  name: string;
  type: 'code' | 'database' | 'key' | 'media';
  status: 'vulnerable' | 'secure';
  lastScanned: string;
}

const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'User_Database_Backup.sql', type: 'database', status: 'vulnerable', lastScanned: '2 mins ago' },
  { id: '2', name: 'AWS_Production_Keys.pem', type: 'key', status: 'vulnerable', lastScanned: '5 mins ago' },
  { id: '3', name: 'Core_Payment_Gateway.ts', type: 'code', status: 'secure', lastScanned: '1 hr ago' },
  { id: '4', name: 'Q3_Financial_Report.pdf', type: 'media', status: 'vulnerable', lastScanned: '10 mins ago' },
  { id: '5', name: 'Client_List_2026.csv', type: 'database', status: 'secure', lastScanned: '2 hrs ago' },
];

function App() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [isFixing, setIsFixing] = useState<string | null>(null);

  const getIcon = (type: string, status: string) => {
    const props = { size: 24, className: `asset-icon \${status}` };
    switch(type) {
      case 'database': return <Database {...props} />;
      case 'code': return <FileCode {...props} />;
      case 'key': return <Key {...props} />;
      case 'media': return <FileImage {...props} />;
      default: return <Database {...props} />;
    }
  };

  const handleFixAsset = (id: string) => {
    setIsFixing(id);
    
    // Simulate AI encryption/protection process
    setTimeout(() => {
      setAssets(assets.map(asset => 
        asset.id === id 
          ? { ...asset, status: 'secure', lastScanned: 'Just now' } 
          : asset
      ));
      setIsFixing(null);
    }, 1500);
  };

  const handleFixAll = () => {
    setIsFixing('all');
    setTimeout(() => {
      setAssets(assets.map(asset => ({ ...asset, status: 'secure', lastScanned: 'Just now' })));
      setIsFixing(null);
    }, 2000);
  };

  const vulnerableCount = assets.filter(a => a.status === 'vulnerable').length;
  const secureCount = assets.filter(a => a.status === 'secure').length;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Fingerprint size={32} />
          VaultGuard
        </div>
        
        <nav>
          <div className="nav-item active">
            <LayoutDashboard size={20} />
            Asset Overview
          </div>
          <div className="nav-item">
            <ShieldAlert size={20} />
            Vulnerabilities
          </div>
          <div className="nav-item">
            <Lock size={20} />
            Encryption Keys
          </div>
          <div className="nav-item">
            <Search size={20} />
            Audit Logs
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="page-header">
          <div className="page-title">
            <h1>Digital Asset Protection</h1>
            <p>AI-driven monitoring and automated encryption for critical digital assets.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline">
              <RefreshCw size={16} /> Rescan Network
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleFixAll}
              disabled={vulnerableCount === 0 || isFixing !== null}
            >
              <Lock size={16} /> Secure All Assets
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              Total Assets <Database size={16} />
            </div>
            <div className="stat-value">{assets.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              Secured Assets <ShieldCheck size={16} />
            </div>
            <div className="stat-value safe">{secureCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              At Risk <ShieldAlert size={16} />
            </div>
            <div className="stat-value risk">{vulnerableCount}</div>
          </div>
        </div>

        {/* Asset List */}
        <div className="section-title">
          <Fingerprint size={20} color="var(--brand-cyan)" /> Monitored Files & Credentials
        </div>
        
        <div className="asset-list">
          {assets.map(asset => (
            <div key={asset.id} className={\`asset-card \${asset.status}\`}>
              <div className="asset-info">
                {getIcon(asset.type, asset.status)}
                <div className="asset-details">
                  <h3>{asset.name}</h3>
                  <p>Last scanned: {asset.lastScanned}</p>
                </div>
              </div>
              
              <div className="asset-status">
                <span className={\`badge \${asset.status}\`}>
                  {asset.status === 'vulnerable' ? 'Vulnerable - Plaintext' : 'Encrypted & Secured'}
                </span>
                
                {asset.status === 'vulnerable' && (
                  <button 
                    className="btn btn-fix"
                    onClick={() => handleFixAsset(asset.id)}
                    disabled={isFixing !== null}
                  >
                    {isFixing === asset.id || isFixing === 'all' ? (
                      <><RefreshCw size={14} className="spin" /> Encrypting...</>
                    ) : (
                      <><Lock size={14} /> Deploy Encryption</>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {vulnerableCount === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--brand-emerald)', fontWeight: 500 }}>
              <ShieldCheck size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              All digital assets are currently secured and encrypted.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
