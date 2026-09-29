import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Check,
  CreditCard,
  Smartphone,
  Building,
  ShieldCheck,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';

interface ModalsProps {
  // Checkout Modal
  isCheckoutOpen: boolean;
  initialTier: 'starter' | 'pro' | 'elite';
  isYearlyBilling?: boolean;
  onCloseCheckout: () => void;

  // Tour Modal
  isTourOpen: boolean;
  onCloseTour: () => void;

  // Program / Trainer Info Modal
  infoData: {
    isOpen: boolean;
    title: string;
    subtitle: string;
    description: string;
  } | null;
  onCloseInfo: () => void;

  // Lightbox Modal
  lightboxData: {
    isOpen: boolean;
    imageUrl: string;
    caption: string;
  } | null;
  onCloseLightbox: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  isCheckoutOpen,
  initialTier,
  isYearlyBilling: propIsYearly = false,
  onCloseCheckout,
  isTourOpen,
  onCloseTour,
  infoData,
  onCloseInfo,
  lightboxData,
  onCloseLightbox,
}) => {
  // Checkout State
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | 'elite'>(initialTier || 'pro');
  const [isYearly, setIsYearly] = useState<boolean>(propIsYearly);
  const [athleteName, setAthleteName] = useState('');
  const [athleteEmail, setAthleteEmail] = useState('');
  const [athletePhone, setAthletePhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Tour Form State
  const [tourName, setTourName] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [tourSubmitted, setTourSubmitted] = useState(false);

  // Sync initial tier & billing frequency
  React.useEffect(() => {
    if (initialTier) {
      setSelectedTier(initialTier);
    }
    setIsYearly(propIsYearly);
    if (isCheckoutOpen) {
      setCheckoutStep(1);
    }
  }, [initialTier, propIsYearly, isCheckoutOpen]);

  const handleCompleteRegistration = () => {
    setCheckoutStep(4);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#FFFFFF', '#4ADE80'],
      });
    } catch {
      // ignore
    }
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourSubmitted(true);
    setTimeout(() => {
      setTourSubmitted(false);
      onCloseTour();
    }, 2200);
  };

  return (
    <>
      {/* ================= CHECKOUT MODAL ================= */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="glass-panel max-w-xl w-full rounded-sm border border-[#242834] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onCloseCheckout}
                aria-label="Close Checkout Modal"
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Steps Header */}
              <div className="flex items-center justify-between border-b border-[#242834] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      checkoutStep >= 1 ? 'bg-[#CCFF00] text-black' : 'bg-[#14161D] text-gray-400 border border-[#242834]'
                    }`}
                  >
                    1
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Plan</span>
                </div>
                <div className="w-8 h-px bg-[#242834]" />
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      checkoutStep >= 2 ? 'bg-[#CCFF00] text-black' : 'bg-[#14161D] text-gray-400 border border-[#242834]'
                    }`}
                  >
                    2
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Athlete</span>
                </div>
                <div className="w-8 h-px bg-[#242834]" />
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      checkoutStep >= 3 ? 'bg-[#CCFF00] text-black' : 'bg-[#14161D] text-gray-400 border border-[#242834]'
                    }`}
                  >
                    3
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Payment</span>
                </div>
              </div>

              {/* Step 1: Plan Selection */}
              {checkoutStep === 1 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold font-display text-white">CHOOSE YOUR MEMBERSHIP</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">Select the access tier that fits your training volume.</p>
                  
                  {/* Billing Toggle in Modal */}
                  <div className="flex items-center gap-2 p-1.5 bg-[#0D0E12] border border-[#242834] rounded-sm mb-4">
                    <button
                      type="button"
                      onClick={() => setIsYearly(false)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-all cursor-pointer ${
                        !isYearly ? 'bg-[#CCFF00] text-black shadow-sm' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsYearly(true)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isYearly ? 'bg-[#CCFF00] text-black shadow-sm' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>Yearly Plan</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-black text-[#CCFF00] font-extrabold rounded">
                        20% OFF
                      </span>
                    </button>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div
                      onClick={() => setSelectedTier('starter')}
                      className={`p-4 rounded-sm border cursor-pointer transition-all ${
                        selectedTier === 'starter'
                          ? 'border-[#CCFF00] bg-[#14161D] shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                          : 'border-[#242834] bg-[#0D0E12] hover:border-gray-500'
                      } flex justify-between items-center`}
                    >
                      <div>
                        <div className="font-bold text-white text-sm">STARTER TIER</div>
                        <div className="text-xs text-gray-400">Gym floor, free weights & locker access</div>
                        {isYearly && (
                          <div className="text-[10px] text-[#CCFF00] font-mono mt-0.5">
                            Billed ₹9,588/yr (Save ₹2,400 vs ₹11,988)
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-[#CCFF00] font-bold text-base font-display">
                          {isYearly ? '₹9,588/yr' : '₹999/mo'}
                        </div>
                        {isYearly && (
                          <div className="text-[10px] text-gray-400 font-mono">₹799/month equiv.</div>
                        )}
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedTier('pro')}
                      className={`p-4 rounded-sm border cursor-pointer transition-all ${
                        selectedTier === 'pro'
                          ? 'border-[#CCFF00] bg-[#14161D] shadow-[0_0_20px_rgba(204,255,0,0.25)]'
                          : 'border-[#242834] bg-[#0D0E12] hover:border-gray-500'
                      } flex justify-between items-center relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 bg-[#CCFF00] text-black text-[9px] font-extrabold px-2 py-0.5 uppercase tracking-wider">
                        POPULAR
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>PRO TIER</span>
                          <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                        </div>
                        <div className="text-xs text-gray-400">Unlimited gym + All classes + 1 guest pass</div>
                        {isYearly && (
                          <div className="text-[10px] text-[#CCFF00] font-mono mt-0.5">
                            Billed ₹19,188/yr (Save ₹4,800 vs ₹23,988)
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-[#CCFF00] font-bold text-base font-display">
                          {isYearly ? '₹19,188/yr' : '₹1,999/mo'}
                        </div>
                        {isYearly && (
                          <div className="text-[10px] text-gray-400 font-mono">₹1,599/month equiv.</div>
                        )}
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedTier('elite')}
                      className={`p-4 rounded-sm border cursor-pointer transition-all ${
                        selectedTier === 'elite'
                          ? 'border-[#CCFF00] bg-[#14161D] shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                          : 'border-[#242834] bg-[#0D0E12] hover:border-gray-500'
                      } flex justify-between items-center`}
                    >
                      <div>
                        <div className="font-bold text-white text-sm">ELITE VIP TIER</div>
                        <div className="text-xs text-gray-400">Full access + 4 PT sessions + Cryo Sauna</div>
                        {isYearly && (
                          <div className="text-[10px] text-[#CCFF00] font-mono mt-0.5">
                            Billed ₹38,388/yr (Save ₹9,600 vs ₹47,988)
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-[#CCFF00] font-bold text-base font-display">
                          {isYearly ? '₹38,388/yr' : '₹3,999/mo'}
                        </div>
                        {isYearly && (
                          <div className="text-[10px] text-gray-400 font-mono">₹3,199/month equiv.</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="w-full py-3.5 bg-[#CCFF00] text-black font-extrabold tracking-wider hover:bg-white transition-all rounded-sm cursor-pointer"
                  >
                    CONTINUE TO ATHLETE DETAILS
                  </button>
                </div>
              )}

              {/* Step 2: Athlete Information */}
              {checkoutStep === 2 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutStep(3);
                  }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold font-display text-white mb-2">ATHLETE PROFILE</h3>
                  <p className="text-xs text-gray-400 mb-4">Provide details for your digital access card generation.</p>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={athleteName}
                      onChange={(e) => setAthleteName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-4 py-2.5 bg-[#070709] border border-[#242834] rounded-sm text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={athleteEmail}
                      onChange={(e) => setAthleteEmail(e.target.value)}
                      placeholder="vikram@example.com"
                      className="w-full px-4 py-2.5 bg-[#070709] border border-[#242834] rounded-sm text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={athletePhone}
                      onChange={(e) => setAthletePhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-[#070709] border border-[#242834] rounded-sm text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="w-1/3 py-3 border border-[#242834] text-gray-300 hover:text-white rounded-sm text-xs font-bold"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3 bg-[#CCFF00] text-black font-extrabold tracking-wider rounded-sm text-xs hover:bg-white transition-all cursor-pointer"
                    >
                      PROCEED TO PAYMENT
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment Channel */}
              {checkoutStep === 3 && (
                <div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">PAYMENT METHOD</h3>
                  <p className="text-xs text-gray-400 mb-5">Select payment channel to activate membership pass.</p>

                  <div className="space-y-3 mb-6">
                    <label
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex items-center gap-3 p-3.5 rounded-sm border cursor-pointer ${
                        paymentMethod === 'upi' ? 'border-[#CCFF00] bg-[#14161D]' : 'border-[#242834] bg-[#0D0E12]'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-[#CCFF00]" />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Instant UPI</div>
                        <div className="text-[11px] text-gray-400">Google Pay, PhonePe, Paytm, BHIM</div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-[#CCFF00]"
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center gap-3 p-3.5 rounded-sm border cursor-pointer ${
                        paymentMethod === 'card' ? 'border-[#CCFF00] bg-[#14161D]' : 'border-[#242834] bg-[#0D0E12]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-[#CCFF00]" />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Credit / Debit Card</div>
                        <div className="text-[11px] text-gray-400">Visa, Mastercard, RuPay, Amex</div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#CCFF00]"
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`flex items-center gap-3 p-3.5 rounded-sm border cursor-pointer ${
                        paymentMethod === 'netbanking' ? 'border-[#CCFF00] bg-[#14161D]' : 'border-[#242834] bg-[#0D0E12]'
                      }`}
                    >
                      <Building className="w-5 h-5 text-[#CCFF00]" />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Net Banking</div>
                        <div className="text-[11px] text-gray-400">HDFC, ICICI, SBI, Axis & all major banks</div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="accent-[#CCFF00]"
                      />
                    </label>
                  </div>

                  <div className="p-3 bg-[#0D0E12] border border-[#242834] text-[11px] text-gray-400 rounded-sm mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#CCFF00] shrink-0" />
                    <span>256-Bit SSL Encrypted sandbox simulator. No real money charged.</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(2)}
                      className="w-1/3 py-3 border border-[#242834] text-gray-300 rounded-sm text-xs font-bold"
                    >
                      BACK
                    </button>
                    <button
                      onClick={handleCompleteRegistration}
                      className="w-2/3 py-3 bg-[#CCFF00] text-black font-extrabold tracking-wider rounded-sm text-xs hover:bg-white transition-all cursor-pointer"
                    >
                      COMPLETE REGISTRATION
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Digital Pass Success with Gym Name Entry Animation */}
              {checkoutStep === 4 && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-16 h-16 bg-[#CCFF00] text-black rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-[0_0_25px_rgba(204,255,0,0.5)]"
                  >
                    <Check className="w-8 h-8 stroke-[3]" />
                  </motion.div>

                  <h3 className="text-3xl font-black font-display text-white mb-2">WELCOME TO THE FORGE</h3>
                  <p className="text-xs text-gray-300 mb-6">Your official membership credential is active immediately.</p>

                  {/* Digital Access Card with Gym Name Stamped Entry Animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-panel p-6 rounded-sm text-left border-2 border-[#CCFF00]/50 mb-6 bg-gradient-to-br from-[#14161D] via-[#0D0E12] to-[#14161D] relative overflow-hidden"
                  >
                    {/* Background Watermark Stamp */}
                    <div className="flex justify-between items-start mb-4 border-b border-[#242834] pb-3">
                      <div>
                        {/* Stamped Animated Gym Name */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="font-display text-xl font-black tracking-wider text-white"
                        >
                          IRON<span className="text-[#CCFF00]">FORGE</span> FITNESS
                        </motion.div>
                        <div className="text-[10px] text-gray-400 font-mono tracking-widest">
                          ATHLETIC SANCTUARY PASS
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00]">
                        ACTIVE PASS
                      </span>
                    </div>

                    <div className="space-y-1 mb-4">
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Athlete</div>
                      <div className="text-lg font-bold text-white">
                        {athleteName.trim() || 'VIKRAM SHARMA'}
                      </div>
                      <div className="text-xs text-[#CCFF00] font-semibold font-display tracking-widest">
                        {selectedTier.toUpperCase()} {isYearly ? 'ANNUAL PASS (20% SAVED)' : 'MONTHLY MEMBERSHIP'}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#242834] flex items-center justify-between text-[11px] text-gray-400 font-mono">
                      <span>ID: IF-2026-9042</span>
                      <span>VALID: {isYearly ? '365 DAYS (ANNUAL)' : '30 DAYS (MONTHLY)'}</span>
                    </div>
                  </motion.div>

                  <button
                    onClick={onCloseCheckout}
                    className="px-8 py-3 bg-[#CCFF00] text-black font-extrabold text-xs tracking-wider rounded-sm hover:bg-white transition-all cursor-pointer"
                  >
                    CLOSE & START TRAINING
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= TOUR BOOKING MODAL ================= */}
      <AnimatePresence>
        {isTourOpen && (
          <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel max-w-md w-full rounded-sm border border-[#242834] p-6 sm:p-8 relative"
            >
              <button
                onClick={onCloseTour}
                aria-label="Close Tour Modal"
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-1">
                <Calendar className="w-4 h-4" />
                <span>EXECUTIVE CONCIERGE</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white mb-2">BOOK A SANCTUARY TOUR</h3>
              <p className="text-xs text-gray-400 mb-6">
                Tour our 15,000 sq ft facility, inspect Olympic spec barbells, and meet head coaches in person.
              </p>

              {tourSubmitted ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 bg-[#CCFF00] text-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">TOUR REQUEST CONFIRMED</h4>
                  <p className="text-xs text-gray-400">Our concierge will contact you via WhatsApp & Call shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleTourSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                      placeholder="e.g. Arjun Kapoor"
                      className="w-full px-4 py-2.5 bg-[#070709] border border-[#242834] rounded-sm text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={tourPhone}
                      onChange={(e) => setTourPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-[#070709] border border-[#242834] rounded-sm text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#070709] border border-[#242834] rounded-sm text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#CCFF00] text-black font-extrabold tracking-wider hover:bg-white transition-all rounded-sm cursor-pointer"
                  >
                    CONFIRM TOUR APPOINTMENT
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= PROGRAM / TRAINER INFO MODAL ================= */}
      <AnimatePresence>
        {infoData?.isOpen && (
          <div className="fixed inset-0 z-[105] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel max-w-lg w-full rounded-sm border border-[#242834] p-6 sm:p-8 relative"
            >
              <button
                onClick={onCloseInfo}
                aria-label="Close Info Modal"
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#CCFF00] uppercase tracking-widest mb-1">
                <Award className="w-4 h-4" />
                <span>{infoData.subtitle || 'PROGRAM SPECIFICATIONS'}</span>
              </div>
              <h3 className="text-3xl font-bold font-display text-white mb-4">{infoData.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">{infoData.description}</p>

              <button
                onClick={() => {
                  onCloseInfo();
                  setSelectedTier('pro');
                  // Trigger open checkout
                  const joinBtn = document.querySelector('button[data-join-btn="pro"]') as HTMLButtonElement;
                  if (joinBtn) joinBtn.click();
                }}
                className="w-full py-3 bg-[#CCFF00] text-black font-extrabold tracking-wider text-xs rounded-sm hover:bg-white transition-all cursor-pointer"
              >
                START WITH THIS PROGRAM
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {lightboxData?.isOpen && (
          <div
            onClick={onCloseLightbox}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={onCloseLightbox}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={lightboxData.imageUrl}
              alt={lightboxData.caption}
              className="max-w-4xl max-h-[80vh] object-contain rounded-sm border border-[#242834] mb-4 shadow-2xl"
            />
            <span className="text-sm font-bold text-[#CCFF00] tracking-wider font-display">
              {lightboxData.caption}
            </span>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
