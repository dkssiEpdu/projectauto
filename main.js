class CarListing extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .car-listing {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 1rem;
                }

                .car-listing img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 5px;
                }

                .car-listing h3 {
                    margin-top: 1rem;
                }

                .car-listing p {
                    margin-top: 0.5rem;
                }

                .car-listing .btn {
                    background-color: #333;
                    color: #fff;
                    padding: 0.5rem 1rem;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 1rem;
                }
            </style>
            <div class="car-listing">
                <img src="${this.getAttribute('image')}" alt="${this.getAttribute('name')}">
                <h3>${this.getAttribute('name')}</h3>
                <p><strong>Price:</strong> ${this.getAttribute('price')}</p>
                <a href="#" class="btn">View Details</a>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('car-listing', CarListing);

const carListings = [
    {
        name: '2023 Tesla Model 3',
        price: '$40,000',
        image: 'https://images.unsplash.com/photo-1629904991443-3e2a39f65839?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: '2022 Ford Mustang',
        price: '$35,000',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: '2021 Chevrolet Corvette',
        price: '$60,000',
        image: 'https://images.unsplash.com/photo-1610472482329-a77480740924?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

const carListingsContainer = document.querySelector('.car-listings');

carListings.forEach(car => {
    const carListing = document.createElement('car-listing');
    carListing.setAttribute('name', car.name);
    carListing.setAttribute('price', car.price);
    carListing.setAttribute('image', car.image);
    carListingsContainer.appendChild(carListing);
});
