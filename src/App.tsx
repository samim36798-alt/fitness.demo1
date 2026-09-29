/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Dumbbell,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Send,
  Zap,
  Star,
  Maximize2,
  Calendar,
  Clock,
  ShieldCheck,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
} from 'lucide-react';

import { Navbar } from './components/Navbar.tsx';
import { HeroGymName } from './components/HeroGymName.tsx';
import { Hero3DCanvas } from './components/Hero3DCanvas.tsx';
import { Plate3DCanvas } from './components/Plate3DCanvas.tsx';
import { Modals } from './components/Modals.tsx';

// Generated High-Res Images
import heroImg from './assets/images/gym_hero_arena_1790691162059.jpg';
import athleteImg from './assets/images/gym_athlete_training_1790691176117.jpg';
import equipmentImg from './assets/images/gym_equipment_floor_1790691188169.jpg';

export default function App() {
  // Billing cycle state
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);

  // Active schedule tab (mon, tue, wed, thu, fri, sat, sun)
  const [activeDay, setActiveDay] = useState<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>('mon');

  // Active gallery category
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'interior' | 'weights' | 'cardio'>('all');

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | 'elite'>('pro');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [infoData, setInfoData] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    description: string;
  } | null>(null);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageUrl: string;
    caption: string;
  } | null>(null);

  // FAQ open indexes
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Contact form submission state
  const [contactSuccess, setContactSuccess] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Scroll Progress
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollWidth((winScroll / height) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const openCheckout = (tier: 'starter' | 'pro' | 'elite' = 'pro') => {
    setSelectedTier(tier);
    setIsCheckoutOpen(true);
  };

  // Schedule Classes Data
  const scheduleData = {
    mon: [
      { time: '07:00 AM', title: 'HYPERTROPHY STRENGTH', instructor: 'Marcus Vance', tag: 'Strength' },
      { time: '10:00 AM', title: 'METABOLIC HIIT', instructor: 'Elena Rostova', tag: 'Cardio' },
      { time: '06:00 PM', title: 'CROSS CONDITIONING', instructor: 'Jaxson Reed', tag: 'Power' },
    ],
    tue: [
      { time: '07:00 AM', title: 'MOBILITY & RECOVERY', instructor: 'Sarah Jenkins', tag: 'Recovery' },
      { time: '05:00 PM', title: 'FUNCTIONAL METCON', instructor: 'Elena Rostova', tag: 'Cardio' },
      { time: '07:00 PM', title: 'HEAVY BAG BOXING', instructor: 'Jaxson Reed', tag: 'Combat' },
    ],
    wed: [
      { time: '07:00 AM', title: 'OLYMPIC LIFTING', instructor: 'Marcus Vance', tag: 'Strength' },
      { time: '06:00 PM', title: 'HIIT ENDURANCE', instructor: 'Elena Rostova', tag: 'Cardio' },
    ],
    thu: [
      { time: '07:00 AM', title: 'ATHLETE PERFORMANCE', instructor: 'Marcus Vance', tag: 'Power' },
      { time: '06:00 PM', title: 'POWER YOGA', instructor: 'Sarah Jenkins', tag: 'Recovery' },
    ],
    fri: [
      { time: '07:00 AM', title: 'FULL BODY METCON', instructor: 'Elena Rostova', tag: 'Cardio' },
      { time: '06:00 PM', title: 'COMBAT POWER', instructor: 'Jaxson Reed', tag: 'Combat' },
    ],
    sat: [
      { time: '09:00 AM', title: 'WEEKEND WARRIOR HIIT', instructor: 'Elena Rostova', tag: 'Cardio' },
      { time: '11:00 AM', title: 'STRENGTH CLINIC', instructor: 'Marcus Vance', tag: 'Strength' },
    ],
    sun: [
      { time: '10:00 AM', title: 'ACTIVE RECOVERY & SAUNA', instructor: 'Sarah Jenkins', tag: 'Recovery' },
    ],
  };

  // Gallery items
  const galleryItems = [
    {
      type: 'interior',
      img: heroImg,
      caption: 'Main Athletic Sanctuary & Racks',
    },
    {
      type: 'weights',
      img: equipmentImg,
      caption: 'Calibrated Competition Plates & Dumbbells',
    },
    {
      type: 'interior',
      img: athleteImg,
      caption: 'Heavy Lifting & Deadlift Platforms',
    },
    {
      type: 'cardio',
      img: heroImg,
      caption: 'Assault Cardio Deck & Sled Track',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#070709] text-slate-100 overflow-x-hidden selection:bg-[#CCFF00] selection:text-black">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#CCFF00] z-[100] transition-all duration-75 shadow-[0_0_10px_#CCFF00]"
        style={{ width: `${scrollWidth}%` }}
      />

      {/* Sticky Navigation Bar with Animated Gym Name Logo */}
      <Navbar onOpenTour={() => setIsTourOpen(true)} onOpenJoin={openCheckout} />

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden"
      >
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Ironforge Gym Interior"
            className="w-full h-full object-cover opacity-25 scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-[#070709]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070709]/70 to-[#070709]" />
        </div>

        {/* 3D Interactive Dumbbell Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-75 md:opacity-100">
          <Hero3DCanvas />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 flex flex-col justify-between min-h-[calc(100vh-6rem)]">
          <div className="my-auto max-w-3xl">
            {/* Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-semibold tracking-widest uppercase mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
              <span>THE ULTIMATE FITNESS SANCTUARY</span>
            </motion.div>

            {/* THE GYM'S NAME - HERO ENTRY ANIMATION */}
            <HeroGymName />

            {/* Main Punchy Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight leading-none text-white mb-6"
            >
              BUILD YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-white to-[#CCFF00]">
                STRONGEST
              </span>{' '}
              SELF
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base sm:text-lg text-gray-300 max-w-xl font-light mb-8 leading-relaxed"
            >
              Train harder. Move better. Become unstoppable. Access Olympic-spec equipment,
              bespoke personal programming, and a relentless athletic brotherhood.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => openCheckout('pro')}
                data-join-btn="pro"
                className="px-8 py-4 bg-[#CCFF00] text-black font-extrabold tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-3 rounded-sm cursor-pointer shadow-[0_0_25px_rgba(204,255,0,0.35)] group"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <a
                href="#membership"
                className="px-7 py-4 glass-panel text-white font-bold tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300 rounded-sm cursor-pointer"
              >
                EXPLORE PLANS
              </a>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 border-t border-[#242834]/80 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#CCFF00] font-display">10+</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">5,000+</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                Active Athletes
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#CCFF00] font-display">25+</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                Master Trainers
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">50+</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                Weekly Classes
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-gray-400 hover:text-[#CCFF00] transition-colors animate-bounce cursor-pointer"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </section>

      {/* ================= ABOUT SECTION WITH SCROLL-TRIGGERED GYM NAME ANIMATION ================= */}
      <section id="about" className="py-24 relative bg-[#0D0E12] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Collage */}
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="glass-panel p-1 rounded-sm overflow-hidden group">
                  <img
                    src={athleteImg}
                    alt="Deadlift Athlete"
                    className="w-full h-64 sm:h-80 object-cover rounded-sm group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                </div>
                <div className="glass-panel p-6 rounded-sm border-l-4 border-[#CCFF00]">
                  <h4 className="text-3xl font-bold font-display text-white">15,000+</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">SQ FT Premium Facility</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="glass-panel p-6 rounded-sm border-r-4 border-[#CCFF00] text-right">
                  <h4 className="text-3xl font-bold font-display text-[#CCFF00]">100%</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Result Driven Coaching</p>
                </div>
                <div className="glass-panel p-1 rounded-sm overflow-hidden group">
                  <img
                    src={equipmentImg}
                    alt="Gym Weights"
                    className="w-full h-64 sm:h-80 object-cover rounded-sm group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Text with Staggered Gym Name Entry on Scroll */}
            <div className="flex flex-col justify-center">
              <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-3">
                OUR PHILOSOPHY
              </span>

              {/* Scroll Entry Animation for Gym Name in Section Heading */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7 }}
                className="mb-4"
              >
                <div className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-1">
                  ESTABLISHED 2016
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#CCFF00] tracking-wider flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#CCFF00]" />
                  <span>WELCOME TO IRONFORGE FITNESS</span>
                </h3>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-black font-display text-white leading-none mb-6">
                FORGED IN SWEAT. <br />
                <span className="text-gray-400">DEFINED BY PURPOSE.</span>
              </h2>

              <p className="text-gray-300 mb-5 leading-relaxed text-sm">
                Founded in 2016, Ironforge Fitness was created to eliminate the soft, commercial culture
                of traditional corporate gyms. We forged an environment engineered exclusively for raw
                athletic progression, functional power, and peak physical resilience.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed text-xs sm:text-sm">
                Every rack, platform, and recovery chamber is calibrated for athletes who refuse mediocrity.
                Whether you are training for podium competition or reshaping your daily energy, you train here
                with intent.
              </p>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Olympic-Spec Weights</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Customized Nutrition</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Infrared Recovery Cryo</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Biometric Body Scan</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsTourOpen(true)}
                  className="px-8 py-3.5 bg-transparent border border-[#CCFF00] text-[#CCFF00] font-bold text-xs tracking-wider rounded-sm hover:bg-[#CCFF00] hover:text-black transition-all duration-300 cursor-pointer"
                >
                  SCHEDULE A FACILITY TOUR
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PROGRAMS SECTION ================= */}
      <section id="programs" className="py-24 bg-[#070709] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
                TRAINING DISCIPLINES
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white">WORLD-CLASS PROGRAMS</h2>
            </div>
            <p className="text-gray-400 max-w-md mt-4 md:mt-0 text-xs sm:text-sm">
              Engineered by biomechanics specialists and strength coaches to maximize human physical capability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'STRENGTH TRAINING',
                icon: Dumbbell,
                desc: 'Master compound lifts, powerlifting fundamentals, and progressive overload.',
                fullDesc: 'Comprehensive compound movement mastery focused on squatting, bench press, deadlifts, and structural hypertrophy development under Olympic-grade coaching.',
              },
              {
                title: 'HIIT & METCON',
                icon: Zap,
                desc: 'High-intensity interval conditioning designed to boost cardiovascular capacity and burn fat.',
                fullDesc: 'Fast-paced metabolic conditioning utilizing SkiErgs, assault bikes, kettlebells, and bodyweight plyometrics for total work capacity.',
              },
              {
                title: 'BODYBUILDING',
                icon: Sparkles,
                desc: 'Targeted hypertrophy protocols for physical symmetry, muscle definition, and lean gains.',
                fullDesc: 'Scientific isolation techniques, time-under-tension protocols, and personalized nutrient timing to carve muscular definition.',
              },
              {
                title: 'ATHLETE PERFORMANCE',
                icon: Dumbbell,
                desc: 'Speed, agility, plyometrics, and explosive power training for competitive excellence.',
                fullDesc: 'Pro-level athletic conditioning designed to increase vertical jump, rotational velocity, sprint acceleration, and injury resilience.',
              },
            ].map((program, idx) => {
              const Icon = program.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel rounded-sm overflow-hidden glass-panel-hover flex flex-col justify-between p-6"
                >
                  <div>
                    <div className="w-12 h-12 rounded-sm bg-[#14161D] border border-[#242834] flex items-center justify-center text-[#CCFF00] mb-5">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-white mb-2">{program.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">{program.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setInfoData({
                        isOpen: true,
                        title: program.title,
                        subtitle: 'PROGRAM SYLLABUS',
                        description: program.fullDesc,
                      })
                    }
                    className="text-xs font-bold text-[#CCFF00] flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>PROGRAM DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CLASSES SCHEDULE SECTION ================= */}
      <section id="classes" className="py-24 bg-[#0D0E12] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
              WEEKLY SCHEDULE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white">BOOK A CLASS</h2>
            <p className="text-gray-400 mt-3 text-xs sm:text-sm">
              Select a day below to view high-octane sessions led by certified master coaches.
            </p>
          </div>

          {/* Day Selector Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10">
            {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider transition-all cursor-pointer uppercase ${
                  activeDay === day
                    ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                    : 'glass-panel text-gray-300 hover:border-[#CCFF00] hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scheduleData[activeDay]?.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-sm border border-[#242834] flex flex-col justify-between hover:border-[#CCFF00] transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#CCFF00] font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time}</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#070709] border border-[#242834] text-gray-300">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold font-display text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-400 mb-5">
                    Coach: <strong className="text-gray-200">{item.instructor}</strong>
                  </p>
                </div>
                <button
                  onClick={() => openCheckout('pro')}
                  className="w-full py-2.5 bg-[#14161D] border border-[#242834] text-xs font-bold text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all rounded-sm cursor-pointer"
                >
                  RESERVE SPOT
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3D PRECISION ENGINEERING SECTION ================= */}
      <section className="py-20 bg-[#070709] relative border-y border-[#242834] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
                PRECISION ENGINEERING
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white mb-6">
                BUILT WITH METALLIC RIGOR
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm mb-6">
                Every bumper plate, Olympic barbell, and power rack in Ironforge Fitness is custom-milled
                from competition-grade steel. We maintain strict calibration standards of +/- 10 grams
                so your PRs are undisputed.
              </p>
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white font-display">CALIBRATED</span>
                  <span className="text-xs text-gray-400 uppercase">+/- 10g Accuracy</span>
                </div>
                <div className="w-px h-10 bg-[#242834]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#CCFF00] font-display">CHROME COATED</span>
                  <span className="text-xs text-gray-400 uppercase">Zero Slip Grip</span>
                </div>
              </div>
            </div>

            {/* Interactive 3D Plate Renderer */}
            <div className="h-80 sm:h-96 glass-panel rounded-sm relative flex items-center justify-center overflow-hidden">
              <Plate3DCanvas />
              <div className="absolute bottom-4 left-4 text-[10px] text-gray-400 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-sm border border-[#242834] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#CCFF00]" />
                <span>Interactive 3D Plate — Drag to Rotate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEMBERSHIP & PRICING SECTION ================= */}
      <section id="membership" className="py-24 bg-[#0D0E12] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
              MEMBERSHIP TIERS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white">INVEST IN YOURSELF</h2>
            <p className="text-gray-400 mt-3 text-xs sm:text-sm">
              {isYearlyBilling
                ? 'Showing calculated annual plans with 20% upfront discount applied.'
                : 'Transparent monthly athletic access. No hidden lock-ins. Upgrade or cancel anytime.'}
            </p>

            {/* Billing Toggle with Active Calculation Feedback */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => setIsYearlyBilling(false)}
                className={`text-xs font-bold transition-colors cursor-pointer ${
                  !isYearlyBilling ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly Plan
              </button>
              <button
                type="button"
                onClick={() => setIsYearlyBilling(!isYearlyBilling)}
                aria-label="Toggle Monthly and Yearly Billing"
                className="w-14 h-8 bg-[#14161D] rounded-full p-1 border border-[#242834] relative cursor-pointer"
              >
                <div
                  className={`w-6 h-6 bg-[#CCFF00] rounded-full transition-transform duration-300 ${
                    isYearlyBilling ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setIsYearlyBilling(true)}
                className={`text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                  isYearlyBilling ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>Yearly Plan</span>
                <span className="px-2 py-0.5 text-[9px] bg-[#CCFF00] text-black font-extrabold rounded-full">
                  SAVE 20%
                </span>
              </button>
            </div>

            {/* Calculation details banner */}
            <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-[#14161D] border border-[#242834] text-xs text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              {isYearlyBilling ? (
                <span>
                  <strong>Annual Pre-Paid Calculation:</strong> 12 months with 20% discount (Pay for 10 months, get 2 months FREE)
                </span>
              ) : (
                <span>
                  <strong>Monthly Recurring:</strong> Standard billing billed every 30 days
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Starter */}
            <div className="glass-panel p-8 rounded-sm glass-panel-hover flex flex-col justify-between">
              <div>
                <div className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">STARTER</div>
                <h3 className="text-3xl font-bold font-display text-white mb-2">STARTER ACCESS</h3>
                <p className="text-xs text-gray-400 mb-6">Essential facility entry for independent lifters.</p>
                <div className="mb-6">
                  {isYearlyBilling ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black font-display text-white">
                          ₹9,588
                        </span>
                        <span className="text-xs text-gray-400">/ year</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs text-gray-500 line-through">₹11,988</span>
                        <span className="text-[11px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 rounded border border-[#CCFF00]/30">
                          ₹799/mo · Save ₹2,400 (20% OFF)
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1.5">
                        Calculated as: (₹999 × 12) − 20% discount
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black font-display text-white">
                          ₹999
                        </span>
                        <span className="text-xs text-gray-400">/ month</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1.5">Billed monthly, pause or cancel anytime</div>
                    </div>
                  )}
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Full Gym Floor & Free Weights
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Locker & Hot Showers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Baseline Biometric Check
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openCheckout('starter')}
                className="w-full py-3.5 border border-[#242834] text-white text-xs font-bold tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all rounded-sm cursor-pointer"
              >
                {isYearlyBilling ? 'CHOOSE STARTER (₹9,588 / YR)' : 'CHOOSE STARTER (₹999 / MO)'}
              </button>
            </div>

            {/* Pro - Recommended */}
            <div className="glass-panel p-8 rounded-sm neon-border-glow border-2 border-[#CCFF00] flex flex-col justify-between relative bg-gradient-to-b from-[#14161D] via-[#14161D] to-[#070709] lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#CCFF00] text-black text-[10px] font-extrabold tracking-widest rounded-full uppercase">
                MOST POPULAR
              </div>
              <div>
                <div className="text-xs text-[#CCFF00] font-bold tracking-widest uppercase mb-2">ALL ACCESS</div>
                <h3 className="text-3xl font-bold font-display text-white mb-2">PRO ATHLETE</h3>
                <p className="text-xs text-gray-400 mb-6">Complete training, group classes & coaching check-ins.</p>
                <div className="mb-6">
                  {isYearlyBilling ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black font-display text-white">
                          ₹19,188
                        </span>
                        <span className="text-xs text-gray-400">/ year</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs text-gray-500 line-through">₹23,988</span>
                        <span className="text-[11px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 rounded border border-[#CCFF00]/30">
                          ₹1,599/mo · Save ₹4,800 (20% OFF)
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1.5">
                        Calculated as: (₹1,999 × 12) − 20% discount
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black font-display text-white">
                          ₹1,999
                        </span>
                        <span className="text-xs text-gray-400">/ month</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1.5">Billed monthly, pause or cancel anytime</div>
                    </div>
                  )}
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Unlimited Gym & Strength Arena
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Unlimited Scheduled Classes
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Monthly Coach Consultation
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Free Monthly Guest Pass
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openCheckout('pro')}
                className="w-full py-4 bg-[#CCFF00] text-black text-xs font-extrabold tracking-wider hover:bg-white transition-all rounded-sm shadow-lg cursor-pointer"
              >
                {isYearlyBilling ? 'GET PRO ACCESS (₹19,188 / YR)' : 'GET PRO ACCESS (₹1,999 / MO)'}
              </button>
            </div>

            {/* Elite */}
            <div className="glass-panel p-8 rounded-sm glass-panel-hover flex flex-col justify-between">
              <div>
                <div className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">VIP TIER</div>
                <h3 className="text-3xl font-bold font-display text-white mb-2">ELITE VIP</h3>
                <p className="text-xs text-gray-400 mb-6">Dedicated 1-on-1 coaching & infrared recovery lounge.</p>
                <div className="mb-6">
                  {isYearlyBilling ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black font-display text-white">
                          ₹38,388
                        </span>
                        <span className="text-xs text-gray-400">/ year</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs text-gray-500 line-through">₹47,988</span>
                        <span className="text-[11px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 rounded border border-[#CCFF00]/30">
                          ₹3,199/mo · Save ₹9,600 (20% OFF)
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1.5">
                        Calculated as: (₹3,999 × 12) − 20% discount
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black font-display text-white">
                          ₹3,999
                        </span>
                        <span className="text-xs text-gray-400">/ month</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1.5">Billed monthly, pause or cancel anytime</div>
                    </div>
                  )}
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> All PRO Tier Features Included
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> 4 Dedicated 1-on-1 PT Sessions
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Unlimited Infrared Cryo Lounge
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> Custom Monthly Nutrition Protocol
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openCheckout('elite')}
                className="w-full py-3.5 border border-[#242834] text-white text-xs font-bold tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all rounded-sm cursor-pointer"
              >
                {isYearlyBilling ? 'JOIN ELITE (₹38,388 / YR)' : 'JOIN ELITE (₹3,999 / MO)'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRANSFORMATIONS SECTION ================= */}
      <section className="py-24 bg-[#070709] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
              REAL PROGRESSION
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white">MEMBER RESULTS</h2>
            <p className="text-gray-400 mt-3 text-xs sm:text-sm">
              Real results from athletes who committed to the process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 h-64 rounded-sm overflow-hidden relative">
                <img
                  src={athleteImg}
                  alt="Transformation David"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded text-[10px] font-bold text-[#CCFF00]">
                  16 WEEKS PROGRESSION
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex text-[#CCFF00] gap-1 text-xs mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">DAVID MILLER</h3>
                  <p className="text-xs text-gray-400 italic mb-4 leading-relaxed">
                    "Dropped 14kg of fat and added 40kg to my deadlift within 4 months. The coaching staff
                    here holds you accountable every single session."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#242834] text-xs text-gray-400">
                  Focus: <strong className="text-white">Strength & Progressive Overload</strong>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 h-64 rounded-sm overflow-hidden relative">
                <img
                  src={heroImg}
                  alt="Transformation Sarah"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded text-[10px] font-bold text-[#CCFF00]">
                  12 WEEKS PROGRESSION
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex text-[#CCFF00] gap-1 text-xs mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">PRIYA SEN</h3>
                  <p className="text-xs text-gray-400 italic mb-4 leading-relaxed">
                    "Ironforge completely transformed my posture, core stamina, and athletic recovery.
                    Ran my first half-marathon completely pain free."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#242834] text-xs text-gray-400">
                  Focus: <strong className="text-white">Functional Mobility & HIIT</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION WITH LIGHTBOX ================= */}
      <section id="gallery" className="py-24 bg-[#0D0E12] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
                INSIDE THE FORGE
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white">FACILITY GALLERY</h2>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              {(['all', 'interior', 'weights', 'cardio'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-4 py-1.5 rounded-sm text-xs font-bold tracking-wider cursor-pointer uppercase transition-all ${
                    galleryFilter === filter
                      ? 'bg-[#CCFF00] text-black'
                      : 'glass-panel text-gray-300 hover:border-[#CCFF00]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems
              .filter((item) => galleryFilter === 'all' || item.type === galleryFilter)
              .map((item, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setLightboxData({
                      isOpen: true,
                      imageUrl: item.img,
                      caption: item.caption,
                    })
                  }
                  className="glass-panel h-64 rounded-sm overflow-hidden relative cursor-pointer group"
                >
                  <img
                    src={item.img}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-[#CCFF00]" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-24 bg-[#070709] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
              TRANSPARENCY
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-white">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Do I need prior lifting experience before joining Ironforge?',
                a: 'Not at all. We train beginners, intermediate athletes, and national competitors alike. Every new athlete receives an initial movement screen and biomechanical alignment check.',
              },
              {
                q: 'Are group fitness classes included in all memberships?',
                a: 'Classes are fully included in our PRO and ELITE tiers. STARTER tier members can purchase individual drop-in class vouchers at a discounted rate.',
              },
              {
                q: 'What are your operational facility hours?',
                a: 'We operate 24 hours a day, 7 days a week for PRO and ELITE members keycard access. Staffed concierge hours run Monday to Friday from 5:00 AM to 11:00 PM.',
              },
              {
                q: 'Can I freeze or pause my membership if I travel?',
                a: 'Yes, you can freeze your membership for up to 60 days per calendar year with zero penalties or administrative fees.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div key={idx} className="glass-panel rounded-sm border border-[#242834] overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-bold text-white text-base hover:text-[#CCFF00] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#CCFF00] shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#CCFF00] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-[#242834]/50 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-24 bg-[#0D0E12] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-2 block">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white mb-6">
                START THE CONVERSATION
              </h2>
              <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                Have questions regarding custom athletic programming, private master coaching, or corporate wellness
                teams? Reach out to our executive concierge.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#14161D] border border-[#242834] flex items-center justify-center text-[#CCFF00] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">SANCTUARY LOCATION</h4>
                    <p className="text-gray-400 text-xs mt-1">458 Apex Avenue, Cyber District, Sector 4, WB, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#14161D] border border-[#242834] flex items-center justify-center text-[#CCFF00] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">CONCIERGE DESK</h4>
                    <p className="text-gray-400 text-xs mt-1">+91 (033) 8900-4500 / +91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[#14161D] border border-[#242834] flex items-center justify-center text-[#CCFF00] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">DIRECT EMAIL</h4>
                    <p className="text-gray-400 text-xs mt-1">join@ironforgefitness.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel p-8 rounded-sm border border-[#242834]">
              <h3 className="text-2xl font-bold font-display text-white mb-6">SEND INQUIRY</h3>
              {contactSuccess ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 bg-[#CCFF00] text-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">MESSAGE TRANSMITTED</h4>
                  <p className="text-xs text-gray-400">Our concierge will contact you within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSuccess(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 bg-[#070709] border border-[#242834] rounded-sm text-white focus:outline-none focus:border-[#CCFF00] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-3 bg-[#070709] border border-[#242834] rounded-sm text-white focus:outline-none focus:border-[#CCFF00] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your physical goals..."
                      className="w-full px-4 py-3 bg-[#070709] border border-[#242834] rounded-sm text-white focus:outline-none focus:border-[#CCFF00] text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#CCFF00] text-black font-extrabold tracking-wider hover:bg-white transition-all rounded-sm cursor-pointer"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#070709] border-t border-[#242834] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Gym Brand with Animated Dumbbell */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#CCFF00] flex items-center justify-center rounded-sm">
                  <Dumbbell className="w-4 h-4 text-black stroke-[2.5]" />
                </div>
                <span className="font-display text-xl font-bold tracking-wider text-white">
                  IRON<span className="text-[#CCFF00]">FORGE</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                The elite sanctuary dedicated to raw power, athletic conditioning, and mental resilience.
              </p>
              <div className="flex gap-4 text-gray-400">
                <a href="#home" aria-label="Instagram" className="hover:text-[#CCFF00]">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#home" aria-label="YouTube" className="hover:text-[#CCFF00]">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#home" aria-label="Facebook" className="hover:text-[#CCFF00]">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#home" aria-label="Twitter" className="hover:text-[#CCFF00]">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">QUICK NAVIGATION</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#about" className="hover:text-[#CCFF00]">Our Story</a></li>
                <li><a href="#programs" className="hover:text-[#CCFF00]">Disciplines</a></li>
                <li><a href="#classes" className="hover:text-[#CCFF00]">Weekly Schedule</a></li>
                <li><a href="#membership" className="hover:text-[#CCFF00]">Membership Tiers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">SANCTUARY HOURS</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex justify-between">
                  <span>Mon - Fri:</span> <span className="text-white font-medium">24 Hours (Staffed 5AM - 11PM)</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span> <span className="text-white font-medium">6:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span> <span className="text-white font-medium">6:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">THE FORGE DIGEST</h4>
              <p className="text-xs text-gray-400 mb-4">Get high-performance training guides and event updates.</p>
              {newsletterSuccess ? (
                <div className="text-xs text-[#CCFF00] font-semibold">Subscribed to Digest!</div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNewsletterSuccess(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    className="px-3 py-2 bg-[#14161D] border border-[#242834] text-xs text-white rounded-sm focus:outline-none focus:border-[#CCFF00] w-full"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-4 py-2 bg-[#CCFF00] text-black text-xs font-bold rounded-sm hover:bg-white transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-[#242834]/50 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>&copy; 2026 IRONFORGE FITNESS. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#home" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#home" className="hover:text-gray-300">Terms of Service</a>
              <a href="#home" className="hover:text-gray-300">Cookie Preferences</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODALS SYSTEM ================= */}
      <Modals
        isCheckoutOpen={isCheckoutOpen}
        initialTier={selectedTier}
        isYearlyBilling={isYearlyBilling}
        onCloseCheckout={() => setIsCheckoutOpen(false)}
        isTourOpen={isTourOpen}
        onCloseTour={() => setIsTourOpen(false)}
        infoData={infoData}
        onCloseInfo={() => setInfoData(null)}
        lightboxData={lightboxData}
        onCloseLightbox={() => setLightboxData(null)}
      />
    </div>
  );
}
