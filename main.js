class CarListing extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .car-listing {
                    background-color: var(--surface, #fff);
                    border-radius: 20px;
                    padding: 24px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    border: 1px solid var(--border-color, #e5e8eb);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .car-listing:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
                }

                .car-listing img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin-bottom: 20px;
                }

                .car-listing h3 {
                    margin: 0 0 8px 0;
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-primary, #191f28);
                }

                .car-listing .price {
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--primary, #3182f6);
                    margin-bottom: 16px;
                }

                .car-listing .description {
                    font-size: 15px;
                    color: var(--text-secondary, #4e5968);
                    margin-bottom: 24px;
                    flex-grow: 1;
                }

                .car-listing .btn {
                    background-color: #f2f4f6;
                    color: #4e5968;
                    padding: 12px;
                    text-decoration: none;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 14px;
                    text-align: center;
                    transition: all 0.2s ease;
                }

                :host-context(.dark-mode) .car-listing .btn {
                    background-color: #2c2d2e;
                    color: #adb5bd;
                }

                .car-listing .btn:hover {
                    background-color: var(--primary, #3182f6);
                    color: #ffffff;
                }
            </style>
            <div class="car-listing">
                <img src="${this.getAttribute('image')}" alt="${this.getAttribute('name')}">
                <h3>${this.getAttribute('name')}</h3>
                <p class="price">${this.getAttribute('price')}</p>
                <p class="description">Premium condition, fully inspected, and ready for a new owner.</p>
                <a href="#" class="btn">자세히 보기</a>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('car-listing', CarListing);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '다크 모드 끄기';
} else {
    themeToggle.textContent = '다크 모드 켜기';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '다크 모드 끄기';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '다크 모드 켜기';
    }
});

// Smooth scroll for exploration buttons (only if element exists on current page)
const exploreBtn = document.getElementById('explore-btn');
const viewAllBtn = document.getElementById('view-all-btn');

const scrollToListings = (e) => {
    const listingsSection = document.getElementById('listings');
    if (listingsSection) {
        e.preventDefault();
        listingsSection.scrollIntoView({ behavior: 'smooth' });
    }
};

if (exploreBtn) exploreBtn.addEventListener('click', scrollToListings);
if (viewAllBtn) viewAllBtn.addEventListener('click', scrollToListings);

// Hero Slider Auto-play
const sliderItems = document.querySelectorAll('.slider-item');
if (sliderItems.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
        sliderItems[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % sliderItems.length;
        sliderItems[currentSlide].classList.add('active');
    }, 5000);
}

const carListings = [
    {
        name: 'Tesla Model 3',
        price: '₩54,000,000',
        image: 'https://images.unsplash.com/photo-1629904991443-3e2a39f65839?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Ford Mustang GT',
        price: '₩48,000,000',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Chevrolet Corvette',
        price: '₩82,000,000',
        image: 'https://images.unsplash.com/photo-1610472482329-a77480740924?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Porsche 911 Carrera',
        price: '₩125,000,000',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'BMW M4 Competition',
        price: '₩95,000,000',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Audi R8 V10 Performance',
        price: '₩180,000,000',
        image: 'https://images.unsplash.com/photo-1606152424101-ad2f9a287bd6?q=80&w=2070&auto=format&fit=crop',
    },
];

const carListingsContainer = document.querySelector('.car-listings');

if (carListingsContainer) {
    carListings.forEach(car => {
        const carListing = document.createElement('car-listing');
        carListing.setAttribute('name', car.name);
        carListing.setAttribute('price', car.price);
        carListing.setAttribute('image', car.image);
        carListingsContainer.appendChild(carListing);
    });
}
