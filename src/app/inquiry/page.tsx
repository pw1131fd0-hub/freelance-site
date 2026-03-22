'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, Target, DollarSign, FileText, Zap, Globe, Cpu, Layout } from 'lucide-react';
import { toast } from 'sonner';

// Types
type Step = 1 | 2 | 3 | 4;

type ProjectType = 'website' | 'system' | 'ai' | 'other';

interface FormData {
  projectType: ProjectType | '';
  budget: string;
  description: string;
  name: string;
  email: string;
  phone: string;
}

// Budget tiers with priority mapping
const BUDGET_TIERS = [
  { value: 'under_30k', label: '30,000 元以下', priority: 'P2', description: '小型專案' },
  { value: '30k_50k', label: '30,000 - 50,000 元', priority: 'P2', description: '標準小型網站' },
  { value: '50k_100k', label: '50,000 - 100,000 元', priority: 'P1', description: '中型專案' },
  { value: '100k_200k', label: '100,000 - 200,000 元', priority: 'P1', description: '完整網站/系統' },
  { value: '200k_500k', label: '200,000 - 500,000 元', priority: 'P1', description: '大型系統開發' },
  { value: 'over_500k', label: '500,000 元以上', priority: 'P1', description: '企業級解決方案' },
];

const PROJECT_TYPES = [
  { 
    value: 'website', 
    label: '網站開發', 
    icon: Globe, 
    description: '形象網站、電商網站、部落格',
    color: 'blue'
  },
  { 
    value: 'system', 
    label: '系統開發', 
    icon: Layout, 
    description: '後台系統、CRM、ERP',
    color: 'purple'
  },
  { 
    value: 'ai', 
    label: 'AI 解決方案', 
    icon: Cpu, 
    description: 'AI 客服、數據分析、自動化',
    color: 'emerald'
  },
  { 
    value: 'other', 
    label: '其他專案', 
    icon: Sparkles, 
    description: '其他客製化需求',
    color: 'orange'
  },
];

