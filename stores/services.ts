export interface IService {
  id: number;
  name: string;
  display_name: string;
  time: number;
  price: number;
  describe: string[];
  has_bath_products: 0 | 1;
}

export interface IBathProduct {
  id: number;
  name: string;
  price: number;
  description: string;
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

  function getServiceById(id: number): IService {
    return services.value.find((service) => service.id === id) || {
      id: 0,
      name: '',
      display_name: '',
      time: 0,
      price: 0,
      describe: [],
      has_bath_products: 0
    };
  }

  return { services, bathProducts, notices, setServicesApiData, getServiceById };
});
