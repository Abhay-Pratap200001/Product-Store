import {create} from 'zustand'

export const useThemeStore = create((set)=>({
    theme: localStorage.getItem("preffred-theme") || "forest",
    setTheme:(theme) =>{
        localStorage.setItem("preffred-theme",theme)
        set({theme})
    }
}))