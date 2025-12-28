
import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie 
} from 'recharts';
import { 
  BookOpen, CheckCircle2, Circle, Clock, TrendingUp, Sparkles, 
  Plus, ChevronDown, ChevronUp, Save, Trash2, BrainCircuit, RefreshCcw
} from 'lucide-react';
import { Chapter, MasteryLevel, SubTopic } from './types';
import { INITIAL_DSA_DATA, MASTERY_COLORS } from './constants';
import { getGeminiStudyAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('dsa_tracker_data');
    return saved ? JSON.parse(saved) : INITIAL_DSA_DATA;
  });
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['ch1']));
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<{ topic: string, content: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('dsa_tracker_data', JSON.stringify(chapters));
  }, [chapters]);

  const toggleChapter = (id: string) => {
    const newSet = new Set(expandedChapters);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedChapters(newSet);
  };

  const updateMastery = (chapterId: string, subTopicId: string, level: MasteryLevel) => {
    setChapters(prev => prev.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          subTopics: ch.subTopics.map(st => 
            st.id === subTopicId ? { ...st, mastery: level } : st
          )
        };
      }
      return ch;
    }));
  };

  const updateNotes = (chapterId: string, subTopicId: string, notes: string) => {
    setChapters(prev => prev.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          subTopics: ch.subTopics.map(st => 
            st.id === subTopicId ? { ...st, notes } : st
          )
        };
      }
      return ch;
    }));
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress and notes? This cannot be undone.')) {
      setChapters(INITIAL_DSA_DATA);
      localStorage.removeItem('dsa_tracker_data');
    }
  };

  const handleAiAdvice = async (topicName: string, level: MasteryLevel) => {
    setAiLoading(topicName);
    const advice = await getGeminiStudyAdvice(topicName, level);
    setAiResponse({ topic: topicName, content: advice || 'No response' });
    setAiLoading(null);
  };

  // Stats calculations
  const statsData = useMemo(() => {
    const counts = {
      [MasteryLevel.NOT_STARTED]: 0,
      [MasteryLevel.NEEDS_PRACTICE]: 0,
      [MasteryLevel.PRACTICING]: 0,
      [MasteryLevel.MASTERED]: 0,
    };
    
    chapters.forEach(ch => ch.subTopics.forEach(st => {
      counts[st.mastery]++;
    }));

    return [
      { name: 'Not Started', value: counts[MasteryLevel.NOT_STARTED], color: '#e2e8f0' },
      { name: 'Needs Practice', value: counts[MasteryLevel.NEEDS_PRACTICE], color: '#fecdd3' },
      { name: 'Practicing', value: counts[MasteryLevel.PRACTICING], color: '#fef3c7' },
      { name: 'Mastered', value: counts[MasteryLevel.MASTERED], color: '#a7f3d0' },
    ];
  }, [chapters]);

  const totalTopics = useMemo(() => 
    chapters.reduce((sum, ch) => sum + ch.subTopics.length, 0), 
  [chapters]);

  const masteredCount = useMemo(() => 
    chapters.reduce((sum, ch) => sum + ch.subTopics.filter(st => st.mastery === MasteryLevel.MASTERED).length, 0), 
  [chapters]);

  const progressPercentage = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0;

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <BookOpen size={20} />
            </div>
            <div>
               <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-none">DSA Mastery Hub</h1>
               <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">Personal Curriculum Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Progress</span>
                <span className="text-xl font-black text-indigo-600 tabular-nums">{progressPercentage}%</span>
             </div>
             <div className="w-40 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(79,70,229,0.4)]" 
                  style={{ width: `${progressPercentage}%` }}
                />
             </div>
             <button 
               onClick={resetProgress}
               title="Reset all progress"
               className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
             >
               <RefreshCcw size={18} />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats & AI (Sticky) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
          {/* Dashboard Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-600" />
              Progress Analytics
            </h2>
            <div className="h-56 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {statsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-800">{masteredCount}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Mastered</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {statsData.map(stat => (
                <div key={stat.name} className="flex flex-col p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="text-[10px] font-bold uppercase text-slate-400">{stat.name}</span>
                  </div>
                  <span className="text-lg font-bold text-slate-700">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Advisor Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-2xl border border-indigo-700 shadow-xl text-white">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-200" />
              Gemini DSA Coach
            </h2>
            {aiResponse ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-200">{aiResponse.topic}</span>
                  <button 
                    onClick={() => setAiResponse(null)}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                  >
                    <Trash2 size={14} className="text-indigo-200" />
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm text-indigo-50 leading-relaxed font-medium max-h-[450px] overflow-y-auto ai-scrollbar shadow-inner">
                  <ReactMarkdown 
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-lg font-bold mt-4 mb-2 text-white" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-base font-bold mt-4 mb-2 text-indigo-100" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-sm font-bold mt-4 mb-1 text-indigo-200 uppercase tracking-wider" {...props} />,
                      p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-4 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-4 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      code: ({node, ...props}) => <code className="bg-indigo-900/50 px-1.5 py-0.5 rounded font-mono text-[12px] text-indigo-300" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-400/30 pl-4 italic my-4 text-indigo-200" {...props} />,
                    }}
                  >
                    {aiResponse.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                   <p className="text-sm text-indigo-100 italic leading-relaxed">
                    "Stuck on a concept? Click the <span className="font-bold text-white">AI Coach</span> button next to any subtopic to get specific problem suggestions and pitfalls to avoid."
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/50 flex items-center justify-center animate-pulse">
                    <BrainCircuit size={16} />
                  </div>
                  <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Waiting for input...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Topics List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
             <div>
               <h2 className="text-xl font-black text-slate-800 tracking-tight">DSA Curriculum</h2>
               <p className="text-sm text-slate-500 font-medium">{totalTopics} total subtopics across {chapters.length} major domains.</p>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={() => setExpandedChapters(new Set())}
                  className="text-xs font-bold text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Collapse All
                </button>
                <button 
                  onClick={() => setExpandedChapters(new Set(chapters.map(c => c.id)))}
                  className="text-xs font-bold text-indigo-600 px-3 py-1.5 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  Expand All
                </button>
             </div>
          </div>

          {chapters.map((chapter) => (
            <div key={chapter.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
              {/* Chapter Header */}
              <button 
                onClick={() => toggleChapter(chapter.id)}
                className={`w-full flex items-center justify-between p-5 transition-all ${expandedChapters.has(chapter.id) ? 'bg-slate-50/80 border-b border-slate-100' : 'hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${expandedChapters.has(chapter.id) ? 'bg-indigo-600 text-white rotate-12' : 'bg-slate-100 text-slate-500'}`}>
                    <span className="font-black text-lg">{chapter.id.replace('ch', '')}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-800 text-lg tracking-tight">{chapter.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex -space-x-1.5">
                        {chapter.subTopics.map((st) => (
                          <div 
                            key={st.id} 
                            className={`w-2.5 h-2.5 rounded-full border-2 border-white ${
                              st.mastery === MasteryLevel.MASTERED ? 'bg-emerald-500' : 
                              st.mastery === MasteryLevel.PRACTICING ? 'bg-amber-400' :
                              st.mastery === MasteryLevel.NEEDS_PRACTICE ? 'bg-rose-500' : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {chapter.subTopics.filter(s => s.mastery === MasteryLevel.MASTERED).length} / {chapter.subTopics.length} Mastered
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full transition-all ${expandedChapters.has(chapter.id) ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </button>

              {/* Subtopics List */}
              {expandedChapters.has(chapter.id) && (
                <div className="p-3 space-y-3 bg-slate-50/40">
                  {chapter.subTopics.map((subTopic) => (
                    <div key={subTopic.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-5 hover:border-indigo-200 transition-all group">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
                            {subTopic.mastery === MasteryLevel.MASTERED && (
                              <div className="bg-emerald-100 p-1 rounded-full text-emerald-600">
                                <CheckCircle2 size={14} />
                              </div>
                            )}
                            {subTopic.name}
                          </h4>
                          <button 
                            disabled={aiLoading === subTopic.name}
                            onClick={() => handleAiAdvice(subTopic.name, subTopic.mastery)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50 border border-indigo-100/50"
                          >
                            <Sparkles size={12} />
                            {aiLoading === subTopic.name ? 'Consulting...' : 'AI Coach'}
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {Object.values(MasteryLevel).map((level) => (
                            <button
                              key={level}
                              onClick={() => updateMastery(chapter.id, subTopic.id, level)}
                              className={`text-[9px] uppercase font-black tracking-tighter px-2 py-2 rounded-lg border transition-all ${
                                subTopic.mastery === level 
                                  ? MASTERY_COLORS[level] + ' ring-2 ring-indigo-500/10'
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                              }`}
                            >
                              {level.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="md:w-[280px] flex flex-col">
                        <div className="relative flex-1 group/note">
                          <textarea
                            placeholder="Key insights, complexity (Time/Space), or links to your solutions..."
                            value={subTopic.notes}
                            onChange={(e) => updateNotes(chapter.id, subTopic.id, e.target.value)}
                            className="w-full h-full text-xs font-medium p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none min-h-[100px] transition-all resize-none placeholder:text-slate-300 scrollbar-thin scrollbar-thumb-slate-200"
                          />
                          <div className="absolute right-3 bottom-3 text-slate-200 group-focus-within/note:text-indigo-400 group-hover/note:text-slate-400 transition-colors">
                             <Save size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Floating Progress Indicator for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-30">
        <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-indigo-400/30 backdrop-blur-md">
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28" cy="28" r="24"
                fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5"
              />
              <circle
                cx="28" cy="28" r="24"
                fill="none" stroke="white" strokeWidth="5"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - progressPercentage / 100)}`}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-black tabular-nums">
              {progressPercentage}%
            </div>
          </div>
          <div className="pr-2">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Mastery</div>
            <div className="text-xl font-black">{masteredCount} / {totalTopics}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
