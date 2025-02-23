const DB_NAME = "TaskManagerDB";
const STORE_NAME = "tasks";
const DB_VERSION = 1;

// Open or create the database
export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject("Error opening database");
        request.onsuccess = (event) => resolve(event.target.result);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
    });
}

// Add a new task
export function addTask(task) {
    return openDB().then((db) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.add(task);
    });
}

// Get all tasks
export function getTasks() {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Error retrieving tasks");
        });
    });
}

// Delete a task
export function deleteTask(id) {
    return openDB().then((db) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.delete(id);
    });
}


// Toggle task completion
export function toggleTaskCompletion(id, completed) {
    return openDB().then((db) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.get(id).onsuccess = (event) => {
            const task = event.target.result;
            if (task) {
                task.completed = completed;
                store.put(task);
            }
        };
    });
}
