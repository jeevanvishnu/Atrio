document.addEventListener('DOMContentLoaded', () => {

    let popupInjected = false;
    let popupVisible = false;

    // Function to inject HTML and initialize the popup
    const initPopup = () => {
        if (popupInjected) return;

        // Create popup overlay and container
        const overlay = document.createElement('div');
        overlay.id = 'lead-popup-overlay';
        overlay.className = 'lead-popup-overlay';
        
        overlay.innerHTML = `
            <div class="lead-popup-container" role="dialog" aria-modal="true" aria-labelledby="popup-title">
                <button class="lead-popup-close" id="lead-popup-close" aria-label="Close popup">
                    <i data-lucide="x"></i>
                </button>
                
                <div class="lead-popup-left">
                    <div class="lead-popup-left-overlay"></div>
                    <div class="lead-popup-left-content">
                        <img src="assets/Logo.png" alt="Atrio Education" class="popup-logo" onerror="this.src='https://placehold.co/120x40/fff/000?text=ATRIO'">
                        <div class="popup-text-content">
                            <h2 id="popup-title">Get Free<br>Career Consultation</h2>
                            <p>Speak with our education experts and get personalized guidance for your career goals.</p>
                            <ul class="popup-features-list">
                                <li>
                                    <i data-lucide="check-circle-2"></i>
                                    <span>1-on-1 Expert Mentorship</span>
                                </li>
                                <li>
                                    <i data-lucide="book-open"></i>
                                    <span>Industry-Ready Programs</span>
                                </li>
                                <li>
                                    <i data-lucide="briefcase"></i>
                                    <span>Placement & Career Support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="lead-popup-right">
                    <div class="lead-popup-header-mobile">
                        <h2>🎓 Get Free Consultation</h2>
                        <p>Speak with our experts for personalized guidance.</p>
                    </div>
                    <form id="lead-popup-form" class="lead-popup-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="popup-name">Full Name <span class="required">*</span></label>
                                <div class="popup-input-wrapper">
                                    <i data-lucide="user" class="input-icon"></i>
                                    <input type="text" id="popup-name" name="name" required placeholder="Full Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="popup-phone">Phone Number <span class="required">*</span></label>
                                <div class="popup-input-wrapper">
                                    <i data-lucide="phone" class="input-icon"></i>
                                    <input type="tel" id="popup-phone" name="phone" required placeholder="Enter mobile number">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="popup-email">Email Address <span class="required">*</span></label>
                                <div class="popup-input-wrapper">
                                    <i data-lucide="mail" class="input-icon"></i>
                                    <input type="email" id="popup-email" name="email" required placeholder="Enter email address">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="popup-course">Interested Course <span class="required">*</span></label>
                                <div class="popup-input-wrapper">
                                    <i data-lucide="graduation-cap" class="input-icon"></i>
                                    <select id="popup-course" name="course" required>
                                        <option value="" disabled selected>Select a course</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Financial Accounting">Financial Accounting</option>
                                        <option value="Office Administration">Office Administration</option>
                                        <option value="Arabic Translation">Arabic Translation</option>
                                        <option value="Typing English & Arabic">Typing</option>
                                        <option value="Spoken English & Arabic">Spoken Language</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="popup-message">Message (Optional)</label>
                            <div class="popup-input-wrapper textarea-wrapper">
                                <i data-lucide="message-square" class="input-icon textarea-icon"></i>
                                <textarea id="popup-message" name="message" rows="2" placeholder="Tell us about your goals..."></textarea>
                            </div>
                        </div>
                        
                        <div class="popup-success-msg" id="popup-success-msg" style="display: none;">
                            <i data-lucide="check-circle" style="color: #2e7d32; width: 18px; height: 18px; margin-right: 8px;"></i>
                            Thanks! We will contact you shortly.
                        </div>

                        <div class="lead-popup-actions">
                            <button type="submit" class="btn btn-primary popup-btn">Get Free Consultation</button>
                            <a href="https://wa.me/918089445307" target="_blank" rel="noopener noreferrer" class="btn btn-outline popup-btn popup-whatsapp-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        popupInjected = true;

        // Re-initialize Lucide icons for the newly injected HTML
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Setup event listeners
        const closeBtn = document.getElementById('lead-popup-close');
        const form = document.getElementById('lead-popup-form');

        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation is handled by HTML5 required attributes, 
            // but we can add success feedback here
            const successMsg = document.getElementById('popup-success-msg');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Simulate form submission
            setTimeout(() => {
                successMsg.style.display = 'flex';
                submitBtn.textContent = 'Submitted';
                
                // Close popup after a short delay
                setTimeout(() => {
                    closePopup();
                }, 2000);
            }, 800);
        });
    };

    const openPopup = () => {
        if (popupVisible) return;
        if (!popupInjected) initPopup();

        const overlay = document.getElementById('lead-popup-overlay');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        popupVisible = true;
        
        // Mark as shown in this session
        sessionStorage.setItem('atrioPopupShown', 'true');
    };

    const closePopup = () => {
        if (!popupVisible) return;
        
        const overlay = document.getElementById('lead-popup-overlay');
        overlay.classList.remove('visible');
        document.body.style.overflow = ''; // Restore background scrolling
        popupVisible = false;
    };

    // Trigger 1: Time delay (15 seconds)
    const timeTrigger = setTimeout(() => {
        if (!sessionStorage.getItem('atrioPopupShown')) {
            openPopup();
        }
    }, 15000);

    // Trigger 2: Scroll percentage (25% - 30%)
    const handleScroll = () => {
        if (sessionStorage.getItem('atrioPopupShown')) {
            window.removeEventListener('scroll', handleScroll);
            return;
        }

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight - windowHeight;
        
        if (documentHeight > 0) {
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            
            if (scrollPercentage >= 25) {
                openPopup();
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(timeTrigger); // Cancel time trigger if scroll trigger hits first
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Setup manual trigger buttons
    const setupTriggerButtons = () => {
        const triggerBtns = document.querySelectorAll('.trigger-popup-btn');
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openPopup();
            });
        });
    };
    
    // Initialize manual triggers
    setupTriggerButtons();
});
