import { Button } from "@/components/ui/button";
const Footer = () => {
  return <footer className="bg-gradient-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-full"></div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Viva mais bella
              </span>
            </div>
            
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Serviços</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Drenagem Linfática</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Massagem Relaxante</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Limpeza de Pele</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Micropigmentação</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Liberação Miofascial</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contato</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contato@esteticapremium.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Segunda à Sexta: 9h às 19h</li>
              
              <li>Domingo: Fechado</li>
            </ul>
            
            <div className="pt-4">
              <Button variant="accent" className="w-full">
                Agendar WhatsApp
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Viva mais bella. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;