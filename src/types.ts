export interface Movie {
    title: string;
    release_date: string;
  }
  
  export interface Planet {
    name: string;
    population: string;
  }
  
  export interface Starship {
    name: string;
    model: string;
  }
  
  export interface Character {
    name: string;
    birth_year: string;
  }
  
// En tu archivo de tipos (por ejemplo, types.ts)
export interface Movie {
    // ... otras propiedades de Movie
    title: string;
    release_date: string;
    opening_crawl?: string; // Texto de apertura de la película
    director?: string; // Director de la película
    // Puedes agregar más propiedades según la información que quieras mostrar
  }
// En tu archivo de tipos (por ejemplo, types.ts)
export interface Planet {
    // ... otras propiedades de Planet
    name: string;
    climate?: string; // Clima del planeta
    population: string; // Población del planeta, declarada como opcional
    // Puedes agregar más propiedades según la información que quieras mostrar
    terrain: string; 
  }
    
  // En tu archivo de tipos (por ejemplo, types.ts)
export interface Starship {
    // ... otras propiedades de Starship
    name: string;
    model: string; // Modelo de la nave
    manufacturer?: string; // Fabricante de la nave
    passengers: number;
    // Puedes agregar más propiedades según la información que quieras mostrar
  }
  
  // En tu archivo de tipos (por ejemplo, types.ts)
export interface Character {
    // ... otras propiedades de Character
    name: string;
    birth_year: string; // Año de nacimiento del personaje
    gender?: string; // Género del personaje
    homeworld: string;// Mundo natal
    species?: string;// especie
    // Puedes agregar más propiedades según la información que quieras mostrar
  }
  