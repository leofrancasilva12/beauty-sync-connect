import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Service {
  id: string;
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  duration: string;
  price: string;
}

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (service: Service) => void;
}

const ServiceModal = ({ service, isOpen, onClose, onSchedule }: ServiceModalProps) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border-0 shadow-elegant">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground mb-4">
            {service.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-card"
            />
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <span className="text-sm font-medium">⏱️ {service.duration}</span>
              </Badge>
              <Badge variant="outline" className="px-3 py-1 border-primary text-primary">
                <span className="text-sm font-bold">{service.price}</span>
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Sobre o Tratamento
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.fullDescription}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Benefícios
              </h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-accent-foreground text-sm mt-1">✨</span>
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button 
                variant="default" 
                className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                onClick={() => onSchedule(service)}
              >
                Agendar Agora
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-border hover:bg-secondary"
                onClick={onClose}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;