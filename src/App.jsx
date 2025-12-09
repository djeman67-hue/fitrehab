import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  BookOpen, 
  Calendar, 
  Mail, 
  Instagram, 
  ChevronRight, 
  Activity, 
  ShieldCheck, 
  Trophy,
  Menu,
  X,
  AlertTriangle,
  Smartphone,
  MessageCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// --- Composants Réutilisables ---

// Bouton personnalisé avec variantes (Rouge, Or, Contour)
const Button = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyle = "px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500",
    secondary: "bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black",
    gold: "bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] text-black font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Titre de section stylisé
const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
    <h3 className="text-[#D4AF37] font-bold tracking-[0.2em] text-sm mb-2 uppercase">{subtitle}</h3>
    <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase italic relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-red-600 skew-x-12"></span>
    </h2>
  </div>
);

// Carte étape (Chronologie)
const StepCard = ({ number, title, description, delay }) => (
    <div 
      className="relative pl-8 md:pl-0 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
      style={{ transitionDelay: `${delay}ms` }}
    >
        <div className="hidden md:block absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-red-600 border-4 border-black z-10"></div>
        <div className="md:border-l-2 md:border-zinc-800 md:pl-10 pb-12">
            <div className="text-5xl font-black text-zinc-800 absolute -top-4 -left-4 md:-left-12 opacity-50 select-none z-0">{number}</div>
            <h3 className="text-xl font-bold text-[#D4AF37] mb-2 relative z-10 uppercase">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{description}</p>
        </div>
    </div>
);

// Carte "Échec" (Problèmes rencontrés)
const FailCard = ({ title, description, delay }) => (
  <div 
    className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 hover:border-red-600/50 group"
    style={{ transitionDelay: `${delay}ms` }}
  >
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-white uppercase">{title}</h4>
        <XCircle className="text-red-600 group-hover:scale-110 transition-transform" size={24} />
      </div>
      <p className="text-zinc-400 text-sm mb-4">{description}</p>
      <div className="text-red-500 font-black italic tracking-widest text-xs uppercase border-t border-zinc-800 pt-2 text-right">Échec</div>
  </div>
);

// --- Application Principale ---

