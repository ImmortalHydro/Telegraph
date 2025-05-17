document.addEventListener('DOMContentLoaded', () => {
    const threadForm = document.getElementById('threadForm');
    const threadInput = document.getElementById('threadInput');
    const countrySelect = document.getElementById('countrySelect');
    const threadsContainer = document.getElementById('threadsContainer');

    // Mock user
    const currentUser = 'User' + Math.floor(Math.random() * 1000);

    // In-memory thread storage (resets on refresh)
    let threads = [];

    // Render initial threads
    renderThreads();

    // Format timestamp (HH:MM)
    const getTime = () => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    };

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
            timestamp: getTime()
        };

        threads.unshift(thread); // Add to top
        renderThreads();

        threadInput.value = '';
        countrySelect.value = '';
    });

    // Render threads
    function renderThreads() {
        threadsContainer.innerHTML = '';
        threads.forEach(thread => {
            const threadElement = document.createElement('div');
            threadElement.classList.add('thread');
            threadElement.innerHTML = `
                <div class="thread-header">
                    <span class="thread-user">${thread.user}</span>
                    <div>
                        <span class="thread-country">${thread.country}</span> • 
                        <span class="thread-time">${thread.timestamp}</span>
                    </div>
                </div>
                <div class="thread-text">${thread.text}</div>
                <div class="thread-actions">
                    <button class="reply-btn">Reply</button>
                </div>
                <div class="reply-form">
                    <form class="reply-form-form">
                        <textarea placeholder="Add a reply..." maxlength="280" required></textarea>
                        <button type="submit">Reply</button>
                    </form>
                </div>
                <div class="replies">
                    ${thread.replies.map(reply => `
                        <div class="reply">
                            <div class="thread-header">
                                <span class="thread-user">${reply.user}</span>
                                <div>
                                    <span class="thread-country">${reply.country}</span> • 
                                    <span class="thread-time">${reply.timestamp}</span>
                                </div>
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
                    country: countrySelect.value || thread.country, // Fallback
                    text: replyText,
                    timestamp: getTime()
                };

                thread.replies.push(reply);
                renderThreads();
                replyForm.classList.remove('active');
            });
        });
