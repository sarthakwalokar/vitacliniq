/**
 * VitaCliniq Global CRO - Core Interactive Scripts
 * Synthesizing Clinexel, JSS Medical Research, and ProRelix Research
 * Multi-Page & Fully Responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initCounterAnimations();
  initServicesFilter();
  initPeopleFilter();
  initBioModal();
  initFeasibilityCalculator();
  initContactForm();
});

/* ==========================================================================
   1. Sticky Header & Scroll Handling
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Responsive Mobile Drawer Navigation with Backdrop & Submenu Accordion
   ========================================================================== */
function initMobileNavigation() {
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  let backdrop = document.querySelector('.nav-backdrop');

  if (!hamburger || !navMenu) return;

  // Create backdrop element if not already present
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  const toggleMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    if (shouldOpen) {
      navMenu.classList.add('open');
      hamburger.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('menu-open');
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  backdrop.addEventListener('click', () => {
    toggleMenu(false);
  });

  // Handle dropdown accordions on mobile
  const dropdownItems = navMenu.querySelectorAll('.nav-item.has-dropdown');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          // If on mobile/tablet, toggle dropdown on click
          e.preventDefault();
          const isOpen = item.classList.contains('open-sub');
          dropdownItems.forEach(other => other.classList.remove('open-sub'));
          if (!isOpen) {
            item.classList.add('open-sub');
          }
        }
      });
    }
  });

  // Close drawer when regular navigation links are clicked
  navMenu.querySelectorAll('a:not(.nav-item.has-dropdown > .nav-link)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        toggleMenu(false);
      }
    });
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Close menu on screen resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   3. Animated Stat Counters (JSS Research style)
   ========================================================================== */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = counter.getAttribute('data-decimal') === 'true';
          const duration = 2000;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   4. Services Filter Tabs (Clinexel Full Lifecycle)
   ========================================================================== */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (category && category.includes(filter))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 150);
        }
      });
    });
  });
}

/* ==========================================================================
   5. "Our People" Leadership Filter (ProRelix Leadership Focus)
   ========================================================================== */
