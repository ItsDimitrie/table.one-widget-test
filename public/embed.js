(function () {
    const container = document.querySelector('.reservation-widget');

    const config = {
        restaurant: container ? container.getAttribute('data-restaurant') || '' : '',
        color: container ? container.getAttribute('data-color') || '' : '',

    };

    let iframe = document.getElementById("reservation-widget-iframe");

    if (!iframe) {

        restaurantId = config.restaurant
        color = config.color

        iframe = document.createElement("iframe");
        iframe.src = "http://localhost:5173?restaurantId=" + restaurantId + "&color=" + color
        iframe.id = "reservation-widget-iframe";
        iframe.style.all = 'initial'
        iframe.style.position = 'fixed'
        iframe.style.bottom = '1px'
        iframe.style.right = '1px'

        console.log(iframe.src)


        if (container) {
            container.appendChild(iframe);
        } else {
            document.body.appendChild(iframe);
        }
    }

    // Listen for messages from the iframe (Vue app)
    window.addEventListener('message', (event) => {
        if (event.data.type === 'resizeWidget') {
            iframe.style.width = event.data.width;
            iframe.style.height = event.data.height;
        }
    });

})();