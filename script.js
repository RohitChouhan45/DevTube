// Generate mock video data
const videoData = Array(40).fill().map((_, i) => ({
    id: i,
    thumbnail: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'><rect width='16' height='9' fill='%23${Math.floor(Math.random()*16777215).toString(16)}'/></svg>`,
    title: `Video Title ${i + 1}`,
    channel: `Channel ${Math.floor(Math.random() * 5) + 1}`,
    views: `${Math.floor(Math.random() * 1000)}K views`,
    timestamp: `${Math.floor(Math.random() * 11) + 1} months ago`
  }));
  
  // Create video elements
  function createVideoElements(container, videos) {
    container.innerHTML = '';
    videos.forEach(video => {
      const videoElement = document.createElement('div');
      videoElement.className = 'video';
      videoElement.innerHTML = `
        <div style="position: relative; padding-bottom: 56.25%;">
          <img src="${video.thumbnail}" alt="${video.title}" 
               style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">
        </div>
        <div style="padding: 12px 0; display: flex; gap: 12px;">
          <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><circle fill='%23${Math.floor(Math.random()*16777215).toString(16)}' cx='12' cy='12' r='12'/></svg>" 
               style="width: 36px; height: 36px; border-radius: 50%;">
          <div>
            <h3 style="font-size: 16px; margin-bottom: 4px;">${video.title}</h3>
            <p style="color: var(--text-secondary); font-size: 14px;">${video.channel}</p>
            <p style="color: var(--text-secondary); font-size: 14px;">${video.views} • ${video.timestamp}</p>
          </div>
        </div>
      `;
      container.appendChild(videoElement);
    });
  
  }
  
  // Initialize homepage videos
  const videosContainer = document.querySelector('.videos');
  createVideoElements(videosContainer, videoData);
  
  // Generate profile videos (uploads are intentionally set to zero)
  function loadProfileVideos() {
    const profileVideosContainer = document.querySelector('.profile-videos');
    // Since uploads should be zero, show a message indicating no uploads.
    profileVideosContainer.innerHTML = '<p style="color: var(--text-secondary); padding: 16px;">No uploads</p>';
  }
  
  // Add event listeners
  document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('collapsed');
    document.querySelector('main').classList.toggle('sidebar-collapsed');
  });
  
  // Search functionality
  document.querySelector('.search form').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = e.target.querySelector('input').value;
    alert(`Search for: ${searchTerm}`);
  });
  
  // Add hover effects for buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.opacity = '0.8';
    });
    button.addEventListener('mouseout', () => {
      button.style.opacity = '1';
    });
  });
  
  // Add sidebar collapse functionality
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('main');
  
  function toggleSidebar() {
    const isCollapsed = sidebar.classList.contains('collapsed');
    
    if (isCollapsed) {
      sidebar.classList.remove('collapsed');
      main.classList.remove('sidebar-collapsed');
      document.querySelectorAll('.sidebar .section a span').forEach(span => {
        span.style.display = 'inline';
      });
    } else {
      sidebar.classList.add('collapsed');
      main.classList.add('sidebar-collapsed');
      document.querySelectorAll('.sidebar .section a span').forEach(span => {
        span.style.display = 'none';
      });
    }
  }
  
  document.querySelector('.menu-btn').addEventListener('click', toggleSidebar);
  
  
  
  // Show different content areas
  function showContentArea(areaId) {
    // Hide all content areas
    document.querySelector('.videos').classList.add('hidden');
    document.getElementById('shorts-container').classList.add('hidden');
    document.getElementById('profile-container').classList.add('hidden');
    
    // Remove active class from all nav links
    document.querySelectorAll('.sidebar a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Show the selected area
    if (areaId === 'home') {
      document.querySelector('.videos').classList.remove('hidden');
      document.getElementById('home-link').classList.add('active');
    } else if (areaId === 'shorts') {
      document.getElementById('shorts-container').classList.remove('hidden');
      document.getElementById('shorts-link').classList.add('active');
    } else if (areaId === 'profile') {
      document.getElementById('profile-container').classList.remove('hidden');
      loadProfileVideos();
    }
  }
  
  // Navigation
  document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    showContentArea('home');
  });
  
    
  document.getElementById('shorts-link').addEventListener('click', (e) => {
    e.preventDefault();
    showContentArea('shorts');
  });
  
  document.getElementById('profile-button').addEventListener('click', (e) => {
    e.preventDefault();
    showContentArea('profile');
  });
  
  document.getElementById('switch-to-rounds').addEventListener('click', () => {
    showContentArea('rounds');
  });
  
  // Add round button
  document.getElementById('add-round').addEventListener('click', () => {
    const round = new Round(
      Math.random() * (window.innerWidth - 200),
      Math.random() * (window.innerHeight - 200)
    );
    activeRounds.push(round);
  });
  
  // Animation loop for rounds
  function animate() {
    activeRounds.forEach(round => round.update());
    requestAnimationFrame(animate);
  }
  animate();
 
  
  // Profile page specific functionality
  document.querySelector('.subscribe-btn').addEventListener('click', function() {
    if (this.textContent === 'SUBSCRIBE') {
      this.textContent = 'SUBSCRIBED';
      document.getElementById('subscriber-count').textContent = '1';
      this.style.background = 'var(--bg-secondary)';
    } else {
      this.textContent = 'SUBSCRIBE';
      document.getElementById('subscriber-count').textContent = '0';
      this.style.background = 'var(--accent)';
    }
  });
  
  // Initialize with home view
  showContentArea('home');