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
});
