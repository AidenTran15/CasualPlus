// Define API URLs
const ADD_API_URL = 'https://z5oms6iuz0.execute-api.ap-southeast-2.amazonaws.com/AddToCartLambda';
const GET_API_URL = 'https://tq3vgfbfch.execute-api.ap-southeast-2.amazonaws.com/GetCartItemsLambda';
const DELETE_API_URL = 'https://vjxkzfhv24.execute-api.ap-southeast-2.amazonaws.com/DeleteItemLambda';

// Handle adding to orders
function addToOrders(serviceName, price) {
    const data = {
        serviceName: serviceName,
        price: price
    };

    $.ajax({
        type: 'POST',
        url: ADD_API_URL,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert("Item added successfully!");
            getOrders(); // Reload orders after adding
        },
        error: function (err) {
            alert("Error adding item!");
            console.error(err);
        }
    });
}

// Fetch and display orders
function getOrders() {
    // Show the loading spinner
    $('#loading-spinner').show();

    $.ajax({
        url: GET_API_URL,
        type: 'GET',
        success: function (response) {
            let items;
            try {
                items = JSON.parse(response.body);
            } catch (e) {
                console.error('Error parsing response:', e);
                return;
            }

            console.log('Fetched items:', items);

            if (!Array.isArray(items)) {
                console.error('items is not an array:', items);
                return;
            }

            // Clear previous orders and render the new list
            $('#orders').html('');
            let totalAmount = 0; // Track the total amount

            items.forEach(function (item) {
                totalAmount += parseFloat(item.Price); // Add each item's price to the total amount

                $('#orders').append(`
                    <article class="Service">
                        <h2>${item['Service-Name']}</h2>
                        <p class="price">Price: $${item.Price}</p>
                        <button onclick="deleteOrder('${item['Service-Name']}', ${item.Price})">Delete</button>
                    </article>
                `);
            });

            // Add the total amount to the end of the orders section
            $('#orders').append(`
                <div class="total-amount">
                    <h2>Total Amount: $${totalAmount.toFixed(2)}</h2>
                </div>
            `);

            // Update the cart count on the UI
            $('#cart-count').text(items.length);

            // Hide the loading spinner
            $('#loading-spinner').hide();

        },
        error: function (error) {
            console.error('Error fetching items:', error);
            // Hide the loading spinner in case of error
            $('#loading-spinner').hide();
        }
    });
}




// Handle order deletion
function deleteOrder(serviceName, price) {
    console.log('Deleting item with Service-Name:', serviceName, 'and Price:', price);

    const data = {
        'Service-Name': serviceName,
        'Price': price
    };

    $.ajax({
        type: 'DELETE',
        url: DELETE_API_URL,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert("Item deleted successfully!");
            getOrders(); // Reload orders after deletion
        },
        error: function (err) {
            alert("Error deleting item!");
            console.error(err);
        }
    });
}



// Invoke getOrders when the document is ready
$(document).ready(function () {
    if (window.location.href.indexOf("Orders.html") > -1) {
        getOrders();

        // Add event listener for the checkout button
        $('body').on('click', '#checkoutButton', function () {
            window.location.href = 'check-out-page.html';
        });
    }
});
