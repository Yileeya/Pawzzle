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
}

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp();

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

    const token = useCookie('token');

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

  async function getUser() {
    const token = useCookie('token');
    if (!token.value) return;

    await $api<IUser>('/user').then((response) => {
      user.value = response;
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
  }

  const userInfo = computed<IUserInfo>(() => {
    const { roles, pets, ...info } = user.value;
    return info;
  });

  return {
    login,
    getUser,
    logout,
    user,
    userInfo
  };
});
