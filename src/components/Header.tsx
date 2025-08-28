import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-full"></div>
          <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Estética Premium
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

        <Button variant="accent" size="sm" className="md:hidden">
          Menu
        </Button>
        
        <Button variant="accent" className="hidden md:flex">
          Agendar Consulta
        </Button>
      </div>
    </header>
  );
};

export default Header;