export default function FitRehabApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gestion du défilement et des animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation fluide
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* Ambiance de fond (Lueurs Rouge & Or) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
      </div>

      {/* Barre de navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black italic tracking-tighter cursor-pointer" onClick={() => scrollToSection('home')}>
            FIT<span className="text-red-600">REHAB</span>
            <span className="text-[#D4AF37] text-xs not-italic font-normal block tracking-widest -mt-1">JEREMY POLIZZI</span>
          </div>

          {/* Menu Bureau */}
          <div className="hidden md:flex gap-8 items-center">
            {['Concept', 'Suivi', 'Ebook', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm uppercase font-bold tracking-widest hover:text-[#D4AF37] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Bouton Menu Mobile */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Menu Mobile Déroulant */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 animate-slideDown">
            {['Concept', 'Suivi', 'Ebook', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-lg font-bold uppercase tracking-widest text-zinc-400 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* SECTION HERO (Accueil) */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
             <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8">
               TU N'ARRIVES PLUS A PRATIQUER TON SPORT FAVORI A CAUSE DE <span className="text-red-600">DOULEURS</span> ?
             </h1>
             <p className="text-xl md:text-2xl text-zinc-300 mb-8 italic">
                Tu te sens limité par ta mobilité ? Ta frustration grandit et cela influence ta vie personnelle, voire professionnelle ?
             </p>
             
             <div className="bg-zinc-900/80 backdrop-blur border border-[#D4AF37]/50 p-8 rounded-2xl max-w-2xl mx-auto mb-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <p className="font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Je suis Jeremy Polizzi</p>
                <p className="text-lg text-white">
                   Masseur-Kinésithérapeute du sport depuis 2010, et mon <span className="text-red-600 font-bold bg-white/10 px-2 rounded">SUIVI EN LIGNE</span> est fait pour toi.
                </p>
             </div>

             <Button variant="gold" className="mx-auto" onClick={() => scrollToSection('concept')}>
               Comprendre le problème <ChevronRight size={16} />
             </Button>
          </div>
        </div>
      </section>

      {/* SECTION CONCEPT (Analyse du problème) */}
      <section id="concept" className="py-24 bg-zinc-950 border-y border-white/5">
        <div className="container mx-auto px-6">
           <SectionTitle title="Comment traites-tu ta blessure ?" subtitle="Analyse de la situation" />
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <FailCard 
                title="1. Le Déni"
                description="Tu souffres, c'est invalidant mais tu penses que cela passera tout seul."
                delay={0}
              />
              <FailCard 
                title="2. Le Repos"
                description="Tu penses que mettre ton corps au repos quelques jours suffira à faire disparaître tes douleurs."
                delay={100}
              />
              <FailCard 
                title="3. Les Médicaments"
                description="Tu prends des anti-inflammatoires ou des produits miracles trouvés sur Instagram."
                delay={200}
              />
              <FailCard 
                title="4. Le Médical Classique"
                description="Tu consultes ton médecin, tu réalises des examens, tu vois un ostéo, un chiro, un marabout... et rien ne change."
                delay={300}
              />
           </div>

           <div className="bg-gradient-to-r from-red-900/20 to-black border border-red-900/50 p-8 rounded-2xl text-center max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <div className="flex justify-center mb-4 text-red-600"><AlertTriangle size={40} /></div>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase italic">Toutes ces pistes ont donc échoué...</h3>
              <p className="text-zinc-400 mb-6">
                Tu as DEJA exploré les pistes 1, 2, 3 et 4 et RIEN n'a fonctionné. Tu envisages d'arrêter ton sport ? Tu déprimes ? <span className="text-white font-bold underline">C'est normal.</span>
              </p>
              <div className="h-px w-24 bg-[#D4AF37] mx-auto mb-6"></div>
              <p className="text-xl text-[#D4AF37] font-bold italic">
                Et si je te proposais une solution personnalisée, adaptée à ta pathologie, à ton mode de vie ?
              </p>
           </div>
        </div>
      </section>

      {/* SECTION EMPATHIE */}
      <section className="py-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-[#D4AF37]/5 z-0"></div>
         <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-3xl font-black italic uppercase mb-6">Je comprends ton problème</h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              "Tu as besoin d'être accompagné par quelqu'un qui comprend et s'implique dans ta pathologie. <br/><br/>
              <span className="text-white font-bold">J'ai déjà été blessé et j'ai déjà dû arrêter de pratiquer le CrossFit</span>, donc je comprends ton problème. Nous allons tout mettre en oeuvre pour régler ce problème pour de bon."
            </p>
         </div>
      </section>

      {/* SECTION CHRONOLOGIE (Processus de suivi) */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
           <SectionTitle title="Chronologie du Suivi" subtitle="Fit Rehab en 5 étapes" />

           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-2">
                 <StepCard 
                    number="01"
                    title="Formulaire de départ"
                    description="Il comprend les renseignements de base ainsi que la problématique de ta pathologie."
                    delay={0}
                 />
                 <StepCard 
                    number="02"
                    title="Le Bilan Visio"
                    description="Réalisé en visio ou par téléphone, il me permet d'établir la ligne directrice de ton suivi et le programme qui en résulte."
                    delay={100}
                 />
                 <StepCard 
                    number="03"
                    title="Création du Programme"
                    description="Suite à cet entretien et après analyse de ta pathologie, j'établis ton programme totalement personnalisé. Être coaché te permettra également de diminuer ta charge mentale."
                    delay={200}
                 />
                 <StepCard 
                    number="04"
                    title="L'Application"
                    description="Tu débutes la prog Fit Rehab lorsque tu le désires. L'application te permet de visualiser tes séances persos. Les exercices sont démontrés en vidéos. Tu pourras te filmer pour me faire un retour."
                    delay={300}
                 />
                 <StepCard 
                    number="05"
                    title="Échanger et Discuter"
                    description="Nous discutons dès que tu en as besoin sur WhatsApp afin de répondre à tes interrogations. T'écouter est très important, cela nous permet d'avancer plus vite."
                    delay={400}
                 />
              </div>

              {/* Visuel Application */}
              <div className="hidden md:block relative h-[600px] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-on-scroll opacity-0 translate-x-10 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
                      <Smartphone size={80} className="text-[#D4AF37] mb-6" />
                      <h3 className="text-2xl font-bold uppercase mb-4">Application & Communication</h3>
                      
                      <div className="bg-black/50 backdrop-blur p-4 rounded-lg mb-4 border-l-4 border-red-600 text-left w-full">
                         <h4 className="font-bold text-red-500 text-sm uppercase flex items-center gap-2"><Smartphone size={14}/> Application de Coaching</h4>
                         <p className="text-xs text-zinc-400 mt-1">Programme personnalisé, saisie des résultats (réps, poids, ressenti), suivi des progrès. Adaptation en continu si des douleurs apparaissent.</p>
                      </div>

                      <div className="bg-black/50 backdrop-blur p-4 rounded-lg border-l-4 border-[#D4AF37] text-left w-full">
                         <h4 className="font-bold text-[#D4AF37] text-sm uppercase flex items-center gap-2"><MessageCircle size={14}/> La Communication</h4>
                         <p className="text-xs text-zinc-400 mt-1">Bilan initial visio pour voir tes restrictions (mobilité, déficit). Aussi efficace qu'en présentiel. Disponibilité WhatsApp pour ne jamais t'abandonner.</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION TARIFS (Le Suivi) */}
      <section id="suivi" className="py-24 relative bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <SectionTitle title="Tarifs du Suivi" subtitle="Investis en toi" />
          
          <div className="max-w-md mx-auto">
            <div className="bg-zinc-950 border border-[#D4AF37] p-8 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden group hover:scale-105 transition-transform duration-500">
               {/* Effet brillant au survol */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] to-yellow-200"></div>
               <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>

               <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-white italic uppercase">Suivi En Ligne</h3>
                  <div className="mt-4 flex items-center justify-center gap-2">
                     <span className="text-5xl font-extrabold text-[#D4AF37]">199€</span>
                     <span className="text-zinc-500 text-sm font-bold uppercase">/ mois</span>
                  </div>
               </div>

               <ul className="space-y-6 mb-10">
                  {[
                    "Programme 100% Personnalisé",
                    "Bilan Visio Initial",
                    "Suivi spécifiquement adapté à toi",
                    "Communication privilégiée avec moi"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-zinc-300">
                       <div className="bg-green-500/20 p-1 rounded-full text-green-500 shrink-0">
                          <CheckCircle2 size={20} />
                       </div>
                       <span className="font-medium">{item}</span>
                    </li>
                  ))}
               </ul>

               <p className="text-center text-xs text-zinc-600 mt-2 uppercase tracking-widest">Places limitées</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION EBOOKS */}
      <section id="ebook" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle title="Ressources" subtitle="Pour aller plus loin" />
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
             <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">Pas encore prêt pour un suivi ?</h3>
                <p className="text-zinc-400 mb-6">
                  Découvre mes Ebooks pour commencer à travailler en autonomie sur tes points faibles (Épaules, Dos, Genoux).
                </p>
                <Button variant="secondary" onClick={() => window.open('https://www.fitrehab.fr/kitgenousansdouleur', '_blank')}>
                   Voir la boutique Ebooks <BookOpen size={16} className="ml-2"/>
                </Button>
             </div>
             <div className="flex-1 flex justify-center">
                 <div className="relative">
                    <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20"></div>
                    <BookOpen size={120} className="text-zinc-700 relative z-10" />
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="py-24 relative overflow-hidden bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black z-0"></div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <SectionTitle title="Me Contacter" subtitle="Une question ?" />
          
          <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 p-8 md:p-12 rounded-3xl animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <div className="space-y-6 text-center md:text-left">
              <p className="text-zinc-300 text-lg leading-relaxed">
                Pour toute question ou demande d&apos;infos, écris-moi directement par email ou passe par Instagram. Je réponds dès que possible.
              </p>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t border-zinc-800 pt-8 gap-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white">
                    <Mail size={20} />
                 </div>
                 <div>
                   <div className="text-sm text-zinc-400">Email Direct</div>
                   <div className="font-bold">contact@fitrehab.fr</div>
                 </div>
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/fit.rehab_/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-black border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <div className="container mx-auto px-6">
          <p className="mb-2">&copy; 2026 FITREHAB - Jeremy Polizzi.</p>
          <p>Masseur-Kinésithérapeute DE - Spécialisé Sport & CrossFit</p>
        </div>
      </footer>

      {/* Styles Globaux pour les animations */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000; 
        }
        ::-webkit-scrollbar-thumb {
          background: #333; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #D4AF37; 
        }
      `}</style>
    </div>
  );
}
