import type { Completion, Profile, UiSettings } from "@/lib/types";

const DB_NAME = "doula-edu";
const DB_VERSION = 2;

function openDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("This browser cannot store data on the device."));
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("completions")) {
        db.createObjectStore("completions", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open storage."));
  });
}

function withStore<T>(
  storeName: "profile" | "completions" | "settings",
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        let settled = false;
        const finish = (callback: () => void) => {
          if (settled) return;
          settled = true;
          db.close();
          callback();
        };

        const transaction = db.transaction(storeName, mode);
        const request = run(transaction.objectStore(storeName));
        let value = undefined as T;

        request.onsuccess = () => {
          value = request.result;
        };
        transaction.oncomplete = () => finish(() => resolve(value));
        transaction.onerror = () =>
          finish(() => reject(transaction.error ?? new Error("Storage transaction failed")));
        transaction.onabort = () =>
          finish(() => reject(transaction.error ?? new Error("Storage transaction aborted")));
      }),
  );
}

export function readProfile(): Promise<Profile | undefined> {
  return withStore("profile", "readonly", (store) => store.get("profile"));
}

export function writeProfile(profile: Profile): Promise<IDBValidKey> {
  return withStore("profile", "readwrite", (store) => store.put(profile));
}

export function readCompletions(): Promise<Completion[]> {
  return withStore("completions", "readonly", (store) => store.getAll());
}

export function writeCompletion(completion: Completion): Promise<IDBValidKey> {
  return withStore("completions", "readwrite", (store) => store.put(completion));
}

export function deleteCompletion(id: string): Promise<undefined> {
  return withStore("completions", "readwrite", (store) => store.delete(id));
}

export function readSettings(): Promise<UiSettings | undefined> {
  return withStore("settings", "readonly", (store) => store.get("ui"));
}

export function writeSettings(settings: UiSettings): Promise<IDBValidKey> {
  return withStore("settings", "readwrite", (store) => store.put(settings));
}
