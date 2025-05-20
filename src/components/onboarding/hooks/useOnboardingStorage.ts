
import { useCallback } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

export const ONBOARDING_PREFIX = "onboarding.";

// Names for specific onboarding step storage keys
export const ONBOARDING_STORAGE_KEYS = {
  MODULES: `${ONBOARDING_PREFIX}modules`,
  INTEGRATIONS: `${ONBOARDING_PREFIX}integrations`,
  PRODUCTS: `${ONBOARDING_PREFIX}products`,
  USERS_ORDERS: `${ONBOARDING_PREFIX}usersOrders`,
  STORE: `${ONBOARDING_PREFIX}store`,
};

export const useOnboardingStorage = () => {
  // Function to clear all onboarding data from localStorage
  const clearOnboardingData = useCallback(() => {
    // Get all localStorage keys
    const keys = Object.keys(localStorage);
    
    // Filter keys that start with onboarding prefix
    const onboardingKeys = keys.filter(key => key.startsWith(ONBOARDING_PREFIX));
    
    // Remove each onboarding key
    onboardingKeys.forEach(key => {
      localStorage.removeItem(key);
    });
  }, []);

  return { clearOnboardingData };
};
