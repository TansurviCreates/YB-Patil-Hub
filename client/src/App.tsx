import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PreviousPapers from "./pages/PreviousPapers";
import DTEProjects from "./pages/DTEProjects";
import Assignments from "./pages/Assignments";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Donate from "./pages/Donate";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/papers" component={PreviousPapers} />
      <Route path="/projects" component={DTEProjects} />
      <Route path="/assignments" component={Assignments} />
      <Route path="/events" component={Events} />
      <Route path="/profile" component={Profile} />
      <Route path="/donate" component={Donate} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Layout>
                <Router />
              </Layout>
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
