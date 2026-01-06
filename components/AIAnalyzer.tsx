
import React, { useState, useRef } from 'react';
import { analyzeGameScreenshot } from '../services/geminiService';

const AIAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('请帮我分析这张截图中的交易风险，并解释图中相关的游戏道具。');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult('');
    try {
      const analysis = await analyzeGameScreenshot(image, prompt);
      setResult(analysis);
    } catch (err) {
      setResult('分析出错，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black text-slate-800 acg-title">✨ AI 截图分析核心</h2>
        <p className="text-slate-500 font-bold text-lg">搭载 Gemini 3 Pro 高级视觉模型，穿透复杂的截图信息</p>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-10">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video bg-white/40 border-4 border-dashed border-white rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:bg-white/80 hover:border-orange-400/50 transition-all overflow-hidden relative group shadow-2xl shadow-indigo-100/50"
          >
            {image ? (
              <img src={image} className="w-full h-full object-contain p-6" alt="Upload" />
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] shadow-xl flex items-center justify-center text-5xl mb-6 mx-auto group-hover:rotate-6 transition-transform">📸</div>
                <span className="text-slate-400 font-black text-lg block">上传交易截图</span>
                <span className="text-slate-300 text-xs mt-2 block">支持移动端及 PC 全尺寸截图</span>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">智能指令 (COMMAND)</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 p-8 bg-white/60 text-slate-700 rounded-[2.5rem] border-4 border-white focus:bg-white focus:border-orange-400 outline-none text-sm leading-loose transition-all shadow-lg font-medium"
            />
          </div>
          
          <button 
            onClick={handleAnalyze}
            disabled={!image || loading}
            className={`w-full py-6 rounded-[2.5rem] font-black text-xl transition-all ${!image || loading ? 'bg-slate-100 text-slate-300' : 'btn-vibrant text-white hover:scale-[1.02] shadow-2xl active:scale-95'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-4">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                量子扫描中...
              </span>
            ) : '开始智能诊断'}
          </button>
        </div>

        <div className="md:col-span-7 glass-card-light rounded-[4rem] p-12 relative border-8 border-white shadow-2xl shadow-purple-100/50">
          <div className="absolute top-10 right-10 flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 tracking-tighter uppercase">Processor Online</span>
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-orange-500 animate-ping' : 'bg-emerald-500 shadow-lg shadow-emerald-200'}`}></div>
          </div>
          
          <h3 className="text-slate-800 font-black mb-10 flex items-center gap-4 text-2xl border-b-4 border-slate-50 pb-8">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg">🧠</div>
            诊断识别结果
          </h3>
          
          {result ? (
            <div className="text-slate-600 text-base leading-[2.2] whitespace-pre-wrap animate-in fade-in slide-in-from-right-8 duration-700 font-bold bg-white/40 p-8 rounded-[2rem] border-2 border-white">
              {result}
            </div>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center opacity-30">
              <div className="text-9xl mb-8 animate-pulse">🛸</div>
              <p className="font-black text-xl tracking-widest uppercase">Waiting for Data Stream</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzer;