// Animation variants
const stepVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export default function InquiryPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    budget: '',
    description: '',
    name: '',
    email: '',
    phone: '',
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) {
      setDirection(1);
      setStep(prev => (prev + 1) as Step);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(prev => (prev - 1) as Step);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.projectType !== '';
      case 2:
        return formData.budget !== '';
      case 3:
        return formData.name !== '' && formData.email !== '' && formData.description.length >= 10;
      default:
        return true;
    }
  };

  const getSelectedBudgetTier = () => {
    return BUDGET_TIERS.find(tier => tier.value === formData.budget);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const priority = getSelectedBudgetTier()?.priority || 'P2';
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          priority,
          subject: `新詢問 - ${PROJECT_TYPES.find(t => t.value === formData.projectType)?.label}`,
        }),
      });

      if (response.ok) {
        toast.success('詢問單已送出！我將盡快與您聯繫。');
        setDirection(1);
        setStep(4);
      } else {
        const error = await response.json();
        toast.error(error.error || '提交失敗，請稍後再試');
      }
    } catch {
      toast.error('提交失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (s: Step) => {
    switch (s) {
      case 1: return Target;
      case 2: return DollarSign;
      case 3: return FileText;
      case 4: return Check;
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={14} />
            返回首頁
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            開始您的專案
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            讓我們一步步了解您的需求，找到最適合的解決方案
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 px-2">
          {([1, 2, 3, 4] as Step[]).map((s, index) => {
            const Icon = getStepIcon(s);
            const isActive = step === s;
            const isCompleted = step > s;
            
            return (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white scale-110'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                  }`}>
                    {s === 1 && '專案類型'}
                    {s === 2 && '預算'}
                    {s === 3 && '詳情'}
                    {s === 4 && '確認'}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-2 ${
                    step > s ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Step Content */}
        <div className="bg-white dark:bg-[#111111] rounded-[28px] p-8 border border-slate-100 dark:border-white/[0.05] min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* Step 1: Project Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-2">選擇您的專案類型</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                  這幫助我了解您需要什麼樣的解決方案
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.projectType === type.value;
                    
                    return (
                      <button
                        key={type.value}
                        onClick={() => updateFormData('projectType', type.value)}
                        className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                          isSelected
                            ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-950/20`
                            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            type.color === 'blue' ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-600' :
                            type.color === 'purple' ? 'bg-purple-100 dark:bg-purple-950/30 text-purple-600' :
                            type.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600' :
                            'bg-orange-100 dark:bg-orange-950/30 text-orange-600'
                          }`}>
                            <Icon size={24} />
                          </div>
                          <div>
                            <div className="font-bold">{type.label}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                              {type.description}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                            <Check size={14} /> 已選擇
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-2">設定您的預算範圍</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                  請放心，這只是初步評估，可以後續討論調整
                </p>
                
                <div className="space-y-3">
                  {BUDGET_TIERS.map((tier) => {
                    const isSelected = formData.budget === tier.value;
                    
                    return (
                      <button
                        key={tier.value}
                        onClick={() => updateFormData('budget', tier.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-lg">{tier.label}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {tier.description}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            tier.priority === 'P1' 
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-400'
                          }`}>
                            {tier.priority}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
                  <div className="flex items-start gap-3">
                    <Zap size={18} className="text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-800 dark:text-amber-200 text-sm">P1 = 高潛力客戶</div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                        預算 50,000 元以上的專案將獲得優先處理
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details & Contact */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-2">告訴我更多細節</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                  請填寫您的聯絡資訊和需求概要
                </p>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder="您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                        電話（可選）
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        placeholder="09xx-xxx-xxx"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                      需求描述 *（至少 10 個字）
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      rows={5}
                      className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
                      placeholder="告訴我您的專案目標、功能需求、預計上線時間等..."
                    />
                    <div className="text-right text-xs text-slate-400 mt-1">
                      {formData.description.length} / 10 字
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                {formData.name ? (
                  <>
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={40} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">感謝您的詢問！</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                      我已收到您的專案資訊，將在 24-48 小時內透過 {formData.email} 與您聯繫。
                    </p>
                    
                    <div className="bg-slate-50 dark:bg-white/[0.04] rounded-2xl p-6 text-left max-w-md mx-auto mb-8">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                        詢問摘要
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">專案類型</span>
                          <span className="font-medium">
                            {PROJECT_TYPES.find(t => t.value === formData.projectType)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">預算範圍</span>
                          <span className="font-medium">
                            {BUDGET_TIERS.find(t => t.value === formData.budget)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">優先級</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            getSelectedBudgetTier()?.priority === 'P1'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                              : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-400'
                          }`}>
                            {getSelectedBudgetTier()?.priority || 'P2'}
                          </span>
                        </div>
                        <div className="border-t border-slate-200 dark:border-white/10 pt-3 mt-3">
                          <span className="text-slate-500 dark:text-slate-400 block mb-1">需求描述</span>
                          <p className="text-sm">{formData.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors"
                    >
                      返回首頁
                    </Link>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-2">請確認您的資訊</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                      請檢查以下資訊是否正確，然後提交
                    </p>
                    
                    <div className="space-y-3 text-left max-w-md mx-auto mb-8">
                      <div className="p-4 bg-slate-50 dark:bg-white/[0.04] rounded-xl">
                        <div className="text-xs text-slate-400 mb-1">專案類型</div>
                        <div className="font-medium">
                          {PROJECT_TYPES.find(t => t.value === formData.projectType)?.label}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-white/[0.04] rounded-xl">
                        <div className="text-xs text-slate-400 mb-1">預算範圍</div>
                        <div className="font-medium flex items-center gap-2">
                          {BUDGET_TIERS.find(t => t.value === formData.budget)?.label}
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            getSelectedBudgetTier()?.priority === 'P1'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {getSelectedBudgetTier()?.priority}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-white/[0.04] rounded-xl">
                        <div className="text-xs text-slate-400 mb-1">聯絡人</div>
                        <div className="font-medium">{formData.name}</div>
                        <div className="text-sm text-slate-500">{formData.email}</div>
                        {formData.phone && <div className="text-sm text-slate-500">{formData.phone}</div>}
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-white/[0.04] rounded-xl">
                        <div className="text-xs text-slate-400 mb-1">需求描述</div>
                        <p className="text-sm">{formData.description}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-colors disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? '提交中...' : (
                        <>確認送出 <Check size={16} /></>
                      )}
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`inline-flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-colors ${
                step === 1
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <ArrowLeft size={16} /> 上一步
            </button>
            
            {step < 3 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors"
              >
                下一步 <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setDirection(1);
                  setStep(4);
                }}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors"
              >
                確認資訊 <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
