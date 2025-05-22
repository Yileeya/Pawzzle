import { Notify } from 'quasar';

interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: IRole[];
  pets?: IPet[];
  [key: string]: any;
}

export type IUserInfo = Omit<IUser, 'roles' | 'pets'>;

export interface IRole {
  id: number;
  name: string;
  guard_name: string;
}

export interface IPet {
  id: number;
  pet_type_id: number;
  name: string;
  gender: string;
  birth_date: string;
  weight: string;
  is_default: 1 | 0;
}

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();

  const { setSelectedPetById } = usePetsCategoryStore();
  const { resetInitFormData: resetReserveFormData } = useReserveFormStore();

  const userInit = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    roles: [],
    pets: []
  };
  const user = ref<IUser>({ ...userInit });

  async function login(form: ILogin): Promise<boolean> {
    let isSuccessful = false;

    const token = useCookie('token', { maxAge: 86400 });

    await $api<{ accessToken: string }>('/login', {
      method: 'POST',
      body: form
    })
      .then(async (response) => {
        token.value = response.accessToken;
        Notify.create({
          message: '登入成功！'
        });
        isSuccessful = true;
      })
      .catch(() => {
        resetUser();
      });

    return isSuccessful;
  }

  async function googleLogin(socialite_token: string, redirect_uri: string) {
    const token = useCookie('token', { maxAge: 86400 });
    await $api<{ accessToken: string }>('/google/login', {
      method: 'POST',
      body: { socialite_token, redirect_uri }
    })
      .then(async (response) => {
        token.value = response.accessToken;
        await getUser();
        Notify.create({
          message: '登入成功！'
        });
      })
      .catch(() => {
        resetUser();
      });
  }

  async function getUser() {
    const token = useCookie('token');
    if (!token.value) return;

    await $api<IUser>('/user').then((response) => {
      user.value = response;
      if (response.pets?.length) {
        setSelectedPetById(userDefaultPet.value.pet_type_id);
      }
    });
  }

  async function logout() {
    await $api<IUser>('/logout', {
      method: 'POST'
    }).then(() => {
      resetUser();
      Notify.create({
        message: '登出成功！'
      });
      navigateTo('/');
    });
  }

  function resetUser() {
    const token = useCookie('token');
    token.value = '';
    user.value = { ...userInit };
    resetReserveFormData();
  }

  const userInfo = computed<IUserInfo>(() => {
    const { roles, pets, ...info } = user.value;
    return info;
  });

  //#region 寵物相關
  const userPets = computed(() => {
    return user.value.pets;
  });

  const userDefaultPet = computed(() => {
    const petInit = {
      id: 0,
      pet_type_id: 0,
      name: '',
      gender: '',
      birth_date: '',
      weight: 0,
      is_default: 0
    };
    return user.value.pets?.find((pet) => pet.is_default === 1) || petInit;
  });

  function updateUserPet(pet: IPet, isDelete: boolean = false) {
    const index = user.value.pets?.findIndex((p) => p.id === pet.id);
    if (index === undefined) return;
    else if (isDelete && index !== -1) {
      user.value.pets?.splice(index, 1); // 刪除
    } else if (index === -1) {
      user.value.pets?.push(pet); // 新增
    } else {
      user.value.pets![index] = { ...pet }; // 更新
    }

    // 預設只能有一隻
    if (pet.is_default === 1) {
      user.value.pets?.forEach((p) => {
        if (p.id !== pet.id) {
          p.is_default = 0;
        }
      });
      // 設定預設
      setSelectedPetById(pet.pet_type_id);
    }
  }
  //#endregion

  //#region 使用者角色
  const userIsAdmin = computed(() => {
    return user.value.roles.some((role) => role.id === 3);
  });
  //#endregion

  return {
    login,
    googleLogin,
    getUser,
    logout,
    updateUserPet,
    user,
    userInfo,
    userPets,
    userDefaultPet,
    userIsAdmin
  };
});
