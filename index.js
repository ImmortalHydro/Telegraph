document.addEventListener('DOMContentLoaded', () => {
    const threadForm = document.getElementById('threadForm');
    const threadInput = document.getElementById('threadInput');
    const countrySelect = document.getElementById('countrySelect');
    const threadsContainer = document.getElementById('threadsContainer');

    // Mock user (in a real app, use auth)
    const currentUser = 'User' + Math.floor(Math.random() * 1000);

    // Load threads from local storage
    let threads = JSON.parse(localStorage.getItem('threads')) || [];

    // Render threads on load
    renderThreads();

    // Handle thread submission
    threadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const text = threadInput.value.trim();
        const country = countrySelect.value;

        if (!text || !country) return;

        const thread = {
            id: Date.now(),
            user: currentUser,
            country,
            text,
            replies: [],
            timestamp: new Date().toISOString()
        };

        threads.unshift(thread); // Add to top
        localStorage.setItem('threads', JSON.stringify(threads));
        renderThreads();

        threadInput.value = '';
        countrySelect.value = '';
    });

    // Render all threads
    function renderThreads() {
        threadsContainer.innerHTML = '';
        threads.forEach(thread => {
            const threadElement = document.createElement('div');
            threadElement.classList.add('thread');
            threadElement.innerHTML = `
                <div class="thread-header">
                    <span class="thread-user">${thread.user}</span>
                    <span class="thread-country">${thread.country}</span>
                </div>
                <div class="thread-text">${thread.text}</div>
                <div class="thread-actions">
                    <button class="reply-btn">Reply</button>
                </div>
                <div class="reply-form">
                    <form class="reply-form-form">
                        <textarea placeholder="Add a reply..." maxlength="280" required></textarea>
                        <button type="submit">Post Reply</button>
                    </form>
                </div>
                <div class="replies">
                    ${thread.replies.map(reply => `
                        <div class="reply">
                            <div class="thread-header">
                                <span class="thread-user">${reply.user}</span>
                                <span class="thread-country">${reply.country}</span>
                            </div>
                            <div class="thread-text">${reply.text}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            threadsContainer.appendChild(threadElement);

            // Handle reply button
            const replyBtn = threadElement.querySelector('.reply-btn');
            const replyForm = threadElement.querySelector('.reply-form');
            replyBtn.addEventListener('click', () => {
                replyForm.classList.toggle('active');
            });

            // Handle reply submission
            const replyFormForm = threadElement.querySelector('.reply-form-form');
            replyFormForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const replyText = replyFormForm.querySelector('textarea').value.trim();
                if (!replyText) return;

                const reply = {
                    id: Date.now(),
                    user: currentUser,
                    country: countrySelect.value || thread.country, // Fallback to thread's country
                    text: replyText,
                    timestamp: new Date().toISOString()
                };

                thread.replies.push(reply);
                localStorage.setItem('threads', JSON.stringify(threads));
                renderThreads();
            });
        });
    }
});
