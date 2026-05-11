/**
 * Main application logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const headerBg = document.getElementById('header-bg');
    
    // Toggle mobile menu
    if(mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });
    }

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            headerBg.classList.add('opacity-100');
            headerBg.classList.remove('opacity-0');
        } else {
            headerBg.classList.remove('opacity-100');
            // headerBg.classList.add('opacity-0'); 
            // We want it slightly transparent or full transparent at top if using hero image underneath
        }
    });

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-brand-800', 'text-white', 'border-brand-800');
                b.classList.add('text-gray-600', 'border-gray-300');
            });
            
            // Add active class to clicked button
            btn.classList.add('active', 'bg-brand-800', 'text-white', 'border-brand-800');
            btn.classList.remove('text-gray-600', 'border-gray-300');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // match transition duration
                }
            });
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            // Modify Unsplash URL to load higher quality image for lightbox if needed
            // For now, use the same source or strip the width parameter for full size
            const highResSrc = imgSrc.replace('&w=600', '&w=1200');
            
            lightboxImg.setAttribute('src', highResSrc);
            
            lightbox.classList.remove('hidden');
            // Small delay to allow display block to apply before transitioning opacity
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.setAttribute('src', '');
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    };

    if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Escape key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });

    // Form Validation Logic
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        
        // Set minimum date to today (if date input exists)
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        if (dateInput) {
            dateInput.setAttribute('min', today);
        }

        // Setup "Other" specialty toggle for signup form
        const specialtyOtherCheckbox = document.getElementById('specialty-other');
        const specialtyOtherText = document.getElementById('specialty-other-text');
        if (specialtyOtherCheckbox && specialtyOtherText) {
            specialtyOtherCheckbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    specialtyOtherText.classList.remove('hidden');
                    specialtyOtherText.required = true;
                } else {
                    specialtyOtherText.classList.add('hidden');
                    specialtyOtherText.required = false;
                    specialtyOtherText.value = '';
                }
            });
        }

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate Name
            const name = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (!name.value.trim()) {
                nameError.classList.remove('hidden');
                name.classList.add('border-red-500');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
                name.classList.remove('border-red-500');
            }

            // Validate Email
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.classList.remove('hidden');
                email.classList.add('border-red-500');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
                email.classList.remove('border-red-500');
            }

            // Validate Phone
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');
            if (!phone.value.trim()) {
                phoneError.classList.remove('hidden');
                phone.classList.add('border-red-500');
                isValid = false;
            } else {
                phoneError.classList.add('hidden');
                phone.classList.remove('border-red-500');
            }

            // Validate Photographer (only if it exists)
            const photographer = document.getElementById('photographer');
            const photographerError = document.getElementById('photographer-error');
            if (photographer && photographerError) {
                if (!photographer.value) {
                    photographerError.classList.remove('hidden');
                    photographer.classList.add('border-red-500');
                    isValid = false;
                } else {
                    photographerError.classList.add('hidden');
                    photographer.classList.remove('border-red-500');
                }
            }

            // Validate Service (booking form) or Specialty (signup form)
            const service = document.getElementById('service');
            const serviceError = document.getElementById('service-error');
            if (service) {
                if (!service.value) {
                    serviceError.classList.remove('hidden');
                    service.classList.add('border-red-500');
                    isValid = false;
                } else {
                    serviceError.classList.add('hidden');
                    service.classList.remove('border-red-500');
                }
            } else {
                // We are on signup form with checkboxes
                const specialties = document.querySelectorAll('input[name="specialty"]:checked');
                if (specialties.length === 0) {
                    serviceError.classList.remove('hidden');
                    isValid = false;
                } else {
                    serviceError.classList.add('hidden');
                }

                // Validate Account Type
                const accountTypes = document.querySelectorAll('input[name="account_type"]:checked');
                // We can reuse the service error or add a generic error, but let's just make sure one is checked.
                const accountTypeRadios = document.querySelectorAll('input[name="account_type"]');
                if (accountTypeRadios.length > 0) {
                    let accountError = document.getElementById('account-error');
                    if (!accountError) {
                        // Create error dynamically if not present
                        accountError = document.createElement('p');
                        accountError.id = 'account-error';
                        accountError.className = 'text-red-500 text-xs mt-1';
                        accountError.innerText = 'Please select an account type.';
                        accountTypeRadios[0].closest('div').parentElement.appendChild(accountError);
                    }
                    if (accountTypes.length === 0) {
                        accountError.classList.remove('hidden');
                        isValid = false;
                    } else {
                        accountError.classList.add('hidden');
                    }
                }
            }

            // Validate Date (only if it exists)
            const dateError = document.getElementById('date-error');
            if (dateInput && dateError) {
                if (!dateInput.value || dateInput.value < today) {
                    dateError.classList.remove('hidden');
                    dateInput.classList.add('border-red-500');
                    isValid = false;
                } else {
                    dateError.classList.add('hidden');
                    dateInput.classList.remove('border-red-500');
                }
            }

            // Validate Time (only if it exists)
            const time = document.getElementById('time');
            const timeError = document.getElementById('time-error');
            if (time && timeError) {
                if (!time.value) {
                    timeError.classList.remove('hidden');
                    time.classList.add('border-red-500');
                    isValid = false;
                } else {
                    timeError.classList.add('hidden');
                    time.classList.remove('border-red-500');
                }
            }

            // Success state
            if (isValid) {
                const successMsg = document.getElementById('form-success');
                successMsg.classList.remove('hidden');
                
                // Reset form after showing success
                setTimeout(() => {
                    bookingForm.reset();
                    successMsg.classList.add('hidden');
                }, 4000);
            }
        });
    }
});
