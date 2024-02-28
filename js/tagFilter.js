function filterArticles() {
    const selectedTags = Array.from(document.querySelectorAll('.tag-btn.active')).map(btn => btn.dataset.tag);

    document.querySelectorAll('.article.container').forEach(table => {
        const rowTags = table.dataset.tags;
        if (!rowTags || rowTags === '' || selectedTags.length === 0 || selectedTags.every(tag => rowTags.split(',').map(tag => tag.trim()).includes(tag))) {
            table.style.display = ''; // Display the table if it has no tags or all selected tags
        } else {
            table.style.display = 'none'; // Hide the table if it has tags that don't match the selected tags
        }
    });
}

document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        filterArticles();
    });
});

// Initial filtering when the page loads
filterArticles();
