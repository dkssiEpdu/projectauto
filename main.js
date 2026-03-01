class CarListing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute('name') || 'Unknown Car';
        const price = this.getAttribute('price') || 'Contact for price';
        const description = this.getAttribute('description') || 'No description available.';
        const image = this.getAttribute('image') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .car-listing {
                    background-color: var(--surface, #fff);
                    border-radius: 0;
                    padding: 24px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    border: 2px solid var(--border-color, #000);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .car-listing:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                    background-color: var(--text-primary);
                }

                .car-listing:hover h3,
                .car-listing:hover .price,
                .car-listing:hover .description {
                    color: var(--bg-color);
                }

                .car-listing:hover .btn {
                    background-color: var(--bg-color);
                    color: var(--text-primary);
                }

                .car-listing img {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                    border-radius: 0;
                    margin-bottom: 24px;
                    border: 1px solid var(--border-color);
                    filter: grayscale(100%);
                    transition: filter 0.3s ease;
                }

                .car-listing:hover img {
                    filter: grayscale(0%);
                }

                .car-listing h3 {
                    margin: 0 0 12px 0;
                    font-size: 24px;
                    font-weight: 900;
                    text-transform: uppercase;
                    color: var(--text-primary, #000);
                    letter-spacing: -0.02em;
                }

                .car-listing .price {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-primary, #000);
                    margin-bottom: 16px;
                    display: block;
                    border-top: 2px solid var(--border-color);
                    padding-top: 12px;
                }

                .car-listing .description {
                    font-size: 14px;
                    color: var(--text-secondary, #666);
                    margin-bottom: 24px;
                    flex-grow: 1;
                    line-height: 1.6;
                    font-weight: 500;
                }

                .car-listing .btn {
                    background-color: var(--text-primary);
                    color: var(--bg-color);
                    padding: 16px;
                    text-decoration: none;
                    border-radius: 0;
                    font-weight: 900;
                    font-size: 14px;
                    text-align: center;
                    text-transform: uppercase;
                    border: 2px solid var(--border-color);
                    transition: all 0.2s ease;
                    letter-spacing: 0.1em;
                }

                .car-listing .btn:hover {
                    opacity: 0.9;
                }
            </style>
            <div class="car-listing">
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <span class="price">${price}</span>
                <p class="description">${description}</p>
                <a href="#" class="btn">VIEW DETAILS</a>
            </div>
        `;
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

// Smooth scroll for exploration buttons
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
        description: '완전 자율 주행(FSD) 옵션 포함, 1인 신조 무사고 차량입니다. 화이트 프리미엄 인테리어와 유리막 코팅으로 최상의 컨디션을 유지하고 있습니다.',
        image: 'https://images.unsplash.com/photo-1629904991443-3e2a39f65839?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Ford Mustang GT',
        price: '₩48,000,000',
        description: 'V8 5.0L 엔진의 압도적인 성능. 정식 출고 차량이며 배기 튜닝(구조변경 완료)으로 머슬카 특유의 감성을 극대화했습니다.',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Chevrolet Corvette',
        price: '₩82,000,000',
        description: '미드쉽 엔진의 완벽한 밸런스를 자랑하는 C8 모델입니다. 서킷 주행 이력 없으며 실내외 신차급 컨디션을 보증합니다.',
        image: 'https://images.unsplash.com/photo-1610472482329-a77480740924?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Porsche 911 Carrera',
        price: '₩125,000,000',
        description: '포르쉐의 정수, 911 카레라입니다. 포르쉐 센터 정기 점검 완료 및 미쉐린 타이어 신품 교체로 즉시 주행 가능합니다.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'BMW M4 Competition',
        price: '₩95,000,000',
        description: 'M 전용 아일 오브 맨 그린 컬러와 카본 패키지가 적용된 컴페티션 모델입니다. 고급유 관리 및 무사고를 보장합니다.',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2070&auto=format&fit=crop',
    },
    {
        name: 'Audi R8 V10 Performance',
        price: '₩180,000,000',
        description: '자연흡기 V10 엔진의 마지막 세대. 전체 PPF 시공으로 외관 보호가 완벽하며 전용 서비스 센터에서만 관리된 차량입니다.',
        image: 'https://images.unsplash.com/photo-1606152424101-ad2f9a287bd6?q=80&w=2070&auto=format&fit=crop',
    },
];

const carListingsContainer = document.querySelector('.car-listings');

if (carListingsContainer) {
    carListings.forEach(car => {
        const carListing = document.createElement('car-listing');
        carListing.setAttribute('name', car.name);
        carListing.setAttribute('price', car.price);
        carListing.setAttribute('description', car.description);
        carListing.setAttribute('image', car.image);
        carListingsContainer.appendChild(carListing);
    });
}
