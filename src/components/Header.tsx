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
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50 h-[140px]">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Menu hambúrguer à esquerda */}
          <div className="flex-1 flex justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-black border-r border-gray-800">
                <nav className="flex flex-col space-y-6 mt-6">
                  <a 
                    href="#inicio" 
                    className="text-white hover:text-primary transition-colors duration-300 text-lg font-medium"
                  >
                    Início
                  </a>
                  <a 
                    href="#servicos" 
                    className="text-white hover:text-primary transition-colors duration-300 text-lg font-medium"
                  >
                    Serviços
                  </a>
                  <a 
                    href="#sobre" 
                    className="text-white hover:text-primary transition-colors duration-300 text-lg font-medium"
                  >
                    Sobre
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
          </div>
          
          {/* Logo centralizada */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-full"></div>
            <span className="text-2xl font-bold text-white">
              Viva MaisBella
            </span>
          </div>
          
          {/* Espaço à direita para manter o logo centralizado */}
          <div className="flex-1"></div>
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