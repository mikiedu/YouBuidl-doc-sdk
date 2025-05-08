import { Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import DocPage from "@/pages/DocPage";
import SearchPage from "@/pages/SearchPage";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <TooltipProvider>
      <Layout>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/docs/:slug" component={DocPage} />
          <Route path="/search" component={SearchPage} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </TooltipProvider>
  );
}

export default App;
