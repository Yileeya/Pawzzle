export interface IService {
  id: number;
  name: string;
  display_name: string;
  time: number;
  price: number;
  describe: string[];
  has_bath_products: boolean;
}

export interface IBathProduct {
  id: number;
  name: string;
  price: number;
  describe: string;
}

export interface IServicesApiData {
  services: IService[];
  bath_products: IBathProduct[];
  notices: string[];
}

export const useServicesStore = defineStore('services', () => {
  const services = ref<IService[]>([]);
  const bathProducts = ref<IBathProduct[]>([]);
  const notices = ref<string[]>([]);

  function setServicesApiData(data: IServicesApiData) {
    services.value = data.services;
    bathProducts.value = data.bath_products;
    notices.value = data.notices;
  }

  return { services, bathProducts, notices, setServicesApiData };
});
