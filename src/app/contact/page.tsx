'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, MessageSquare, Clock } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    budget: '',
    captcha: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.captcha !== '2') {
      setIsSuccess(false);
      setStatusMsg('驗證問題答案不正確。');
      return;
    }

    setIsSubmitting(true);
    setStatusMsg('');

    try {
      const { captcha: _, ...submitData } = formData;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setStatusMsg('詢問已提交！我將在 24–48 小時內回覆您。');
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '', budget: '', captcha: '' });
      } else {
        const errorData = await response.json();
        setIsSuccess(false);
        setStatusMsg(errorData.error || '提交失敗，請稍後重試。');
      }
    } catch {
      setIsSuccess(false);
      setStatusMsg('提交時發生錯誤，請稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#080808] text-[#0F172A] dark:text-[#F1F5F9] font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={14} />
            返回首頁
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            聯絡我
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl text-base leading-relaxed">
            有資料科學或機器學習專案想合作嗎？無論是預測模型、資料分析、NLP 還是 MLOps——讓我們來聊聊。
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Contact form card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 bg-white dark:bg-[#111111] rounded-[28px] p-8 md:p-10 border border-slate-100 dark:border-white/[0.05]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">提交專案詢問</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">請填寫以下資訊，我會盡快與您聯繫。</p>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
                  >
                    姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                    placeholder="您的姓名"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
                  >
                    電子郵件 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Phone and Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
                  >
                    電話
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                    placeholder="+886 9xx-xxx-xxx"
                  />
                </div>
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
                  >
                    專案類型
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                  >
                    <option value="">選擇專案類型</option>
                    <option value="ML">機器學習模型開發</option>
                    <option value="DATA_ANALYSIS">資料分析與視覺化</option>
                    <option value="NLP">自然語言處理</option>
                    <option value="COMPUTER_VISION">電腦視覺</option>
                    <option value="MLOPS">MLOps / 模型部署</option>
                    <option value="CONSULTING">數據科學諮詢</option>
                    <option value="OTHER">其他</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
                >
                  預算範圍
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                >
                  <option value="">選擇預算範圍</option>
                  <option value="UNDER_20K">20,000 以下</option>
                  <option value="20K_50K">20,000 - 50,000</option>
                  <option value="50K_100K">50,000 - 100,000</option>
                  <option value="100K_200K">100,000 - 200,000</option>
                  <option value="OVER_200K">200,000 以上</option>
                  <option value="NEGOTIABLE">面議</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
                >
                  需求描述 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-colors resize-none"
                  placeholder="請詳細說明您的專案需求、目標和預期成果……"
                />
              </div>

              <div>
                <label
                  htmlFor="captcha"
                  className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2"
                >
                  驗證：1 + 1 = ？
                </label>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                  className="w-36 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                  placeholder="答案"
                />
              </div>

              {statusMsg && (
                <div
                  className={`text-sm font-medium px-4 py-3 rounded-xl ${
                    isSuccess
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                      : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                  }`}
                >
                  {statusMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-white/10 text-white font-bold text-sm rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  '寄送中……'
                ) : (
                  <>
                    傳送訊息 <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-5">
            {/* Availability card */}
            <motion.div
              variants={itemVariants}
              className="bg-blue-600 rounded-[28px] p-8 text-white flex flex-col justify-between"
            >
              <div className="text-xs font-mono uppercase tracking-[0.15em] text-blue-200 mb-6">
                承接狀況
              </div>
              <div className="space-y-5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-sm font-bold">目前接受新專案</span>
                </div>
                <div>
                  <div className="text-4xl font-bold leading-none">Q2 2026</div>
                  <div className="text-sm text-blue-200 mt-1">
                    最早可配合時間
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20 text-xs font-mono text-blue-300 uppercase tracking-widest">
                通常回覆時間：24–48h
              </div>
            </motion.div>

            {/* Direct contact card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#111111] rounded-[28px] p-7 border border-slate-100 dark:border-white/[0.05] flex flex-col gap-5"
            >
              <div className="text-xs font-mono uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                直接聯絡
              </div>
              <a
                href="mailto:contact@openclaw.dev"
                className="group flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 transition-colors flex-shrink-0">
                  <Mail
                    size={15}
                    className="text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-0.5">電子郵件</div>
                  <div className="text-sm font-bold">contact@openclaw.dev</div>
                </div>
              </a>
              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={15} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-0.5">偏好方式</div>
                  <div className="text-sm font-bold">透過聯絡表單</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                  <Clock size={15} className="text-slate-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-0.5">時區</div>
                  <div className="text-sm font-bold">GMT+8 (Taipei)</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          variants={itemVariants}
          className="mt-12 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs font-mono border-t border-slate-100 dark:border-white/[0.05] pt-8"
        >
          <span>© {new Date().getFullYear()} OpenClaw</span>
          <Link
            href="/projects"
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
          >
            查看我的作品 →
          </Link>
        </motion.footer>
      </motion.div>
    </main>
  );
}
