const STORAGE_KEYS = {
  inventory: 'northline_inventory',
  favorites: 'northline_favorites',
  finance: 'northline_finance_inputs',
  lead: 'northline_lead_draft',
  tradeIn: 'northline_trade_in_draft',
  filters: 'northline_filters',
};

const memoryStore = {};

const canUseStorage = () => typeof window !== 'undefined' && !!window.localStorage;

const read = (key, fallback) => {
  try {
    if (canUseStorage()) {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    }
    return key in memoryStore ? memoryStore[key] : fallback;
  } catch (error) {
    console.warn('Storage read failed', error);
    return fallback;
  }
};

const write = (key, value) => {
  try {
    if (canUseStorage()) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      memoryStore[key] = value;
    }
  } catch (error) {
    console.warn('Storage write failed', error);
  }
};

export const getInventory = (seed) => {
  const stored = read(STORAGE_KEYS.inventory, null);
  if (stored && Array.isArray(stored) && stored.length > 0) return stored;
  write(STORAGE_KEYS.inventory, seed);
  return seed;
};

export const saveInventory = (list) => write(STORAGE_KEYS.inventory, list);

export const getFavorites = () => read(STORAGE_KEYS.favorites, []);
export const saveFavorites = (favorites) => write(STORAGE_KEYS.favorites, favorites);

export const getFinanceInputs = (defaults) => read(STORAGE_KEYS.finance, defaults);
export const saveFinanceInputs = (inputs) => write(STORAGE_KEYS.finance, inputs);

export const getLeadDraft = () =>
  read(STORAGE_KEYS.lead, {
    name: '',
    email: '',
    phone: '',
    message: '',
  });
export const saveLeadDraft = (draft) => write(STORAGE_KEYS.lead, draft);

export const getTradeInDraft = () =>
  read(STORAGE_KEYS.tradeIn, {
    year: '',
    make: '',
    model: '',
    mileage: '',
    condition: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
export const saveTradeInDraft = (draft) => write(STORAGE_KEYS.tradeIn, draft);

export const getFilters = (defaults) => read(STORAGE_KEYS.filters, defaults);
export const saveFilters = (filters) => write(STORAGE_KEYS.filters, filters);
