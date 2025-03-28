document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                }
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    const bookingConfirmation = document.getElementById('booking-confirmation');
    const bookingDetails = document.getElementById('booking-details');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service');
            const serviceName = service.options[service.selectedIndex].text;
            const stylist = document.getElementById('stylist');
            const stylistName = stylist.value ? stylist.options[stylist.selectedIndex].text : 'No preference';
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const notes = document.getElementById('notes').value;
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Create booking details HTML
            const detailsHTML = `
                <div class="booking-details">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Service:</strong> ${serviceName}</p>
                    <p><strong>Stylist:</strong> ${stylistName}</p>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Time:</strong> ${time}</p>
                    <p><strong>Contact:</strong> ${email} | ${phone}</p>
                    ${notes ? `<p><strong>Special Requests:</strong> ${notes}</p>` : ''}
                </div>
            `;
            
            // Display confirmation and details
            bookingDetails.innerHTML = detailsHTML;
            bookingForm.style.display = 'none';
            bookingConfirmation.style.display = 'block';
            
            // In a real application, you would send this data to a server
            console.log('Booking submitted:', {
                name,
                email,
                phone,
                service: serviceName,
                stylist: stylistName,
                date: formattedDate,
                time,
                notes
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Show success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.color = '#20bf6b';
            successMessage.style.marginTop = '10px';
            
            // Clear form and append message
            emailInput.value = '';
            this.appendChild(successMessage);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            // In a real application, you would send this data to a server
            console.log('Newsletter subscription:', email);
        });
    }
    
    // Service filtering (could be expanded in the future)
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            const serviceSelect = document.getElementById('service');
            
            // Scroll to booking section
            const bookingSection = document.getElementById('booking');
            window.scrollTo({
                top: bookingSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Select the corresponding service in the dropdown
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].text === serviceName) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
        });
    });
    
    // Team member selection
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberName = this.querySelector('h3').textContent;
            const stylistSelect = document.getElementById('stylist');
            
            // Scroll to booking section
            const bookingSection = document.getElementById('booking');
            window.scrollTo({
                top: bookingSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Select the corresponding stylist in the dropdown
            for (let i = 0; i < stylistSelect.options.length; i++) {
                if (stylistSelect.options[i].text === memberName) {
                    stylistSelect.selectedIndex = i;
                    break;
                }
            }
        });
    });
    
    // Gallery image modal (simplified version)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const modal = document.createElement('div');
            modal.classList.add('gallery-modal');
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="Gallery Image">
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add styles for modal
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.position = 'relative';
            modalContent.style.maxWidth = '80%';
            modalContent.style.maxHeight = '80%';
            
            const modalImg = modal.querySelector('img');
            modalImg.style.width = '100%';
            modalImg.style.height = 'auto';
            modalImg.style.borderRadius = '5px';
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '10px';
            closeBtn.style.right = '20px';
            closeBtn.style.color = '#fff';
            closeBtn.style.fontSize = '35px';
            closeBtn.style.fontWeight = 'bold';
            closeBtn.style.cursor = 'pointer';
            
            // Close modal on click
            closeBtn.addEventListener('click', function() {
                modal.remove();
            });
            
            // Close modal when clicking outside the image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // Date validation for booking
    const dateInput = document.getElementById('date');
    if (dateInput) {
        // Set min date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${yyyy}-${mm}-${dd}`;
        
        dateInput.setAttribute('min', formattedToday);
        
        // Set max date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const maxYyyy = maxDate.getFullYear();
        const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxDd = String(maxDate.getDate()).padStart(2, '0');
        const formattedMaxDate = `${maxYyyy}-${maxMm}-${maxDd}`;
        
        dateInput.setAttribute('max', formattedMaxDate);
    }
    
    // Time validation for booking
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.addEventListener('change', function() {
            const selectedTime = this.value;
            const hour = parseInt(selectedTime.split(':')[0]);
            
            // Check if time is within business hours (9am-8pm)
            if (hour < 9 || hour >= 20) {
                alert('Please select a time between 9:00 AM and 8:00 PM');
                this.value = '09:00'; // Reset to default time
            }
        });
    }
});