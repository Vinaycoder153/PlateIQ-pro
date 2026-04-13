export const authService = {
  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!email || !password) throw new Error('Email and password are required');
    return { email, name: email.split('@')[0] };
  },

  signup: async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!name || !email || !password) throw new Error('All fields are required');
    return { email, name };
  },
};
