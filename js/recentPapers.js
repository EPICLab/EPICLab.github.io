async function updateNewsSection() {
    try {
      const response = await fetch('publications.html');
      const htmlContent = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
  
      const publications = doc.querySelectorAll('.article');
      const newsContent = [];
  
      for (let i = 1; i < 2 && i < publications.length; i++) {
        const publication = publications[i];
        const conferenceLink = publication.querySelector('a[href^="https://conf.researchr.org"]');
        const conferenceName = conferenceLink ? conferenceLink.textContent : 'Conference not available';
        const title = publication.querySelector('.title').textContent;
        const authors = publication.querySelector('.author').textContent;
        const doiElement = publication.querySelector('a[href^="https://doi.org"]');
        const doi = doiElement ? doiElement.getAttribute('href') : 'DOI not available';
        const pdfElement = publication.querySelector('a[href$=".pdf"]');
        const pdfLink = pdfElement ? pdfElement.getAttribute('href') : null;
  
        const doiButton = `<button class="doi-button" onclick="window.open('${doi}', '_blank')">View DOI</button>`;
        const pdfButton = pdfLink ? `<button class="pdf-button" onclick="window.open('${pdfLink}', '_blank')">View PDF</button>` : '';
  
        const publicationInfo = `<div class="publication-container">
                                  <span class="conference">${conferenceName}</span>
                                  <strong>${title}</strong><br>
                                  <span class="author">${authors}</span><br>
                                  ${doiButton}${pdfButton}
                                </div>`;
  
        newsContent.push(publicationInfo);
      }
  
      document.getElementById('news-content').innerHTML = newsContent.join('');
    } catch (error) {
      console.error('Error fetching and updating news section:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', updateNewsSection);
  