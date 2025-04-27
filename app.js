const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const message = document.getElementById('message');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value;

    if (emailRegex.test(email)) {
        // Make a request to the backend to check the domain
        const response = await fetch(`/validate-domain?email=${email}`);
        const data = await response.json();

        if (data.valid) {
            message.textContent = 'Valid email address and domain!';
            message.classList.add('success');
            message.classList.remove('error');
        } else {
            message.textContent = `Invalid domain: ${data.message}`;
            message.classList.add('error');
            message.classList.remove('success');
        }
    } else {
        message.textContent = 'Invalid email address!';
        message.classList.add('error');
        message.classList.remove('success');
    }
});
