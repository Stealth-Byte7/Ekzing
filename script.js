document.addEventListener('DOMContentLoaded', () => {
    // 1. Target the form element precisely within the contact section
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;

    // 2. Add the submit event handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop default browser reload

        // 3. Extract inputs dynamically using positional index arrays
        const inputs = this.querySelectorAll('input');
        const textarea = this.querySelector('textarea');
        const submitButton = this.querySelector('button');

        const clientName = inputs[0] ? inputs[0].value.trim() : '';
        const clientPhone = inputs[1] ? inputs[1].value.trim() : '';
        const clientMessage = textarea ? textarea.value.trim() : '';

        // Validation fallback
        if (!clientName || !clientPhone || !clientMessage) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // 4. Update UI button text to show transmission feedback
        if (submitButton) {
            submitButton.textContent = 'REDIRECTING TO WHATSAPP...';
            submitButton.disabled = true;
        }

        // 5. Structure the text presentation matrix using clean formatting templates
        const formattedText = 
            `*NEW PRODUCTION BOOKING*\n` +
            `=========================\n\n` +
            `👤 *Client/Corp:* ${clientName}\n` +
            `📞 *Phone Contact:* ${clientPhone}\n\n` +
            `📝 *Project Parameter Details:*\n` +
            `${clientMessage}\n\n` +
            `=========================`;

        // 6. Build the API target URL using the verified endpoint format
        const targetNumber = "2348107101103";
        const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(formattedText)}`;

        // 7. Fire the secure deep-link tab sequence
        window.open(whatsappUrl, '_blank');

        // 8. Soft-reset button state back to active design defaults
        setTimeout(() => {
            if (submitButton) {
                submitButton.textContent = 'SUBMIT';
                submitButton.disabled = false;
            }
            contactForm.reset();
        }, 1500);
    });

    // 9. Intercept the generic button click to force standard form dispatch validation
    const nativeButton = contactForm.querySelector('button[type="button"]');
    if (nativeButton) {
        nativeButton.addEventListener('click', () => {
            // Programmatically triggers HTML5 built-in attribute validations
            contactForm.requestSubmit(); 
        });
    }
});