import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Bottom from './pages/Bottom';
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Navbar />
          <Outlet />
          <Bottom />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
