import React, { useState } from 'react';
import { User, Building2, Key, Save, CreditCard as Edit3, Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'inactive';
}

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'organization' | 'api'>('profile');
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'sk_live_51H7...',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API',
      key: 'sk_test_51H7...',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      status: 'active'
    }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organizational Details', icon: Building2 },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    // Check if the Clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      // Use the modern Clipboard API
      navigator.clipboard.writeText(text).then(() => {
        console.log('API key copied to clipboard successfully');
      }).catch(err => {
        console.error('Failed to copy with Clipboard API: ', err);
        fallbackCopyTextToClipboard(text);
      });
    } else {
      // Use fallback method
      fallbackCopyTextToClipboard(text);
    }
  };

  const copyApiKey = (keyId: string, apiKey: string) => {
    // Check if the Clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      // Use the modern Clipboard API
      navigator.clipboard.writeText(apiKey).then(() => {
        console.log('API key copied to clipboard successfully');
        setCopiedKeyId(keyId);
        setTimeout(() => setCopiedKeyId(null), 2000); // Hide after 2 seconds
      }).catch(err => {
        console.error('Failed to copy with Clipboard API: ', err);
        fallbackCopyTextToClipboard(apiKey);
        setCopiedKeyId(keyId);
        setTimeout(() => setCopiedKeyId(null), 2000);
      });
    } else {
      // Use fallback method
      fallbackCopyTextToClipboard(apiKey);
      setCopiedKeyId(keyId);
      setTimeout(() => setCopiedKeyId(null), 2000);
    }
  };
  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        console.log('API key copied to clipboard using fallback method');
      } else {
        console.error('Failed to copy using fallback method');
      }
    } catch (err) {
      console.error('Error in fallback copy method: ', err);
    }
    
    document.body.removeChild(textArea);
  };

  const deleteApiKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                
                {/* Profile Picture */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Edit3 className="w-4 h-4" />
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Azunyan"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Wu"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="azunyan.wu@esgc.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+234 801 234 5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div></div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Contains at least one uppercase letter</li>
                      <li>• Contains at least one lowercase letter</li>
                      <li>• Contains at least one number</li>
                      <li>• Contains at least one special character</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Save className="w-4 h-4" />
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Organization Tab */}
          {activeTab === 'organization' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Organizational Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      defaultValue="ESGC Gaming Commission"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      defaultValue="RC-123456789"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>Gaming & Entertainment</option>
                      <option>Financial Services</option>
                      <option>Technology</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>200+ employees</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="123 Gaming Street, Enugu East, Enugu State, Nigeria"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      defaultValue="https://esgc.gov.ng"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="contact@esgc.gov.ng"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">API Keys</h2>
                <p className="text-gray-600">Manage your API keys for system integration</p>
              </div>

              {/* API Keys List */}
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Key className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              apiKey.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {apiKey.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          API Key
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type={showApiKeys[apiKey.id] ? 'text' : 'password'}
                            value={showApiKeys[apiKey.id] ? apiKey.key : '••••••••••••••••'}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
                          />
                          <button
                            onClick={() => toggleApiKeyVisibility(apiKey.id)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {showApiKeys[apiKey.id] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              copyApiKey(apiKey.id, apiKey.key);
                            }}
                            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                              copiedKeyId === apiKey.id
                                ? 'text-green-600 bg-green-50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                            title="Copy API key"
                            type="button"
                          >
                            {copiedKeyId === apiKey.id ? (
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs font-medium">Copied!</span>
                              </div>
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Created:</span>
                          <span className="ml-2 text-gray-900">{apiKey.created}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Used:</span>
                          <span className="ml-2 text-gray-900">{apiKey.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* API Documentation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">API Documentation</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Learn how to integrate with our API and manage your gaming operations programmatically.
                </p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Documentation →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};