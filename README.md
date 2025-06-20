# Redux Thunk Documentation

## What is Redux Thunk?

Redux Thunk is a middleware that allows you to write action creators that return a function instead of an action. This enables handling of asynchronous operations in Redux.

## Key Concepts

### 1. Thunk Middleware
- Thunk middleware allows action creators to return functions instead of plain action objects
- These functions can perform async operations before dispatching actions
- The function receives `dispatch` and `getState` as arguments

### 2. Async Operations Flow
```javascript
// Example of async flow in our application
export const loadPost = createAsyncThunk("post/loadPost", async () => {
  try {
    const data = await axios.get("https://dummyjson.com/posts");
    return data.data;
  } catch (error) {
    return error;
  }
});
```

### 3. Redux Toolkit's createAsyncThunk
`createAsyncThunk` automatically creates three action types:
- `pending`: When the API call starts
- `fulfilled`: When the API call succeeds
- `rejected`: When the API call fails

## Implementation Example

### 1. Store Setup
```javascript
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        posts: postReducer,
    }
});
```

### 2. Slice Configuration
```javascript
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.posts = action.payload;
      })
      .addCase(loadPost.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
```

### 3. Usage in Components
```javascript
const Component = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadPost());
  }, []);
};
```

## Best Practices

1. **Error Handling**: Always include try-catch blocks in thunk actions
2. **Loading States**: Maintain loading states to handle UI updates
3. **Action Types**: Use meaningful action type names
4. **State Management**: Keep state updates immutable
5. **TypeScript**: Consider using TypeScript for better type safety

## Common Patterns

1. **Request Status Tracking**:
```javascript
const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'fulfilled' | 'rejected'
  error: null
};
```

2. **Conditional Dispatching**:
```javascript
if (status === "idle") {
  dispatch(loadPost());
}
```

## Benefits

1. **Async Logic**: Handle complex async operations
2. **Side Effects**: Manage side effects in a predictable way
3. **Action Creators**: Write more complex action creators
4. **State Access**: Access current state within thunks
5. **Testing**: Easier to test async logic