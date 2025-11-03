//we import 'create' function from zustand library
//thanks to this function we can be able to create our own "global store"
import { create } from "zustand";

//we create a store named useThemeStore (a mini global state manger)
export const useThemeStore = create((set) => ({
  //we define a state named 'theme'
  //if there is a theme already saved in localStorage, we get it
  //if not, we use "forest" theme as default
  theme: localStorage.getItem("preferred-theme") || "forest",

  //we define a function named 'setTheme'
  //this function is called when the user selects a new theme
  setTheme: (theme) => {
    //we save the selected theme to localstorage so that it is remembered even if the page is refreshed
    localStorage.setItem("preferred-theme", theme);
    //we update the global 'theme' state using zustand's 'set' function
    set({ theme });
  },
}));
