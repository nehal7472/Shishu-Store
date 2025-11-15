/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState, LoginFormData, SignupFormData } from '@/types/auth';

// Load user from sessionStorage
const loadUserFromStorage = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  try {
    const storedUser = sessionStorage.getItem('shishu-user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return {
        user,
        isAuthenticated: true,
        isLoading: false,
      };
    }
  } catch (error) {
    console.error('Error loading user from sessionStorage:', error);
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

const initialState: AuthState = loadUserFromStorage();

// Mock async functions - replace with actual API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - replace with actual API call
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        const user: User = {
          id: '1',
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          phone: '+880 1234 567890',
          createdAt: new Date().toISOString(),
        };
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData: SignupFormData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation - replace with actual API call
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        createdAt: new Date().toISOString(),
      };
      
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      // Clear from sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('shishu-user');
      }
    },
    clearError: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        
        // Save to sessionStorage
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('shishu-user', JSON.stringify(action.payload));
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        
        // Save to sessionStorage
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('shishu-user', JSON.stringify(action.payload));
        }
      })
      .addCase(signupUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;