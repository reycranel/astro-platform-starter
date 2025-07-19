// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Global variables
let heroScene, heroCamera, heroRenderer, heroModel;
let customizerScene, customizerCamera, customizerRenderer, customizerModel;
let wireframeScene, wireframeCamera, wireframeRenderer, wireframeModel;
let isRotating = false;
let currentZoom = 1;
let currentCustomization = {
    color: 'black',
    accent: 'none',
    material: 'standard',
    tech: { led: false, tracking: false }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initParticles();
    initHero3D();
    initCustomizer3D();
    initWireframe3D();
    initAnimations();
    initProductGrid();
    initCustomizerControls();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Particle system
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = Math.random() > 0.5 ? 'particle' : 'particle toxic';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles continuously
    setInterval(createParticle, 300);
}

// Hero 3D Model
function initHero3D() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    // Scene setup
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    heroRenderer.setSize(container.clientWidth, container.clientHeight);
    heroRenderer.setClearColor(0x000000, 0);
    container.appendChild(heroRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    heroScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4169E1, 1);
    directionalLight.position.set(5, 5, 5);
    heroScene.add(directionalLight);
    
    const greenLight = new THREE.PointLight(0x39FF14, 0.8, 100);
    greenLight.position.set(-5, 3, 3);
    heroScene.add(greenLight);

    // Create a placeholder jacket model
    createJacketModel(heroScene, (model) => {
        heroModel = model;
        heroScene.add(model);
    });

    // Camera position
    heroCamera.position.z = 5;

    // Controls
    const controls = document.querySelectorAll('.control-btn');
    controls.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            handleHeroControl(action);
        });
    });

    // Render loop
    function animateHero() {
        requestAnimationFrame(animateHero);
        
        if (heroModel) {
            if (isRotating) {
                heroModel.rotation.y += 0.01;
            } else {
                heroModel.rotation.y += 0.005;
            }
        }
        
        heroRenderer.render(heroScene, heroCamera);
    }
    animateHero();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (container.clientWidth && container.clientHeight) {
            heroCamera.aspect = container.clientWidth / container.clientHeight;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}

// Customizer 3D Model
function initCustomizer3D() {
    const container = document.getElementById('customizer-canvas');
    if (!container) return;

    // Scene setup
    customizerScene = new THREE.Scene();
    customizerCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    customizerRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    customizerRenderer.setSize(container.clientWidth, container.clientHeight);
    customizerRenderer.setClearColor(0x000000, 0);
    container.appendChild(customizerRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    customizerScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 3, 3);
    customizerScene.add(directionalLight);

    // Create customizable jacket model
    createJacketModel(customizerScene, (model) => {
        customizerModel = model;
        customizerScene.add(model);
        updateCustomizerModel();
    });

    // Camera position
    customizerCamera.position.z = 4;

    // Render loop
    function animateCustomizer() {
        requestAnimationFrame(animateCustomizer);
        
        if (customizerModel) {
            customizerModel.rotation.y += 0.008;
        }
        
        customizerRenderer.render(customizerScene, customizerCamera);
    }
    animateCustomizer();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (container.clientWidth && container.clientHeight) {
            customizerCamera.aspect = container.clientWidth / container.clientHeight;
            customizerCamera.updateProjectionMatrix();
            customizerRenderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}

// Wireframe 3D Model
function initWireframe3D() {
    const container = document.getElementById('wireframe-canvas');
    if (!container) return;

    // Scene setup
    wireframeScene = new THREE.Scene();
    wireframeCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    wireframeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    wireframeRenderer.setSize(container.clientWidth, container.clientHeight);
    wireframeRenderer.setClearColor(0x000000, 0);
    container.appendChild(wireframeRenderer.domElement);

    // Create wireframe model
    createWireframeModel(wireframeScene, (model) => {
        wireframeModel = model;
        wireframeScene.add(model);
    });

    // Camera position
    wireframeCamera.position.z = 6;

    // Render loop
    function animateWireframe() {
        requestAnimationFrame(animateWireframe);
        
        if (wireframeModel) {
            wireframeModel.rotation.x += 0.005;
            wireframeModel.rotation.y += 0.01;
        }
        
        wireframeRenderer.render(wireframeScene, wireframeCamera);
    }
    animateWireframe();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (container.clientWidth && container.clientHeight) {
            wireframeCamera.aspect = container.clientWidth / container.clientHeight;
            wireframeCamera.updateProjectionMatrix();
            wireframeRenderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}

// Create jacket model
function createJacketModel(scene, callback) {
    const group = new THREE.Group();
    
    // Main jacket body
    const bodyGeometry = new THREE.BoxGeometry(2, 2.5, 0.3);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // Sleeves
    const sleeveGeometry = new THREE.CylinderGeometry(0.3, 0.4, 2, 8);
    const leftSleeve = new THREE.Mesh(sleeveGeometry, bodyMaterial);
    leftSleeve.position.set(-1.3, 0.3, 0);
    leftSleeve.rotation.z = Math.PI / 2;
    group.add(leftSleeve);
    
    const rightSleeve = new THREE.Mesh(sleeveGeometry, bodyMaterial);
    rightSleeve.position.set(1.3, 0.3, 0);
    rightSleeve.rotation.z = -Math.PI / 2;
    group.add(rightSleeve);
    
    // LED strips (initially hidden)
    const ledGeometry = new THREE.BoxGeometry(1.8, 0.05, 0.05);
    const ledMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x39FF14, 
        transparent: true, 
        opacity: 0 
    });
    
    for (let i = 0; i < 3; i++) {
        const led = new THREE.Mesh(ledGeometry, ledMaterial.clone());
        led.position.set(0, 0.8 - i * 0.6, 0.16);
        led.userData.isLED = true;
        group.add(led);
    }
    
    // Accent trim
    const trimGeometry = new THREE.BoxGeometry(2.1, 0.1, 0.1);
    const trimMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4169E1, 
        transparent: true, 
        opacity: 0 
    });
    
    const shoulderTrim = new THREE.Mesh(trimGeometry, trimMaterial.clone());
    shoulderTrim.position.set(0, 1.3, 0.2);
    shoulderTrim.userData.isTrim = true;
    group.add(shoulderTrim);
    
    const waistTrim = new THREE.Mesh(trimGeometry, trimMaterial.clone());
    waistTrim.position.set(0, -1.2, 0.2);
    waistTrim.userData.isTrim = true;
    group.add(waistTrim);
    
    group.userData.type = 'jacket';
    
    if (callback) callback(group);
    return group;
}

