import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "@/components/sections/About"; 
import PdfPage from "@/components/sections/PdfPage";
import Maintenance from "@/components/sections/Maintenance.tsx"; // ✅ صفحة الصيانة

const queryClient = new QueryClient();

// ✨ ب True and False يتحكم في وضع الصيانه
const IS_UNDER_MAINTENANCE = false;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {IS_UNDER_MAINTENANCE ? (
              // ✅ لو الصيانة شغالة: أي Route يفتح صفحة الصيانة
              <Routes>
                <Route path="*" element={<Maintenance />} />
              </Routes>
            ) : (
              // ✅ لو مش صيانة: ارجع للـ Routes الأصلية
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/pdf" element={<PdfPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