function initPeopleFilter() {
  const filterBtns = document.querySelectorAll('.people-filter-btn');
  const personCards = document.querySelectorAll('.person-card');

  if (!filterBtns.length || !personCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      personCards.forEach(card => {
        const roleCategory = card.getAttribute('data-group');
        if (filter === 'all' || roleCategory === filter || (roleCategory && roleCategory.includes(filter))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 150);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Leadership Bio Modal Popup (ProRelix Detailed Profiles)
   ========================================================================== */
const leadershipData = {
  arvind: {
    name: "Dr. Arvind K. Sharma",
    degrees: "MD, PhD, FACP",
    role: "Chief Executive Officer & Global Managing Director",
    region: "Global Oversight (India & US)",
    avatarInitial: "AS",
    bio: "Dr. Arvind Sharma brings more than 25 years of distinguished leadership across pharmaceutical clinical research, medical operations, and regulatory strategy. Former senior medical advisor to CDSCO and seasoned investigator for US-FDA trials, he has overseen 150+ successful Phase I–IV clinical studies in oncology, cardiology, and infectious diseases.",
    experience: "25+ Years in Pharma & CRO",
    trials: "150+ Trials Completed",
    focus: "Oncology, Global MRCT, CDSCO / FDA Regulatory Filings",
    publications: "38 Peer-Reviewed Clinical Publications"
  },
  elena: {
    name: "Dr. Elena Rostova",
    degrees: "MD, MSc (Pharmacoepidemiology)",
    role: "Chief Medical Officer & VP Clinical Safety",
    region: "North America & Europe",
    avatarInitial: "ER",
    bio: "Dr. Elena Rostova is a board-certified physician and pharmacovigilance specialist with over 18 years in drug safety and clinical risk management. She previously led safety monitoring boards at multinational biopharma companies in Montreal and Boston, specializing in signal detection, DSMB representation, and ICH E2B(R3) compliance.",
    experience: "18+ Years Medical Monitoring",
    trials: "95+ Safety Committees Chaired",
    focus: "Immunology, Rare Indications, QPPV Services",
    publications: "22 Clinical Safety Papers"
  },
  niranjan: {
    name: "Mr. Niranjan A. Patil",
    degrees: "M.Pharm, PMP, RAC",
    role: "Executive VP – Global Clinical Operations & Feasibility",
    region: "APAC & Middle East",
    avatarInitial: "NP",
    bio: "Mr. Niranjan Patil is a clinical operations pioneer who has led site network establishment across 35 countries. With rigorous knowledge of ICH-GCP and local regulatory nuances in India, Southeast Asia, and Eastern Europe, he specializes in rapid protocol feasibility, site qualification, and high-retention patient recruitment strategies.",
    experience: "20+ Years Clinical Operations",
    trials: "200+ Trial Sites Managed",
    focus: "Site Initiation, TMF Integrity, MRCT Logistics",
    publications: "Speaker at Global CRO Summits"
  },
  marcus: {
    name: "Dr. Marcus Vance",
    degrees: "PhD, CStat, Fellow RSS",
    role: "Head of Biometrics & Clinical Data Science",
    region: "North America (Canada / US)",
    avatarInitial: "MV",
    bio: "Dr. Marcus Vance has directed statistical programming and data management for more than 85 NDA, BLA, and MAA regulatory submissions. A recognized authority on adaptive clinical trial designs and CDISC SDTM/ADaM standards, he ensures 100% submission compliance across FDA, EMA, and Health Canada.",
    experience: "22+ Years Biostatistics",
    trials: "85+ Regulatory Submissions",
    focus: "CDISC Standards, Interim Analysis, Statistical Analysis Plans (SAP)",
    publications: "Author of Statistical Methodologies in Clinical Research"
  },
  sarah: {
    name: "Sarah Jenkins",
    degrees: "MS, RAC (US & EU)",
    role: "Senior VP – Global Regulatory Affairs & Compliance",
    region: "Europe & Americas",
    avatarInitial: "SJ",
    bio: "Sarah Jenkins is an international regulatory strategist specializing in expedited pathways (FDA Fast Track, Breakthrough Therapy, EMA PRIME). She has successfully guided 50+ emerging biotechs through pre-IND briefings, CTD dossier authoring, CE Marking for medical devices, and post-approval variations.",
    experience: "19+ Years Regulatory Affairs",
    trials: "70+ Investigational New Drug (IND) Approvals",
    focus: "IND/NDA Dossiers, EU-MDR / IVDR, Scientific Advice Meetings",
    publications: "Regulatory Affairs Professionals Society (RAPS) Senior Fellow"
  },
  sornaraja: {
    name: "Dr. Sornaraja Ramanathan",
    degrees: "MD, DM (Clinical Pharmacology)",
    role: "Director – Medical Writing & Pharmacovigilance",
    region: "Global Delivery Hub",
    avatarInitial: "SR",
    bio: "Dr. Sornaraja brings exhaustive expertise in clinical pharmacology, First-in-Human (FIH) dose escalation protocols, and regulatory medical writing. He leads an elite team of medical writers delivering audit-ready Clinical Study Reports (CSR), Investigator's Brochures (IB), and Clinical Evaluation Reports (CER) for medical devices.",
    experience: "17+ Years Medical Writing & PV",
    trials: "110+ Protocols & CSRs Authored",
    focus: "Pharmacokinetics (PK/PD), EU-MDR CER, Clinical Study Reports",
    publications: "Editor, Journal of Clinical Development"
  }
};

function initBioModal() {
  const modalBackdrop = document.getElementById('bioModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('.open-bio-btn');

  if (!modalBackdrop || !closeBtn) return;

  const modalName = document.getElementById('modalName');
  const modalDegrees = document.getElementById('modalDegrees');
  const modalRole = document.getElementById('modalRole');
  const modalAvatar = document.getElementById('modalAvatar');
  const modalBioText = document.getElementById('modalBioText');
  const modalExp = document.getElementById('modalExp');
  const modalTrials = document.getElementById('modalTrials');
  const modalFocus = document.getElementById('modalFocus');
  const modalPubs = document.getElementById('modalPubs');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const personKey = btn.getAttribute('data-person');
      const data = leadershipData[personKey];
      if (!data) return;

      if (modalName) modalName.textContent = data.name;
      if (modalDegrees) modalDegrees.textContent = data.degrees;
      if (modalRole) modalRole.textContent = data.role + " (" + data.region + ")";
      if (modalAvatar) modalAvatar.textContent = data.avatarInitial;
      if (modalBioText) modalBioText.textContent = data.bio;
      if (modalExp) modalExp.textContent = data.experience;
      if (modalTrials) modalTrials.textContent = data.trials;
      if (modalFocus) modalFocus.textContent = data.focus;
      if (modalPubs) modalPubs.textContent = data.publications;

      modalBackdrop.classList.add('active');
      document.body.classList.add('menu-open');
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Interactive Feasibility Estimator (Sponsor Tool)
   ========================================================================== */
function initFeasibilityCalculator() {
  const phaseSelect = document.getElementById('calcPhase');
  const scopeSelect = document.getElementById('calcScope');
  const geoSelect = document.getElementById('calcGeo');
  const patientsInput = document.getElementById('calcPatients');

  const outStartupTime = document.getElementById('outStartupTime');
  const outLockTime = document.getElementById('outLockTime');
  const outAudits = document.getElementById('outAudits');
  const outAgency = document.getElementById('outAgency');

  if (!phaseSelect || !scopeSelect || !geoSelect || !patientsInput) return;

  const recalculate = () => {
    const phase = phaseSelect.value;
    const geo = geoSelect.value;
    const patientCount = parseInt(patientsInput.value, 10) || 50;

    // Projected Start-up time
    let startupWeeks = 6;
    if (phase === 'phase3') startupWeeks = 10;
    else if (phase === 'phase2') startupWeeks = 8;
    else if (phase === 'fih') startupWeeks = 7;

    if (geo === 'global' || geo === 'us-eu') startupWeeks += 2;

    // Projected DB Lock after LPI
    let dbLockWeeks = "3 - 4 Weeks";
    if (patientCount > 300) dbLockWeeks = "4 - 6 Weeks";
    if (patientCount < 50) dbLockWeeks = "2 - 3 Weeks";

    // Expected Regulatory pathway
    let agencyPath = "CDSCO / FDA Pre-IND";
    if (geo === 'us-eu') agencyPath = "FDA IND & EMA CTA";
    else if (geo === 'apac') agencyPath = "CDSCO & TGA Expedited";
    else if (geo === 'global') agencyPath = "ICH Multi-Regional CTA";

    if (outStartupTime) outStartupTime.textContent = `${startupWeeks} - ${startupWeeks + 2} Weeks`;
    if (outLockTime) outLockTime.textContent = dbLockWeeks;
    if (outAudits) outAudits.textContent = "100% Inspection-Ready";
    if (outAgency) outAgency.textContent = agencyPath;
  };

  [phaseSelect, scopeSelect, geoSelect, patientsInput].forEach(elem => {
    elem.addEventListener('change', recalculate);
    elem.addEventListener('input', recalculate);
  });

  // Calculate once initially
  recalculate();

  const calcBtn = document.getElementById('calcRequestBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      showToast("✓ Feasibility parameters saved! Please complete your inquiry below.");
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'contact.html';
      }
    });
  }
}

/* ==========================================================================
   8. Contact & RFQ Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('rfqForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
      </svg>
      Submitting Inquiry...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast("✓ Thank you! A Senior Clinical Director will contact you within 24 hours under NDA.");
    }, 1200);
  });
}

/* ==========================================================================
   9. Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
