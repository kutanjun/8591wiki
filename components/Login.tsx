
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_USERNAME = '10639';
  const ADMIN_PASSWORD = 'xzqaddcn2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // 登录成功，保存登录状态到localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      onLogin();
    } else {
      setError('帳號或密碼錯誤，請重新輸入');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl shadow-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400 to-pink-400 opacity-5 -mr-32 -mt-32 rounded-full blur-3xl"></div>
        
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center text-white text-3xl shadow-2xl rotate-6">🔐</div>
          <div>
            <h2 className="text-4xl font-black text-slate-800 acg-title">管理員登入</h2>
            <p className="text-slate-400 font-bold mt-1">請輸入您的管理員憑證</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">管理員帳號</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="請輸入管理員帳號" 
              className="w-full px-8 py-5 bg-white/60 rounded-[2rem] border-2 border-white outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all text-slate-700 font-bold shadow-sm"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">密碼</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="請輸入密碼" 
              className="w-full px-8 py-5 bg-white/60 rounded-[2rem] border-2 border-white outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all text-slate-700 font-bold shadow-sm"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
              <p className="text-red-600 font-bold text-sm">{error}</p>
            </div>
          )}

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full py-6 btn-orange text-white rounded-[2rem] font-black text-xl hover:scale-[1.03] active:scale-95 shadow-2xl transition-all"
            >
              🔓 登入管理後台
            </button>
          </div>
        </form>

        <div className="mt-12 p-6 bg-indigo-50/50 backdrop-blur rounded-[2.5rem] border-2 border-white flex gap-4 items-start">
          <div className="w-10 h-10 bg-indigo-500 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">⚠️</div>
          <div>
            <h4 className="font-black text-indigo-900 mb-1 text-sm">安全提示：</h4>
            <p className="text-xs text-indigo-700 leading-relaxed font-bold">
              此為管理員專用區域，請妥善保管您的登入憑證。登入後請勿在公共場所離開設備。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

