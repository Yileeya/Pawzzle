export interface IPetCategory {
  id: number;
  name: string;
  extra_price: Record<string, number>; // { "1": 100, "2": 200, "3": 300 }
  category: string;
}

export const usePetsCategoryStore = defineStore('petsCategory', () => {
  const pets = ref<IPetCategory[]>([]);

  // select 選擇
  const selectedId = ref<number | null>(null);
  const selectedPet = ref<IPetCategory | null>(null);

  function setPetsCategoryApiData(data: IPetCategory[]) {
    pets.value = data;
  }

  function setSelectedPet(data: IPetCategory | null) {
    if (!data) selectedId.value = null;
    else selectedId.value = data.id;
    selectedPet.value = data;
  }

  function setSelectedPetById(id: number) {
    const data = pets.value.find((pet) => pet.id === id) || null;
    setSelectedPet(data);
  }

  return {
    pets,
    selectedId,
    selectedPet,
    setPetsCategoryApiData,
    setSelectedPet,
    setSelectedPetById
  };
});
