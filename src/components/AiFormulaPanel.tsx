import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  RotateCw, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Flame, 
  Layers, 
  Play, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Brain,
  Crosshair
} from 'lucide-react';
import { AiFormula, AlgorithmType, BettingEngineMode } from '../types/lottery';
import { getFormulaRemainingSeconds } from '../utils/aiFormulaEngine';

interface AiFormulaPanelProps {
  formula: AiFormula | null;
  onRefreshFormula: () => void;
  onApplyFormula: (formula: AiFormula) => void;
  isAutoBetActive: boolean;
  currentAlgorithm: AlgorithmType;
  historyCount: number;
  bettingEngineMode?: BettingEngineMode;
}

export const AiFormulaPanel: React.FC<AiFormulaPanelProps> = ({
  formula,
  onRefreshFormula,
  onApplyFormula,
  isAutoBetActive,
  currentAlgorithm,
  historyCount,
  bettingEngineMode = 'METHODS_7_MODE'
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => getFormulaRemainingSeconds(formula));
  const [isRulesExpanded, setIsRulesExpanded] = useState<boolean>(false);
  const [isApplying, setIsApplying] = useState<boolean>(false);

  // Countdown timer for the 30-minute formula refresh
  useEffect(() => {
    const timer = setInterval(() => {
      if (formula) {
        const remaining = getFormulaRemainingSeconds(formula);
        setSecondsRemaining(remaining);
        if (remaining <= 0) {
          onRefreshFormula();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [formula, onRefreshFormula]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleApplyClick = () => {
    if (!formula) return;
    setIsApplying(true);
    onApplyFormula(formula);
    setTimeout(() => setIsApplying(false), 1200);
  };

  const isFormulaAlreadyActive = isAutoBetActive && formula && currentAlgorithm === formula.recommendedMethod;

  if (!formula) {
    return (
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center animate-pulse">
        <Sparkles className="w-5 h-5 text-amber-400 mx-auto animate-spin mb-2" />
        <span className="text-xs font-mono text-slate-300">
          Game Website History များကို AI မှ Search လုပ်ပြီး 30-Min Formula တွက်ထုတ်နေပါသည်...
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/95 border-2 border-amber-500/40 shadow-2xl overflow-hidden ring-1 ring-amber-500/20">
      
      {/* HEADER BAR: 30-MINUTE CYCLE RADAR */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-black shadow-lg shadow-amber-500/30 shrink-0">
            <Brain className="w-5 h-5 stroke-[2.2] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping"></span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-tech text-sm sm:text-base font-black text-white tracking-wider">
                AI HISTORY SEARCH & 30-MINUTES FORMULA ENGINE
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE BACKGROUND RUNNING
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
              Game Website ၏ လတ်တလောထွက်ရှိခဲ့သော History များကို AI မှ အမြဲတစေ Search လုပ်ပြီး ၃၀ မိနစ်ပြည့်တိုင်း အကောင်းဆုံး Formula အသစ်ကို အလိုအလျောက် ထုတ်ပေးပါသည်
            </p>
          </div>
        </div>

        {/* 30-MIN COUNTDOWN CLOCK & REFRESH ACTION */}
        <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
          <div className="flex items-center gap-2 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-amber-500/30 shadow-inner">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                NEXT FORMULA IN:
              </span>
              <span className="font-tech text-sm sm:text-base font-black text-amber-400 tracking-widest leading-none">
                {timeFormatted}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onRefreshFormula}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all shadow active:scale-95"
            title="ချက်ချင်း Formula အသစ် ရှာဖွေထုတ်မည် (Instant Search & Generate)"
          >
            <RotateCw className="w-4 h-4 text-amber-400 hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* MAIN FORMULA BODY */}
      <div className="p-4 sm:p-5 space-y-4">
        
        {/* FORMULA HERO BANNER */}
        <div className="relative overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-slate-950 to-slate-950 p-4 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-black bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow">
                {formula.code}
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                (History {formula.sampleHistorySize} ပွဲ စစ်ဆေးပြီး)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">EXPECTED WIN RATE:</span>
              <span className="font-tech text-base font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {formula.expectedWinRate}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-tech font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{formula.burmeseTitle}</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">
              {formula.burmeseDescription}
            </p>
          </div>

          {/* RECOMMENDED CONFIGURATION SPECIFICATION GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[9px] uppercase font-mono text-slate-400 block font-bold">
                RECOMMENDED METHOD
              </span>
              <span className="text-xs font-tech font-black text-amber-400 truncate block mt-0.5">
                {formula.recommendedMethod}
              </span>
              <span className="text-[9px] text-slate-500 block">AI အကြံပြုနည်းပညာ</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[9px] uppercase font-mono text-slate-400 block font-bold">
                STAKE MULTIPLIER
              </span>
              <span className="text-xs font-tech font-black text-emerald-400 truncate block mt-0.5">
                {formula.recommendedMultiplier}× Multiplier
              </span>
              <span className="text-[9px] text-slate-500 block">ရှုံးပါက ဆတိုးနှုန်း</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[9px] uppercase font-mono text-slate-400 block font-bold">
                BASE STAKE
              </span>
              <span className="text-xs font-tech font-black text-white truncate block mt-0.5">
                K {formula.recommendedBaseStake.toLocaleString()} MMK
              </span>
              <span className="text-[9px] text-slate-500 block">စတင်လောင်းကြေး</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[9px] uppercase font-mono text-slate-400 block font-bold">
                2-LOSS AUTO-SWITCH
              </span>
              <span className="text-xs font-tech font-black text-cyan-400 truncate block mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                ENABLED (ဖွင့်ထား)
              </span>
              <span className="text-[9px] text-slate-500 block">၂ ကြိမ်ရှုံးလျှင် Method ပြောင်း</span>
            </div>
          </div>

          {/* COLLAPSIBLE FORMULA STEP-BY-STEP RULES */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsRulesExpanded(!isRulesExpanded)}
              className="text-xs font-mono text-amber-400/90 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Formula ကစားနည်း အသေးစိတ် စည်းမျဉ်းများ ကြည့်ရန်</span>
              {isRulesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isRulesExpanded && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-sans text-slate-300 animate-in fade-in">
                {formula.burmeseRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PROMINENT "PLAY THIS FORMULA" ACTION BUTTON */}
        <div className="pt-1">
          {isAutoBetActive && bettingEngineMode === 'FORMULA_MODE' ? (
            <div className="w-full py-3.5 px-4 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-tech font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <CheckCircle2 className="w-5 h-5 text-amber-400 animate-pulse" />
              <span>✅ 30-MIN FORMULA စနစ်ဖြင့် AUTO BET လတ်တလော ကစားနေပါသည် (FORMULA MODE ACTIVE)</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleApplyClick}
              disabled={isApplying}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-tech font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all active:scale-[0.98] cursor-pointer"
            >
              {isApplying ? (
                <>
                  <RotateCw className="w-5 h-5 text-black animate-spin" />
                  <span>FORMULA ချိန်ညှိနေပါသည်...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-black text-black" />
                  <span>🎮 ဤ FORMULA အတိုင်း ကစားမည် (30-MIN FORMULA စနစ်သို့ ပြောင်းပြီး စတင်မည်)</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
