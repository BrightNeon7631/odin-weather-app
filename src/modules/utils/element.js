// Creates an element
export function createNewElement(type, id = null, text = null, newClass = null) {
    const newElement = document.createElement(type);

    if (type === 'img') {
        newElement.src = text;
    }

    if (id !== null) {
        newElement.id = id;
    }

    if (newClass !== null) {
        newElement.classList = newClass;
    }

    if (text !== null) {
        newElement.textContent = text;
    }

    return newElement;
}

// Adds elements to a container element
export function addToContainer(container, ...elements) {
    elements.forEach(element => container.appendChild(element));
}

// Clears existing elements
export function clearElements(container) {
    container.textContent = ''; 
}