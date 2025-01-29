export interface IPetCategory {
  id: number;
  name: string;
  extra_price: Record<string, number>; // { "1": 100, "2": 200, "3": 300 }
}

export interface IPetsCategory {
  cats: IPetCategory[];
  dogs: IPetCategory[];
}

export const usePetsCategoryStore = defineStore('petsCategory', () => {
  const pets = ref<IPetsCategory>({
    cats: [],
    dogs: []
  });

  function setPetsCategoryApiData(data: IPetsCategory) {
    pets.value = data;
  }

  return { pets, setPetsCategoryApiData };
});
