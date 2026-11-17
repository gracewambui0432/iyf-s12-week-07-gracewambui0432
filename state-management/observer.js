// Create a store
const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };

            // Notify all listeners
            listeners.forEach(listener => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);

            // Return unsubscribe function
            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        }
    };
};

// Create our store
const store = createStore({ count: 0 });

// Get HTML elements
const counter = document.getElementById("counter");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");

// Subscribe to state changes
store.subscribe(state => {
    counter.textContent = state.count;

    console.log("State changed:", state);
});

// Increase counter
increaseBtn.addEventListener("click", () => {
    const currentState = store.getState();

    store.setState({
        count: currentState.count + 1
    });
});

// Decrease counter
decreaseBtn.addEventListener("click", () => {
    const currentState = store.getState();

    store.setState({
        count: currentState.count - 1
    });
});