// Create wireframe model
function createWireframeModel(scene, callback) {
    const group = new THREE.Group();
    
    // Create multiple geometric shapes
    const shapes = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.7, 16, 16),
        new THREE.ConeGeometry(0.6, 1.5, 8),
        new THREE.TorusGeometry(0.6, 0.2, 8, 16)
    ];
    
    shapes.forEach((geometry, index) => {
        const wireframeMaterial = new THREE.MeshBasicMaterial({ 
            color: index % 2 === 0 ? 0x4169E1 : 0x39FF14,
            wireframe: true 
        });
        const mesh = new THREE.Mesh(geometry, wireframeMaterial);
        mesh.position.set(
            (index - 1.5) * 2,
            Math.sin(index) * 0.5,
            Math.cos(index) * 0.5
        );
        group.add(mesh);
    });
    
    if (callback) callback(group);
    return group;
}

// Hero controls
function handleHeroControl(action) {
    if (!heroModel) return;
    
    switch (action) {
        case 'rotate':
            isRotating = !isRotating;
            break;
        case 'zoom':
            currentZoom = currentZoom === 1 ? 1.5 : 1;
            gsap.to(heroCamera.position, {
                z: 5 / currentZoom,
                duration: 0.5,
                ease: "power2.out"
            });
            break;
        case 'features':
            toggleLEDs(heroModel);
            break;
    }
}

// Toggle LED features
function toggleLEDs(model) {
    model.children.forEach(child => {
        if (child.userData.isLED) {
            const targetOpacity = child.material.opacity === 0 ? 0.8 : 0;
            gsap.to(child.material, {
                opacity: targetOpacity,
                duration: 0.3
            });
        }
    });
}

