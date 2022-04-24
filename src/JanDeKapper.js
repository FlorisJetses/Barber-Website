let url = "http://localhost:8390/";


function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
}

function getOptions(method, token) {
    return {
        method: method,
        headers: {
            "X-Access-Token": token,
            "Content-Type": "application/json",
        },
    };
}

export const isTokenExpired = (token) => {
    const decodedJwt = parseJwt(token);

    if (!decodedJwt) return true;

    if (decodedJwt.exp * 1000 < Date.now()) {
        return true;
    } else {
        return false;
    }
};

export const authenticateUser = async (username, password) => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(url + "auth", options);

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
};

export async function getReservations(token) {
    const response = await fetch(
        url + "reservations",
        getOptions("GET", token)
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getEmployees() {
    const response = await fetch(url + "employees", getOptions("GET"));

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getAvailableDates(ms, employee_id) {
    let finalUrl = `${url}available_dates/${ms}/`

    if (employee_id)
        finalUrl += employee_id;

    const response = await fetch(
        finalUrl,
        getOptions("GET")
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getTreatments() {
    const response = await fetch(url + "treatments", getOptions("GET"));

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getTreatment(treatment) {
    const response = await fetch(
        url + "treatments/" + new URLSearchParams({ treatment: treatment }),
        getOptions("GET")
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getWorkshfts(token) {
    const response = await fetch(url + "workshifts", getOptions("GET", token));

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getEmployee(id) {
    const response = await fetch(
        url + "employees/" + new URLSearchParams({ id: id }),
        getOptions("GET")
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getReservation(token, id) {
    const response = await fetch(
        url + "reservations" + new URLSearchParams({ id: id }),
        getOptions("GET", token)
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getOrders(token) {
    const response = await fetch(
        url + "orders",
        getOptions("GET", token)
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getReservationsByDay(token, ms) {
    const response = await fetch(
        url + "day_reservations/" + ms,
        getOptions("GET", token)
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getCustomers(token) {
    const response = await fetch(url + "customers", getOptions("GET", token));

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getCustomer(token, email) {
    const response = await fetch(
        url + "customers" + new URLSearchParams({ email: email }),
        getOptions("GET", token)
    );

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getServices(token) {
    const response = await fetch(url + "services", getOptions("GET", token));

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getProducts(token) {
    const response = await fetch(url + "products", getOptions("GET", token));

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function getOccupiedDates(token) {
    const response = await fetch(url + "occupied_dates", getOptions("GET", token));

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function deleteProduct(body, token) {
    const options = getOptions("DELETE", token);
    options.body = JSON.stringify(body);

    const response = await fetch(url + "products", options);

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function addReservation(body) {
    const options = getOptions("POST");
    options.body = JSON.stringify(body);

    const response = await fetch(url + "reservations", options);

    let result = await response.json();
    return result;
}

export async function addProduct(body, token) {
    const options = getOptions("POST", token);
    options.body = JSON.stringify(body);

    const response = await fetch(url + "products", options);

    let result = await response.json();
    return result;
}

export async function addEmployee(body, token) {
    const options = getOptions("POST", token);
    options.body = JSON.stringify(body);

    const response = await fetch(url + "employees", options);

    let result = await response.json();
    return result;
}

export async function addWorkshift(body, token) {
    const options = getOptions("POST", token);
    options.body = JSON.stringify(body);

    const response = await fetch(url + "workshifts", options);

    let result = await response.json();
    return result;
}

export async function deleteReservation(body, token) {
    const options = getOptions("DELETE", token);
    options.body = JSON.stringify(body);

    const response = await fetch(url + "reservations", options);

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function findTimeframes(body) {
    const options = getOptions("POST");
    options.body = JSON.stringify(body);

    const response = await fetch(url + "find_timeframes", options);

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function deleteEmployee(body, token) {
    const options = getOptions("DELETE", token);
    options.body = JSON.stringify(body);

    const response = await fetch(url + "employees", options);

    if (response.ok) {
        let result = await response.json();
        return result.data;
    } else {
        return {};
    }
}

export async function showMessage(message, isError) {
    let messageHolder = document.getElementById("message-holder");

    if (!messageHolder)
        return;

    let messageElement = document.createElement("div");
    let textElement = document.createElement("h2");
    let background = isError ? 'bg-red-600' : 'bg-blue-400'
    let finalMessage = (isError ? '<i class="fas fa-times-circle"></i> ' : '<i class="fas fa-check-circle"></i> ') + message;

    messageElement.className = `${background} message animate-fade-in`;
    textElement.className = "m-0";
    textElement.innerHTML = finalMessage;

    messageElement.appendChild(textElement);
    messageHolder.appendChild(messageElement);

    setTimeout(() => {
        messageElement.className = `${background} message animate-fade-out`;
    }, 3000);
}