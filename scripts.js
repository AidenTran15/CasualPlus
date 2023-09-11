document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelector(".Services")) {
        loadSampleServices();
    } else if (document.querySelector(".Orders")) {
        displayOrders();
    }
});

let Orders = JSON.parse(localStorage.getItem('Orders')) || [];
let total = 0;

function loadSampleServices() {
    let Services = [
        {
            id: 1,
            name: "Car Cleaning Service",
            description: "Revitalize Your Ride: Our car cleaning service offers comprehensive interior and exterior detailing to make your vehicle look and feel brand new. With our eco-friendly Services and expert technicians, we transform your car into a spotless, comfortable sanctuary on wheels.",
            price: 10,
            image: "carwash.jpg"
        },
        {
            id: 2,
            name: "Service 2",
            description: "Another great item.",
            price: 15,
            image: "https://placeimg.com/250/251/tech"
        },
        {
            id: 3,
            name: "Service 3",
            description: "Yet another fantastic Service.",
            price: 20,
            image: "https://placeimg.com/250/252/tech"
        },
        {
            id: 4,
            name: "Service 4",
            description: "An amazing item just for you.",
            price: 25,
            image: "https://placeimg.com/250/253/tech"
        },
        {
            id: 5,
            name: "Service 5",
            description: "The last, but not least.",
            price: 30,
            image: "https://placeimg.com/250/254/tech"
        }
    ];

    let ServicesSection = document.querySelector(".Services");

    Services.forEach(Service => {
        let article = document.createElement('article');
        article.classList.add('Service');

        let img = document.createElement('img');
        img.src = Service.image;
        img.alt = Service.name;

        let h2 = document.createElement('h2');
        h2.textContent = Service.name;

        let pDesc = document.createElement('p');
        pDesc.textContent = Service.description;

        let pPrice = document.createElement('p');
        pPrice.classList.add('price');
        pPrice.textContent = `Price: $${Service.price}`;

        let button = document.createElement('button');
        button.textContent = "Add to Orders";
        button.onclick = () => addToOrders(Service.id, Service.name, Service.price);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pDesc);
        article.appendChild(pPrice);
        article.appendChild(button);

        ServicesSection.appendChild(article);
    });
}

function addToOrders(ServiceID, ServiceName, ServicePrice) {
    Orders.push({
        id: ServiceID,
        name: ServiceName,
        price: ServicePrice
    });
    localStorage.setItem('Orders', JSON.stringify(Orders));
    alert(`${ServiceName} added to Orders!`);
}

function displayOrders() {
    let OrdersItems = document.getElementById('Orders-items');
    OrdersItems.innerHTML = '';
    total = 0;

    for (let item of Orders) {
        let li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        OrdersItems.appendChild(li);
        total += item.price;
    }

    document.getElementById('total').textContent = total.toFixed(2);
}