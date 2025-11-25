// 3D Box Interactions
document.addEventListener('DOMContentLoaded', function() {
    const floatingBoxes = document.querySelectorAll('.floating-box');
    const cards = document.querySelectorAll('.service-card, .project-card, .cert-card');
    const stats = document.querySelectorAll('.about-stats .stat');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Enhanced 3D floating box interactions
    floatingBoxes.forEach((box, index) => {
        // Set custom CSS properties for rotation
        const rx = Math.random() * 60 - 30;
        const ry = Math.random() * 60 - 30;
        box.style.setProperty('--rx', `${rx}deg`);
        box.style.setProperty('--ry', `${ry}deg`);
        
        // Mouse follow effect
        box.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = `scale(1.2) rotateX(45deg) rotateY(45deg) translateZ(20px)`;
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
    
    // 3D card tilt effect on mouse move
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 3D stats hover effect
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05) rotateX(15deg) rotateY(10deg) translateZ(15px)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 3D timeline item interactions
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02) rotateY(8deg) translateZ(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Parallax effect for floating boxes
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingBoxes.forEach((box, index) => {
            const speed = (index + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            const rotateX = (mouseY - 0.5) * speed * 10;
            const rotateY = (mouseX - 0.5) * speed * 10;
            
            if (!box.matches(':hover')) {
                box.style.transform += ` translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    });
});