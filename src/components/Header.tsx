import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SchedulingModal from "./SchedulingModal";
import { useState } from "react";

const Header = () => {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);

  const handleOpenScheduling = () => {
    setIsSchedulingModalOpen(true);
  };

  const handleCloseScheduling = () => {
    setIsSchedulingModalOpen(false);
  };

  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-full"></div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Viva mais bella
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors duration-300">
              Início
            </a>
            <a href="#servicos" className="text-foreground hover:text-primary transition-colors duration-300">
              Serviços
            </a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-colors duration-300">
              Sobre
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors duration-300">
              Contato
            </a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="accent" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <nav className="flex flex-col space-y-6 mt-6">
                <a 
                  href="#inicio" 
                  className="text-foreground hover:text-primary transition-colors duration-300 text-lg font-medium"
                >
                  Início
                </a>
                <a 
                  href="#servicos" 
                  className="text-foreground hover:text-primary transition-colors duration-300 text-lg font-medium"
                >
                  Serviços
                </a>
                <a 
                  href="#sobre" 
                  className="text-foreground hover:text-primary transition-colors duration-300 text-lg font-medium"
                >
                  Sobre
                </a>
                <a 
                  href="#contato" 
                  className="text-foreground hover:text-primary transition-colors duration-300 text-lg font-medium"
                >
                  Contato
                </a>
                <Button 
                  variant="accent" 
                  className="w-full mt-6"
                  onClick={handleOpenScheduling}
                >
                  Agendar Consulta
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="accent" 
            className="hidden md:flex"
            onClick={handleOpenScheduling}
          >
            Agendar Consulta
          </Button>
        </div>
      </header>

      <SchedulingModal 
        isOpen={isSchedulingModalOpen}
        onClose={handleCloseScheduling}
      />
    </>
  );
};

export default Header;