// GSAP Animations
function initAnimations() {
    // Hero title animation
    gsap.set('.title-line', { y: 100, opacity: 0 });
    gsap.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    });
    
    // Hero subtitle and button
    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.2
    });
    
    gsap.from('.cta-button', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.4
    });
    
    // Section animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Product cards animation
    gsap.from('.product-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.product-grid',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Lab stats animation
    gsap.from('.stat', {
        scale: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.lab-stats',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
}

// Product grid interactions
function initProductGrid() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const video = card.querySelector('.product-video');
        
        card.addEventListener('mouseenter', () => {
            if (video) {
                video.currentTime = 0;
                video.play().catch(e => console.log('Video play failed:', e));
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
            }
        });
        
        card.addEventListener('click', () => {
            // Navigate to customizer
            document.getElementById('customizer').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
}

// Customizer controls
function initCustomizerControls() {
    // Color selection
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCustomization.color = btn.dataset.color;
            updateCustomizerModel();
        });
    });
    
    // Accent selection
    const accentBtns = document.querySelectorAll('.accent-btn');
    accentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            accentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCustomization.accent = btn.dataset.accent;
            updateCustomizerModel();
        });
    });
    
    // Material selection
    const materialBtns = document.querySelectorAll('.material-btn');
    materialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            materialBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCustomization.material = btn.dataset.material;
            updateCustomizerModel();
        });
    });
    
    // Tech options
    const techCheckboxes = document.querySelectorAll('.tech-option input[type="checkbox"]');
    techCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const techType = checkbox.dataset.tech;
            currentCustomization.tech[techType] = checkbox.checked;
            updateCustomizerModel();
        });
    });
    
    // Add to cart button
    const ctaButton = document.querySelector('.customize-cta');
    ctaButton.addEventListener('click', () => {
        // Animate button
        gsap.to(ctaButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        // Show confirmation (you could implement a modal here)
        alert('Added to cart! (This is a demo)');
    });
}

// Update customizer model based on selections
function updateCustomizerModel() {
    if (!customizerModel) return;
    
    customizerModel.children.forEach(child => {
        // Update main color
        if (child.material && !child.userData.isLED && !child.userData.isTrim) {
            let color;
            switch (currentCustomization.color) {
                case 'royal':
                    color = 0x4169E1;
                    break;
                case 'toxic':
                    color = 0x39FF14;
                    break;
                default:
                    color = 0x000000;
            }
            child.material.color.setHex(color);
            
            // Update material properties
            switch (currentCustomization.material) {
                case 'kevlar':
                    child.material.roughness = 0.8;
                    child.material.metalness = 0.2;
                    break;
                case 'reflective':
                    child.material.roughness = 0.1;
                    child.material.metalness = 0.9;
                    break;
                default:
                    child.material.roughness = 0.5;
                    child.material.metalness = 0.1;
            }
        }
        
        // Update accent trim
        if (child.userData.isTrim) {
            let trimOpacity = 0;
            let trimColor = 0x4169E1;
            
            if (currentCustomization.accent === 'royal') {
                trimOpacity = 1;
                trimColor = 0x4169E1;
            } else if (currentCustomization.accent === 'toxic') {
                trimOpacity = 1;
                trimColor = 0x39FF14;
            }
            
            child.material.opacity = trimOpacity;
            child.material.color.setHex(trimColor);
        }
        
        // Update LED strips
        if (child.userData.isLED) {
            child.material.opacity = currentCustomization.tech.led ? 0.8 : 0;
        }
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for lab section
    gsap.to('.lab-parallax', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".lab",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Newsletter form animation
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        gsap.from(newsletterForm, {
            y: 30,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: newsletterForm,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
            }
        });
    }
}

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && email.includes('@')) {
                // Animate button
                gsap.to(newsletterBtn, {
                    backgroundColor: '#4169E1',
                    duration: 0.3
                });
                
                // Show success message
                newsletterInput.value = '';
                newsletterInput.placeholder = 'SUBSCRIBED!';
                
                setTimeout(() => {
                    newsletterInput.placeholder = 'YOUR EMAIL';
                    gsap.to(newsletterBtn, {
                        backgroundColor: '#39FF14',
                        duration: 0.3
                    });
                }, 2000);
            } else {
                // Show error animation
                gsap.to(newsletterInput, {
                    x: -10,
                    duration: 0.1,
                    repeat: 5,
                    yoyo: true,
                    ease: "power2.inOut"
                });
            }
        });
    }
});

// CTA button functionality
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.getElementById('collections').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
});

// Performance optimization
function optimizePerformance() {
    // Reduce animations on mobile
    if (window.innerWidth <= 768) {
        gsap.globalTimeline.timeScale(0.5);
    }
    
    // Pause videos when not visible
    const videos = document.querySelectorAll('video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => console.log('Video play failed:', e));
            } else {
                entry.target.pause();
            }
        });
    });
    
    videos.forEach(video => observer.observe(video));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);