document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const feedbackEl = document.getElementById('feedback');
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const monthStr = document.getElementById('month').value;
    const yearStr = document.getElementById('year').value;
    
    feedbackEl.className = 'error';
    feedbackEl.textContent = '';

    if (cardNumber !== '1234123412341234') {
        feedbackEl.textContent = 'Error: Card number must be exactly 1234 1234 1234 1234.';
        return;
    }

    const month = parseInt(monthStr, 10);
    let year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        feedbackEl.textContent = 'Error: Please enter a valid MM and YY expiration format.';
        return;
    }

    if (year < 100) {
        year += 2000;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        feedbackEl.textContent = 'Error: This credit card has expired.';
        return;
    }

    feedbackEl.className = 'success';
    feedbackEl.textContent = 'Success! Your payment of $199 has been processed.';
});