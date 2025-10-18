// Sophisticated iPhone Mockup JavaScript
const delay = 300;
let afterResize;
let currentStyle;

window.onresize = function(){
	document.body.classList.add('is-resizing');
  	clearTimeout(afterResize);
  	afterResize = setTimeout(() => document.body.classList.remove('is-resizing'), delay);
};

document.getElementById('zoom').addEventListener('click', () => {
	document.body.classList.add('is-resizing');
	setTimeout(() => document.body.classList.remove('is-resizing'), delay)
});

// Generating random gradient
let dimension = 1000; // Size of tile to be download px

const styles = ['colourful', 'moody', 'neon', 'abstract', 'grayscale', 'light-leak'];

const generateBtn = document.querySelector('[for="random"]');
const canvas = document.querySelector('.canvas');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate randomised gradients
generateBtn.addEventListener('click', generateOrSave);

function generateOrSave(e) {
	
	if (e.metaKey) {
		saveGradient(e);
	} else {
		generateGradient();
	}
}

function generateGradient() {
	
	// Assign style
	const newStyle = styles[Math.floor(Math.random() * styles.length)];
	
	if (currentStyle) canvas.classList.remove(`random--${currentStyle}`);
	
	currentStyle = newStyle;
	canvas.classList.add(`random--${newStyle}`);
	
	// Loop through each canvas and assign a bunch of random CSS variables
	const shapes = canvas.getElementsByClassName('shape');

	document.body.style.setProperty('--r-h', `${random(0, 360)}deg`);
	document.body.style.setProperty('--r-s', `${random(40, 90)}%`);
	document.body.style.setProperty('--r-l', `${random(55, 90)}%`);

	Object.values(shapes).forEach((shape) => {
		shape.style.setProperty('--r-h', `${random(0, 360)}deg`);
		shape.style.setProperty('--r-s', `${random(40, 90)}%`);
		shape.style.setProperty('--r-l', `${random(55, 90)}%`);

		shape.style.setProperty('--w', `${random(0, 30) + 85}%`);
		shape.style.setProperty('--b-r', `${random(20, 60)}%`);
		shape.style.setProperty('--b', `${random(5, 75) / 10}em`);
		shape.style.setProperty('--x', `${random(0, 100) - 50}%`);
		shape.style.setProperty('--y', `${random(0, 100) - 50}%`);
		shape.style.setProperty('--s-x', `${1 + ((random(0, 130) - 30) / 100)}`);
		shape.style.setProperty('--s-y', `${1 + ((random(0, 130) - 30) / 100)}`);
		shape.style.setProperty('--r', `${random(0, 720) - 360}deg`);
	})
}

// Convert RGB colour to Hex
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

// Save gradient
function saveGradient(e) {
	const gradient = canvas;
	const rect = gradient.getBoundingClientRect();
	const scale = dimension / rect.width

	//	Get canvas background color
	const color = rgba2hex(window.getComputedStyle(gradient, null).getPropertyValue('background-color'));
	
	console.log(color, scale, rect);
	
	// Get name of color for use in file name
	fetch(`https://api.color.pizza/v1/${color.substring(1)}`)
		.then(c => c.json())
		.then(c => {
			// Convert DOM to canvas
			domtoimage.toPng(gradient, {
				bgColor: '#ffffff',
				width: rect.width * scale,
				height: rect.height * scale,
				style: {
					  'transform': `scale(${scale})`,
					  'transform-origin': 'top left'
				 }
			})
			// Download image
			.then(function (dataUrl) {
				// Render canvas as a link and click dat
				const link = document.createElement('a');
				link.download = `${currentStyle}-${c['paletteTitle'].toLowerCase().replaceAll(' ','-')}-gradient`;
				link.href = dataUrl;
				link.click();
			})
	});
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click tracking for App Store button (placeholder)
    const appStoreBtn = document.querySelector('.btn-app-store');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function(e) {
            // Add your App Store URL here
            // e.preventDefault();
            // window.open('https://apps.apple.com/app/your-app-id', '_blank');
            
            console.log('App Store download clicked');
        });
    }

    // Add mobile menu toggle (if needed in future)
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.className = 'mobile-menu-btn';
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileBtn.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #333;
                    cursor: pointer;
                    display: block;
                `;
                
                navContainer.appendChild(mobileBtn);
                
                mobileBtn.addEventListener('click', function() {
                    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                });
            }
        }
    }

    // Initialize mobile menu
    createMobileMenu();
    
    // Recreate mobile menu on resize
    window.addEventListener('resize', createMobileMenu);
});

